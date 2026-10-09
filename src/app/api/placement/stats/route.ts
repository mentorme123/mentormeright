import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase environment variables are not configured');
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('placement_results')
      .select('user_id');

    if (error) {
      console.error('Error fetching placement stats:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rows = data || [];
    const total = rows.length;
    const uniqueStudents = new Set(rows.map((r: any) => r.user_id).filter(Boolean)).size;

    return NextResponse.json({ total, uniqueStudents });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error fetching placement stats:', err);
    return NextResponse.json({ error: err.message || 'Failed to fetch placement stats' }, { status: 500 });
  }
}
