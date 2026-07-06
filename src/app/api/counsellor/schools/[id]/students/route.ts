import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const schoolId = params.id;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const { data: school, error: schoolError } = await supabaseAdmin
      .from('institutions')
      .select('id, name')
      .eq('id', schoolId)
      .single();

    if (schoolError || !school) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }

    const { data: users, error: usersError } = await supabaseAdmin
      .from('users')
      .select('id, name, email, education_level, created_at')
      .eq('role', 'individual')
      .or(`institution_name.eq.${school.name},institution_id.eq.${schoolId}`)
      .order('name', { ascending: true });

    if (usersError) {
      return NextResponse.json({ error: usersError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      school: { id: school.id, name: school.name },
      students: users || []
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch students';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
