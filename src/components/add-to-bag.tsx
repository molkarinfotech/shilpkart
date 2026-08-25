'use client';

import type { DemoProduct } from '@/lib/demo-products';
import { useDemoCart } from '@/components/demo-cart-provider';

export function AddToBag({ product }: { product: DemoProduct }) {
  const { add } = useDemoCart();

  return (
    <button
      onClick={() => add({ id: product.id, slug: product.slug, title: product.title, priceInr: product.price_inr })}
      className="w-full rounded-full bg-stone-900 px-6 py-4 font-bold text-white transition hover:bg-orange-700 sm:w-auto"
    >
      Add to bag
    </button>
  );
}
