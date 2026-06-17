"use server";

import { createClient } from "@supabase/supabase-js";

export async function registerUser(data: {
  email: string;
  password: string;
  fullName: string;
  role: string;
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: { full_name: data.fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (authError) {
    return { success: false, error: authError.message };
  }
  if (!authData.user) {
    return { success: false, error: "Registration failed to return user data." };
  }

  const userId = authData.user.id;

  const { error: profileError } = await supabase
    .from("users")
    .upsert(
      [{ id: userId, email: data.email, name: data.fullName, role: data.role }],
      { onConflict: "id" }
    );

  if (profileError) {
    console.warn("Profile upsert delay:", profileError.message);
  }

  const { error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    { email_confirm: true }
  );

  if (confirmError) {
    console.error("Email confirmation error:", confirmError);
  }

  return {
    success: true,
    user: { id: userId, email: data.email },
    emailConfirmed: !confirmError,
  };
}
