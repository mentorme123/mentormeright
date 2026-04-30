import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { profile, goal, currentLevel } = await req.json();

    if (!profile || !goal) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an expert career counsellor and skill-development coach for MentorMe, a premium career guidance platform in India.
A user has provided the following information:
- Current Profile/Background: ${profile}
- Career Goal: ${goal}
- Current Level: ${currentLevel}

Please generate a highly personalized, step-by-step skill development roadmap for them.
Format the response in Markdown with the following sections:
1. **Executive Summary**: A brief, encouraging assessment of their goal.
2. **Core Skills to Acquire**: List 3-5 technical or hard skills they absolutely need.
3. **Soft Skills to Develop**: List 2-3 soft skills crucial for this role.
4. **Step-by-Step Action Plan**: A timeline (e.g., Months 1-2, Months 3-4) with actionable steps.
5. **Recommended Resources**: Mention types of certifications or platforms they should look into (e.g., Coursera, AWS Certifications, specific degree types).

Keep the tone professional, motivating, and highly practical. Do not use generic fluff.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ roadmap: text });
  } catch (error: any) {
    console.error("AI Corner Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to generate roadmap' }, { status: 500 });
  }
}
