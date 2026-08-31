import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const institutionName = String(searchParams.get('institution') || '').trim();

    if (!institutionName) {
      return NextResponse.json({ error: 'Institution name is required' }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: students, error: studentError } = await supabaseAdmin
      .from('users')
      .select('id, name, email, education_level, audience_type')
      .eq('role', 'individual')
      .ilike('institution_name', institutionName)
      .order('name', { ascending: true });

    if (studentError) {
      console.error('Failed to fetch students:', studentError);
      return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
    }

    const studentList = students || [];
    const results: Array<{ name: string; username: string; password: string; education_level?: string | null; audience_type?: string | null; error?: string }> = [];

    for (const student of studentList) {
      const sanitizedName = String(student.name || '').trim().slice(0, 100);
      const email = String(student.email || '').trim();
      const password = `MM${email.split('@')[0].replace(/[^a-z0-9]/gi, '')}@123`;

      try {
        await supabaseAdmin.auth.admin.updateUserById(student.id, {
          password: password,
        });
        results.push({ name: sanitizedName, username: email, password, education_level: student.education_level, audience_type: student.audience_type });
      } catch (authError: unknown) {
        const err = authError as Error;
        console.error(`Failed to update password for ${student.email}:`, err);
        results.push({ name: sanitizedName, username: email, password, education_level: student.education_level, audience_type: student.audience_type, error: err.message || 'Failed to update password' });
      }
    }

    const csvHeader = 'Username,Password,Class\n';
    const csvRows = results.map(r => {
      const escapedUsername = `"${(r.username || '').replace(/"/g, '""')}"`;
      const escapedPassword = `"${(r.password || '').replace(/"/g, '""')}"`;
      const cls = r.education_level ? String(r.education_level).replace(/"/g, '""') : '';
      return `${escapedUsername},${escapedPassword},"${cls}"`;
    }).join('\n');
    const csvContent = csvHeader + csvRows;

    const filename = `credentials_${institutionName.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv;charset=utf-8;',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Failed to generate credentials report:', err);
    return NextResponse.json({ error: err.message || 'Failed to generate credentials report' }, { status: 500 });
  }
}
