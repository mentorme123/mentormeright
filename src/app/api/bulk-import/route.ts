import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase environment variables missing');
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { students, institutionName } = await req.json();

    if (!students || !Array.isArray(students)) {
      return NextResponse.json({ error: 'Invalid students data' }, { status: 400 });
    }

    const results: Array<{ name?: string; email?: string; password?: string; status: string; error?: string }> = [];
    const sanitizedInstitution = String(institutionName || 'Institution').trim().slice(0, 100);

    for (const student of students) {
      const studentKeys = Object.keys(student);
      const nameKey = studentKeys.find(k => k.toLowerCase() === 'name' || k.toLowerCase() === 'full name' || k.toLowerCase() === 'full_name' || k.toLowerCase() === 'student name');
      const rawName = String(student[nameKey || ''] || '').trim().replace(/\s+/g, ' ');
      if (!rawName) continue;

      const namePart = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
      const email = namePart ? `${namePart}@mentormeright.in` : `student${Date.now()}@mentormeright.in`;
      const password = `MM${namePart.replace(/_/g, '')}@123`;
      const sanitizedName = rawName.slice(0, 100);

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
        results.push({ name: sanitizedName, email, password, status: 'success' });
        continue;
      }

      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: sanitizedName }
      });

      if (authError) {
        results.push({ name: sanitizedName, email, status: 'error', error: authError.message });
        continue;
      }

      const { error: profileError } = await supabaseAdmin
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          name: sanitizedName,
          role: 'individual',
          institution_name: sanitizedInstitution,
          audience_type: 'ST'
        });

      if (profileError) {
        results.push({ name: sanitizedName, email, password, status: 'partial_success', error: 'Auth created but profile failed' });
      } else {
        results.push({ name: sanitizedName, email, password, status: 'success' });
      }
    }

    return NextResponse.json({ success: true, results });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Bulk import error:', err);
    return NextResponse.json({ error: err.message || 'Failed to process bulk import' }, { status: 500 });
  }
}
