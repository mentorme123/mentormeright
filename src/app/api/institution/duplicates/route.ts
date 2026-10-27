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
      return NextResponse.json({ error: 'Institution name is required', status: 400 });
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

    const duplicateGroups: Array<{ email: string; keep: string; remove: string[] }> = [];
    let totalDuplicates = 0;
    let kept = 0;

    for (const [email, group] of emailGroups) {
      if (group.length <= 1) {
        kept += group.length;
        continue;
      }
      const [oldest, ...duplicates] = group;
      kept += 1;
      const duplicateIds = duplicates.map(d => d.id);
      totalDuplicates += duplicateIds.length;
      duplicateGroups.push({
        email,
        keep: oldest.id,
        remove: duplicateIds,
      });
    }

    return NextResponse.json({
      deleted: 0,
      kept,
      duplicateCount: totalDuplicates,
      duplicateGroups,
      message: 'No users were deleted. Duplicate IDs are reported for manual review.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Duplicates check error:', err);
    return NextResponse.json({ error: err.message || 'Failed to scan for duplicates' }, { status: 500 });
  }
}
