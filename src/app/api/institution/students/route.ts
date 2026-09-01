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

export async function PATCH(req: NextRequest) {
  try {
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { searchParams } = new URL(req.url);
    const institutionName = String(searchParams.get('institution') || '').trim();

    let query = supabaseAdmin
      .from('users')
      .select('id, name, email')
      .eq('role', 'individual');

    if (institutionName) {
      query = query.ilike('institution_name', institutionName);
    }

    const { data: studentList, error: studentError } = await query;
    if (studentError) {
      console.error('Failed to fetch students for migration:', studentError.message);
      return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
    }

    const results: Array<{ id: string; name: string; oldEmail: string; newEmail?: string; status: string; error?: string }> = [];
    const batchSize = 20;

    for (let i = 0; i < (studentList || []).length; i += batchSize) {
      const batch = (studentList || []).slice(i, i + batchSize);
      const batchPromises = batch.map(async (student) => {
        const digits = String(student.name || '').replace(/[^0-9]/g, '').slice(0, 20);
        const newEmail = digits ? `E${digits}@mentormeright.com` : student.email;

        if (newEmail === student.email) {
          return { id: student.id, name: student.name, oldEmail: student.email, status: 'skipped' };
        }

        try {
          await supabaseAdmin.auth.admin.updateUserById(student.id, {
            email: newEmail,
          });
          await supabaseAdmin
            .from('users')
            .update({ email: newEmail })
            .eq('id', student.id);
          return { id: student.id, name: student.name, oldEmail: student.email, newEmail, status: 'updated' };
        } catch (authError: unknown) {
          const err = authError as Error;
          console.error(`Failed to migrate email for ${student.name}:`, err);
          return { id: student.id, name: student.name, oldEmail: student.email, newEmail, status: 'error', error: err.message };
        }
      });

      const settledResults = await Promise.allSettled(batchPromises);
      for (const result of settledResults) {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        }
      }
    }

    const updated = results.filter(r => r.status === 'updated').length;
    const skipped = results.filter(r => r.status === 'skipped').length;
    const errors = results.filter(r => r.status === 'error').length;

    return NextResponse.json({ success: true, updated, skipped, errors, results });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Migration error:', err);
    return NextResponse.json({ error: err.message || 'Failed to migrate emails' }, { status: 500 });
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

    const sanitizedName = String(name).trim().slice(0, 100);
    const sanitizedGrade = String(grade || '').trim().slice(0, 50);
    const sanitizedInstitution = String(institutionName || 'Institution').trim().slice(0, 100);

    const emailDigits = String(name).replace(/[^0-9]/g, '').slice(0, 20);
    const generatedEmail = emailDigits ? `E${emailDigits}@mentormeright.com` : '';
    const finalEmail = generatedEmail || email;
    const generatedPassword = emailDigits ? `E@${emailDigits}` : 'MentorMe@123';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(finalEmail)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', finalEmail)
      .maybeSingle();

    if (existingUser) {
      await supabaseAdmin
        .from('users')
        .update({ institution_name: sanitizedInstitution, education_level: sanitizedGrade || null })
        .eq('id', existingUser.id);
      return NextResponse.json({ success: true, student: { id: existingUser.id, email: finalEmail, name: sanitizedName, password: generatedPassword } });
    }

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: finalEmail,
      password: generatedPassword,
      email_confirm: true,
      user_metadata: { full_name: sanitizedName }
    });

    if (authError) {
      return NextResponse.json({ error: authError.message || 'Failed to create user' }, { status: 400 });
    }

    const { error: profileError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authData.user.id,
        email: finalEmail,
        name: sanitizedName,
        role: 'individual',
        education_level: sanitizedGrade || null,
        institution_name: sanitizedInstitution,
        audience_type: sanitizedGrade === 'Working Professional' ? 'WP' : (sanitizedGrade === 'Graduate' ? 'GR' : 'ST')
      });

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, student: { id: authData.user.id, email: finalEmail, name: sanitizedName, password: generatedPassword } });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Create student error:', err);
    return NextResponse.json({ error: err.message || 'Failed to create student' }, { status: 500 });
  }
}
