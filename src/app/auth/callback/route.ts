import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createClient();
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && session) {
      // Check if user exists in the public.users table
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('id, role')
        .eq('id', session.user.id)
        .single();

      // If user profile doesn't exist, we must create one for them.
      // This happens the first time they sign up with Google.
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
              role: 'individual' // Defaulting Google sign-ups to Student/Individual
            }
          ]);
        
        // Redirect new students to the assessment page
        return NextResponse.redirect("https://mentormeright-gud43a1bj-mentorme123s-projects.vercel.app/career-assessment.html");
      }

      // If they already exist, redirect them based on their role, unless a specific 'next' was provided
      if (next === '/' && userProfile) {
        if (userProfile.role === 'individual') {
          // Always redirect to assessment after login/register
          return NextResponse.redirect("https://mentormeright-gud43a1bj-mentorme123s-projects.vercel.app/career-assessment.html");
        } else if (userProfile.role === 'institutional') {
          return NextResponse.redirect(`${origin}/dashboard/institution`);
        } else if (userProfile.role === 'admin') {
          return NextResponse.redirect(`${origin}/dashboard/admin`);
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions if auth fails
  return NextResponse.redirect(`${origin}/login?error=Authentication%20failed`);
}
