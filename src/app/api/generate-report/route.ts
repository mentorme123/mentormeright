import { NextRequest, NextResponse } from 'next/server';
import { scoreAnswers, buildScoreSummary } from '@/lib/scoring';
import { createClient } from '@supabase/supabase-js';
import { generateWithRetry } from '@/lib/gemini';

export const maxDuration = 60; // Attempt to increase duration if they are on Pro
// export const runtime = 'edge'; // Optional: Use edge if needed, but standard usually works best with large libraries unless timeout is hit

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

    const clientName = userName ? String(userName).slice(0, 100).replace(/[<>]/g, '') : 'Student';

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

    // Real API Call using Gemini with retry logic
    let text;
    try {
      text = await generateWithRetry(prompt, 'gemini-2.0-flash');
    } catch (err: any) {
      console.error('Gemini generation failed after retries:', err);
      if (err.message && (err.message.includes('429') || err.message.includes('quota') || err.message.includes('exhausted'))) {
        return NextResponse.json(
          { error: 'Our AI servers are currently experiencing high traffic. Please wait 1 minute and try submitting again.' }, 
          { status: 429 }
        );
      }
      throw err;
    }
    
    // Clean up potential markdown blocks if the model wrapped it
    const cleanJson = text.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    
    let reportData;
    try {
      reportData = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("Failed to parse JSON from Gemini:", parseError, text);
      return NextResponse.json({ error: 'AI generated invalid data. Please try again.' }, { status: 500 });
    }

    // Save report to database securely
    if (userId) {
       // We must use service role key to bypass RLS if doing it server-side, or use the client's token
       const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
       const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

       if (!supabaseUrl || !supabaseKey) {
         console.error('Supabase environment variables missing');
         return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
       }

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

