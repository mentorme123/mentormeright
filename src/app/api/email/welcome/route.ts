import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const { name, email, tempPassword } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing name or email' }, { status: 400 });
    }

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: '🎓 Welcome to MentorMe — Your Account is Ready!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #1B3A6B 0%, #0D7377 100%); padding: 40px 32px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; margin: 0; letter-spacing: 2px; text-transform: uppercase;">MentorMe</h1>
                <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 8px 0 0;">Career Intelligence Platform</p>
              </div>

              <!-- Body -->
              <div style="padding: 40px 32px;">
                <h2 style="color: #1B3A6B; font-size: 22px; font-weight: 700; margin: 0 0 16px;">Welcome, ${name}! 🚀</h2>
                <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
                  Your institution has enrolled you on the MentorMe Career Intelligence Platform. 
                  You can now take your personalised 90-question career assessment and receive an AI-powered report.
                </p>

                ${tempPassword ? `
                <div style="background: #f1f5f9; border-left: 4px solid #F0A500; border-radius: 8px; padding: 20px; margin: 24px 0;">
                  <p style="color: #1B3A6B; font-weight: 700; font-size: 14px; margin: 0 0 8px;">YOUR LOGIN CREDENTIALS</p>
                  <p style="color: #475569; font-size: 14px; margin: 4px 0;"><strong>Email:</strong> ${email}</p>
                  <p style="color: #475569; font-size: 14px; margin: 4px 0;"><strong>Temporary Password:</strong> <code style="background:#e2e8f0; padding: 2px 8px; border-radius: 4px; font-family: monospace;">${tempPassword}</code></p>
                  <p style="color: #94a3b8; font-size: 12px; margin: 12px 0 0;">⚠️ Please change your password after first login.</p>
                </div>
                ` : ''}

                <div style="text-align: center; margin: 32px 0;">
                  <a href="https://mentormeright.in/login" 
                     style="display: inline-block; background: linear-gradient(135deg, #F0A500, #e09000); color: #ffffff; font-weight: 800; font-size: 16px; padding: 16px 40px; border-radius: 12px; text-decoration: none; letter-spacing: 0.5px;">
                    Start Your Assessment →
                  </a>
                </div>

                <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">
                  Need help? Contact us at <a href="mailto:support@mentormeright.in" style="color: #0D7377;">support@mentormeright.in</a>
                </p>
              </div>

              <!-- Footer -->
              <div style="background: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} MentorMe. All rights reserved.</p>
                <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0;">Hyderabad, India | mentormeright.in</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Welcome email error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send email' }, { status: 500 });
  }
}

