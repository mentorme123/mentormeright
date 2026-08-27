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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ completed: false });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const { data: existingUser } = await getSupabaseAdmin()
      .from('users')
      .select('id, email')
      .ilike('email', normalizedEmail)
      .maybeSingle();

    if (!existingUser?.id) {
      return NextResponse.json({ completed: false });
    }

    const { data: assessment } = await getSupabaseAdmin()
      .from('assessment_results')
      .select('id, user_id, completed_at')
      .eq('user_id', existingUser.id)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (assessment) {
      return NextResponse.json({
        completed: true,
        userId: existingUser.id,
        completedAt: assessment.completed_at
      });
    }

    return NextResponse.json({ completed: false });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error checking assessment status:', err);
    return NextResponse.json({ completed: false, error: err.message }, { status: 500 });
  }
}
