import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    console.log('Fetching scores for userId:', userId);

    const { data, error } = await supabaseAdmin
      .from('assessment_results')
      .select('scores, answers, completed_at, report')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user scores:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data?.scores) {
      console.log('No assessment found for userId:', userId);
      return NextResponse.json({ error: 'No assessment found for this user' }, { status: 404 });
    }

    const { data: user } = await supabaseAdmin
      .from('users')
      .select('name, education_level')
      .eq('id', userId)
      .maybeSingle();

    console.log('Found assessment for userId:', userId, 'user:', user?.name || 'unknown');

    return NextResponse.json({ 
      scores: data.scores,
      completedAt: data.completed_at,
      userName: user?.name || null,
      userClass: user?.education_level || null,
      subjects: data.report?.subjects || []
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching user scores:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch scores' }, { status: 500 });
  }
}
