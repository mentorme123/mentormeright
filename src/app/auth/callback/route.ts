import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/';

    const forwardedHost = request.headers.get('x-forwarded-host');
    const isLocal = process.env.NODE_ENV === 'development';
    const base = isLocal ? origin : (forwardedHost ? `https://${forwardedHost}` : origin);

    if (!code) {
      console.log('[auth/callback] No code found, redirecting to login');
      return NextResponse.redirect(new URL('/login?error=Authentication%20failed', base));
    }

    const supabase = createClient();
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error || !session) {
      console.error('[auth/callback] Session exchange error:', error);
      return NextResponse.redirect(new URL('/login?error=Authentication%20failed', base));
    }

    console.log('[auth/callback] Session created for user:', session.user.id);

    let userProfile = null;
    let profileError = null;
    
    try {
      const result = await supabase
        .from('users')
        .select('id, role')
        .eq('id', session.user.id)
        .single();
      userProfile = result.data;
      profileError = result.error;
    } catch (e) {
      profileError = e instanceof Error ? e : new Error(String(e));
    }

    if (profileError && profileError.code === 'PGRST116') {
      console.log('[auth/callback] Profile not found, creating one for:', session.user.id);
      const email = session.user.email;
      const name = session.user.user_metadata?.full_name || email?.split('@')[0] || 'User';

      const { error: insertError } = await supabase
        .from('users')
        .insert([
          { 
            id: session.user.id, 
            email: email, 
            name: name,
            role: 'individual'
          }
        ]);

      if (insertError) {
        console.error('[auth/callback] Profile creation error:', insertError);
      } else {
        console.log('[auth/callback] Profile created successfully');
      }
      
      return NextResponse.redirect(new URL('/career-assessment.html', base));
    }

    if (userProfile) {
      console.log('[auth/callback] Existing profile role:', userProfile.role);
      if (userProfile.role === 'individual') {
        return NextResponse.redirect(new URL('/career-assessment.html', base));
      } else if (userProfile.role === 'institutional') {
        return NextResponse.redirect(new URL('/career-assessment.html', base));
      } else if (userProfile.role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard/admin', base));
      } else if (userProfile.role === 'counselor') {
        return NextResponse.redirect(new URL('/dashboard/counselor', base));
      }
    }

    const redirectUrl = new URL(next, base);
    console.log('[auth/callback] Redirecting to:', redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error('[auth/callback] Critical error:', err);
    const base = process.env.NODE_ENV === 'development' 
      ? new URL(request.url).origin 
      : `https://${request.headers.get('x-forwarded-host') || new URL(request.url).origin}`;
    return NextResponse.redirect(new URL('/login?error=Authentication%20failed', base));
  }
}
