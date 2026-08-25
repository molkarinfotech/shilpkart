'use client';

import Link from 'next/link';
import type { DemoProduct } from '@/lib/demo-products';
import { formatINR } from '@/lib/demo-products';
import { useDemoCart } from '@/components/demo-cart-provider';

const textures: Record<string, string> = {
  indigo: 'bg-[#2b3a4a]',
  rose: 'bg-[#8a6a5a]',
  marigold: 'bg-[#a3703a]',
  terracotta: 'bg-clay-600',
  gold: 'bg-[#8a7245]',
  sage: 'bg-moss-600',
};

export function ProductCard({ product }: { product: DemoProduct }) {
  const { add } = useDemoCart();
  const texture = textures[product.palette] ?? textures.indigo;

  return (
    <article className="group overflow-hidden rounded-2xl bg-sand-50 shadow-sm ring-1 ring-ink-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className={`relative flex aspect-[4/4.8] items-end overflow-hidden ${texture} p-6`}>
        <div
          className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
          style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,.5) 0px, rgba(255,255,255,.5) 1px, transparent 1px, transparent 10px)' }}
        />
        <div className="relative w-full border-t border-sand-50/25 pt-4 text-sand-50">
          <span className="text-[11px] font-medium uppercase tracking-[.22em] text-sand-100/80">{product.image_label}</span>
          <p className="mt-1 font-display text-lg">Handcrafted in India</p>
        </div>
        {product.badge ? (
          <span className="absolute left-5 top-5 rounded-full bg-sand-50/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-800">
            {product.badge}
          </span>
        ) : null}
      </Link>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-clay-600">{product.artisan_location}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-2 font-display text-lg leading-6 text-ink-900 transition group-hover:text-clay-700">{product.title}</h3>
        </Link>
        <p className="mt-2 text-sm text-ink-500">By {product.artisan_name}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <span className="font-display text-lg text-ink-900">{formatINR(product.price_inr)}</span>
            {product.compare_at_price_inr ? (
              <span className="ml-2 text-sm text-ink-400 line-through">{formatINR(product.compare_at_price_inr)}</span>
            ) : null}
          </div>
          <button
            onClick={() => add({ id: product.id, slug: product.slug, title: product.title, priceInr: product.price_inr })}
            className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-sand-50 transition hover:bg-clay-700"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
