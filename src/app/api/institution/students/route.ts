import { NextRequest, NextResponse } from 'next/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const institutionName = String(searchParams.get('institution') || '').trim();

    const supabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let query = supabase
      .from('users')
      .select(`
        id,
        name,
        email,
        education_level,
        role,
        assessment_results (
          id
        )
      `)
      .eq('role', 'individual');

    if (institutionName) {
      query = query.ilike('institution_name', institutionName);
    }

    const { data: studentList, error: studentError } = await query.order('name', { ascending: true });

    if (studentError) {
      console.error('Failed to fetch students:', studentError.message);
      return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
    }

    return NextResponse.json({ students: studentList || [] });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Failed to fetch students:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { name, email, grade, institutionName } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    const sanitizedName = String(name).trim().slice(0, 100);
    const sanitizedGrade = String(grade || '').trim().slice(0, 50);
    const sanitizedInstitution = String(institutionName || 'Institution').trim().slice(0, 100);

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: 'MentorMe@123',
      email_confirm: true,
      user_metadata: { full_name: sanitizedName }
    });

    if (authError) {
      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle();
      if (existingUser) {
        await supabaseAdmin
          .from('users')
          .update({ institution_name: sanitizedInstitution })
          .eq('id', existingUser.id);
        return NextResponse.json({ success: true, student: { id: existingUser.id, email, name: sanitizedName } });
      }
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const { error: profileError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        name: sanitizedName,
        role: 'individual',
        education_level: sanitizedGrade || null,
        institution_name: sanitizedInstitution,
        audience_type: sanitizedGrade === 'Working Professional' ? 'WP' : (sanitizedGrade === 'Graduate' ? 'GR' : 'ST')
      });

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, student: { id: authData.user.id, email, name: sanitizedName } });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Create student error:', err);
    return NextResponse.json({ error: err.message || 'Failed to create student' }, { status: 500 });
  }
}
