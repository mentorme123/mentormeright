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
    const normalizedEmail = String(email).trim().toLowerCase();
    const incomingEmail = String(email).trim();

    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id, email')
      .ilike('email', normalizedEmail)
      .maybeSingle();

    const generatedUserId = existingUser?.id || crypto.randomUUID();
    console.log('Assessment submit: resolved userId', { incomingEmail, normalizedEmail, generatedUserId, existingId: existingUser?.id, existingEmail: existingUser?.email });

    if (existingUser?.id) {
      const { error: profileUpdateError } = await supabaseAdmin
        .from('users')
        .update({
          name: name || normalizedEmail.split('@')[0],
          role: 'individual',
          audience_type: audience_type || 'ST',
          education_level: educationLevel,
        })
        .eq('id', existingUser.id);

      if (profileUpdateError) {
        console.error('Error updating user profile:', profileUpdateError);
        return NextResponse.json({ error: profileUpdateError.message }, { status: 500 });
      }
    } else {
      const { error: profileInsertError } = await supabaseAdmin
        .from('users')
        .insert([
          {
            id: generatedUserId,
            email: normalizedEmail,
            name: name || normalizedEmail.split('@')[0],
            role: 'individual',
            audience_type: audience_type || 'ST',
            education_level: educationLevel,
          },
        ]);

      if (profileInsertError) {
        console.error('Error creating user profile:', profileInsertError);
        return NextResponse.json({ error: profileInsertError.message }, { status: 500 });
      }
    }

    console.log('Assessment submit: saving results', { userId: generatedUserId, scoresKeys: Object.keys(scores || {}), email });

    const { error: insertError } = await supabaseAdmin
      .from('assessment_results')
      .insert([
        {
          user_id: generatedUserId,
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

    const { data: verifyResult } = await supabaseAdmin
      .from('assessment_results')
      .select('id, user_id, completed_at, report')
      .eq('user_id', generatedUserId)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    console.log('Assessment submit: verify after insert', { generatedUserId, verifyResult });

    console.log('Assessment saved successfully for user:', generatedUserId, 'email:', normalizedEmail);
    return NextResponse.json({ success: true, userId: generatedUserId });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error submitting assessment:', err);
    return NextResponse.json({ error: err.message || 'Failed to submit assessment' }, { status: 500 });
  }
}
