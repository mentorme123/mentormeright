import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { processDashboardJob } from '@/lib/process-dashboard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
  // Protect with CRON_SECRET
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get('authorization') || '';
  const provided = authHeader.replace('Bearer ', '');
  if (!cronSecret || provided !== cronSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const admin = getSupabaseAdmin();
  const BATCH_SIZE = 25;
  let processed = 0;
  let hasMore = true;

  while (hasMore && processed < BATCH_SIZE * 4) {
    // Claim a batch of jobs
    const { data: jobs, error: claimError } = await admin.rpc('claim_dashboard_jobs', {
      p_limit: BATCH_SIZE
    });
    if (claimError) {
      return NextResponse.json({ error: claimError.message, processed }, { status: 500 });
    }
    if (!jobs || jobs.length === 0) {
      hasMore = false;
      break;
    }

    for (const job of jobs) {
      const result = await processDashboardJob(admin, job);
      processed++;
      if (result.status === 'error') {
        console.error('Dashboard job error:', result.studentId, result.message);
      }
    }

    // If we got a full batch, there may be more
    if (jobs.length < BATCH_SIZE) {
      hasMore = false;
    }
  }

  return NextResponse.json({ ok: true, processed });
}

export async function POST(req: NextRequest) {
  // Manual trigger endpoint (also protected)
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get('authorization') || '';
  const provided = authHeader.replace('Bearer ', '');
  if (!cronSecret || provided !== cronSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return GET(req);
}
