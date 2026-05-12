import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// This route uses the Service Role key to bypass RLS and provision users server-side
// It must NEVER be exposed to the client



interface StudentRow {
  Name: string;
  Email: string;
  Grade?: string;
}

export async function POST(req: NextRequest) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  try {
    // Verify caller is an authenticated institutional admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    // Verify the caller is an institutional user
    const { data: profile } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'institutional') {
      return NextResponse.json({ error: 'Forbidden: Only institutional accounts can bulk-provision students.' }, { status: 403 });
    }

    const { students } = await req.json() as { students: StudentRow[] };

    if (!students || !Array.isArray(students) || students.length === 0) {
      return NextResponse.json({ error: 'No student data provided' }, { status: 400 });
    }

    const results = {
      success: 0,
      skipped: 0,
      failed: 0,
      errors: [] as string[],
    };

    const tempPassword = `MentorMe@${Math.floor(1000 + Math.random() * 9000)}`;

    for (const student of students) {
      const email = student.Email?.trim().toLowerCase();
      const name = student.Name?.trim();

      if (!email || !name) {
        results.failed++;
        results.errors.push(`Skipped row — missing Name or Email: ${JSON.stringify(student)}`);
        continue;
      }

      try {
        // Create auth user via Admin API (bypasses email confirmation)
        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email,
          password: tempPassword,
          email_confirm: true, // Auto-confirm email
          user_metadata: { full_name: name },
        });

        if (createError) {
          // If user already exists, skip gracefully
          if (createError.message.includes('already registered')) {
            results.skipped++;
            continue;
          }
          throw createError;
        }

        if (newUser.user) {
          // The DB trigger will auto-create the public.users row,
          // but we also update it with the name explicitly
          await supabaseAdmin
            .from('users')
            .update({ name })
            .eq('id', newUser.user.id);

          // Send welcome email with temp password via Resend
          await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/welcome`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, tempPassword }),
          });
        }

        results.success++;
      } catch (err: unknown) {
        results.failed++;
        results.errors.push(`Failed for ${email}: ${(err as Error).message}`);
      }
    }

    return NextResponse.json({
      message: `Provisioning complete.`,
      results,
      tempPasswordUsed: tempPassword,
      note: 'Students have been emailed their login credentials. Ask them to change passwords on first login.',
    });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Bulk provisioning error:', err);
    return NextResponse.json({ error: err.message || 'Bulk provisioning failed' }, { status: 500 });
  }
}
