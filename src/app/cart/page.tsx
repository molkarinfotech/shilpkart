'use client';

import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { useDemoCart } from '@/components/demo-cart-provider';

function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default function CartPage() {
  const { items, total, remove, clear } = useDemoCart();

  return (
    <main className="min-h-screen bg-[#fffdf9]">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-5 py-14">
        <p className="text-sm font-bold uppercase tracking-[.2em] text-orange-700">Your selection</p>
        <h1 className="mt-3 text-4xl font-bold text-stone-900">Your bag</h1>

        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-orange-50 p-12 text-center">
            <div className="text-5xl">✦</div>
            <p className="mt-4 text-xl font-bold">Your bag is empty.</p>
            <Link href="/marketplace" className="mt-6 inline-block rounded-full bg-stone-900 px-6 py-3 font-bold text-white">
              Discover pieces
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_280px]">
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
                  <div>
                    <p className="font-bold text-stone-900">{item.title}</p>
                    <p className="mt-1 text-sm text-stone-500">Quantity {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold">{formatINR(item.priceInr * item.quantity)}</p>
                    <button onClick={() => remove(item.id)} className="text-sm font-bold text-orange-700">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <aside className="h-fit rounded-3xl bg-stone-900 p-6 text-white">
              <p className="text-sm uppercase tracking-[.15em] text-stone-300">Subtotal</p>
              <p className="mt-2 text-3xl font-bold">{formatINR(total)}</p>
              <p className="mt-4 text-sm leading-6 text-stone-300">Checkout will be enabled after Stripe and Razorpay are configured.</p>
              <button className="mt-6 w-full rounded-full bg-orange-500 px-5 py-3 font-bold text-stone-950" disabled>
                Checkout coming soon
              </button>
              <button onClick={clear} className="mt-4 w-full text-sm font-bold text-stone-300">
                Clear bag
              </button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
