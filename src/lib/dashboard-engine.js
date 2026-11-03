/* MentorMe dashboard engine v1 — illustrative rules, not validated psychometrics.
   Run on server or bundle as ES module. Do not expose student data publicly. */
export const SUBJECT_ALIASES = {
  maths:'Mathematics', math:'Mathematics', mathematics:'Mathematics',
  physics:'Physics', chemistry:'Chemistry', biology:'Biology', psychology:'Psychology',
  accounts:'Accounting', accountancy:'Accounting', accounting:'Accounting',
  economics:'Economics', 'business studies':'Business Studies', business:'Business Studies',
  'computer science':'Computer Science', computing:'Computer Science', computers:'Computer Science',
  ict:'ICT', 'information and communication technology':'ICT',
  it:'Information Technology', 'information technology':'Information Technology',
  english:'English', 'english language':'English', 'english literature':'English Literature',
  art:'Art & Design', 'art and design':'Art & Design', design:'Design & Technology',
  'design and technology':'Design & Technology', statistics:'Statistics'
};
const PATHWAYS = {
  'Science (PCM) / Engineering': {subjects:{Mathematics:0.40,Physics:0.35,Chemistry:0.15,'Computer Science':0.10}, required:['Mathematics','Physics'], careers:['Software Engineer','Cloud Architect','AI & Machine Learning Engineer']},
  'Science (PCB) / Health': {subjects:{Biology:0.45,Chemistry:0.35,Physics:0.20},required:['Biology','Chemistry'],careers:[]},
  'Commerce / Finance': {subjects:{Accounting:0.35,Economics:0.30,Mathematics:0.20,'Business Studies':0.15},required:[],careers:['Financial Analyst','Investment Banker','Actuary']},
  'Business / Management': {subjects:{'Business Studies':0.35,Economics:0.25,Mathematics:0.20,English:0.20},required:[],careers:['Product Manager','Business Analyst']},
  'Computing / Data': {subjects:{Mathematics:0.45,'Computer Science':0.35,ICT:0.10,'Information Technology':0.10},required:['Mathematics'],careers:['Data Scientist','Software Engineer','AI & Machine Learning Engineer','Cybersecurity Specialist','Cloud Architect']},
  'Creative / Design': {subjects:{'Art & Design':0.40,'Design & Technology':0.30,English:0.15,ICT:0.15},required:[],careers:[]},
  'Psychology / Social Sciences': {subjects:{Psychology:0.50,Biology:0.20,English:0.20,Mathematics:0.10},required:[],careers:[]}
};
const CAREER_PATH = {
 'Product Manager':'Business / Management','Business Analyst':'Business / Management',
 'Investment Banker':'Commerce / Finance','Financial Analyst':'Commerce / Finance','Actuary':'Commerce / Finance',
 'Data Scientist':'Computing / Data','Software Engineer':'Computing / Data',
 'AI & Machine Learning Engineer':'Computing / Data','Cybersecurity Specialist':'Computing / Data',
 'Cloud Architect':'Computing / Data'
};
const clamp = n => Math.max(0,Math.min(100,n));
const round = n => Math.round(n);
function normalizeSubject(s){return SUBJECT_ALIASES[String(s).trim().toLowerCase()] || String(s).trim();}
function validateMarks(rows){
 if(!Array.isArray(rows)) throw Error('marks must be an array');
 const out=new Map();
 for(const r of rows){
  if(!r || !r.subject) throw Error('Missing subject');
  const subject=normalizeSubject(r.subject);
  if(out.has(subject)) throw Error('Duplicate subject: '+subject);
  const obtained=Number(r.obtained),maximum=Number(r.maximum);
  if(!Number.isFinite(obtained)||!Number.isFinite(maximum)||maximum<=0||obtained<0||obtained>maximum) throw Error('Invalid marks for '+subject);
  if(r.gradeOnly) throw Error('Grade-only input needs approved conversion for '+subject);
  out.set(subject,{subject,percent:round(100*obtained/maximum),obtained,maximum,stage:r.stage||null,exam:r.exam||null});
 }
 return out;
}
function pathwayReadiness(path, marks){
 let numerator=0, denominator=0, present=[];
 for(const [subject,weight] of Object.entries(path.subjects)){
  const m=marks.get(subject); if(m){numerator+=m.percent*weight;denominator+=weight;present.push({subject,percent:m.percent,weight});}
 }
 const missing=Object.keys(path.subjects).filter(s=>!marks.has(s));
 const missingRequired=path.required.filter(s=>!marks.has(s));
 return {score:denominator?round(numerator/denominator):null,coverage:round(denominator*100),subjects:present,missing,missingRequired,
  status:!denominator?'insufficient-data':missingRequired.length?'verify-required-subjects':denominator<0.65?'partial-data':'provisional'};
}
function psychometricForPath(pathName, report){
 const careers=[...(report.top5Careers||[]),...(report.goodFitCareers||[])];
 const matched=careers.filter(c=>CAREER_PATH[c.title]===pathName && Number.isFinite(Number(c.score)));
 if(matched.length) return round(Math.max(...matched.map(c=>clamp(Number(c.score)))));
 return null;
}
export function buildDashboard({studentId,report,marks,stage='IGCSE',weights={academic:0.60,psychometric:0.40}}){
 if(!studentId || !report || !Array.isArray(marks)) throw Error('studentId, report and marks required');
 if(Math.abs(weights.academic+weights.psychometric-1)>0.00001) throw Error('Weights must sum to 1');
 const normalized=validateMarks(marks);
 const pathways=Object.entries(PATHWAYS).map(([name,path])=>{
  const academic=pathwayReadiness(path,normalized),personality=psychometricForPath(name,report);
  const combined=academic.coverage>=65 && !academic.missingRequired.length && personality!==null
   ?round(weights.academic*academic.score+weights.psychometric*personality):null;
  return {name,academic,personality,combined};
 }).sort((a,b)=>(b.combined??-1)-(a.combined??-1));
 const careers=[...(report.top5Careers||[]),...(report.goodFitCareers||[])].map(c=>{
  const path=pathways.find(p=>p.name===CAREER_PATH[c.title]);
  return {title:c.title,cluster:c.cluster||'',psychometricMatch:Number.isFinite(Number(c.score))?clamp(Number(c.score)):null,
   academicFit:path?.academic.score??null,academicCoverage:path?.academic.coverage??0,
   combinedFit:path?.combined??null,academicStatus:path?.academic.status||'unmapped-career',pathway:path?.name||null};
 }).sort((a,b)=>(b.combinedFit??-1)-(a.combinedFit??-1));
 const eligible=pathways.filter(p=>p.combined!==null);
 const chosen=eligible[0]||null;
 const focus=chosen?.academic.subjects.filter(s=>s.percent<70).sort((a,b)=>a.percent-b.percent)||[];
 const recommendations=[];
 if(!marks.length) recommendations.push('Upload subject-wise academic marks to calculate academic readiness.');
 if(!chosen) recommendations.push('Insufficient mapped evidence to recommend a stream; counsellor review required.');
 if(chosen){
  recommendations.push('Explore '+chosen.name+' based on current academic evidence and psychometric interests; confirm subject prerequisites with the school.');
  for(const s of focus.slice(0,2)) recommendations.push('Strengthen '+s.subject+' through targeted practice and reassessment.');
  if(chosen.academic.missing.length) recommendations.push('Check unavailable subject evidence: '+chosen.academic.missing.join(', ')+'.');
 }
 return {studentId,studentName:report.studentName||null,stage,
  recommendedStream:chosen?.name||null,subjectReadiness:chosen?.academic.score??null,
  personalityInterestAlignment:chosen?.personality??null,
  academicEvidenceCoverage:chosen?.academic.coverage??0,
  careerMatchIndex:careers,subjectScores:[...normalized.values()],pathways,
  counselorRecommendations:recommendations,reviewRequired:true,
  methodology:{weights,academicBasis:'weighted marks among available mapped subjects',psychometricBasis:'existing report career-match score',note:'Illustrative pathway mapping; not validated for admission eligibility or predictive accuracy.'}};
}

/** Convert the calculation into fields for MentorMe's EXISTING manual dashboard.
 * No HTML or screen is created. Values are null when evidence is insufficient.
 * Intentionally no careerClarityScore for grades 9-10.
 */
export function toExistingDashboardFields(result) {
  const recommended = result.pathways.find(p => p.name === result.recommendedStream);
  const strongest = [...result.subjectScores].sort((a,b)=>b.percent-a.percent);
  return {
    recommendedStream: result.recommendedStream,
    subjectReadiness: result.subjectReadiness,
    personalityInterestAlignment: result.personalityInterestAlignment,
    careerMatchIndex: result.careerMatchIndex.map(c=>({
      career: c.title, careerMatch: c.psychometricMatch,
      academicFit: c.academicCoverage >= 65 && c.academicStatus === 'provisional' ? c.academicFit : null,
      combinedFit: c.combinedFit, status: c.academicStatus,
      evidenceCoverage: c.academicCoverage
    })),
    counselorRecommendations: result.counselorRecommendations,
    subjectStrengths: strongest.slice(0,3).map(s=>({subject:s.subject,score:s.percent})),
    developmentSubjects: strongest.filter(s=>s.percent<70).slice(-3).map(s=>({subject:s.subject,score:s.percent})),
    academicEvidenceCoverage: result.academicEvidenceCoverage,
    missingRelevantSubjects: recommended?.academic.missing || [],
    reviewRequired: result.reviewRequired
  };
}

/** Supabase JS client adapter. Run on a server with an authenticated client.
 * Uses source-adapter to load from actual MentorMe tables.
 */
export async function loadAutomatedDashboard({
  supabase, studentId, authorizedStudentId,
  stage='IGCSE'
}) {
  if (!supabase || !studentId || !authorizedStudentId || studentId!==authorizedStudentId)
    throw new Error('Authenticated student authorization is required');
  const { loadStudentSources } = await import('./source-adapter.js');
  const source = await loadStudentSources(supabase, studentId);
  if (source.status !== 'ready') {
    return { status: source.status, dashboardData: null };
  }
  const fields = toExistingDashboardFields(buildDashboard({ studentId, report: source.report, marks: source.marks, stage: source.stage }));
  return { status: 'ready', dashboardData: fields, sourceReportId: source.reportId, sourceExamPeriod: source.period };
}
