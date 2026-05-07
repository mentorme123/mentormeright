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

    const results = [];
    const tempPassword = 'MentorMe@123'; // Standard temp password

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const student of students) {
      const { Name, Email, Grade } = student;

      if (!Email) continue;

      // Validate email format
      if (!emailRegex.test(Email)) {
        console.error(`Invalid email format for ${Email}`);
        results.push({ email: Email, status: 'error', error: 'Invalid email format' });
        continue;
      }

      // Sanitize inputs
      const sanitizedName = String(Name || '').slice(0, 100);
      const sanitizedGrade = String(Grade || '').slice(0, 50);

      // 1. Create Auth User
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: Email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: { full_name: sanitizedName }
      });

      if (authError) {
        console.error(`Error creating auth user for ${Email}:`, authError);
        results.push({ email: Email, status: 'error', error: authError.message });
        continue;
      }

      // 2. Create Public User Profile
      const { error: profileError } = await supabaseAdmin
        .from('users')
        .insert({
          id: authData.user.id,
          email: Email,
          name: sanitizedName,
          role: 'individual',
          education_level: sanitizedGrade,
          institution_name: String(institutionName || 'Institution').slice(0, 100),
          audience_type: sanitizedGrade === 'Working Professional' ? 'WP' : (sanitizedGrade === 'Graduate' ? 'GR' : 'ST')
        });

      if (profileError) {
        console.error(`Error creating profile for ${Email}:`, profileError);
        results.push({ email: Email, status: 'partial_success', error: 'Auth created but profile failed' });
      } else {
        // 3. Trigger Welcome Email
        try {
          await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/welcome`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: Name,
              email: Email,
              tempPassword: tempPassword
            })
          });
        } catch (emailErr) {
          console.error(`Failed to send welcome email to ${Email}:`, emailErr);
        }

        results.push({ email: Email, status: 'success' });
      }
    }

    return NextResponse.json({ success: true, results });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Bulk import error:', err);
    return NextResponse.json({ error: err.message || 'Failed to process bulk import' }, { status: 500 });
  }
}
