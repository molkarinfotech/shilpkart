import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { ProductForm } from './product-form';
import { SellerProductList } from './seller-product-list';

type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  created_at: string;
  updated_at: string;
};

type SellerProfile = {
  id: string;
  seller_id: string;
  business_name: string | null;
  status: string;
  commission_rate: number;
  total_sales: number;
  rating_avg: number;
  created_at: string;
  updated_at: string;
};

export function SellerDashboardContent({ profile, sellerProfile }: { profile: Profile; sellerProfile: SellerProfile }) {
  return (
    <main>
      <SiteHeader />
      <section className="border-b border-ink-200/60 bg-sand-100">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-clay-600">
            Seller dashboard
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink-900 md:text-5xl">
            {sellerProfile.business_name ?? 'My shop'}
          </h1>
          <p className="mt-3 text-lg text-ink-600">
            Manage your products and your shop's presence.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-ink-900">Your products</h2>
              <Link
                href="/seller/dashboard/products/new"
                className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-sand-50 transition hover:bg-ink-800"
              >
                Add product
              </Link>
            </div>
            <SellerProductList />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-ink-700">Shop details</p>
              <p className="mt-2 text-ink-600">
                {sellerProfile.business_name ?? 'No business name set'}
              </p>
              <p className="mt-1 text-sm text-ink-500">
                Commission: {Math.round(sellerProfile.commission_rate * 100)}%
              </p>
            </div>

            <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-ink-700">Account</p>
              <p className="mt-2 text-ink-600">{profile.email}</p>
              <p className="mt-1 text-sm text-ink-500">
                Role: {profile.role}
              </p>
              <Link
                href="/account"
                className="mt-3 inline-block rounded-lg border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 transition hover:bg-sand-50"
              >
                Edit account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
