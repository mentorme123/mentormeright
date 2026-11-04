// EDIT THIS FILE to match your ACTUAL MentorMe Supabase table and column names.
// The worker runs server-side with service role; never import it in client components.
// Actual schema: career reports live in assessment_results (user_id, report JSONB, created_at).
// Academic marks live in academic_marks (student_id, subject, marks_obtained, maximum_marks, stage, exam_period, created_at).
// Student grade is read from users.education_level (format: "Class 9", "Class 10", "Class 11", "Class 12").
export const SOURCE = {
  reportTable: 'assessment_results',
  reportStudentId: 'user_id',
  reportJson: 'report',
  reportId: 'id',
  reportCreated: 'created_at',
  marksTable: 'academic_marks',
  marksStudentId: 'student_id',
  marksSubject: 'subject',
  marksObtained: 'marks_obtained',
  marksMaximum: 'maximum_marks',
  marksStage: 'stage',
  marksPeriod: 'exam_period',
  marksDate: 'created_at',
  studentTable: 'users',
  studentKey: 'id',
  studentGrade: 'education_level'
};

// Map existing report.topPassion to a dashboard pathway for psychometric matching.
const PASSION_TO_PATHWAY = {
  Artistic: 'Creative / Design',
  Social: 'Psychology / Social Sciences',
  Realistic: 'Computing / Data',
  Enterprising: 'Business / Management',
  Conventional: 'Commerce / Finance',
  Investigative: 'Science (PCM) / Engineering'
};

const PATHWAY_CAREERS = {
  'Science (PCM) / Engineering': ['Software Engineer', 'Cloud Architect', 'AI & Machine Learning Engineer'],
  'Science (PCB) / Health': [],
  'Commerce / Finance': ['Financial Analyst', 'Investment Banker', 'Actuary'],
  'Business / Management': ['Product Manager', 'Business Analyst'],
  'Computing / Data': ['Data Scientist', 'Software Engineer', 'AI & Machine Learning Engineer', 'Cybersecurity Specialist', 'Cloud Architect'],
  'Creative / Design': [],
  'Psychology / Social Sciences': []
};

function careersForPathway(pathway, score) {
  return (PATHWAY_CAREERS[pathway] || []).map(title => ({ title, score, cluster: pathway }));
}

export function convertLegacyReport(report) {
  if (!report || typeof report !== 'object') {
    return { top5Careers: [], goodFitCareers: [] };
  }
  const topPassion = report.topPassion;
  const pathway = PASSION_TO_PATHWAY[topPassion] || 'Science (PCM) / Engineering';
  const score = report.overall != null ? Math.round(Number(report.overall)) : 70;
  const top5Careers = careersForPathway(pathway, score);
  const goodFitCareers = [];
  return { top5Careers, goodFitCareers };
}

function parseGrade(educationLevel) {
  if (!educationLevel) return null;
  const match = String(educationLevel).match(/class\s*(\d+)/i);
  return match ? parseInt(match[1], 10) : null;
}

export async function loadStudentSources(supabase, studentId) {
  const s = SOURCE;
  const [r, m, student] = await Promise.all([
    supabase.from(s.reportTable).select('*').eq(s.reportStudentId, studentId)
      .order(s.reportCreated, { ascending: false }).limit(1).maybeSingle(),
    supabase.from(s.marksTable).select('*').eq(s.marksStudentId, studentId)
      .order(s.marksDate, { ascending: false }).limit(2000),
    supabase.from(s.studentTable).select('*').eq(s.studentKey, studentId).maybeSingle()
  ]);
  if (student.error) throw student.error;
  const grade = parseGrade(student.data?.[s.studentGrade]);
  if (![9,10,11,12].includes(grade)) throw new Error('Missing/invalid student grade (9–12) in user profile');
  if (r.error) throw r.error;
  if (m.error) throw m.error;
  if (!r.data) return { status: 'awaiting_report', report: null, marks: [], reportId: null, period: null, grade };
  const rawReport = r.data[s.reportJson];
  const report = convertLegacyReport(rawReport);
  if (!report || !Array.isArray(report.top5Careers)) {
    throw new Error('Career report must contain saved structured career data');
  }
  if (!m.data?.length) return { status: 'awaiting_marks', report, marks: [], reportId: String(r.data[s.reportId]), period: null, grade };

  // Use only the most recently saved reporting period, never mix exams.
  // Your admin upload must give every row of the same exam a shared exam_period.
  const latest = m.data[0];
  const period = latest[s.marksPeriod];
  const stage = latest[s.marksStage];
  if (!period || !stage) throw new Error('Marks need exam_period and stage to avoid mixing exams');
  const chosen = m.data.filter(x => x[s.marksPeriod] === period && x[s.marksStage] === stage);
  const marks = chosen.map(x => ({
    subject: x[s.marksSubject], obtained: x[s.marksObtained], maximum: x[s.marksMaximum], stage
  }));
  return { status: 'ready', report, marks, stage, reportId: String(r.data[s.reportId]), period: String(period), grade, examTracking: null, profileEvidence: null };
}
