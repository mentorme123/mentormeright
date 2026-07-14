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
    const { email, name, scores, topPassion, overall, audience_type, grade, subjects } = body;

    if (!email || !scores) {
      return NextResponse.json({ error: 'Email and scores are required' }, { status: 400 });
    }

    console.log('Assessment submit attempt:', { email, grade, audience_type, scoresKeys: Object.keys(scores || {}), scoresType: typeof scores });

    const educationLevel = grade ? `Class ${grade}` : 'School Student';

    // Always resolve the stable auth user ID first to avoid identity mismatches
    let authUserId: string | null = null;

    const { data: authUser } = await supabaseAdmin.auth.admin.getUserByEmail(email);
    console.log('Assessment submit: auth lookup', { email, found: !!authUser?.user?.id });

    if (authUser?.user?.id) {
      authUserId = authUser.user.id;
    } else {
      const randomPassword = crypto.randomUUID().replace(/-/g, '').slice(0, 24);
      const { data: createdAuthUser, error: createAuthError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: randomPassword,
        email_confirm: true,
        user_metadata: { name: name || email.split('@')[0] },
      });

      if (createAuthError || !createdAuthUser?.user?.id) {
        console.error('Error creating auth user:', createAuthError);
        return NextResponse.json({ error: 'Failed to create account', details: createAuthError?.message }, { status: 500 });
      }

      authUserId = createdAuthUser.user.id;
      console.log('Assessment submit: created auth user', { email, authUserId });
    }

    // Upsert public profile row using the stable auth user id
    const { error: profileUpsertError } = await supabaseAdmin
      .from('users')
      .upsert(
        [
          {
            id: authUserId,
            email,
            name: name || email.split('@')[0],
            role: 'individual',
            audience_type: audience_type || 'ST',
            education_level: educationLevel,
          },
        ],
        { onConflict: 'email' }
      );

    if (profileUpsertError) {
      console.error('Error upserting user profile:', profileUpsertError);
      return NextResponse.json({ error: profileUpsertError.message }, { status: 500 });
    }

    console.log('Assessment submit: saving results', { userId: authUserId, scoresKeys: Object.keys(scores || {}), email });

    // Save assessment results
    const { error: insertError } = await supabaseAdmin
      .from('assessment_results')
      .insert([
        {
          user_id: authUserId,
          scores,
          report: { topPassion, overall, subjects: subjects || [] },
          answers: {},
          audience_type: audience_type || 'ST',
          completed_at: new Date().toISOString()
        }
      ]);

    if (insertError) {
      console.error('Error saving assessment results:', insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    console.log('Assessment saved successfully for user:', authUserId, 'email:', email);
    return NextResponse.json({ success: true, userId: authUserId });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error submitting assessment:', err);
    return NextResponse.json({ error: err.message || 'Failed to submit assessment' }, { status: 500 });
  }
}
