import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role, grade, mobile, school, city } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const normalizedEmail = String(email).trim().toLowerCase();

    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers({
      email: normalizedEmail,
    });

    if (listError) {
      return NextResponse.json({ error: "Unable to verify account status. Try again." }, { status: 400 });
    }

    const existing = existingUsers.users.find((u: any) => u.email?.toLowerCase() === normalizedEmail);

    if (existing) {
      if (existing.email_confirmed_at) {
        return NextResponse.json({ success: true, user: { id: existing.id, email: normalizedEmail }, emailConfirmed: true, alreadyExists: true });
      }

      const { error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(
        existing.id,
        { email_confirm: true }
      );

      return NextResponse.json({ success: true, user: { id: existing.id, email: normalizedEmail }, emailConfirmed: !confirmError, alreadyExists: true });
    }

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: normalizedEmail,
      password: String(password),
      email_confirm: true,
      user_metadata: { full_name: name },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user.id;

    const { error: profileError } = await supabaseAdmin
      .from("users")
      .upsert(
        [
          {
            id: userId,
            email: normalizedEmail,
            name,
            role: role === 'school' || role === 'admin' ? role : 'student',
            mobile: mobile || null,
            school: school || null,
            city: city || null,
            education_level: grade || null,
            password: password || null,
          },
        ],
        { onConflict: "id" }
      );

    if (profileError) {
      console.error("Profile upsert error:", profileError.message);
    }

    return NextResponse.json({ success: true, user: { id: userId, email: normalizedEmail }, emailConfirmed: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Registration failed." }, { status: 500 });
  }
}
