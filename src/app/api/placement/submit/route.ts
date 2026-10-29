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
    const { email, testId, testName, score, totalQuestions, correctAnswers, breakdown, message, registration } = body;

    if (!email || !testId || typeof score !== 'number') {
      return NextResponse.json({ error: 'email, testId and score are required' }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const { data: existingUser } = await getSupabaseAdmin()
      .from('users')
      .select('id, email')
      .ilike('email', normalizedEmail)
      .maybeSingle();

    let userId: string;

    if (existingUser?.id) {
      userId = existingUser.id;
      if (registration) {
        const updates: Record<string, string | null> = {};
        if (registration.name) updates.name = registration.name;
        if (registration.phone) updates.mobile = registration.phone;
        if (registration.college) updates.school = registration.college;
        if (Object.keys(updates).length > 0) {
          await getSupabaseAdmin()
            .from('users')
            .update(updates)
            .eq('id', userId);
        }
      }
    } else {
      // Create the auth user first — the on_auth_user_created trigger
      // automatically inserts the matching public.users row, satisfying
      // the users_id_fkey foreign key constraint.
      const { data: authData, error: authError } = await getSupabaseAdmin().auth.admin.createUser({
        email: normalizedEmail,
        password: crypto.randomUUID(),
        email_confirm: true,
        user_metadata: { full_name: registration?.name || normalizedEmail.split('@')[0] },
      });

      if (authError) {
        console.error('Error creating auth user for placement result:', authError);
        return NextResponse.json({ error: authError.message }, { status: 500 });
      }

      userId = authData.user.id;

      if (registration) {
        const updates: Record<string, string | null> = {};
        if (registration.name) updates.name = registration.name;
        if (registration.phone) updates.mobile = registration.phone;
        if (registration.college) updates.school = registration.college;
        if (Object.keys(updates).length > 0) {
          await getSupabaseAdmin()
            .from('users')
            .update(updates)
            .eq('id', userId);
        }
      }
    }

    const { error: insertError } = await getSupabaseAdmin()
      .from('placement_results')
      .insert([
        {
          user_id: userId,
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

    return NextResponse.json({ success: true, userId });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error submitting placement result:', err);
    return NextResponse.json({ error: err.message || 'Failed to submit placement result' }, { status: 500 });
  }
}
