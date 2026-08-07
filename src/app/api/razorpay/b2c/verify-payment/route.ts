import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, paymentId, itemType, itemId } = await req.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !paymentId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

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

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: payment, error: paymentError } = await supabaseAdmin
      .from('payments')
      .update({
        status: 'completed',
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        updated_at: new Date().toISOString(),
      })
      .eq('id', paymentId)
      .eq('razorpay_order_id', razorpay_order_id)
      .select('id, user_id, item_type, item_id, item_name')
      .single();

    if (paymentError || !payment) {
      console.error('Failed to update payment:', paymentError);
      return NextResponse.json({ error: 'Payment record not found or update failed' }, { status: 404 });
    }

    if (payment.item_type === 'career_report') {
      const { error: updateError } = await supabaseAdmin
        .from('users')
        .update({ has_paid_report: true })
        .eq('id', payment.user_id);

      if (updateError) {
        console.error('Failed to update user report status:', updateError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      paymentId: payment.id,
      itemType: payment.item_type,
      itemId: payment.item_id,
    });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('B2C Payment verification error:', err);
    return NextResponse.json({ error: err.message || 'Payment verification failed' }, { status: 500 });
  }
}
