import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase environment variables are not configured');
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, college } = body;

    if (!email || !name || !phone || !college) {
      return NextResponse.json({ error: 'name, email, phone, and college are required' }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedName = String(name).trim();
    const normalizedPhone = String(phone).trim();
    const normalizedCollege = String(college).trim();

    const supabaseAdmin = getSupabaseAdmin();

    const { data: existingUser, error: lookupError } = await supabaseAdmin
      .from('users')
      .select('id, email, name, mobile, school')
      .ilike('email', normalizedEmail)
      .maybeSingle();

    if (lookupError) {
      console.error('[placement/register] User lookup failed:', lookupError);
    }

    if (existingUser) {
      const updates: Record<string, string | null> = {};
      if (normalizedName && normalizedName !== existingUser.name) updates.name = normalizedName;
      if (normalizedPhone && normalizedPhone !== existingUser.mobile) updates.mobile = normalizedPhone;
      if (normalizedCollege && normalizedCollege !== existingUser.school) updates.school = normalizedCollege;
      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await supabaseAdmin
          .from('users')
          .update(updates)
          .eq('id', existingUser.id);
        if (updateError) {
          console.error('[placement/register] User update failed:', updateError);
        }
      }
      return NextResponse.json({ success: true, userId: existingUser.id, updated: false });
    }

    const generatedUserId = crypto.randomUUID();

    // Create the auth user first — the on_auth_user_created trigger
    // automatically inserts the matching public.users row, satisfying
    // the users_id_fkey foreign key constraint.
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: normalizedEmail,
      password: generatedUserId,
      email_confirm: true,
      user_metadata: { full_name: normalizedName },
    });

    if (authError) {
      console.error('[placement/register] Auth user creation failed:', authError);
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    const { error: profileError } = await supabaseAdmin
      .from('users')
      .update({
        name: normalizedName,
        mobile: normalizedPhone,
        school: normalizedCollege,
        role: 'individual',
        audience_type: 'ST',
      })
      .eq('id', authData.user.id);

    if (profileError) {
      console.error('[placement/register] Profile update failed:', profileError);
    }

    return NextResponse.json({ success: true, userId: authData.user.id, updated: false });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('[placement/register] Error saving registration:', err);
    return NextResponse.json({ error: err.message || 'Failed to save registration' }, { status: 500 });
  }
}
