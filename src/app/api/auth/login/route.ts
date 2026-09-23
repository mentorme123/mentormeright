import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: { autoRefreshToken: false, persistSession: false },
      }
    );

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email: String(email).trim().toLowerCase(),
      password: String(password),
    });

    if (error || !data.user) {
      return NextResponse.json({ error: 'Invalid login details.' }, { status: 401 });
    }

    const { data: profile } = await supabaseAdmin
      .from('users')
      .select('id, email, name, role, grade, school, city, mobile, education_level, institution_name')
      .eq('id', data.user.id)
      .maybeSingle();

    const user = {
      id: data.user.id,
      email: data.user.email,
      name: profile?.name || data.user.user_metadata?.full_name || '',
      role: profile?.role || 'individual',
      grade: profile?.education_level || '',
      school: profile?.institution_name || '',
      city: profile?.city || '',
      mobile: profile?.mobile || '',
    };

    return NextResponse.json({ success: true, user });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || 'Login failed.' }, { status: 500 });
  }
}
