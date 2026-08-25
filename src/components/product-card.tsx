'use client';

import Link from 'next/link';
import type { DemoProduct } from '@/lib/demo-products';
import { formatINR } from '@/lib/demo-products';
import { useDemoCart } from '@/components/demo-cart-provider';

const backgrounds: Record<string, string> = {
  indigo: 'from-[#213b67] via-[#506fa1] to-[#d6c3a5]',
  rose: 'from-[#e4b3a6] via-[#f7ddd4] to-[#8d5d57]',
  marigold: 'from-[#d87c1d] via-[#f3be5d] to-[#8a3e1f]',
  terracotta: 'from-[#8f3f2c] via-[#c96d42] to-[#f1c68d]',
  gold: 'from-[#8c6324] via-[#d8aa4e] to-[#f7dd98]',
  sage: 'from-[#516c58] via-[#97aa81] to-[#e9dfc8]',
};

export function ProductCard({ product }: { product: DemoProduct }) {
  const { add } = useDemoCart();

  return (
    <article className="group overflow-hidden rounded-[1.6rem] bg-white shadow-sm ring-1 ring-stone-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.slug}`} className={`relative flex aspect-[4/4.6] items-end overflow-hidden bg-gradient-to-br ${backgrounds[product.palette] ?? backgrounds.indigo} p-5`}>
        <div className="relative w-full rounded-2xl border border-white/40 bg-stone-950/15 p-4 text-white backdrop-blur-[2px]">
          <span className="text-xs font-bold uppercase tracking-[.18em]">{product.image_label}</span>
          <p className="mt-1 text-xl font-bold">Handcrafted in India</p>
        </div>
        {product.badge ? <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-stone-800">{product.badge}</span> : null}
      </Link>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[.15em] text-orange-700">{product.artisan_location}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-2 text-lg font-bold leading-6 text-stone-900 hover:text-orange-700">{product.title}</h3>
        </Link>
        <p className="mt-2 text-sm text-stone-500">By {product.artisan_name}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <span className="font-bold text-stone-900">{formatINR(product.price_inr)}</span>
            {product.compare_at_price_inr ? <span className="ml-2 text-sm text-stone-400 line-through">{formatINR(product.compare_at_price_inr)}</span> : null}
          </div>
          <button
            onClick={() => add({ id: product.id, slug: product.slug, title: product.title, priceInr: product.price_inr })}
            className="rounded-full bg-stone-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-700"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
