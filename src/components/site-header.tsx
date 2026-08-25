'use client';

import Link from 'next/link';
import { useDemoCart } from '@/components/demo-cart-provider';

export function SiteHeader() {
  const { count } = useDemoCart();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/60 bg-sand-50/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5">
        <Link href="/" className="font-display text-2xl tracking-tight text-ink-900">
          Shilp<span className="text-clay-600">Kart</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-600 md:flex">
          <Link href="/marketplace" className="transition hover:text-clay-600">Shop</Link>
          <Link href="/categories" className="transition hover:text-clay-600">Crafts</Link>
          <Link href="/sellers" className="transition hover:text-clay-600">Artisans</Link>
          <Link href="/seller/register" className="transition hover:text-clay-600">Sell with us</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/cart" className="rounded-full border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 transition hover:border-clay-400 hover:text-clay-700">
            Bag{count > 0 ? ` (${count})` : ''}
          </Link>
          <Link href="/auth/login" className="hidden rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-sand-50 transition hover:bg-clay-700 sm:block">
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
