import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, scores, topPassion, overall, audience_type } = body;

    if (!email || !scores) {
      return NextResponse.json({ error: 'Email and scores are required' }, { status: 400 });
    }

    // Find user by email
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    let userId = user?.id;

    // If user doesn't exist, create one
    if (!userId) {
      const { data: newUser, error: createError } = await supabaseAdmin
        .from('users')
        .insert([
          {
            email,
            name: name || email.split('@')[0],
            role: 'individual',
            audience_type: audience_type || 'ST'
          }
        ])
        .select('id')
        .single();

      if (createError || !newUser) {
        console.error('Error creating user:', createError);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
      }
      userId = newUser.id;
    }

    // Save assessment results
    const { error: insertError } = await supabaseAdmin
      .from('assessment_results')
      .insert([
        {
          user_id: userId,
          scores,
          report: { topPassion, overall },
          answers: {},
          audience_type: audience_type || 'ST',
          completed_at: new Date().toISOString()
        }
      ]);

    if (insertError) {
      console.error('Error saving assessment results:', insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, userId });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error submitting assessment:', err);
    return NextResponse.json({ error: err.message || 'Failed to submit assessment' }, { status: 500 });
  }
}
