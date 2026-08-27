import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    console.log('[razorpay/b2c/create-order] Env check:', { 
      keyIdPresent: !!keyId, 
      keySecretPresent: !!keySecret,
      keyIdPrefix: keyId ? keyId.slice(0, 10) : 'missing'
    });

    if (!keyId || !keySecret) {
      console.error('[razorpay/b2c/create-order] Missing env vars');
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { itemType, itemId, itemName, amount, metadata, email, name } = await req.json();

    if (!itemType || !amount) {
      return NextResponse.json({ error: 'Missing required fields: itemType, amount' }, { status: 400 });
    }

    const amountNum = Math.round(Number(amount));
    if (isNaN(amountNum) || amountNum <= 0 || amountNum > 100000) {
      return NextResponse.json({ error: 'Invalid amount. Must be a positive number between 1 and 100,000.' }, { status: 400 });
    }

    let userId = user?.id;

    if (!userId && email) {
      const supabaseAdmin = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
      );

      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existingUser) {
        userId = existingUser.id;
      } else {
        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email,
          email_confirm: true,
          user_metadata: {
            full_name: name || email?.split('@')[0] || 'User',
          },
        });

        if (createError || !newUser.user) {
          console.error('[razorpay/b2c/create-order] Guest user creation failed:', createError);
          return NextResponse.json({ error: 'Failed to create user account for payment' }, { status: 500 });
        }

        const { error: profileError } = await supabaseAdmin
          .from('users')
          .insert({
            id: newUser.user.id,
            email,
            name: name || email?.split('@')[0] || 'User',
            role: 'individual',
          });

        if (profileError) {
          console.error('[razorpay/b2c/create-order] Profile creation failed:', profileError);
        }

        userId = newUser.user.id;
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized. Please login or provide email for guest payment.' }, { status: 401 });
    }

    console.log('[razorpay/b2c/create-order] Creating order:', { 
      itemType, 
      amountNum, 
      amountInPaise: amountNum * 100,
      userId 
    });

    const receipt = `mentorme_b2c_${itemType}_${Date.now()}`;

    let order;
    try {
      order = await razorpay.orders.create({
        amount: amountNum * 100,
        currency: 'INR',
        receipt: receipt,
        notes: {
          user_id: userId,
          item_type: itemType,
          item_id: itemId || '',
          item_name: itemName || '',
        },
      });
    } catch (razorpayError: unknown) {
      const err = razorpayError as Error;
      console.error('[razorpay/b2c/create-order] Razorpay order creation failed:', razorpayError);
      console.error('[razorpay/b2c/create-order] Razorpay error details:', {
        message: err?.message,
        stack: err?.stack,
        raw: JSON.stringify(razorpayError).slice(0, 500)
      });
      return NextResponse.json({ 
        error: `Razorpay error: ${err?.message || 'Unknown error'}` 
      }, { status: 500 });
    }

    console.log('[razorpay/b2c/create-order] Order created:', { orderId: order.id, amount: order.amount });

    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        razorpay_order_id: order.id,
        amount: amountNum,
        currency: 'INR',
        status: 'pending',
        item_type: itemType,
        item_id: itemId || null,
        item_name: itemName || null,
        metadata: metadata || {},
      })
      .select('id')
      .single();

    if (paymentError) {
      console.error('[razorpay/b2c/create-order] Payment record insert failed:', paymentError);
      return NextResponse.json({ error: `Payment record failed: ${paymentError.message}` }, { status: 500 });
    }

    console.log('[razorpay/b2c/create-order] Payment record created:', { paymentId: payment.id });

    return NextResponse.json({
      orderId: order.id,
      paymentId: payment.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('[razorpay/b2c/create-order] Unexpected error:', err);
    return NextResponse.json({ error: err.message || 'Failed to create payment order' }, { status: 500 });
  }
}
