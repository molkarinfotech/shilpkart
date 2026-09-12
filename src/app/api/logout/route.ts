import { type NextRequest, NextResponse } from 'next/server';
import { signOut } from '@/lib/supabase/auth';

export async function POST(request: NextRequest) {
  const { error } = await signOut();
  if (error) {
    console.error('Sign out failed:', error);
  }

  const response = NextResponse.json({ ok: true });
  // Clear the Supabase cookies so the session is fully dropped.
  const authCookies = [
    { name: 'sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/[^a-zA-Z0-9]/g, '_') + '-auth-token', options: { path: '/', secure: true, sameSite: 'lax' as const, maxAge: 0 } },
    { name: 'sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/[^a-zA-Z0-9]/g, '_') + '-refresh-token', options: { path: '/', secure: true, sameSite: 'lax' as const, maxAge: 0 } },
    { name: 'sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/[^a-zA-Z0-9]/g, '_') + '-timestamp', options: { path: '/', secure: true, sameSite: 'lax' as const, maxAge: 0 } },
  ];
  for (const cookie of authCookies) {
    if (cookie.name) {
      response.cookies.set(cookie.name, '', cookie.options);
    }
  }
  return response;
}
