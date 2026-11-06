import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = String(searchParams.get('userId') || '').trim();
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Check assessment_results for this user (and also check for any old IDs that map to this user's email)
    const { data: userProfile } = await supabaseAdmin
      .from('users')
      .select('id, email, name')
      .eq('id', userId)
      .maybeSingle();

    // Find all public.users rows with the same name or email (handles duplicate/old rows from recreated accounts)
    let userIds = [userId];
    if (userProfile?.name) {
      const { data: allUsers } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('name', userProfile.name);
      if (allUsers && allUsers.length > 0) {
        userIds = allUsers.map((u: any) => u.id);
      }
    } else if (userProfile?.email) {
      const { data: allUsers } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', userProfile.email);
      if (allUsers && allUsers.length > 0) {
        userIds = allUsers.map((u: any) => u.id);
      }
    }

    const { data, error } = await supabaseAdmin
      .from('assessment_results')
      .select('report, scores, user_id')
      .in('user_id', userIds)
      .maybeSingle();

    if (error) {
      console.error('assessment-status error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ assessment: data || null });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
