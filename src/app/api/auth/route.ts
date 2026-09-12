import { NextRequest, NextResponse } from 'next/server';
import { signIn, signUp, signOut } from '@/lib/supabase/auth';

export async function POST(request: NextRequest) {
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
        console.error('Sign-in error:', error);
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
        console.error('Sign-up error:', error);
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
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
