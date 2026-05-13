"use server";

import { createClient } from "@supabase/supabase-js";

export async function syncUserProfile(user: any) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  // Use service role key to bypass RLS
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // 1. Get profile
  let { data: userProfile, error: fetchError } = await supabaseAdmin
    .from('users')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (fetchError) {
    console.error("Profile fetch error:", fetchError);
    throw new Error(`Failed to fetch profile: ${fetchError.message}`);
  }

  // 2. If not exists, create
  if (!userProfile) {
    console.log("Profile not found, creating one for ID:", user.id);
    const { data: newProfile, error: createError } = await supabaseAdmin
      .from('users')
      .insert([{ 
        id: user.id, 
        email: user.email, 
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Unknown', 
        role: 'individual' 
      }])
      .select('role')
      .single();
    
    if (createError) {
      console.error("Profile creation error:", createError);
      throw new Error(`Failed to create profile: ${createError.message}`);
    }
    
    if (!newProfile) {
      throw new Error("Profile creation succeeded but no data was returned.");
    }

    userProfile = newProfile;
  }

  return userProfile;
}
