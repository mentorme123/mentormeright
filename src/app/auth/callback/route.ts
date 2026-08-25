import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const productionBase = 'https://mentormeright.com';
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/';

    const forwardedHost = request.headers.get('x-forwarded-host');
    const isLocal = process.env.NODE_ENV === 'development';
    const base = isLocal ? origin : (forwardedHost ? `https://${forwardedHost}` : origin);

    if (!code) {
      console.log('[auth/callback] No code found, redirecting to login');
      return NextResponse.redirect(new URL('/login?error=Authentication%20failed', productionBase));
    }

    const supabase = createClient();
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error || !session) {
      console.error('[auth/callback] Session exchange error:', error);
      return NextResponse.redirect(new URL('/login?error=Authentication%20failed', productionBase));
    }

    console.log('[auth/callback] Session created for user:', session.user.id);

    const { data: userProfile } = await supabase
      .from('users')
      .select('id, role')
      .eq('id', session.user.id)
      .maybeSingle();

    if (!userProfile) {
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
      
      return NextResponse.redirect(new URL(next, productionBase));
    }

    if (userProfile) {
      console.log('[auth/callback] Existing profile role:', userProfile.role);
      if (userProfile.role === 'individual') {
        return NextResponse.redirect(new URL(next, productionBase));
      } else if (userProfile.role === 'institutional') {
        return NextResponse.redirect(new URL('/dashboard/institution', productionBase));
      } else if (userProfile.role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard/admin', productionBase));
      } else if (userProfile.role === 'counselor') {
        return NextResponse.redirect(new URL('/dashboard/counselor', productionBase));
      }
    }

    const redirectUrl = new URL(next, productionBase);
    console.log('[auth/callback] Redirecting to:', redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error('[auth/callback] Critical error:', err);
    return NextResponse.redirect(new URL('/login?error=Authentication%20failed', productionBase));
  }
}
