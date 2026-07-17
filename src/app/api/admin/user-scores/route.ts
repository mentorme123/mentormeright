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
    const email = (req.nextUrl.searchParams.get('email') || '').trim().toLowerCase();
    if (!userId && !email) {
      return NextResponse.json({ error: 'userId or email is required' }, { status: 400 });
    }

    let targetUserId = userId;
    let userEmail = email;
    let matchedById = true;

    if (!targetUserId && email) {
      const { data: userByEmail } = await supabaseAdmin
        .from('users')
        .select('id')
        .ilike('email', email)
        .maybeSingle();
      targetUserId = userByEmail?.id || null;
      userEmail = email;
      matchedById = false;
    }

    if (!targetUserId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('Fetching scores for userId:', targetUserId, 'email:', userEmail, 'matchedById:', matchedById);

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

    console.log('Fetching scores: direct result for userId', targetUserId, JSON.stringify(data).slice(0, 300));

    if (!data?.scores) {
      console.log('No assessment found for userId:', targetUserId, 'email:', userEmail);
      console.log('No assessment: data payload', JSON.stringify(data).slice(0, 300));

      if (userEmail) {
        const { data: usersByEmail } = await supabaseAdmin
          .from('users')
          .select('id, email')
          .ilike('email', userEmail);

        console.log('No assessment: usersByEmail', JSON.stringify(usersByEmail).slice(0, 300));
        const candidateIds = [
          ...(usersByEmail?.map(u => u.id) || []),
          targetUserId
        ].filter((id, idx, arr) => id && arr.indexOf(id) === idx);

        console.log('Trying fallback by email candidates:', candidateIds);

        for (const candidateId of candidateIds) {
          if (candidateId === targetUserId && matchedById) {
            continue;
          }

          const { data: altResult, error: altError } = await supabaseAdmin
            .from('assessment_results')
            .select('scores, answers, completed_at, report')
            .eq('user_id', candidateId)
            .order('completed_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          console.log('Fallback candidate', candidateId, 'result', JSON.stringify(altResult).slice(0, 200), 'error', altError);

          if (!altError && altResult?.scores) {
            const { data: altUser } = await supabaseAdmin
              .from('users')
              .select('name, education_level, email, phone')
              .eq('id', candidateId)
              .maybeSingle();

            console.log('Found assessment via fallback for candidateId:', candidateId);
            return NextResponse.json({
              scores: altResult.scores,
              completedAt: altResult.completed_at,
              userName: altUser?.name || null,
              userClass: altUser?.education_level || null,
              userEmail: altUser?.email || null,
              userPhone: altUser?.phone || null,
              subjects: altResult.report?.subjects || [],
              report: altResult.report || null
            });
          }
        }

        console.log('No assessment found after fallback for userId:', targetUserId, 'email:', userEmail);
      }

      return NextResponse.json({ error: 'No assessment found for this user' }, { status: 404 });
    }

    const { data: user } = await supabaseAdmin
      .from('users')
      .select('name, education_level, email, phone')
      .eq('id', targetUserId)
      .maybeSingle();

    console.log('Found assessment for userId:', targetUserId, 'user:', user?.name || 'unknown');

    console.log('Returning scores for userId:', targetUserId, 'email:', userEmail, 'report subjects:', data.report?.subjects);
    return NextResponse.json({
      scores: data.scores,
      completedAt: data.completed_at,
      userName: user?.name || null,
      userClass: user?.education_level || null,
      userEmail: user?.email || null,
      userPhone: user?.phone || null,
      subjects: data.report?.subjects || [],
      report: data.report || null
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching user scores:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch scores' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, overrides } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const { data: existing } = await supabaseAdmin
      .from('assessment_results')
      .select('id, report')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!existing) {
      return NextResponse.json({ error: 'No assessment found for this user' }, { status: 404 });
    }

    const updatedReport = {
      ...(existing.report || {}),
      adminOverrides: overrides || {}
    };

    const { error } = await supabaseAdmin
      .from('assessment_results')
      .update({ report: updatedReport })
      .eq('id', existing.id);

    if (error) {
      console.error('Error updating overrides:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, report: updatedReport });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error in PATCH /api/admin/user-scores:', err);
    return NextResponse.json({ error: err.message || 'Failed to update overrides' }, { status: 500 });
  }
}
