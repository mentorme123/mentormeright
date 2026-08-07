import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, bookingId, slotId } = await req.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !bookingId || !slotId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify signature
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      console.error('RAZORPAY_KEY_SECRET is missing');
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
    }

    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      console.error('Invalid signature generated');
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Initialize Supabase Admin client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Update Booking status to confirmed
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .update({
        status: 'confirmed',
        payment_id: razorpay_payment_id,
      })
      .eq('id', bookingId)
      .select('id, counsellor_id, user_id')
      .single();

    if (bookingError || !booking) {
      console.error('Failed to update booking:', bookingError);
      return NextResponse.json({ error: 'Booking not found or update failed' }, { status: 404 });
    }

    // Update Slot status to booked
    const { error: slotError } = await supabaseAdmin
      .from('slots')
      .update({ is_booked: true })
      .eq('id', slotId);

    if (slotError) {
      console.error('Failed to update slot status:', slotError);
    }

    // Send confirmation email
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      await fetch(`${siteUrl}/api/email/booking-confirmation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: booking.id,
          userId: booking.user_id,
          counselorId: booking.counsellor_id,
          slotId: slotId,
        }),
      });
    } catch (emailErr) {
      console.error('Failed to trigger confirmation email:', emailErr);
    }

    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Payment verification error:', err);
    return NextResponse.json({ error: err.message || 'Payment verification failed' }, { status: 500 });
  }
}
