import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify webhook signature using HMAC SHA256
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.error('Invalid Razorpay webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);
    const supabase = createClient();

    // Handle payment captured event
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;
      const paymentId = payment.id;

      // Update booking: set real payment ID and mark as confirmed
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .update({
          payment_id: paymentId,
          status: 'confirmed',
        })
        .eq('payment_id', orderId) // was storing orderId initially
        .select('id, user_id, slot_id, counselor_id')
        .single();

      if (bookingError || !booking) {
        console.error('Webhook: Failed to update booking:', bookingError);
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
      }

      // Mark the slot as booked
      await supabase
        .from('slots')
        .update({ is_booked: true })
        .eq('id', booking.slot_id);

      // Trigger confirmation email via Resend
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/booking-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          userId: booking.user_id,
          counselorId: booking.counselor_id,
          slotId: booking.slot_id,
        }),
      });

      console.log(`Booking ${booking.id} confirmed for payment ${paymentId}`);
    }

    // Handle payment failed event
    if (event.event === 'payment.failed') {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;

      await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('payment_id', orderId);

      console.log(`Booking cancelled for failed payment on order ${orderId}`);
    }

    return NextResponse.json({ received: true });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Razorpay webhook error:', err);
    return NextResponse.json({ error: err.message || 'Webhook processing failed' }, { status: 500 });
  }
}
