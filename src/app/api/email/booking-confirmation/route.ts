import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

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

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { bookingId, userId, counselorId, slotId } = await req.json();

    // Fetch all details needed for the confirmation email
    const [userRes, counselorRes, slotRes] = await Promise.all([
      supabaseAdmin.from('users').select('name, email').eq('id', userId).single(),
      supabaseAdmin.from('counselors').select('name, specialization').eq('id', counselorId).single(),
      supabaseAdmin.from('slots').select('date, start_time').eq('id', slotId).single(),
    ]);

    if (userRes.error || !userRes.data) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = userRes.data;
    const counselor = counselorRes.data;
    const slot = slotRes.data;

    const sessionDate = slot
      ? new Date(`${slot.date}T${slot.start_time}`).toLocaleString('en-IN', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata',
        })
      : 'To be confirmed';

    const joinUrl = `https://meet.jit.si/MentorMe-Session-${bookingId.slice(0, 8)}`;

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: '✅ Your MentorMe Counseling Session is Confirmed!',
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
          <body style="font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #1B3A6B 0%, #0D7377 100%); padding: 40px 32px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; margin: 0; letter-spacing: 2px; text-transform: uppercase;">MentorMe</h1>
                <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 8px 0 0;">Booking Confirmation</p>
              </div>

              <!-- Body -->
              <div style="padding: 40px 32px;">
                <div style="text-align: center; margin-bottom: 32px;">
                  <div style="width: 64px; height: 64px; background: #d1fae5; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 32px;">✅</div>
                </div>

                <h2 style="color: #1B3A6B; font-size: 22px; font-weight: 700; margin: 0 0 16px;">Session Confirmed, ${user.name}!</h2>
                <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
                  Your career counseling session has been booked and payment received. You can join the session directly using the link below at the scheduled time.
                </p>

                <!-- Booking Details Card -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 24px 0;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="color: #94a3b8; font-size: 13px; font-weight: 600; padding: 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Booking ID</td>
                      <td style="color: #1e293b; font-size: 13px; font-weight: 700; text-align: right;">${bookingId?.slice(0, 8).toUpperCase()}</td>
                    </tr>
                    <tr><td colspan="2" style="border-top: 1px solid #e2e8f0; padding: 0;"></td></tr>
                    <tr>
                      <td style="color: #94a3b8; font-size: 13px; font-weight: 600; padding: 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Counselor</td>
                      <td style="color: #1e293b; font-size: 13px; font-weight: 700; text-align: right;">${counselor?.name || 'MentorMe Expert'}</td>
                    </tr>
                    ${counselor?.specialization ? `
                    <tr>
                      <td style="color: #94a3b8; font-size: 13px; font-weight: 600; padding: 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Specialization</td>
                      <td style="color: #1e293b; font-size: 13px; text-align: right;">${counselor.specialization}</td>
                    </tr>
                    ` : ''}
                    <tr><td colspan="2" style="border-top: 1px solid #e2e8f0; padding: 0;"></td></tr>
                    <tr>
                      <td style="color: #94a3b8; font-size: 13px; font-weight: 600; padding: 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Date & Time</td>
                      <td style="color: #1e293b; font-size: 13px; font-weight: 700; text-align: right;">${sessionDate}</td>
                    </tr>
                  </table>
                </div>

                <!-- Join Button -->
                <div style="text-align: center; margin: 32px 0; padding: 32px; background: #f0fdf4; border-radius: 16px; border: 2px dashed #bbf7d0;">
                  <p style="color: #166534; font-size: 14px; font-weight: 700; margin: 0 0 16px; text-transform: uppercase;">Your Private Meeting Link</p>
                  <a href="${joinUrl}" 
                     style="display: inline-block; background: linear-gradient(135deg, #059669, #047857); color: #ffffff; font-weight: 800; font-size: 16px; padding: 18px 48px; border-radius: 14px; text-decoration: none; box-shadow: 0 10px 15px -3px rgba(5, 150, 105, 0.3);">
                    Join Session Now →
                  </a>
                  <p style="color: #64748b; font-size: 12px; margin: 16px 0 0;">
                    Or copy this link: <a href="${joinUrl}" style="color: #059669;">${joinUrl}</a>
                  </p>
                </div>

                <div style="background: #fef9c3; border-left: 4px solid #F0A500; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
                  <p style="color: #92400e; font-size: 13px; margin: 0; font-weight: 600;">📹 Please join 5 minutes early to test your camera and microphone.</p>
                </div>

                <div style="text-align: center; margin: 32px 0;">
                  <a href="https://mentormeright.in/dashboard/counselor" 
                     style="display: inline-block; background: linear-gradient(135deg, #1B3A6B, #0D7377); color: #ffffff; font-weight: 800; font-size: 15px; padding: 16px 40px; border-radius: 12px; text-decoration: none;">
                    View My Bookings
                  </a>
                </div>
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
    console.error('Booking confirmation email error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send confirmation email' }, { status: 500 });
  }
}

