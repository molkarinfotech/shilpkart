'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useDemoCart } from '@/components/demo-cart-provider';

const navigation = [
  { href: '/marketplace', label: 'Shop' },
  { href: '/categories', label: 'Crafts' },
  { href: '/sellers', label: 'Artisans' },
  { href: '/seller/register', label: 'Sell with us' },
];

export function SiteHeader() {
  const { count } = useDemoCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/60 bg-sand-50/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:h-[76px] sm:px-5">
        <Link href="/" className="font-display text-2xl tracking-tight text-ink-900" onClick={() => setOpen(false)}>
          Shilp<span className="text-clay-600">Kart</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-600 md:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-clay-600">{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/cart" className="min-h-10 rounded-full border border-ink-200 px-3 py-2 text-sm font-semibold text-ink-700 transition hover:border-clay-400 hover:text-clay-700 sm:px-4">
            Bag{count > 0 ? ` (${count})` : ''}
          </Link>
          <Link href="/auth/login" className="hidden min-h-10 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-sand-50 transition hover:bg-clay-700 sm:block">Sign in</Link>
          <button type="button" aria-label="Toggle navigation menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-800 transition hover:border-clay-400 hover:text-clay-700 md:hidden">
            <span className="sr-only">Menu</span>
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-px w-5 bg-current transition ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-[7px] h-px w-5 bg-current transition ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 top-[14px] h-px w-5 bg-current transition ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-navigation" className="border-t border-ink-200 bg-sand-50 px-4 py-3 md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-base font-medium text-ink-700 transition hover:bg-sand-100 hover:text-clay-700">{item.label}</Link>
            ))}
            <Link href="/auth/login" onClick={() => setOpen(false)} className="mt-1 rounded-xl bg-ink-900 px-4 py-3 text-center text-sm font-semibold text-sand-50">Sign in</Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
