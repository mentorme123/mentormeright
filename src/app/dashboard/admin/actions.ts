"use server";

import { createClient } from "@supabase/supabase-js";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchAllUsers() {
  noStore();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const userIds = (data || []).map((u: any) => u.id).filter(Boolean);
  const completedUserIds = new Set<string>();
  if (userIds.length > 0) {
    const { data: assessmentData } = await supabaseAdmin
      .from('assessment_results')
      .select('user_id')
      .in('user_id', userIds);

    (assessmentData || []).forEach((a: any) => {
      if (a.user_id) completedUserIds.add(a.user_id);
    });
  }

  return (data || []).map((u: any) => ({
    ...u,
    assessment_results: completedUserIds.has(u.id) ? [{ id: 'completed' }] : []
  }));
}

export async function fetchRoleCounts() {
  noStore();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { count: total } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact', head: true });

  const roles = ['individual', 'institutional', 'admin', 'counselor'] as const;
  const counts: Record<string, number> = { total: total || 0 };

  for (const role of roles) {
    const { count } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', role);
    counts[role] = count || 0;
  }

  return counts;
}
