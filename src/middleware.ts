import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  
  const isTestRoute = pathname.startsWith('/test') || pathname.startsWith('/counsellors/book');
  const isProtectedPage = isTestRoute || pathname.startsWith('/dashboard');

  if (!user && isProtectedPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user && isAuthPage) {
    const metadataRole = (user.user_metadata as Record<string, string | undefined>)?.role;
    if (metadataRole === 'admin') {
      return NextResponse.next();
    }

    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    const dbRole = profile?.role;

    if (dbRole === 'counselor') {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard/counselor'
      return NextResponse.redirect(url)
    }

    if (dbRole === 'institutional') {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard/institution'
      return NextResponse.redirect(url)
    }

    if (dbRole === 'admin') {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone()
    url.pathname = '/auth/route-director' 
    return NextResponse.redirect(url)
  }

  if (user && pathname === '/') {
    const metadataRole = (user.user_metadata as Record<string, string | undefined>)?.role;
    let userRole = metadataRole;

    if (!userRole || !['institutional', 'admin', 'counselor'].includes(userRole)) {
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
      userRole = profile?.role;
    }

    if (userRole === 'institutional' || userRole === 'counselor' || userRole === 'admin') {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.json (PWA manifest – must be publicly accessible)
     * - sw.js (Service Worker – must be publicly accessible)
     * - Static asset extensions (svg, png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest\\.json|sw\\.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
