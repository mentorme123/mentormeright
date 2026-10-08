import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase environment variables are not configured');
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, testId, testName, score, totalQuestions, correctAnswers, breakdown, message } = body;

    if (!email || !testId || typeof score !== 'number') {
      return NextResponse.json({ error: 'email, testId and score are required' }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const { data: existingUser } = await getSupabaseAdmin()
      .from('users')
      .select('id, email')
      .ilike('email', normalizedEmail)
      .maybeSingle();

    const generatedUserId = existingUser?.id || crypto.randomUUID();

    if (!existingUser?.id) {
      const { error: profileInsertError } = await getSupabaseAdmin()
        .from('users')
        .insert([
          {
            id: generatedUserId,
            email: normalizedEmail,
            name: normalizedEmail.split('@')[0],
            role: 'individual',
            audience_type: 'ST'
          }
        ]);

      if (profileInsertError) {
        console.error('Error creating user profile for placement result:', profileInsertError);
        return NextResponse.json({ error: profileInsertError.message }, { status: 500 });
      }
    }

    const { error: insertError } = await getSupabaseAdmin()
      .from('placement_results')
      .insert([
        {
          user_id: generatedUserId,
          test_id: String(testId),
          test_name: String(testName || ''),
          score: Math.min(100, Math.max(0, score)),
          total_questions: Math.max(0, Number(totalQuestions) || 0),
          correct_answers: Math.max(0, Number(correctAnswers) || 0),
          breakdown: breakdown && typeof breakdown === 'object' ? breakdown : {},
          message: message ? String(message).slice(0, 500) : null,
          completed_at: new Date().toISOString()
        }
      ]);

    if (insertError) {
      console.error('Error saving placement result:', insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, userId: generatedUserId });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error submitting placement result:', err);
    return NextResponse.json({ error: err.message || 'Failed to submit placement result' }, { status: 500 });
  }
}
