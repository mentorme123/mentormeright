import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { scoreAnswers, buildScoreSummary } from '@/lib/scoring';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const { answers, audience, userName, userId } = await req.json();

    if (!answers || Object.keys(answers).length === 0) {
      return NextResponse.json({ error: 'No assessment data provided' }, { status: 400 });
    }

    // Score all answers into parameter scores
    const scores = scoreAnswers(answers);
    const scoreSummary = buildScoreSummary(scores, audience || 'ST');

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'System configuration error: API key missing.' }, { status: 500 });
    }

    // Real API Call using Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Use flash for speed, or pro for depth

    const clientName = userName || 'Student';

    const prompt = `
You are an elite career intelligence counselor at MentorMe (mentormeright.in).
A client named "${clientName}" has completed a 90-question psychometric assessment.

Here are ${clientName}'s SCORED results across all 17 parameters:

${scoreSummary}

Based STRICTLY on these scores, generate a detailed, personalised career intelligence report in JSON format for ${clientName}.
Use the scores to determine realistic skill ratings, career fits, and development areas.
High scores (>75%) = strength. Medium (50-75%) = moderate. Low (<50%) = develop.
Top RIASEC traits drive career recommendations. Top skill scores confirm those careers.

Return ONLY valid JSON with this structure:
{
  "clientName": "${clientName}",
  "grade": "N/A",
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
    const reportData = JSON.parse(cleanJson);

    // Save report to database securely
    if (userId) {
       // We must use service role key to bypass RLS if doing it server-side, or use the client's token
       // Since this is an API route, we can initialize a server client.
       const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
       const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
       const supabase = createClient(supabaseUrl, supabaseKey);

       await supabase.from('assessment_results').insert({
         user_id: userId,
         answers: answers,
         scores: scores,
         report: reportData,
         audience_type: audience || 'ST',
         completed_at: new Date().toISOString()
       });
    }
    
    return NextResponse.json({ report: reportData });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error generating report:', err);
    return NextResponse.json({ error: err.message || 'Failed to generate report' }, { status: 500 });
  }
}
