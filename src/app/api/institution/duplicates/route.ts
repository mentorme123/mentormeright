import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { searchParams } = new URL(req.url);
    const institutionName = String(searchParams.get('institution') || '').trim();

    if (!institutionName) {
      return NextResponse.json({ error: 'Institution name is required' }, { status: 400 });
    }

    const { data: students, error: studentError } = await supabaseAdmin
      .from('users')
      .select('id, email, name, created_at, institution_name')
      .eq('role', 'individual')
      .ilike('institution_name', institutionName)
      .order('created_at', { ascending: true });

    if (studentError) {
      console.error('Failed to fetch students:', studentError);
      return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
    }

    const studentList = students || [];
    const emailGroups = new Map<string, typeof studentList>();
    for (const s of studentList) {
      const key = String(s.email || '').toLowerCase().trim();
      if (!key) continue;
      if (!emailGroups.has(key)) emailGroups.set(key, []);
      emailGroups.get(key)!.push(s);
    }

    let deleted = 0;
    let kept = 0;
    for (const [, group] of emailGroups) {
      if (group.length <= 1) {
        kept += group.length;
        continue;
      }
      const [oldest, ...duplicates] = group;
      kept += 1;
      const idsToDelete = duplicates.map(d => d.id);
      for (const id of idsToDelete) {
        const { error: delError } = await supabaseAdmin.auth.admin.deleteUser(id);
        if (delError) {
          console.error(`Failed to delete duplicate ${id}:`, delError);
        } else {
          deleted += 1;
        }
      }
    }

    return NextResponse.json({ deleted, kept });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Delete duplicates error:', err);
    return NextResponse.json({ error: err.message || 'Failed to delete duplicates' }, { status: 500 });
  }
}
