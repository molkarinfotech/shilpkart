'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('shilpkart_login_error');
    if (saved) {
      setError(saved);
      sessionStorage.removeItem('shilpkart_login_error');
    }
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sign-in', email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Sign in failed. Check your email and password.');
        sessionStorage.setItem('shilpkart_login_error', data.error ?? 'Sign in failed.');
        return;
      }

      router.push(redirectTo);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && (
        <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="sr-only" htmlFor="login-email">
            Email address
          </label>
          <input
            id="login-email"
            className="w-full rounded-xl border border-stone-200 px-4 py-3"
            placeholder="Email address"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="sr-only" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            className="w-full rounded-xl border border-stone-200 px-4 py-3"
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-orange-700 px-4 py-3 font-bold text-white transition hover:bg-orange-800 disabled:cursor-wait disabled:opacity-70"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-sm text-stone-600">
        New to ShilpKart?{' '}
        <a href="/auth/signup" className="font-bold text-orange-700">
          Create an account
        </a>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-md px-5 py-20">
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-orange-100">
          <h1 className="text-3xl font-bold text-stone-900">Welcome back</h1>
          <p className="mt-2 text-stone-600">
            Sign in to manage your orders and saved crafts.
          </p>

          <Suspense fallback={<p className="mt-6 text-sm text-stone-500">Loading…</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
