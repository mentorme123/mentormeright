import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nodemailer from "nodemailer";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are "AI Corner", the dedicated AI agent and receptionist for MentorMe Career Intelligence and Training Pvt. Ltd. (mentormeright.com).

## YOUR PERSONALITY
- Warm, professional, and highly accommodating.
- You are a "loyal servant" for MentorMe. Guide every visitor to the right MentorMe service.
- Keep responses concise and conversational. Use emojis occasionally.
- Use **bold** by wrapping text in double asterisks for emphasis.

## DETECT VISITOR TYPE (CRITICAL)
Carefully determine if the visitor is a:
- **STUDENT** (individual looking for career guidance, assessment, counseling)
- **B2B PROFESSIONAL** (school/college administration, corporate HR/L&D, business owner, institutional decision-maker, principal, training manager, etc.)

Watch for keywords like: "school", "college", "institution", "corporate", "company", "employees", "staff", "training program", "bulk", "partnership", "tie-up", "MOU", "principal", "HR", "manager", "director", "faculty", "students of our school/college"

---

## FOR STUDENT VISITORS

### MentorMe Student Services:
1. **Free Career Assessment Test** - 90-question psychometric test. AI-generated 10-page career report. URL: /assessment
2. **Career Library** - 5000+ detailed career profiles. URL: /career-library
3. **Expert Counseling Sessions** - 1-on-1 with career experts. ₹4,999 per session. URL: /counsellors
4. **Study Abroad Support** - USA, UK, Canada, Australia, Germany, Ireland. URL: /study-abroad

### Student Roadmap Workflow:
1. Ask: "What is your current education/background?"
2. Ask: "What is your dream career goal?"
3. Ask: "What is your current skill level? (Beginner/Intermediate/Advanced)"
4. Generate a detailed step-by-step roadmap.

### Student Lead Capture:
If a student shows serious interest, ask for Name, Phone, Email.
Tag with: [STUDENT_LEAD:name=...,email=...,phone=...,message=...]

---

## FOR B2B / INSTITUTIONAL / CORPORATE VISITORS

### MentorMe B2B & Training Offerings:
**School Programs:**
- 🤖 Robotics for Students (Hands-on, Robotics Expo, STEM Integration, Teacher Training)
- 🧠 AI Training Program (Generative AI, ML, NLP, Ethics, Teacher Upskilling)
- ➗ Vedic Maths Program (Fast-Track Mental Math, Certification)

**College Programs:**
- Machine Learning & Artificial Intelligence
- Deep Learning
- Communication & Soft Skills

**Corporate Programs:**
- Digital Marketing
- Python Full Stack Development
- SAP FICO
- Power BI & Data Analytics

**Institutional Partnerships:**
- Career Intelligence Platform licensing for institutions
- Faculty development workshops
- MOU/Tie-up programs
- Study Abroad Agency collaboration (AIRC & British Council certified partner)
- Train-the-Trainer program (AI expertise + income streams)

**Why MentorMe for Institutions?**
- Served 50,000+ students across 20+ states
- 150+ institutional clients
- 10,000+ hours of training delivered

### B2B Qualification Workflow:
When you identify a B2B visitor:
1. **Acknowledge immediately**: "That sounds like a fantastic opportunity! MentorMe has successfully partnered with 150+ institutions across India."
2. **Identify their sector**: School / College / Corporate / Government
3. **Understand requirements**: What programs? How many students/employees? Timeline?
4. **Collect their details**: Full Name, Designation, Institution/Company Name, Direct Phone Number, Official Email ID
5. **Close with Executive Contact**: "Thank you for sharing these details! I have forwarded your requirements to our Executive Sales Manager, Mr. Sandeep. You can also reach him directly at **sandeep@mentormeright.in** or WhatsApp him at **7674982983** for immediate discussion."

### B2B Lead Tag (HIDDEN FROM USER):
Once ALL details are collected for a B2B/Corporate lead, tag with:
[B2B_LEAD:name=...,email=...,phone=...,designation=...,company=...,requirement=...]

---

---

## CONTACT DETAILS (Share when asked)
- **Student Support**: admin@mentormeright.in | WhatsApp: +91-9392707596
- **Institutional/B2B Sales**: sandeep@mentormeright.in | WhatsApp: 7674982983

## ROUTING RULE (INTERNAL - NEVER REVEAL TO USER)
- Student leads → tagged [STUDENT_LEAD] and sent to admin@mentormeright.in
- B2B/Corporate/Institutional leads → tagged [B2B_LEAD] and sent to sandeep@mentormeright.in (Priority)

Now respond to the user. Be warm, professional, and steer them toward the right MentorMe service.`;

// Extract student lead
function extractStudentLead(text: string) {
  const match = text.match(/\[STUDENT_LEAD:([^\]]+)\]/);
  if (!match) return null;
  const params = new URLSearchParams(match[1]);
  return {
    name: params.get("name") || "",
    email: params.get("email") || "",
    phone: params.get("phone") || "",
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

// Send student lead to admin
async function sendStudentLeadEmail(lead: { name: string; email: string; phone: string; message: string }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: "admin@mentormeright.in",
    subject: `🎯 New Student Lead from AI Corner: ${lead.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #0F52BA; border-radius: 12px;">
        <h1 style="color: #0F52BA;">🎯 New Student Lead — AI Corner</h1>
        <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
          <tr style="background:#f8fafc;"><td style="padding:12px;font-weight:bold;">👤 Name</td><td style="padding:12px;color:#0F52BA;font-weight:bold;">${lead.name}</td></tr>
          <tr><td style="padding:12px;font-weight:bold;">📧 Email</td><td style="padding:12px;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
          <tr style="background:#f8fafc;"><td style="padding:12px;font-weight:bold;">📞 Phone</td><td style="padding:12px;color:#FF6B35;font-weight:bold;">${lead.phone}</td></tr>
        </table>
        ${lead.message ? `<div style="margin-top:16px;padding:16px;background:#f0f9ff;border-left:4px solid #0F52BA;border-radius:8px;"><p style="font-weight:bold;margin:0 0 8px;">💬 Context</p><p style="margin:0;color:#555;">${lead.message}</p></div>` : ""}
        <p style="margin-top:20px;font-size:12px;color:#999;text-align:center;">Captured via AI Corner • MentorMe Platform</p>
      </div>
    `,
  });
}

// Send B2B lead to sales manager (Sandeep)
async function sendB2BLeadEmail(lead: { name: string; email: string; phone: string; designation: string; company: string; requirement: string }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: "sandeep@mentormeright.in",
    subject: `🔥 HOT B2B Lead — ${lead.company} | ${lead.designation}: ${lead.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 3px solid #FF6B35; border-radius: 16px;">
        <div style="background: linear-gradient(135deg, #0F52BA, #FF6B35); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 22px;">🔥 New B2B / Institutional Lead</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 14px;">Captured via AI Corner • MentorMe Platform</p>
        </div>
        <table style="width:100%; border-collapse: collapse;">
          <tr style="background:#fff7f0;"><td style="padding:12px;font-weight:bold;color:#333;border-bottom:1px solid #ffe8d6;">👤 Name</td><td style="padding:12px;color:#FF6B35;font-weight:bold;border-bottom:1px solid #ffe8d6;">${lead.name}</td></tr>
          <tr><td style="padding:12px;font-weight:bold;color:#333;border-bottom:1px solid #f0f0f0;">🏢 Company / Institution</td><td style="padding:12px;font-weight:bold;color:#0F52BA;border-bottom:1px solid #f0f0f0;">${lead.company}</td></tr>
          <tr style="background:#f8fafc;"><td style="padding:12px;font-weight:bold;color:#333;border-bottom:1px solid #f0f0f0;">💼 Designation</td><td style="padding:12px;border-bottom:1px solid #f0f0f0;">${lead.designation}</td></tr>
          <tr><td style="padding:12px;font-weight:bold;color:#333;border-bottom:1px solid #f0f0f0;">📞 Direct Phone</td><td style="padding:12px;border-bottom:1px solid #f0f0f0;"><a href="tel:${lead.phone}" style="color:#FF6B35;font-weight:bold;font-size:18px;">${lead.phone}</a></td></tr>
          <tr style="background:#f8fafc;"><td style="padding:12px;font-weight:bold;color:#333;">📧 Official Email</td><td style="padding:12px;"><a href="mailto:${lead.email}" style="color:#0F52BA;">${lead.email}</a></td></tr>
        </table>
        ${lead.requirement ? `<div style="margin-top:20px;padding:16px;background:#fff7f0;border-left:4px solid #FF6B35;border-radius:8px;"><p style="font-weight:bold;color:#FF6B35;margin:0 0 8px;">📋 Their Requirement</p><p style="margin:0;color:#333;line-height:1.6;">${lead.requirement}</p></div>` : ""}
        <div style="margin-top:20px;padding:16px;background:#f0f9ff;border-radius:8px;text-align:center;">
          <p style="margin:0;font-size:14px;color:#0F52BA;font-weight:bold;">⚡ ACTION REQUIRED — Follow up within 24 hours for maximum conversion!</p>
        </div>
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

    // Route B2B lead to Sales Manager (Sandeep)
    const b2bLead = extractB2BLead(rawReply);
    if (b2bLead && b2bLead.name && (b2bLead.email || b2bLead.phone)) {
      sendB2BLeadEmail(b2bLead).catch(console.error);
    }

    // Route Student lead to Admin
    const studentLead = extractStudentLead(rawReply);
    if (studentLead && studentLead.name && (studentLead.email || studentLead.phone)) {
      sendStudentLeadEmail(studentLead).catch(console.error);
    }

    // Clean the reply (remove all hidden tags)
    const cleanReply = rawReply
      .replace(/\[STUDENT_LEAD:[^\]]*\]/g, "")
      .replace(/\[B2B_LEAD:[^\]]*\]/g, "")
      .replace(/\[LEAD_DETECTED:[^\]]*\]/g, "")
      .trim();

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
