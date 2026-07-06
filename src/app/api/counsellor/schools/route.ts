import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const { data: schools, error } = await supabaseAdmin
      .from('institutions')
      .select('id, name, contact_email, created_at')
      .order('name', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, schools: schools || [] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch schools';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
