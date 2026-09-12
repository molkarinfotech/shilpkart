import Link from 'next/link';

export default function SellerProductPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20">
      <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-clay-600">
        Seller dashboard
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-tight text-ink-900 md:text-5xl">
        Products
      </h1>

      <div className="mt-8 rounded-2xl border border-ink-200 bg-white p-8 shadow-sm">
        <p className="text-lg text-ink-600">
          Add your first product to start selling on the marketplace.
        </p>
        <Link
          href="/seller/dashboard/products/new"
          className="mt-4 inline-block rounded-xl bg-ink-900 px-5 py-3 text-sm font-semibold text-sand-50 transition hover:bg-ink-800"
        >
          Add product
        </Link>
      </div>

      <div className="mt-6">
        <Link
          href="/seller/dashboard"
          className="rounded-lg border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 transition hover:bg-sand-50"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
