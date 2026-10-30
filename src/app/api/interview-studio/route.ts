import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { catalogue } from '../../(main)/interview-studio/catalogue';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getEnv() {
  return {
    GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '',
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || '',
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || '',
    TRANSCRIPTION_MODEL: process.env.TRANSCRIPTION_MODEL || 'gemini-3.8-flash',
    EVALUATION_MODEL: process.env.EVALUATION_MODEL || 'gemini-3.8-flash',
    ADMIN_EMAILS: (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean),
  };
}

const json = (v: any, status = 200) => NextResponse.json(v, { status, headers: { 'Cache-Control': 'no-store' } });

function fail(s: string, n = 400): never {
  throw Object.assign(new Error(s), { status: n });
}

async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (e: any) {
      if (attempt < maxRetries - 1 && (e.status >= 500 || !e.status)) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        continue;
      }
      throw e;
    }
  }
  throw new Error('Max retries exceeded');
}

function getAuthUser(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  const email = req.headers.get('x-user-email');
  if (!userId || !email) return null;
  return {
    userId,
    email,
    displayName: req.headers.get('x-user-display-name') || email,
    fullName: req.headers.get('x-user-full-name') || null,
  };
}

async function getSupabaseUser(req: NextRequest) {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  const supabase = createServerClient(supabaseUrl, supabaseServiceKey, {
    cookies: {
      get(name: string) {
        return req.cookies.get(name)?.value;
      },
    },
  });
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return {
    userId: user.id,
    email: user.email || '',
    displayName: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
    fullName: user.user_metadata?.full_name || null,
  };
}

function isAdmin(user: any, env: any) {
  return user && env.ADMIN_EMAILS.includes(user.email.toLowerCase());
}

function getSupabase() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase is not configured.');
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function transcribeAudio(file: File): Promise<string> {
  const env = getEnv();
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');

  const mimeType = file.type || 'audio/webm';

  const body = JSON.stringify({
    contents: [{
      role: 'user',
      parts: [
        { text: 'Transcribe the following audio to text. Return ONLY the transcribed text, nothing else.' },
        {
          inlineData: {
            mimeType,
            data: base64,
          }
        }
      ]
    }]
  });

  let response;
  try {
    response = await withRetry(async () => {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${env.TRANSCRIPTION_MODEL}:generateContent?key=${env.GOOGLE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          signal: AbortSignal.timeout(60000),
        }
      );
      if (!r.ok && r.status >= 500) {
        let detail='';
        try { const errorData: any = await r.json(); detail = String(errorData.error?.message||''); } catch {}
        throw Object.assign(new Error(detail||r.statusText), {status: r.status});
      }
      return r;
    });
  } catch (e: any) {
    if (e.name === 'AbortError' || e.message?.includes('timeout') || e.message?.includes('aborted') || e.message?.includes('aborted')) {
      fail('Audio transcription timed out. The language model API is busy; please try again in a few minutes.', 502);
    }
    throw e;
  }

  if (!response) fail('Audio transcription request was aborted. Please try again.', 502);
  if (!response.ok) {
    let detail = '';
    try {
      const errorData: any = await response.json();
      detail = String(errorData.error?.message || JSON.stringify(errorData));
    } catch {}
    if (response.status === 401) fail('Audio transcription failed: API key rejected.', 502);
    if (response.status === 429) fail(`Audio transcription failed: ${detail.includes('uota')||detail.includes('imit exceeded')?'quota exceeded. ':'rate limit reached. '}${detail.slice(0, 200)}`, 502);
    if (response.status >= 500) fail(`Audio transcription failed: service is temporarily unavailable. ${detail.slice(0, 200)}`, 502);
    fail(`Audio transcription failed: ${detail.slice(0, 200)}`, 502);
  }

  const result: any = await response.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return text.trim();
}


async function evaluateAnswer(prompt: any): Promise<any> {
  const env = getEnv();
  let response;
  try {
    response = await withRetry(async () => {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${env.EVALUATION_MODEL}:generateContent?key=${env.GOOGLE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
          generationConfig: {
            responseMimeType: 'application/json',
          },
          contents: [
            {
              role: 'user',
              parts: [{
                text: `You are MentorMe, an interview practice coach for Indian graduates. Return JSON: {technical:number 0..100,english:number 0..100,strength:string,improvement:string,example:string,nextQuestion:string,nextRubric:string}. Technical: correctness 40%, application 30%, completeness 20%, reasoning 10%. English: grammar 30%, vocabulary 20%, clarity 30%, structure 20%. Explain errors specifically.\\n\\n${JSON.stringify(prompt)}`
              }]
            }
          ]
        }),
        signal: AbortSignal.timeout(60000),
      }
      );
      if (!r.ok && r.status >= 500) {
        let detail='';
        try { const errorData: any = await r.json(); detail = String(errorData.error?.message||''); } catch {}
        throw Object.assign(new Error(detail||r.statusText), {status: r.status});
      }
      return r;
    });
  } catch (e: any) {
    if (e.name === 'AbortError' || e.message?.includes('timeout') || e.message?.includes('aborted')) {
      fail('AI answer evaluation timed out. The language model API is busy; please try again in a few minutes.', 502);
    }
    throw e;
  }

  if (!response) fail('AI answer evaluation request was aborted. Please try again.', 502);
  if (!response.ok) {
    let detail = '';
    try {
      const errorData: any = await response.json();
      detail = String(errorData.error?.message || JSON.stringify(errorData));
    } catch {}
    if (response.status === 401) throw Object.assign(new Error('AI answer evaluation failed: API key rejected.'), { status: 401 });
    if (response.status === 429) throw Object.assign(new Error('AI answer evaluation failed: ' + (detail.includes('uota')||detail.includes('imit exceeded')?'quota exceeded. ':'') + detail.slice(0, 200)), { status: response.status });
    throw Object.assign(new Error('AI answer evaluation failed: ' + detail.slice(0, 200)), { status: 400 });
  }

  const result: any = await response.json();
  const content = result.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
  let feedback: any;
  try {
    feedback = JSON.parse(content);
  } catch {
    fail('Evaluation was incomplete. Please retry.', 502);
  }
  return feedback;
}


export async function GET(req: NextRequest) {
  try {
    const env = getEnv();
    const user = getAuthUser(req) || (await getSupabaseUser(req));
    const url = new URL(req.url);
    
    if (!user) {
      return json({ authenticated: false, catalogue: catalogue, ready: !!env.GOOGLE_API_KEY });
    }

    // Handle audio download
    if (url.searchParams.has('audio')) {
      const supabase = getSupabase();
      const attemptId = url.searchParams.get('attempt') || '';
      const { data: attempt, error: attemptError } = await supabase
        .from('interview_attempts')
        .select('*')
        .eq('id', attemptId)
        .single();

      if (attemptError || !attempt) fail('Interview not found.', 404);
      if (!isAdmin(user, env) && attempt.user_id !== user.userId) fail('Interview not found.', 404);
      if (attempt.expires < Date.now()) fail('Recording has expired.', 410);

      return NextResponse.redirect(`${supabaseUrl}/storage/v1/object/public/recordings/${attemptId}/${url.searchParams.get('audio')}`);
    }

    const supabase = getSupabase();
    const admin = isAdmin(user, env);

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from('interview_profiles')
      .select('*')
      .eq('id', user.userId)
      .single();

    // Check for free attempt used (attempt with no payment that has answers)
    let freeUsed = false;
    if (profile) {
      const { data: freeAttempt } = await supabase
        .from('interview_attempts')
        .select('id')
        .eq('user_id', user.userId)
        .is('payment_id', null)
        .is('order_id', null)
        .eq('status', 'complete')
        .neq('history', '[]')
        .maybeSingle();
      freeUsed = !!freeAttempt;
    }

    const normalizedProfile = profile ? { ...profile, free_used: freeUsed } : null;

    // Get attempts
    const { data: attempts } = await supabase
      .from('interview_attempts')
      .select('*')
      .eq('user_id', user.userId)
      .order('created', { ascending: false })
      .limit(100);

    return json({
      authenticated: true,
      user,
      profile: normalizedProfile,
      admin,
      catalogue: catalogue,
      ready: !!env.GOOGLE_API_KEY,
      paymentsReady: !!(env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET && !/replace|placeholder|xxxx|paste|example/i.test(env.RAZORPAY_KEY_ID + env.RAZORPAY_KEY_SECRET)),
      attempts: (attempts || []).map((a: any) => ({ ...a, history: JSON.parse(a.history || '[]') })),
    });
  } catch (e: any) {
    console.error('[interview-studio GET]', e);
    return json({ error: e.message }, e.status || 500);
  }
}

export async function POST(req: NextRequest) {
  let lockedId: string | null = null;
  try {
    const env = getEnv();
    const origin = req.headers.get('origin') || '';
    
    // Origin check for non-local requests
    if (origin && !origin.startsWith('http://localhost') && !origin.startsWith('http://127.0.0.1') && origin !== new URL(req.url).origin) {
      const expectedOrigin = process.env.NEXT_PUBLIC_SITE_URL || origin;
      if (origin !== expectedOrigin) fail('Invalid request origin.', 403);
    }

    const user = getAuthUser(req) || (await getSupabaseUser(req));
    if (!user) fail('Please sign in to continue.', 401);

    const contentType = req.headers.get('content-type') || '';
    const data: any = contentType.includes('multipart/form-data') ? await req.formData() : await req.json();
    const action = data instanceof FormData ? data.get('action') : data.action;

    const supabase = getSupabase();
    const admin = isAdmin(user, env);

    if (action === 'profile') {
      if (!data.consent) fail('Please accept recording and processing consent.');
      const name = String(data.name || '').trim();
      const phone = String(data.phone || '').trim();
      const email = String(data.email || '').trim();
      if (!name || !/^\+?[0-9\s-]{10,15}$/.test(phone) || !/^\S+@\S+\.\S+$/.test(email)) {
        fail('Enter your name, valid phone and email.');
      }
      const { error } = await supabase
        .from('interview_profiles')
        .upsert({ id: user.userId, name: name.slice(0, 120), phone, email: email.slice(0, 200) });
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === 'add') {
      if (!admin) fail('Admin access required.', 403);
      const s = data.assessment;
      if (!s || !['id', 'track', 'title', 'level', 'opening', 'rubric', 'scenario', 'scenarioRubric'].every(k => typeof s[k] === 'string' && s[k].length > 0 && s[k].length < 5000)) {
        fail('All assessment fields are required.');
      }
      const { error } = await supabase.from('interview_custom_sets').insert({ id: s.id, data: JSON.stringify(s) });
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === 'start') {
      if (!env.GOOGLE_API_KEY) fail('Cloud AI has not been configured. Please contact MentorMe.', 503);
      
      const { data: profile } = await supabase
        .from('interview_profiles')
        .select('*')
        .eq('id', user.userId)
        .single();
      if (!profile) fail('Complete registration first.');

      const { data: customSets } = await supabase.from('interview_custom_sets').select('data');
      const allSets = [...catalogue, ...(customSets || []).map((x: any) => JSON.parse(x.data))];
      const s = allSets.find((x: any) => x.id === data.assessment);
      if (!s) fail('Unknown assessment.');

      const now = Date.now();
      const id = crypto.randomUUID();

      // Check for pending interview
      const { data: pending } = await supabase
        .from('interview_attempts')
        .select('id,question,created,history')
        .eq('user_id', user.userId)
        .eq('status', 'active')
        .gt('created', now - 900000)
        .order('created', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (pending) return json({ id: pending.id, question: pending.question, created: pending.created, history: JSON.parse(pending.history || '[]') });

      // Check if free attempt was used - only count attempts with actual answers
      const { data: freeAttempt } = await supabase
        .from('interview_attempts')
        .select('id')
        .eq('user_id', user.userId)
        .is('payment_id', null)
        .is('order_id', null)
        .eq('status', 'complete')
        .neq('history', '[]')
        .limit(1)
        .maybeSingle();

      if (!freeAttempt) {
        // Create free attempt
        const { error: insertError } = await supabase
          .from('interview_attempts')
          .insert({
            id,
            user_id: user.userId,
            assessment: s.id,
            created: now,
            expires: now + 30 * 86400000,
            status: 'active',
            question: s.opening,
            history: '[]',
          });
        if (insertError) throw insertError;
        return json({ id, question: s.opening, created: now });
      }

      // Free attempt already used - require payment
      const razorpayKeyId = String(env.RAZORPAY_KEY_ID);
      const razorpayKeySecret = String(env.RAZORPAY_KEY_SECRET);
      
      if (!razorpayKeyId || !razorpayKeySecret || /your_|replace|paste|example|placeholder|xxxx/i.test(razorpayKeyId + razorpayKeySecret)) {
        fail('Razorpay is not configured with real credentials. Contact MentorMe.', 503);
      }

      const orderRes = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(razorpayKeyId + ':' + razorpayKeySecret).toString('base64'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 19900, currency: 'INR', receipt: id }),
      });

      if (!orderRes.ok) {
        let detail = '';
        try {
          const result: any = await orderRes.json();
          detail = String(result.error?.description || result.error?.reason || '');
        } catch {}
        if (orderRes.status === 401 || orderRes.status === 403) fail('Razorpay rejected the configured credentials.', 502);
        fail(detail || `Razorpay could not create the order (HTTP ${orderRes.status}).`, 502);
      }

      const order: any = await orderRes.json();
      const { error: attemptError } = await supabase.from('interview_attempts').insert({
        id,
        user_id: user.userId,
        assessment: s.id,
        created: now,
        expires: now + 30 * 86400000,
        status: 'payment_pending',
        question: s.opening,
        order_id: order.id,
      });
      if (attemptError) throw attemptError;

      return json({ id, order, key: razorpayKeyId });
    }

    if (action === 'reconcile') {
      const { data: a } = await supabase.from('interview_attempts').select('*').eq('id', data.id).single();
      if (!a || a.user_id !== user.userId || a.status !== 'payment_pending') fail('This payment cannot be resumed.');
      if (!env.GOOGLE_API_KEY || !env.RAZORPAY_KEY_SECRET) fail('Service configuration is incomplete.', 503);

      const res = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(a.order_id)}/payments`, {
        headers: { 'Authorization': `Basic ${Buffer.from(env.RAZORPAY_KEY_ID + ':' + env.RAZORPAY_KEY_SECRET).toString('base64')}` },
      });
      if (!res.ok) fail('Unable to check payment status.', 502);
      const result: any = await res.json();
      const payment = result.items?.find((p: any) => p.status === 'captured' && p.amount === 19900 && p.currency === 'INR' && p.order_id === a.order_id);
      if (!payment) fail('No captured payment found yet.', 502);

      const now = Date.now();
      const { error } = await supabase
        .from('interview_attempts')
        .update({ status: 'active', payment_id: payment.id, created: now, expires: now + 30 * 86400000 })
        .eq('id', a.id)
        .eq('status', 'payment_pending');
      if (error) throw error;
      return json({ id: a.id, question: a.question, created: now });
    }

    if (action === 'verify') {
      const { data: a } = await supabase.from('interview_attempts').select('*').eq('id', data.id).single();
      if (!a || a.user_id !== user.userId) fail('Forbidden', 403);
      if (a.status === 'active') return json({ id: a.id, question: a.question, created: a.created });
      if (a.status !== 'payment_pending' || a.order_id !== data.order_id) fail('Invalid payment order.');

      const crypto = await import('crypto');
      const expected = crypto.createHmac('sha256', env.RAZORPAY_KEY_SECRET).update(a.order_id + '|' + data.payment_id).digest('hex');
      let mismatch = expected.length ^ String(data.signature).length;
      for (let i = 0; i < expected.length; i++) mismatch |= expected.charCodeAt(i) ^ (String(data.signature)[i] || '').charCodeAt(0);
      if (mismatch) fail('Payment signature could not be verified.', 403);

      const res = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(data.payment_id)}`, {
        headers: { 'Authorization': `Basic ${Buffer.from(env.RAZORPAY_KEY_ID + ':' + env.RAZORPAY_KEY_SECRET).toString('base64')}` },
      });
      const payment: any = await res.json();
      if (!res.ok || payment.order_id !== a.order_id || payment.amount !== 19900 || payment.currency !== 'INR' || payment.status !== 'captured') {
        fail('Payment is not captured yet. Contact MentorMe with your payment ID.', 502);
      }

      const now = Date.now();
      await supabase
        .from('interview_attempts')
        .update({ status: 'active', payment_id: data.payment_id, created: now, expires: now + 30 * 86400000 })
        .eq('id', a.id)
        .eq('status', 'payment_pending');
      return json({ id: a.id, question: a.question, created: now });
    }

    // Handle answer submission
    const attemptId = String(data instanceof FormData ? data.get('id') : data.id);
    const { data: a, error: attemptError } = await supabase.from('interview_attempts').select('*').eq('id', attemptId).single();
    if (attemptError || !a || a.user_id !== user.userId) fail('Only the student can submit answers.', 403);

    if (action === 'finish') {
      await supabase.from('interview_attempts').update({ status: 'complete' }).eq('id', attemptId).eq('status', 'active').eq('busy', 0);
      return json({ ok: true });
    }

    if (action === 'answer') {
      if (a.status !== 'active') fail('This interview has ended.');
      if (Date.now() - a.created > 915000) fail('The 15-minute interview has ended. Please open your report.');
      
      const history = JSON.parse(a.history || '[]');
      if (history.length >= 8) fail('All questions have been completed.');

      const file = data.get('audio');
      if (!(file instanceof File) || file.size < 1000 || file.size > 12 * 1024 * 1024 || !['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/wav'].some(t => file.type.startsWith(t))) {
        fail('Record a valid audio answer (maximum 12 MB).');
      }

      const claimTime = Math.floor(Date.now() / 1000);
      const { data: claimResult, error: claimError } = await supabase
        .from('interview_attempts')
        .update({ busy: claimTime })
        .eq('id', attemptId)
        .or('busy.eq.0,busy.lt.' + (claimTime - 180))
        .eq('status', 'active');

      if (claimError) throw claimError;

      lockedId = attemptId;

      // Transcribe audio with Google Speech-to-Text
      const transcript = await transcribeAudio(file);
      if (transcript.length < 8) fail('Speech could not be understood. Please record your answer again.');

      const allSets = [...catalogue];
      const s = allSets.find((x: any) => x.id === a.assessment);
      if (!s) fail('Assessment unavailable.');

      const feedback = await evaluateAnswer({
        assessment: s.title,
        track: s.track,
        question: a.question,
        rubric: history.length ? history[history.length - 1].nextRubric : s.rubric,
        answer: transcript,
        priorQuestions: history.map((h: any) => h.question),
        scenario: s.scenario,
        scenarioRubric: s.scenarioRubric
      });

      const historyEntry = { question: a.question, transcript, ...feedback };
      history.push(historyEntry);
      
      // Upload audio blob to storage
      const { data: { publicUrl: storageUrl } } = supabase.storage
        .from('recordings')
        .getPublicUrl(`${attemptId}/${history.length - 1}`);
      
      // Insert audio file
      await supabase.storage
        .from('recordings')
        .upload(`${attemptId}/${history.length - 1}`, file, { contentType: file.type });

      const done = history.length >= 8 || Date.now() - a.created >= 850000;

      await supabase
        .from('interview_attempts')
        .update({
          history: JSON.stringify(history),
          question: feedback.nextQuestion,
          busy: 0,
          status: done ? 'complete' : 'active',
        })
        .eq('id', attemptId);

      lockedId = null;
      return json({ feedback, history, question: feedback.nextQuestion, done });
    }

    fail('Unknown action.');
  } catch (e: any) {
    console.error('[interview-studio POST]', e);
    return json({ error: e.message || 'Something went wrong.' }, e.status || 500);
  } finally {
    if (lockedId) {
      const supabase = getSupabase();
      await supabase.from('interview_attempts').update({ busy: 0 }).eq('id', lockedId);
    }
  }
}
