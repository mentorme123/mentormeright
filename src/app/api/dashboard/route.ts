import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !anonKey) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    // Get the logged-in user from the Authorization header (anon client)
    const authHeader = req.headers.get('authorization') || '';
    const supabase = createClient(supabaseUrl, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const studentId = user.id;
    const admin = getSupabaseAdmin();

    const { data, error } = await admin
      .from('student_dashboard_results')
      .select('status, dashboard_data, source_report_id, source_exam_period, error_message, calculated_at, updated_at')
      .eq('student_id', studentId)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({
        status: 'pending',
        dashboardData: null,
        message: 'Dashboard calculation not yet available. It will be processed automatically.'
      });
    }

    return NextResponse.json({
      status: data.status,
      dashboardData: data.dashboard_data,
      sourceReportId: data.source_report_id,
      sourceExamPeriod: data.source_exam_period,
      errorMessage: data.error_message,
      calculatedAt: data.calculated_at,
      updatedAt: data.updated_at
    });
  } catch (err: unknown) {
    const e = err as Error;
    return NextResponse.json({ error: e.message || 'Failed to load dashboard' }, { status: 500 });
  }
}
