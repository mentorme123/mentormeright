import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceRole) {
    throw new Error('Supabase environment variables are not configured');
  }
  return createClient(supabaseUrl, supabaseServiceRole, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}

export async function GET() {
  try {
    const sbAdmin = getSupabaseAdmin();

    const { count: total, error: totalError } = await sbAdmin
      .from('placement_results')
      .select('*', { count: 'exact', head: true });

    if (totalError) {
      console.error('Error fetching placement stats:', totalError);
      return NextResponse.json({ error: totalError.message }, { status: 500 });
    }

    const { count: uniqueStudents, error: uniqueError } = await sbAdmin
      .from('placement_results')
      .select('user_id', { count: 'exact', head: true })
      .not('user_id', 'is', null);

    if (uniqueError) {
      console.error('Error fetching unique students:', uniqueError);
      return NextResponse.json({ error: uniqueError.message }, { status: 500 });
    }

    return NextResponse.json({ total: total || 0, uniqueStudents: uniqueStudents || 0 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching placement stats:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch placement stats' }, { status: 500 });
  }
}
