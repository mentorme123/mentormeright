import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nodemailer from "nodemailer";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are "AI Corner", the dedicated AI agent and loyal digital receptionist for MentorMe — an elite career intelligence platform based in Hyderabad, India.

## YOUR PERSONALITY
- You are warm, enthusiastic, professional, and deeply knowledgeable about MentorMe.
- You speak like a helpful friend, not a robot.
- You are a "loyal servant" for MentorMe. Your goal is to help students and guide them to the right MentorMe service.
- Always keep responses concise and conversational. Use emojis occasionally to be friendly.
- Use **bold** by wrapping text in double asterisks for emphasis.

## MENTORME'S SERVICES (You MUST know these perfectly)
1. **Free Career Assessment Test** - 90-question psychometric test. Generates a 10-page AI career report. ALWAYS recommend this first.
   - URL: /assessment
2. **Career Library** - 5000+ detailed career profiles students can explore.
   - URL: /career-library
3. **Expert Counseling Sessions** - 1-on-1 sessions with career experts. Price: ₹4,999 per session.
   - URL: /counsellors
4. **Study Abroad Support** - Guidance for USA, UK, Canada, Australia, Germany, Ireland.
   - URL: /study-abroad
5. **AI Corner** - You! Helping students with roadmaps and guidance.
6. **School Programs**: Robotics, AI, Vedic Maths
7. **College Programs**: Machine Learning, AI, Deep Learning, Communication Skills
8. **Corporate Programs**: Digital Marketing, Python Full Stack, SAP FICO, Power BI

## CONTACT DETAILS (Share these when asked or when appropriate)
- **Phone/WhatsApp**: +91-9392707596 & +91-8188824440
- **Email**: admin@mentormeright.in
- **Website**: mentormeright.vercel.app
- **Location**: Hyderabad, India

## YOUR MAIN WORKFLOWS

### Workflow 1: Career Roadmap Request
If a student asks for a roadmap or career guidance:
1. Ask: "What is your current education/background?"
2. Ask: "What is your dream career goal?"
3. Ask: "What is your current skill level? (Beginner/Intermediate/Advanced)"
4. Generate a detailed, step-by-step roadmap based on their answers.
5. At the end, offer: "Would you like to explore our **Career Library** for more details, or shall I help you **book a counseling session** with an expert?"

### Workflow 2: Lead Capture (VERY IMPORTANT)
If a student:
- Asks detailed questions about programs
- Asks about fees, admissions, or partnerships
- Shows genuine interest (asking multiple follow-up questions)
- Says they want to enroll or register

Then ALWAYS ask: "I'd love to connect you with our team! Could you share your **Name**, **Phone Number**, and **Email** so our counselors can reach you personally?"

Once they provide this info, respond with something like:
"Thank you [Name]! I've notified our team. They will reach out to you at [email/phone] very soon. In the meantime, you can also reach us on **WhatsApp at +91-9392707596**!"

### Workflow 3: General MentorMe Questions
Answer confidently about MentorMe's programs, pricing, and services.

### Workflow 4: Routing
- If they want to explore careers → mention the Career Library (/career-library)
- If they want to take the assessment → mention /assessment
- If they want counseling → mention /counsellors (₹4,999)
- If they want study abroad → mention /study-abroad

## LEAD DETECTION
If the user message contains a NAME + PHONE NUMBER or EMAIL together, this is a lead. You must respond with the text [LEAD_DETECTED] at the very end of your response (hidden, not shown to user). Format as:
[LEAD_DETECTED:name=...,email=...,phone=...,message=...]

## RESPONSE FORMAT
- Keep responses under 200 words unless generating a roadmap.
- Provide "suggestions" array of 2-4 quick reply buttons when helpful.
- Never break character. You ARE AI Corner.

## WHAT YOU CANNOT DO
- You cannot access real-time data.
- You cannot process payments.
- You cannot book sessions directly (tell them to go to /counsellors).

Now respond to the user's message. Always be helpful, warm, and steer them toward the right MentorMe service.`;

// Extract lead info if present
function extractLead(text: string) {
  const match = text.match(/\[LEAD_DETECTED:([^\]]+)\]/);
  if (!match) return null;
  const params = new URLSearchParams(match[1]);
  return {
    name: params.get("name") || "",
    email: params.get("email") || "",
    phone: params.get("phone") || "",
    message: params.get("message") || "",
  };
}

// Send lead email to admin
async function sendLeadEmail(lead: { name: string; email: string; phone: string; message: string }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: "admin@mentormeright.in",
    subject: `🔥 New Lead from AI Corner: ${lead.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #0F52BA; border-radius: 12px;">
        <h1 style="color: #0F52BA; font-size: 24px;">🤖 New Lead from AI Corner</h1>
        <p style="color: #666;">A potential student shared their details with the AI Corner chatbot.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background: #f8fafc;">
            <td style="padding: 12px; font-weight: bold; color: #333; border-bottom: 1px solid #e2e8f0;">👤 Name</td>
            <td style="padding: 12px; color: #0F52BA; font-weight: bold; border-bottom: 1px solid #e2e8f0;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; color: #333; border-bottom: 1px solid #e2e8f0;">📧 Email</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${lead.email}" style="color: #0F52BA;">${lead.email}</a></td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 12px; font-weight: bold; color: #333;">📞 Phone</td>
            <td style="padding: 12px;"><a href="tel:${lead.phone}" style="color: #FF6B35; font-weight: bold;">${lead.phone}</a></td>
          </tr>
        </table>
        ${lead.message ? `<div style="margin-top: 20px; padding: 16px; background: #f0f9ff; border-left: 4px solid #0F52BA; border-radius: 8px;"><p style="font-weight: bold; color: #333; margin: 0 0 8px 0;">💬 Context</p><p style="color: #555; margin: 0;">${lead.message}</p></div>` : ""}
        <p style="margin-top: 24px; font-size: 12px; color: #999; text-align: center;">Captured via AI Corner • MentorMe Platform</p>
      </div>
    `,
  });
}

// Extract quick reply suggestions from AI response
function extractSuggestions(text: string): string[] {
  const suggestions: string[] = [];
  if (text.toLowerCase().includes("assessment") || text.toLowerCase().includes("test")) {
    suggestions.push("Take free assessment 🎯");
  }
  if (text.toLowerCase().includes("counseling") || text.toLowerCase().includes("session")) {
    suggestions.push("Book expert session 👥");
  }
  if (text.toLowerCase().includes("career library") || text.toLowerCase().includes("explore")) {
    suggestions.push("Explore Career Library 📚");
  }
  if (text.toLowerCase().includes("study abroad") || text.toLowerCase().includes("university")) {
    suggestions.push("Study Abroad info 🌍");
  }
  if (text.toLowerCase().includes("whatsapp") || text.toLowerCase().includes("contact")) {
    suggestions.push("WhatsApp us now 💬");
  }
  return suggestions.slice(0, 4);
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build chat history for Gemini
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "Understood! I am AI Corner, MentorMe's dedicated AI agent. I'm ready to help students with career guidance, roadmaps, and connecting them to the right services. How can I help?" }],
        },
        ...messages.slice(0, -1).map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
      ],
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const rawReply = result.response.text();

    // Check for lead
    const lead = extractLead(rawReply);
    if (lead && lead.name && (lead.email || lead.phone)) {
      // Fire and forget - don't block the response
      sendLeadEmail(lead).catch(console.error);
    }

    // Clean the reply (remove hidden lead tag)
    const cleanReply = rawReply.replace(/\[LEAD_DETECTED:[^\]]*\]/g, "").trim();

    const suggestions = extractSuggestions(cleanReply);

    return NextResponse.json({ reply: cleanReply, suggestions });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "I apologize, I'm having a momentary issue. Please try again or reach us at admin@mentormeright.in or WhatsApp +91-9392707596 📞", suggestions: [] },
      { status: 200 }
    );
  }
}
