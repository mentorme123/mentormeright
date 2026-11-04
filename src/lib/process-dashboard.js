import { buildDashboard, toExistingDashboardFields } from './dashboard-engine.js';
import { buildSeniorDashboard } from './senior-dashboard-engine.js';
import { loadStudentSources } from './source-adapter.js';

export async function processDashboardJob(supabase, job) {
  const { student_id: studentId, claim_token: claimToken } = job;
  try {
    const source = await loadStudentSources(supabase, studentId);
    const fields = source.status === 'ready'
      ? ([11,12].includes(Number(source.grade))
        ? buildSeniorDashboard({ studentId, report: source.report, marks: source.marks, grade: source.grade, examTracking: source.examTracking, profileEvidence: source.profileEvidence })
        : toExistingDashboardFields(buildDashboard({ studentId, report: source.report, marks: source.marks, stage: source.stage })))
      : null;
    const { data, error } = await supabase.rpc('finish_dashboard_job', {
      p_student_id: studentId, p_claim_token: claimToken, p_status: source.status,
      p_dashboard_data: fields, p_source_report_id: source.reportId,
      p_source_exam_period: source.period, p_error: null
    });
    if (error) throw error;
    return { studentId, status: data ? source.status : 'superseded' };
  } catch (err) {
    const { error } = await supabase.rpc('finish_dashboard_job', {
      p_student_id: studentId, p_claim_token: claimToken, p_status: 'error',
      p_dashboard_data: null, p_source_report_id: null, p_source_exam_period: null,
      p_error: String(err?.message || err)
    });
    return { studentId, status: 'error', message: error?.message || String(err?.message || err) };
  }
}
