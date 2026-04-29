import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { scoreAnswers, buildScoreSummary } from '@/lib/scoring';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { answers, audience } = await req.json();

    if (!answers || Object.keys(answers).length === 0) {
      return NextResponse.json({ error: 'No assessment data provided' }, { status: 400 });
    }

    // Score all answers into parameter scores
    const scores = scoreAnswers(answers);
    const scoreSummary = buildScoreSummary(scores, audience || 'ST');


    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback Mock Logic if no API key is provided
    if (!apiKey) {
      console.log('No GEMINI_API_KEY found, returning mock report...');
      
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockReport = {
        clientName: "Alex Johnson",
        grade: "9",
        executiveSummary: "Alex, your assessment reveals a strong and focused technical profile — elite dual Numerical (8/10) and Verbal (8/10) aptitude, strong Administrative skills (7/10), solid Mechanical aptitude (6/10), and outstanding Emotional Intelligence (4.75/5). Your Skill Proficiency of 33/50 reflects a genuinely capable technical foundation.",
        coreStrengths: [
          { name: "Numerical Skills", score: 8.0, max: 10.0, desc: "Elite — directly powers banking and insurance (financial analysis and actuarial calculations)." },
          { name: "Verbal Skills", score: 8.0, max: 10.0, desc: "Elite — rare in finance profiles. Powers market research reporting and communication." },
          { name: "Administrative Skills", score: 7.0, max: 10.0, desc: "Strong — directly supports banking compliance documentation, rare and highly valued." },
          { name: "Mechanical Skills", score: 6.0, max: 10.0, desc: "Solid practical aptitude — supports fintech and technology systems understanding." },
          { name: "Emotional Intelligence", score: 4.75, max: 5.0, desc: "Highest personal quality and near-perfect. Outstanding interpersonal depth." }
        ],
        areasToDevelop: [
          { name: "Logical Skills", score: 4.0, max: 10.0, desc: "Most critical technical gap. Begin 15 minutes of daily logical reasoning practice." },
          { name: "Engagement", score: 2.75, max: 5.0, desc: "Build sustained focus through structured daily study routines." },
          { name: "Realistic", score: 0.0, max: 5.0, desc: "Build practical engagement through banking awareness visits and exploration." }
        ],
        careerInterests: [
          { name: "Investigative (Research & Analysis)", score: 2.0, max: 5.0, desc: "Joint primary driver — analytical curiosity directly powers market research and CFA analysis." },
          { name: "Enterprising (Leadership & Business)", score: 2.0, max: 5.0, desc: "Joint primary driver — developing business orientation aligns with banking and market research." }
        ],
        excellentFitCareers: [
          { title: "Banking and Insurance", salary: "5L to 35L+", desc: "Your elite Numerical (8/10), Administrative excellence (7/10), Verbal skills (8/10), Emotional Intelligence (4.75/5) align with banking." },
          { title: "Market Research Analyst", salary: "5L to 28L+", desc: "Your elite Verbal skills (8/10 for qualitative insight communication), Numerical aptitude (8/10 for quantitative data analysis)." },
          { title: "Investment and Wealth Management", salary: "8L to 80L+", desc: "Your elite Numerical (8/10), Verbal (8/10 for investment research communication), Administrative (7/10), Emotional Intelligence (4.75/5)." },
          { title: "Fintech", salary: "8L to 80L+", desc: "Your Numerical (8/10), Verbal (8/10 for product communication), Administrative (7/10), Mechanical (6/10)." }
        ],
        goodFitCareers: [
          { title: "Risk Analysis — FRM / ERM", salary: "8L to 65L+", desc: "Your Numerical (8/10), Administrative excellence (7/10), Verbal (8/10 for risk reporting)." },
          { title: "Chartered Accountant (CA)", salary: "8L to 60L+", desc: "India's most respected professional finance qualification — directly enables Banking Manager, Insurance Analyst, and CFO-track careers." }
        ],
        academicRoadmap: {
          recommendedStream: "Commerce with Mathematics",
          focusSubjects: "Mathematics (most critical), Accountancy, Economics",
          programmingNote: "Begin Python or R programming from Grade 9 — 15 minutes daily.",
          extraCurricular: "Finance or investment club, business case competition, school economics quiz."
        },
        educationPathways: {
          ugOptions: [
            { program: "B.Com (Hons.) with CA Foundation", duration: "3 Years + CA", leadsTo: "Banker, CA, Insurance Manager, Financial Controller, Risk Analyst, CFO Track" },
            { program: "BBA Finance / BBA Business Analytics", duration: "3-5 Years", leadsTo: "Market Research Analyst, Investment Analyst, Fintech Product Manager" },
            { program: "B.Sc. Statistics / Economics / Mathematics", duration: "3 Years", leadsTo: "Market Research Analyst, Quantitative Risk Analyst, Actuarial Analyst" }
          ],
          pgOptions: [
            { program: "CA (ICAI) — Chartered Accountancy", path: "India's most respected finance qualification; Banking Manager, Financial Controller, Auditor" },
            { program: "CFA Level I / II / III (CFAI)", path: "World's most respected investment qualification; portfolio management, equity research, wealth advisory" },
            { program: "MBA Finance / MBA Analytics", path: "Strategic finance, investment banking, fintech product management" }
          ]
        },
        entranceExams: [
          { exam: "CA Foundation (ICAI)", forTitle: "Chartered Accountancy", timeline: "Register in Grade 12; attempt post-Grade 12." },
          { exam: "IBPS PO / SBI PO", forTitle: "Public Sector Bank Probationary Officer", timeline: "Begin building the five IBPS sections from Grade 9." },
          { exam: "IPM-AT (IIM Indore / Rohtak)", forTitle: "Integrated BBA + MBA at IIMs", timeline: "Begin quantitative and verbal preparation from Grade 11." }
        ],
        recommendedColleges: [
          { institution: "ICAI (Institute of Chartered Accountants of India)", location: "Pan India", program: "CA Foundation / Intermediate / Final" },
          { institution: "Shri Ram College of Commerce (SRCC) / Miranda House", location: "New Delhi", program: "B.Com (Hons.) / BA Economics" },
          { institution: "Ashoka University / FLAME University", location: "Sonipat / Pune", program: "BA Economics / BA Finance" },
          { institution: "IIM Indore (IPM Programme)", location: "Indore", program: "Integrated BBA + MBA" }
        ],
        nextSteps: [
          "Application guidance, SOP support, and interview preparation",
          "Complete admission support for colleges in India and abroad",
          "Financial planning and scholarship opportunities",
          "Stream and subject selection clarity"
        ]
      };

      return NextResponse.json({ report: mockReport });
    }

    // Real API Call using Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `
You are an elite career intelligence counselor at MentorMe (mentormeright.in).
A student/professional has completed a 90-question psychometric assessment.

Here are their SCORED results across all 17 parameters:

${scoreSummary}

Based STRICTLY on these scores, generate a detailed, personalised career intelligence report in JSON format.
Use the scores to determine realistic skill ratings, career fits, and development areas.
High scores (>75%) = strength. Medium (50-75%) = moderate. Low (<50%) = develop.
Top RIASEC traits drive career recommendations. Top skill scores confirm those careers.

Return ONLY valid JSON with this structure:
{
  "executiveSummary": "3-4 sentences personalised overview based on their actual scores",
  "coreStrengths": [
    { "name": "...", "score": number, "max": number, "desc": "why this is a strength based on their score" }
  ],
  "areasToDevelop": [
    { "name": "...", "score": number, "max": number, "desc": "specific actionable advice to improve" }
  ],
  "careerInterests": [
    { "name": "...", "score": number, "max": number, "desc": "how this RIASEC trait shapes their career fit" }
  ],
  "excellentFitCareers": [
    { "title": "...", "salary": "Indian salary range", "desc": "why this career fits their specific scores" }
  ],
  "goodFitCareers": [
    { "title": "...", "salary": "Indian salary range", "desc": "..." }
  ],
  "academicRoadmap": {
    "recommendedStream": "...",
    "focusSubjects": "...",
    "programmingNote": "...",
    "extraCurricular": "..."
  },
  "educationPathways": {
    "ugOptions": [ { "program": "...", "duration": "...", "leadsTo": "..." } ],
    "pgOptions": [ { "program": "...", "path": "..." } ]
  },
  "entranceExams": [
    { "exam": "...", "forTitle": "...", "timeline": "..." }
  ],
  "recommendedColleges": [
    { "institution": "...", "location": "India", "program": "..." }
  ],
  "nextSteps": [ "...", "..." ]
}

Do not return any markdown. Return strictly valid JSON only.
    `;

    const result = await model.generateContent(prompt);

    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown blocks if the model wrapped it
    const cleanJson = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    return NextResponse.json({ report: JSON.parse(cleanJson) });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error generating report:', err);
    return NextResponse.json({ error: err.message || 'Failed to generate report' }, { status: 500 });
  }
}
