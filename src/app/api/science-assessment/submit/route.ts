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
    const attempt = body?.attempt || body;
    if (!attempt) {
      return NextResponse.json({ error: 'Attempt data is required' }, { status: 400 });
    }

    const student = attempt.student || {};
    const name = String(student.name || 'Science Student').trim() || 'Science Student';
    const generatedUserId = crypto.randomUUID();
    const syntheticEmail = `science-${generatedUserId}@mentorme.local`;

    const { error: profileInsertError } = await getSupabaseAdmin()
      .from('users')
      .insert([
        {
          id: generatedUserId,
          email: syntheticEmail,
          name,
          role: 'individual',
          audience_type: 'ST',
          education_level: student.stage ? String(student.stage) : 'School Student',
          institution_name: student.institution ? String(student.institution) : null,
          state: student.state ? String(student.state) : null,
        }
      ]);

    if (profileInsertError) {
      console.error('Science assessment: user insert error', profileInsertError);
    }

    const { error: insertError } = await getSupabaseAdmin()
      .from('assessment_results')
      .insert([
        {
          user_id: generatedUserId,
          answers: attempt.answers || {},
          scores: attempt.result || {},
          report: {
            type: 'science-career-intelligence',
            student,
            result: attempt.result || {},
            completed: attempt.completed || Date.now(),
            expired: !!attempt.expired,
            modelVersion: attempt.modelVersion || null,
          },
          audience_type: 'ST',
          completed_at: new Date(attempt.completed || Date.now()).toISOString(),
        }
      ]);

    if (insertError) {
      console.error('Science assessment: result insert error', insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, userId: generatedUserId });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Science assessment submit error:', err);
    return NextResponse.json({ error: err.message || 'Failed to submit' }, { status: 500 });
  }
}
