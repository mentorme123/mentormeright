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
    const userRole = (user.user_metadata as Record<string, string> | undefined)?.role;
    if (userRole === 'admin') {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone()
    url.pathname = '/auth/route-director' 
    return NextResponse.redirect(url)
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
