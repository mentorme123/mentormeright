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
    const userId = searchParams.get('userId');
    const email = (searchParams.get('email') || '').trim().toLowerCase();
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') || 50)));

    let targetUserId = userId;
    if (!targetUserId && email) {
      const { data: userByEmail } = await getSupabaseAdmin()
        .from('users')
        .select('id')
        .ilike('email', email)
        .maybeSingle();
      targetUserId = userByEmail?.id || null;
    }

    if (!targetUserId) {
      return NextResponse.json({ error: 'userId or email is required' }, { status: 400 });
    }

    const { data, error } = await getSupabaseAdmin()
      .from('placement_results')
      .select('id, test_id, test_name, score, total_questions, correct_answers, breakdown, message, completed_at, user_id')
      .eq('user_id', targetUserId)
      .order('completed_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching placement results:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const results = (data || []).map((r: any) => ({
      id: r.id,
      testId: r.test_id,
      testName: r.test_name,
      score: r.score,
      totalQuestions: r.total_questions,
      correctAnswers: r.correct_answers,
      breakdown: r.breakdown || {},
      message: r.message,
      completedAt: r.completed_at,
      userId: r.user_id
    }));

    return NextResponse.json({ results });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching placement results:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch placement results' }, { status: 500 });
  }
}
