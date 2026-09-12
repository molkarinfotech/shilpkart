import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  // Refresh the session cookie on every request so `@supabase/ssr` stays
  // in sync with the browser store. This is the recommended pattern from
  // `@supabase/ssr` for the Next.js App Router.
  response = await updateSession(request, response);

  const isAuthPage =
    request.nextUrl.pathname.startsWith('/auth/login') ||
    request.nextUrl.pathname.startsWith('/auth/signup');

  const isProtectedPage =
    request.nextUrl.pathname.startsWith('/account') ||
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/seller/dashboard') ||
    request.nextUrl.pathname.startsWith('/admin');

  const isCart = request.nextUrl.pathname.startsWith('/cart');
  const isCheckout = request.nextUrl.pathname.startsWith('/checkout');

  // Do not redirect bundler/asset requests or API routes into the auth flow.
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/favicon') ||
    request.nextUrl.pathname.includes('.') ||
    request.nextUrl.pathname.startsWith('/api/')
  ) {
    return response;
  }

  const session =
    (await import('@/lib/supabase/server').then((m) => m.getSession())) ??
    null;

  if (isAuthPage) {
    // Already logged in: send them to the dashboard.
    if (session) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
    return response;
  }

  if (isProtectedPage) {
    // Not logged in: redirect to login, keeping the intended destination.
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      url.searchParams.set('redirectTo', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  // Seller dashboard: only verified sellers may enter.
  if (request.nextUrl.pathname.startsWith('/seller/dashboard')) {
    if (session) {
      const { isVerifiedSeller } = await import('@/lib/supabase/server');
      const role = (await import('@/lib/supabase/server').then(
        (m) => m.getUserRole()
      )) as string | null;
      const userId = session.user.id;

      if (!(await isVerifiedSeller(userId, role))) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      }
    }
  }

  // Admin routes: only the marketplace admin may enter.
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (session) {
      const { isMarketplaceAdmin } = await import('@/lib/supabase/server');
      if (!(await isMarketplaceAdmin())) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      }
    }
  }

  // Cart and checkout: keep working for guests; nothing to guard here.
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
