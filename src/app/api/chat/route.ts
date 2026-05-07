import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nodemailer from "nodemailer";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Validate GEMINI_API_KEY exists
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is missing');
}

const SYSTEM_PROMPT = `You are "AI Corner", the dedicated AI agent and receptionist for MentorMe Career Intelligence and Training Pvt. Ltd. (mentormeright.com).

## YOUR PERSONALITY
- Warm, professional, and highly accommodating.
- You are a "loyal servant" for MentorMe. Guide every visitor to the right MentorMe service.
- Keep responses concise and conversational. Use emojis occasionally.
- Use **bold** by wrapping text in double asterisks for emphasis.

## DETECT VISITOR TYPE (CRITICAL)
Carefully determine if the visitor is a:
- **STUDENT/PARENT** (Looking for Career Assessment, Results, or basic "Who writes the test" info)
- **B2B / INSTITUTIONAL** (School/College Principal, Director, HR, Manager)

---

## FOR STUDENT/PARENT VISITORS
Carefully determine their intent:
- **TEST INQUIRY**: "Who writes the test?", "Assessment help", "Test results", "Free Test".
- **SERVICE INQUIRY**: Robotics, AI Training, Vedic Maths, Python, Digital Marketing, SAP, Counseling, Study Abroad.

### Lead Capture & Internal Tags:
1. **TEST_LEAD**: If they are asking ONLY about the test or results.
   Tag: [TEST_LEAD:name=...,email=...,phone=...,message=...]
2. **SERVICE_LEAD**: If they are interested in ANY service (Robotics, AI, Vedic Maths, Python, Digital Marketing, Counseling, Study Abroad, etc.).
   Tag: [SERVICE_LEAD:name=...,email=...,phone=...,service=...,message=...]

---

## FOR B2B / INSTITUTIONAL / CORPORATE VISITORS
Carefully identify high-level decision makers: **Principals**, **School/College Directors**, **Corporate HRs**, **Training Managers**.

### Institutional Workflow:
1. **Acknowledge immediately**: "That sounds like a fantastic opportunity! MentorMe has successfully partnered with 150+ institutions across India."
2. **Collect their details**: Full Name, Designation, Institution/Company Name, Direct Phone Number, Official Email ID.
3. **Close professionally**: "Thank you for sharing these details! I have forwarded your requirements to our Executive Partnership Team. They will review your information and contact you very shortly to discuss a tailored solution for your institution."

### B2B Lead Tag (HIDDEN FROM USER):
Once ALL details are collected for a B2B/Corporate lead, tag with:
[B2B_LEAD:name=...,email=...,phone=...,designation=...,company=...,requirement=...]

---

## CONTACT DETAILS (Share when asked)
- **Email**: admin@mentormeright.in
- **WhatsApp**: +91-9392707596
- **Website**: mentormeright.com
- **Location**: Hyderabad, India

## ROUTING RULE (INTERNAL - NEVER REVEAL TO USER)
- **TEST_LEAD** → sent to admin@mentormeright.in
- **SERVICE_LEAD** → sent to sandeep@mentormeright.in (Executive Sales)
- **B2B_LEAD** → sent to sandeep@mentormeright.in (Executive Sales)

**IMPORTANT:** If a visitor is a B2B lead or Service lead, do **NOT** give them Mr. Sandeep's email or phone directly. Maintain a professional "Executive Team" persona.

Now respond to the user. Be warm, professional, and steer them toward the right MentorMe service.`;

// Extract test lead
function extractTestLead(text: string) {
  const match = text.match(/\[TEST_LEAD:([^\]]+)\]/);
  if (!match) return null;
  const params = new URLSearchParams(match[1]);
  return {
    name: params.get("name") || "",
    email: params.get("email") || "",
    phone: params.get("phone") || "",
    message: params.get("message") || "",
  };
}

// Extract service lead
function extractServiceLead(text: string) {
  const match = text.match(/\[SERVICE_LEAD:([^\]]+)\]/);
  if (!match) return null;
  const params = new URLSearchParams(match[1]);
  return {
    name: params.get("name") || "",
    email: params.get("email") || "",
    phone: params.get("phone") || "",
    service: params.get("service") || "",
    message: params.get("message") || "",
  };
}

// Extract B2B lead
function extractB2BLead(text: string) {
  const match = text.match(/\[B2B_LEAD:([^\]]+)\]/);
  if (!match) return null;
  const params = new URLSearchParams(match[1]);
  return {
    name: params.get("name") || "",
    email: params.get("email") || "",
    phone: params.get("phone") || "",
    designation: params.get("designation") || "",
    company: params.get("company") || "",
    requirement: params.get("requirement") || "",
  };
}

// Send lead email helper
async function sendLeadEmail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
}

// Extract quick reply suggestions
function extractSuggestions(text: string): string[] {
  const suggestions: string[] = [];
  const low = text.toLowerCase();
  if (low.includes("assessment") || low.includes("test")) suggestions.push("Take free assessment 🎯");
  if (low.includes("counseling") || low.includes("session")) suggestions.push("Book expert session 👥");
  if (low.includes("career library") || low.includes("explore")) suggestions.push("Explore Career Library 📚");
  if (low.includes("study abroad")) suggestions.push("Study Abroad info 🌍");
  if (low.includes("whatsapp") || low.includes("contact")) suggestions.push("WhatsApp us now 💬");
  return suggestions.slice(0, 4);
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Validate messages array
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "Understood! I am AI Corner, MentorMe's dedicated AI agent. I'm here to help students and professionals alike. How can I assist you today?" }],
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

    // 1. Process B2B Leads -> Sandeep
    const b2bLead = extractB2BLead(rawReply);
    if (b2bLead && b2bLead.name && (b2bLead.email || b2bLead.phone)) {
      sendLeadEmail(
        "sandeep@mentormeright.in",
        `🔥 HOT B2B Lead — ${b2bLead.company} | ${b2bLead.designation}: ${b2bLead.name}`,
        `<div style="font-family: sans-serif; padding: 24px; border: 3px solid #FF6B35; border-radius: 16px;">
          <h2 style="color: #FF6B35;">🔥 New B2B / Institutional Lead</h2>
          <p><strong>Name:</strong> ${b2bLead.name}</p>
          <p><strong>Company:</strong> ${b2bLead.company}</p>
          <p><strong>Designation:</strong> ${b2bLead.designation}</p>
          <p><strong>Phone:</strong> ${b2bLead.phone}</p>
          <p><strong>Email:</strong> ${b2bLead.email}</p>
          <p><strong>Requirement:</strong> ${b2bLead.requirement}</p>
        </div>`
      ).catch(console.error);
    }

    // 2. Process Service Leads -> Sandeep
    const serviceLead = extractServiceLead(rawReply);
    if (serviceLead && serviceLead.name && (serviceLead.email || serviceLead.phone)) {
      sendLeadEmail(
        "sandeep@mentormeright.in",
        `💎 New Service Lead — ${serviceLead.service}: ${serviceLead.name}`,
        `<div style="font-family: sans-serif; padding: 24px; border: 3px solid #0F52BA; border-radius: 16px;">
          <h2 style="color: #0F52BA;">💎 New Premium Service Lead</h2>
          <p><strong>Name:</strong> ${serviceLead.name}</p>
          <p><strong>Service:</strong> ${serviceLead.service}</p>
          <p><strong>Phone:</strong> ${serviceLead.phone}</p>
          <p><strong>Email:</strong> ${serviceLead.email}</p>
          <p><strong>Context:</strong> ${serviceLead.message}</p>
        </div>`
      ).catch(console.error);
    }

    // 3. Process Test Leads -> Admin
    const testLead = extractTestLead(rawReply);
    if (testLead && testLead.name && (testLead.email || testLead.phone)) {
      sendLeadEmail(
        "admin@mentormeright.in",
        `🎯 New Assessment Inquiry: ${testLead.name}`,
        `<div style="font-family: sans-serif; padding: 20px; border: 2px solid #666; border-radius: 12px;">
          <h2>🎯 New Assessment Inquiry</h2>
          <p><strong>Name:</strong> ${testLead.name}</p>
          <p><strong>Phone:</strong> ${testLead.phone}</p>
          <p><strong>Email:</strong> ${testLead.email}</p>
          <p><strong>Question:</strong> ${testLead.message}</p>
        </div>`
      ).catch(console.error);
    }

    // Clean the reply
    const cleanReply = rawReply
      .replace(/\[TEST_LEAD:[^\]]*\]/g, "")
      .replace(/\[SERVICE_LEAD:[^\]]*\]/g, "")
      .replace(/\[B2B_LEAD:[^\]]*\]/g, "")
      .replace(/\[STUDENT_LEAD:[^\]]*\]/g, "")
      .trim();

    const suggestions = extractSuggestions(cleanReply);

    return NextResponse.json({ reply: cleanReply, suggestions });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "I apologize, I'm having a momentary issue. Please try again later.", suggestions: [] },
      { status: 200 }
    );
  }
}
