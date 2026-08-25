'use client';

import Link from 'next/link';
import { useDemoCart } from '@/components/demo-cart-provider';

export function SiteHeader() {
  const { count } = useDemoCart();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-[#fffdf9]/90 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5">
        <Link href="/" className="text-2xl font-bold tracking-tight text-stone-900">
          Shilp<span className="text-orange-700">Kart</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-stone-600 md:flex">
          <Link href="/marketplace" className="transition hover:text-orange-700">Shop</Link>
          <Link href="/categories" className="transition hover:text-orange-700">Crafts</Link>
          <Link href="/sellers" className="transition hover:text-orange-700">Artisans</Link>
          <Link href="/seller/register" className="transition hover:text-orange-700">Sell with us</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/cart" className="rounded-full border border-stone-200 px-4 py-2 text-sm font-bold text-stone-700 hover:border-orange-400">
            Bag{count > 0 ? ` (${count})` : ''}
          </Link>
          <Link href="/auth/login" className="hidden rounded-full bg-stone-900 px-4 py-2 text-sm font-bold text-white hover:bg-orange-800 sm:block">
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
