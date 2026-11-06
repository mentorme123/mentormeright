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
      .select('id, name, email, education_level, institution_name')
      .eq('role', 'individual')
      .ilike('institution_name', institutionName)
      .order('name', { ascending: true });

    if (studentError) {
      console.error('Failed to fetch students:', studentError);
      return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
    }

    const studentList = students || [];

    const results: Array<{ name: string; username: string; password: string; education_level?: string | null; institution_name?: string | null; error?: string }> = [];

    // Password overrides for exceptions where formula doesn't match stored auth password
    const passwordOverrides: Record<string, string> = {
      'abdul_hadi@mentormeright.in': 'MMabdulhadi1@123',
    };

    const generateCredentials = (email: string) => {
      const override = passwordOverrides[email.toLowerCase()];
      if (override) {
        return { username: email, password: override };
      }
      const local = String(email || '').split('@')[0];
      if (/^R\d+$/i.test(local)) {
        const digits = local.replace(/^R/i, '').slice(0, 20);
        return { username: email, password: `R@${digits}` };
      }
      return { username: email, password: `MM${local.replace(/[^a-z0-9]/gi, '')}@123` };
    };

    for (const student of studentList) {
      const sanitizedName = String(student.name || '').trim().slice(0, 100);
      const email = String(student.email || '').trim();
      const { username, password } = generateCredentials(email);

      results.push({ name: sanitizedName, username, password, education_level: student.education_level, institution_name: student.institution_name });
    }

    const csvHeader = 'Name,Username,Password,Class\n';
    const csvRows = results.map(r => {
      const escapedName = `"${(r.name || '').replace(/"/g, '""')}"`;
      const escapedUsername = `"${(r.username || '').replace(/"/g, '""')}"`;
      const escapedPassword = `"${(r.password || '').replace(/"/g, '""')}"`;
      const cls = (r.education_level || r.institution_name || '').replace(/"/g, '""');
      return `${escapedName},${escapedUsername},${escapedPassword},"${cls}"`;
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
