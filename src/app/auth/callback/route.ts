import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  const forwardedHost = request.headers.get('x-forwarded-host');
  const isLocal = process.env.NODE_ENV === 'development';
  const base = isLocal ? origin : (forwardedHost ? `https://${forwardedHost}` : origin);

  if (code) {
    const supabase = createClient();
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && session) {
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('id, role')
        .eq('id', session.user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        const email = session.user.email;
        const name = session.user.user_metadata?.full_name || email?.split('@')[0] || 'User';

        await supabase
          .from('users')
          .insert([
            { 
              id: session.user.id, 
              email: email, 
              name: name,
              role: 'individual'
            }
          ]);
        
        return NextResponse.redirect("/career-assessment.html");
      }

      if (userProfile) {
        if (userProfile.role === 'individual') {
          return NextResponse.redirect("/career-assessment.html");
        } else if (userProfile.role === 'institutional') {
          return NextResponse.redirect(`${base}/dashboard/institution`);
        } else if (userProfile.role === 'admin') {
          return NextResponse.redirect(`${base}/dashboard/admin`);
        }
      }

      return NextResponse.redirect(`${base}${next}`);
    }
  }

  return NextResponse.redirect(`${base}/login?error=Authentication%20failed`);
}
