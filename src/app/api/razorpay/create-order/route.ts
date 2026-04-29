import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@/lib/supabase/server';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slotId, counselorId, amount } = await req.json();

    if (!slotId || !counselorId || !amount) {
      return NextResponse.json({ error: 'Missing required fields: slotId, counselorId, amount' }, { status: 400 });
    }

    // Verify slot is still available
    const { data: slot, error: slotError } = await supabase
      .from('slots')
      .select('id, is_booked, date, start_time')
      .eq('id', slotId)
      .single();

    if (slotError || !slot) {
      return NextResponse.json({ error: 'Slot not found' }, { status: 404 });
    }

    if (slot.is_booked) {
      return NextResponse.json({ error: 'This slot has already been booked. Please select another.' }, { status: 409 });
    }

    // Create Razorpay order (amount is in paise: ₹500 = 50000 paise)
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert rupees to paise
      currency: 'INR',
      receipt: `mentorme_booking_${slotId}`,
      notes: {
        user_id: user.id,
        slot_id: slotId,
        counselor_id: counselorId,
      },
    });

    // Create a pending booking record
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        counselor_id: counselorId,
        slot_id: slotId,
        payment_id: order.id, // Store Razorpay order ID initially
        status: 'pending',
      })
      .select('id')
      .single();

    if (bookingError) {
      return NextResponse.json({ error: 'Failed to create booking record' }, { status: 500 });
    }

    return NextResponse.json({
      orderId: order.id,
      bookingId: booking.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Razorpay order creation error:', err);
    return NextResponse.json({ error: err.message || 'Failed to create payment order' }, { status: 500 });
  }
}
