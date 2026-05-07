import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { event_type, path } = await req.json();

    if (!event_type) {
      return NextResponse.json({ error: 'Missing event_type' }, { status: 400 });
    }

    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase environment variables missing');
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Sanitize path to prevent injection
    const sanitizedPath = path ? String(path).slice(0, 500) : null;

    const { error } = await supabase.from('analytics_events').insert({
      event_type,
      path: sanitizedPath,
    });

    if (error) {
      console.error('Analytics insert error:', error);
      // Don't fail the request even if DB insert fails
      return NextResponse.json({ success: false, error: error.message });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Analytics API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
