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
  } else if (!userProfile.role) {
    // 3. If exists but role is null, update it to 'individual'
    console.log("Profile found but role is null, updating to 'individual' for ID:", user.id);
    const { data: updatedProfile, error: updateError } = await supabaseAdmin
      .from('users')
      .update({ role: 'individual' })
      .eq('id', user.id)
      .select('role')
      .single();

    if (updateError) {
      console.error("Profile update error:", updateError);
      // Even if update fails, we can just return the default so user can login
      userProfile.role = 'individual';
    } else {
      userProfile = updatedProfile;
    }
  }

  return userProfile;
}
