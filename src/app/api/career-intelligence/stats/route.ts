import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: { autoRefreshToken: false, persistSession: false },
      }
    );

    const { count: totalStudents } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true });

    const { count: completedAssessments } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true })
      .not('assessment_completed_at', 'is', null);

    const { count: paidStudents } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('has_paid_report', true);

    return NextResponse.json({
      totalStudents: totalStudents || 0,
      completedAssessments: completedAssessments || 0,
      paidStudents: paidStudents || 0,
    });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || 'Failed to load stats.' }, { status: 500 });
  }
}
