import { NextRequest, NextResponse } from 'next/server';
import { signIn, signUp, signOut } from '@/lib/supabase/auth';

export async function POST(request: NextRequest) {
  // Diagnostic: log env var state at request time
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
  console.log('[auth] NEXT_PUBLIC_SUPABASE_URL:', url ? `set (${url.substring(0, 25)}...)` : 'ABSENT');
  console.log('[auth] NEXT_PUBLIC_SUPABASE_ANON_KEY:', key ? `set (${key.substring(0, 8)}...)` : 'ABSENT');
  console.log('[auth] all process.env keys with SUPABASE:', Object.keys(process.env).filter((k) => k.toLowerCase().includes('supabase')));
  console.log('[auth] process.env.NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL ?? 'ABSENT');

  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'sign-in') {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json(
          { error: 'Email and password are required.' },
          { status: 400 }
        );
      }
      const { data, error } = await signIn(email, password);
      if (error) {
        return NextResponse.json(
          { error: error.message ?? 'Sign in failed.' },
          { status: 401 }
        );
      }
      return NextResponse.json({ ok: true });
    }

    if (action === 'sign-up') {
      const { email, password, fullName } = body;
      if (!email || !password || !fullName) {
        return NextResponse.json(
          { error: 'Email, password, and full name are required.' },
          { status: 400 }
        );
      }
      if (password.length < 8) {
        return NextResponse.json(
          { error: 'Password must be at least 8 characters.' },
          { status: 400 }
        );
      }
      const { data, error } = await signUp(email, password, fullName);
      if (error) {
        return NextResponse.json(
          { error: error.message ?? 'Sign up failed.' },
          { status: 400 }
        );
      }
      return NextResponse.json({
        ok: true,
        requiresEmailConfirmation: !data.session,
        user: data.user,
      });
    }

    if (action === 'sign-out') {
      await signOut();
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  } catch (error) {
    console.error('Auth API error:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Auth API error: ${message}` },
      { status: 500 }
    );
  }
}
