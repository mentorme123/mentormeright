import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export async function POST(req: NextRequest) {
  try {
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

    const { data, error } = await resend.emails.send({
      from: 'MentorMe <no-reply@mentormeright.in>',
      to: [user.email],
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
                  Your career counseling session has been booked and payment received. Here are your session details:
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

                <div style="background: #fef9c3; border-left: 4px solid #F0A500; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
                  <p style="color: #92400e; font-size: 13px; margin: 0; font-weight: 600;">📹 A meeting link will be sent to you 30 minutes before your session.</p>
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

    if (error) {
      console.error('Booking confirmation email error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: data?.id });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Booking confirmation email error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send confirmation email' }, { status: 500 });
  }
}
