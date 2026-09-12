import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';

type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  created_at: string;
  updated_at: string;
};

type SessionUser = {
  id: string;
  email: string;
  aud: string;
  role?: string;
  created_at: string;
  last_sign_in_at?: string;
};

export function DashboardContent({ profile, session }: { profile: Profile; session: SessionUser }) {
  const isSeller = profile.role === 'seller';
  const isAdmin = profile.role === 'admin' || profile.role === 'superadmin';

  return (
    <main>
      <SiteHeader />
      <section className="border-b border-ink-200/60 bg-sand-100">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-clay-600">
            {isAdmin ? 'Admin' : isSeller ? 'Seller' : 'Member'}
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink-900 md:text-5xl">
            {isAdmin
              ? 'Seller applications'
              : isSeller
              ? "You're a seller on ShilpKart"
              : 'Welcome to ShilpKart'}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-600">
            {isAdmin
              ? 'Review and manage artisan seller applications.'
              : isSeller
              ? 'Manage your products, orders, and account settings.'
              : 'Browse handmade pieces, manage your account, or apply to become a seller.'}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          <Link
            href="/account"
            className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-clay-600">
              Account
            </p>
            <p className="mt-3 font-display text-xl text-ink-900">Edit your profile</p>
            <p className="mt-2 text-sm text-ink-600">
              Update your name, phone, and account settings.
            </p>
          </Link>

          {isSeller && (
            <Link
              href="/seller/dashboard"
              className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-clay-600">
                Seller
              </p>
              <p className="mt-3 font-display text-xl text-ink-900">Manage products</p>
              <p className="mt-2 text-sm text-ink-600">
                Add, edit, and manage your own products.
              </p>
            </Link>
          )}

          {!isSeller && !isAdmin && (
            <Link
              href="/seller/register"
              className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-clay-600">
                Become a seller
              </p>
              <p className="mt-3 font-display text-xl text-ink-900">Apply to sell</p>
              <p className="mt-2 text-sm text-ink-600">
                Share your craft and apply for seller status.
              </p>
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/admin/seller-applications"
              className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition hover:shadow-md lg:col-span-2"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-clay-600">
                Admin
              </p>
              <p className="mt-3 font-display text-xl text-ink-900">Seller applications</p>
              <p className="mt-2 text-sm text-ink-600">
                Review, approve, and reject artisan seller applications.
              </p>
            </Link>
          )}

          {!isAdmin && (
            <div />
          )}
        </div>
      </section>
    </main>
  );
}
