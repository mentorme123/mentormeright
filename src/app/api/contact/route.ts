import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Trigger redeploy to load Vercel SMTP variables - updated May 28 2026
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Validate SMTP credentials
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP environment variables missing');
      return NextResponse.json(
        { error: 'Email service is not configured. If running locally, please restart your development server to load .env.local. If running in production (Vercel), please add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and EMAIL_FROM to your Vercel Project Environment Variables.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const { firstName, lastName, email, subject, message } = await req.json();

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Sanitize message to prevent XSS
    const sanitizedMessage = message
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'admin@mentormeright.in', // Sending to admin email
      replyTo: email,
      subject: `New Contact Form Inquiry: ${subject || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #1B3A6B; margin-top: 0;">New Contact Form Submission</h2>
          <p>You have received a new message from the MentorMe contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; width: 100px;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${firstName} ${lastName || ''}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Subject:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${subject || 'N/A'}</td>
            </tr>
          </table>
          
          <h3 style="color: #1B3A6B; margin-top: 20px;">Message:</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #F0A500;">
            <p style="white-space: pre-wrap; margin: 0;">${sanitizedMessage}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Contact email error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send email' }, { status: 500 });
  }
}
