'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Sign up failed. Please try again.');
        return;
      }

      // Supabase returns `data.user` even for unconfirmed signups, but we
      // redirect to the dashboard and let the session middleware handle the
      // "can I actually use the platform right now?" question.
      router.push('/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-md px-5 py-20">
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-orange-100">
          <h1 className="text-3xl font-bold text-stone-900">Create an account</h1>
          <p className="mt-2 text-stone-600">
            Join ShilpKart to browse handmade pieces and, if you craft, apply to
            become a seller.
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="sr-only" htmlFor="signup-name">
                Full name
              </label>
              <input
                id="signup-name"
                className="w-full rounded-xl border border-stone-200 px-4 py-3"
                placeholder="Your name"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="signup-email">
                Email address
              </label>
              <input
                id="signup-email"
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
              <label className="sr-only" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
                className="w-full rounded-xl border border-stone-200 px-4 py-3"
                placeholder="Password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-700 px-4 py-3 font-bold text-white transition hover:bg-orange-800 disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-sm text-stone-600">
            Already have an account?{' '}
            <a href="/auth/login" className="font-bold text-orange-700">
              Sign in
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
