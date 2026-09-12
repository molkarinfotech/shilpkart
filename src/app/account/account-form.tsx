'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import type { User } from '@supabase/supabase-js';

type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  created_at: string;
  updated_at: string;
};

export function AccountForm({ profile, session }: { profile: Profile; session: User }) {
  const router = useRouter();
  const [fullName, setFullName] = useState(profile.full_name ?? '');
  const [phone, setPhone] = useState(profile.phone ?? '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ kind: 'error', text: data.error ?? 'Could not save changes.' });
        return;
      }

      setMessage({ kind: 'success', text: 'Profile updated.' });
      router.refresh();
    } catch {
      setMessage({ kind: 'error', text: 'Something went wrong.' });
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sign-out' }),
    });
    router.push('/auth/login');
    router.refresh();
  }

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-2xl px-5 py-20">
        <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-clay-600">
          Your account
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink-900">
          Manage your profile
        </h1>
        <p className="mt-3 text-ink-600">
          Signed in as {session.email}
        </p>

        <div className="mt-8 rounded-3xl border border-ink-200 bg-white p-6 shadow-sm">
          {message && (
            <div
              className={
                message.kind === 'success'
                  ? 'rounded-xl border border-moss-300 bg-moss-50 p-4 text-sm text-moss-800'
                  : 'rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800'
              }
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-ink-700">Full name</p>
              <input
                className="mt-2 w-full rounded-xl border border-ink-200 bg-sand-50 px-4 py-3 text-ink-900 focus:border-clay-500 outline-none transition"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-ink-700">
                Phone
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-ink-200 bg-sand-50 px-4 py-3 text-ink-900 focus:border-clay-500 outline-none transition"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Optional"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-ink-700">Role</p>
              <p className="mt-2 text-ink-600">{profile.role}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink-700">Email</p>
              <p className="mt-2 text-ink-600">{session.email}</p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-xl bg-ink-900 px-5 py-3 text-sm font-semibold text-sand-50 transition hover:bg-ink-800 disabled:cursor-wait disabled:opacity-70"
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-xl border border-ink-200 bg-white px-5 py-3 text-sm font-semibold text-ink-700 transition hover:bg-sand-50"
              >
                Sign out
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
