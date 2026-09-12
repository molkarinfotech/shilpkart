import { type NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from './auth';

/**
 * Refreshes the Supabase session cookie on each request so the browser and
 * server stay in sync. This is the recommended `@supabase/ssr` pattern for
 * the Next.js App Router — without it the session can drift during navigation.
 */
export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  try {
    const supabase = createServerSupabaseClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // The user is authenticated — no extra work needed; the cookie exchange
    // in `createServerClient` has already refreshed the cookies for this
    // response. Future requests will pick up the refreshed session.
    if (user) {
      return response;
    }
  } catch (error) {
    // If the cookie exchange fails (expired/deleted session), the request
    // continues as unauthenticated. No error page — pages handle that.
    console.error('Session refresh failed:', error);
  }

  return response;
}
