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
    const { data, error } = await getSupabaseAdmin()
      .from('placement_results')
      .select('id, test_id, test_name, score, total_questions, correct_answers, completed_at, user_id')
      .order('completed_at', { ascending: false });

    if (error) {
      console.error('Error fetching placement results:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const results = data || [];
    const userIds = Array.from(new Set(results.map((r: any) => r.user_id).filter(Boolean)));

    const userMap: Record<string, { name: string; email: string }> = {};
    if (userIds.length > 0) {
      const { data: usersData } = await getSupabaseAdmin()
        .from('users')
        .select('id, name, email')
        .in('id', userIds);
      (usersData || []).forEach((u: any) => {
        userMap[u.id] = { name: u.name || '', email: u.email || '' };
      });
    }

    const mapped = results.map((r: any) => ({
      id: r.id,
      testId: r.test_id,
      testName: r.test_name,
      score: r.score,
      totalQuestions: r.total_questions,
      correctAnswers: r.correct_answers,
      completedAt: r.completed_at,
      userId: r.user_id,
      userName: userMap[r.user_id]?.name || 'Guest User',
      userEmail: userMap[r.user_id]?.email || r.user_id
    }));

    return NextResponse.json({ results: mapped });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching placement results:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch placement results' }, { status: 500 });
  }
}
