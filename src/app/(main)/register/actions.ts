"use server";

import { createClient } from "@supabase/supabase-js";

export async function registerUser(data: {
  email: string;
  password: string;
  fullName: string;
  role: string;
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const normalizedEmail = data.email.trim().toLowerCase();

  const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers({
    email: normalizedEmail,
  });

  if (listError) {
    console.error("User lookup error:", listError);
    return { success: false, error: "Unable to verify account status. Try again." };
  }

  const existing = existingUsers.users.find((u) => u.email?.toLowerCase() === normalizedEmail);

  if (existing) {
    if (existing.email_confirmed_at) {
      return {
        success: true,
        user: { id: existing.id, email: normalizedEmail },
        emailConfirmed: true,
        alreadyExists: true,
      };
    }

    const { error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(
      existing.id,
      { email_confirm: true }
    );

    if (confirmError) {
      console.error("Email confirmation error:", confirmError);
    }

    return {
      success: true,
      user: { id: existing.id, email: normalizedEmail },
      emailConfirmed: !confirmError,
      alreadyExists: true,
    };
  }

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: normalizedEmail,
    password: data.password,
    email_confirm: true,
    user_metadata: { full_name: data.fullName },
  });

  if (authError) {
    return { success: false, error: authError.message };
  }

  const userId = authData.user.id;

  const { error: profileError } = await supabaseAdmin
    .from("users")
    .upsert(
      [{ id: userId, email: normalizedEmail, name: data.fullName, role: data.role }],
      { onConflict: "id" }
    );

  if (profileError) {
    console.warn("Profile upsert error:", profileError.message);
  }

  return {
    success: true,
    user: { id: userId, email: normalizedEmail },
    emailConfirmed: true,
  };
}
