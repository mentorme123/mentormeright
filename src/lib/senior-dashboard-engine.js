// Grade 11–12 dashboard calculations. Advisory indices only; not admissions eligibility.
import { SUBJECT_ALIASES } from './dashboard-engine.js';
const aliases = {'mechanical engineering':['mechanical engineer'], 'software engineering':['software engineer','software developer'], 'artificial intelligence':['ai & machine learning engineer','machine learning engineer','artificial intelligence engineer'], 'entrepreneurship':['entrepreneur','business owner'], 'data science':['data scientist']};
const requirements = {
  'Mechanical Engineering': {Mathematics:.45, Physics:.40, Chemistry:.15},
  'Software Engineering': {Mathematics:.55, 'Computer Science':.30, Physics:.15},
  'Artificial Intelligence': {Mathematics:.55, 'Computer Science':.30, Statistics:.15},
  'Entrepreneurship': {'Business Studies':.40, Economics:.30, Mathematics:.15, English:.15},
  'Data Science': {Mathematics:.45, Statistics:.30, 'Computer Science':.25},
};
const courses = {
  'Mechanical Engineering':'B.Tech / B.E.', 'Software Engineering':'B.Tech / B.Sc.',
  'Artificial Intelligence':'B.Tech / B.Sc.', 'Data Science':'B.Sc. / B.Tech',
  'Entrepreneurship':'BBA / B.Com'
};
const cap = x => Math.max(0,Math.min(100,x));
const avg = a => a.length ? Math.round(a.reduce((s,x)=>s+x,0)/a.length) : null;
function normal(s) { const k=String(s||'').trim().toLowerCase(); return SUBJECT_ALIASES[k]||String(s||'').trim(); }
function scores(rows) {
  const m=new Map();
  for(const r of rows){
    const key=normal(r.subject); if(!key) throw Error('Subject required');
    if(m.has(key)) throw Error('Duplicate marks for '+key+'; select one exam period');
    if(r.gradeOnly || r.obtained===null || r.obtained===undefined || r.maximum===null || r.maximum===undefined) throw Error('Numeric marks required; do not guess Cambridge grade conversion');
    const n=Number(r.obtained),d=Number(r.maximum);
    if(!Number.isFinite(n)||!Number.isFinite(d)||d<=0||n<0||n>d) throw Error('Invalid marks for '+key);
    m.set(key,Math.round(100*n/d));
  }
  return m;
}
function reportCareers(report){return [...(report.top5Careers||[]),...(report.goodFitCareers||[])];}
function matchCareer(label,report){
  const candidates=[label.toLowerCase(),...(aliases[label.toLowerCase()]||[])];
  const found=reportCareers(report).find(c=>candidates.includes(String(c.title||'').trim().toLowerCase()));
  const score=found?.score;
  return score===null||score===undefined||score===''||!Number.isFinite(Number(score))?null:Math.round(cap(Number(score)));
}
function academicPath(weights, marks){
  const pairs=Object.entries(weights), present=pairs.filter(([s])=>marks.has(s));
  const coverage=Math.round(100*present.reduce((n,[,w])=>n+w,0));
  const academic=present.length?Math.round(present.reduce((n,[s,w])=>n+marks.get(s)*w,0)/present.reduce((n,[,w])=>n+w,0)):null;
  return {academic,coverage,missing:pairs.filter(([s])=>!marks.has(s)).map(([s])=>s)};
}
/** No exam tracking or profile activities are fabricated from psychometric or marks data. */
export function buildSeniorDashboard({studentId,report,marks,grade,examTracking=null,profileEvidence=null,weights={academic:.6,psychometric:.4}}){
  if(!studentId || !report || !Array.isArray(report.top5Careers) || !Array.isArray(marks)) throw Error('Student, saved career report and marks required');
  if(![11,12].includes(Number(grade))) throw Error('Grade 11 or 12 required');
  if(Math.abs(weights.academic+weights.psychometric-1)>0.00001) throw Error('Weights must sum to 1');
  const subject=scores(marks);
  const academicFitness=[...subject].map(([name,score])=>({subject:name,score}));
  const readiness=Object.entries(requirements).map(([career,req])=>{
    const a=academicPath(req,subject),psychometricMatch=matchCareer(career,report);
    const enough=a.coverage>=70 && psychometricMatch!==null;
    return {career,score:enough?Math.round(weights.academic*a.academic+weights.psychometric*psychometricMatch):null,academicFit:a.academic,psychometricMatch,coverage:a.coverage,missingSubjects:a.missing,status:enough?'provisional':'insufficient-evidence'};
  });
  // Only the career paths grounded in the report are eligible for a target course.
  const ranked=readiness.filter(r=>r.score!==null).sort((a,b)=>b.score-a.score);
  const selected=ranked[0]||null;
  const overallAcademicFit=selected?.academicFit??null;
  // Profile strength requires separate evidence of activities, achievements, projects etc.
  // Do not relabel a psychometric match as a profile-strength score.
  const profileStrengthScore=profileEvidence?.validatedScore!==undefined && profileEvidence?.validatedScore!==null && Number.isFinite(Number(profileEvidence.validatedScore)) ? Math.round(cap(Number(profileEvidence.validatedScore))) : null;
  const careerReadinessScore=selected?.score??null;
  const targetCourse=selected?courses[selected.career]:null;
  const weak=academicFitness.filter(s=>s.score<70).sort((a,b)=>a.score-b.score);
  const counselorRecommendations=[];
  if(!selected) counselorRecommendations.push('Career readiness needs more subject and career-report evidence; request counsellor review.');
  else counselorRecommendations.push('Explore '+selected.career+' and confirm subject prerequisites and course eligibility with institutions.');
  for(const s of weak.slice(0,2)) counselorRecommendations.push('Improve '+s.subject+' through structured practice.');
  if(profileStrengthScore===null) counselorRecommendations.push('Add verified projects, activities and achievements before calculating profile strength.');
  if(examTracking===null) counselorRecommendations.push('Entrance exam tracking has not been provided.');
  return {studentId,grade,overallAcademicFit,profileStrengthScore,careerReadinessScore,targetCourse,academicFitness,careerPathReadiness:readiness,counselorRecommendations,entranceExamTracking:examTracking,reviewRequired:true,methodology:{weights,minimumCoverage:70,note:'Provisional academic/career alignment; profile strength requires independent verified evidence. Not an admission probability.'}};
}
