import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

async function sendViaSendGrid(to: string, replyTo: string, subject: string, html: string) {
  const apiKey = process.env.SENDGRID_KEY || process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    return { skipped: true as const };
  }

  try {
    const mod = await import('@sendgrid/mail');
    const sgMail = mod.default || mod;
    sgMail.setApiKey(apiKey);

    await sgMail.send({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER || 'no-reply@mentormeright.in',
      to,
      replyTo,
      subject,
      html,
    });

    return { success: true as const, messageId: 'sg-sent' };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'SendGrid send failed.';
    return { success: false as const, error: message };
  }
}

async function sendViaSmtp(to: string, replyTo: string, subject: string, html: string) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return { skipped: true as const };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    connectionTimeout: 10_000,
    socketTimeout: 10_000,
    auth: { user, pass },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || user,
      to,
      replyTo,
      subject,
      html,
    });
    return { success: true as const, messageId: info.messageId };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'SMTP send failed.';
    return { success: false as const, error: message };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message } = await req.json();

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const sanitizedMessage = message
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    const html = `
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
    `;

    const apiKey = process.env.SENDGRID_KEY || process.env.SENDGRID_API_KEY;

    if (!apiKey) {
      console.error('Contact email error: SENDGRID_KEY is not configured.');
      return NextResponse.json({ error: 'Email service is not configured on the server.' }, { status: 500 });
    }

    try {
      const mod = await import('@sendgrid/mail');
      const sgMail = mod.default || mod;
      sgMail.setApiKey(apiKey);

      await sgMail.send({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER || 'no-reply@mentormeright.in',
        to: 'admin@mentormeright.in',
        replyTo: email,
        subject: `New Contact Form Inquiry: ${subject || 'General Inquiry'}`,
        html,
      });

      return NextResponse.json({ success: true, messageId: 'sg-sent', provider: 'sendgrid' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'SendGrid send failed.';
      console.error('Contact email error (SendGrid):', message);
      return NextResponse.json({ error: message }, { status: 500 });
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Contact email error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send email' }, { status: 500 });
  }
}
