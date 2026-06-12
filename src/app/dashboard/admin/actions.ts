"use server";

import { createClient } from "@supabase/supabase-js";

export async function fetchAllUsers() {
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

  return data;
}

export async function fetchRoleCounts() {
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
