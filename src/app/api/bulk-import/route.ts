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

    const results: Array<{ username?: string; email?: string; name?: string; password?: string; status: string; error?: string }> = [];
    const tempPassword = 'MentorMe@123'; // Standard temp password

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const student of students) {
      const studentKeys = Object.keys(student);
      const nameKey = studentKeys.find(k => k.toLowerCase() === 'name' || k.toLowerCase() === 'full name' || k.toLowerCase() === 'full_name' || k.toLowerCase() === 'student name');
      const passwordKey = studentKeys.find(k => k.toLowerCase() === 'password');
      const rawName = String(student[nameKey || ''] || '').trim().replace(/\s+/g, ' ');
      const providedPassword = String(student[passwordKey || ''] || '').trim().replace(/\s+/g, ' ');

      if (!rawName) continue;

      const namePart = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
      const email = namePart ? `${namePart}@mentormeright.in` : `student${Date.now()}@mentormeright.in`;
      const password = providedPassword || `MM${namePart.replace(/_/g, '')}@123`;
      const sanitizedName = rawName.slice(0, 100);

      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: sanitizedName }
      });

      if (authError) {
        console.error(`Error creating auth user for ${rawName}:`, authError);
        results.push({ name: sanitizedName, email, status: 'error', error: authError.message });
        continue;
      }

      let profileError = null;
      try {
        profileError = await supabaseAdmin
          .from('users')
          .insert({
            id: authData.user.id,
            email,
            name: sanitizedName,
            role: 'individual',
            institution_name: String(institutionName || 'Institution').slice(0, 100),
            audience_type: 'ST'
          }).error;
      } catch (err) {
        profileError = err;
      }

      if (profileError) {
        console.error(`Error creating profile for ${rawName}:`, profileError);
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
