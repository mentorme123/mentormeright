import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { mapAssessmentToReportGenerator } from '@/lib/report-generator-mapper';
import { ParameterScores } from '@/lib/scoring';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: assessment } = await supabaseAdmin
      .from('assessment_results')
      .select('scores, answers, completed_at')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: user } = await supabaseAdmin
      .from('users')
      .select('name, email, education_level, audience_type, phone, gender, country, state')
      .eq('id', userId)
      .single();

    if (!assessment || !assessment.scores) {
      return NextResponse.json({ error: 'No assessment found' }, { status: 404 });
    }

    const reportData = mapAssessmentToReportGenerator(
      assessment.scores as ParameterScores,
      user?.name || user?.email?.split('@')[0] || 'Student',
      user?.education_level || 'N/A',
      user?.education_level || '',
      new Date(assessment.completed_at).toISOString().split('T')[0],
      [],
      '',
      ''
    );

    return NextResponse.json({
      report: reportData,
      user: user,
      completedAt: assessment.completed_at,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching mapped report:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch report' }, { status: 500 });
  }
}
