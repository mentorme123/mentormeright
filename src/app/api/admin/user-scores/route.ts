import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');
    const email = req.nextUrl.searchParams.get('email') || '';
    if (!userId && !email) {
      return NextResponse.json({ error: 'userId or email is required' }, { status: 400 });
    }

    let targetUserId = userId;
    let userEmail = email;

    if (!targetUserId && email) {
      const { data: userByEmail } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle();
      targetUserId = userByEmail?.id || null;
      userEmail = email;
    }

    if (!targetUserId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('Fetching scores for userId:', targetUserId, 'email:', userEmail);

    const { data, error } = await supabaseAdmin
      .from('assessment_results')
      .select('scores, answers, completed_at, report')
      .eq('user_id', targetUserId)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user scores:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data?.scores) {
      console.log('No assessment found for userId:', targetUserId);

      if (userEmail) {
        const { data: userByEmail } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('email', userEmail)
          .maybeSingle();

        if (userByEmail?.id && userByEmail.id !== targetUserId) {
          const { data: altResult, error: altError } = await supabaseAdmin
            .from('assessment_results')
            .select('scores, answers, completed_at, report')
            .eq('user_id', userByEmail.id)
            .order('completed_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (!altError && altResult?.scores) {
            const { data: altUser } = await supabaseAdmin
              .from('users')
              .select('name, education_level')
              .eq('id', userByEmail.id)
              .maybeSingle();

            return NextResponse.json({
              scores: altResult.scores,
              completedAt: altResult.completed_at,
              userName: altUser?.name || null,
              userClass: altUser?.education_level || null,
              subjects: altResult.report?.subjects || [],
              report: altResult.report || null
            });
          }
        }
      }

      return NextResponse.json({ error: 'No assessment found for this user' }, { status: 404 });
    }

    const { data: user } = await supabaseAdmin
      .from('users')
      .select('name, education_level')
      .eq('id', targetUserId)
      .maybeSingle();

    console.log('Found assessment for userId:', targetUserId, 'user:', user?.name || 'unknown');

    return NextResponse.json({
      scores: data.scores,
      completedAt: data.completed_at,
      userName: user?.name || null,
      userClass: user?.education_level || null,
      subjects: data.report?.subjects || [],
      report: data.report || null
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching user scores:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch scores' }, { status: 500 });
  }
}
