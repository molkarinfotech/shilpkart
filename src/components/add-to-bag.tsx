'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { DemoProduct } from '@/lib/demo-products';
import { useDemoCart } from '@/components/demo-cart-provider';

export function AddToBag({ product }: { product: DemoProduct }) {
  const router = useRouter();
  const { add } = useDemoCart();
  const [adding, setAdding] = useState(false);

  function handleAdd() {
    if (adding) return;
    setAdding(true);
    add({
      id: product.id,
      slug: product.slug,
      title: product.title,
      priceInr: product.price_inr,
      imageUrl: product.image_url,
      imageLabel: product.image_label,
      artisanName: product.artisan_name,
      artisanLocation: product.artisan_location,
    });
    router.push('/cart');
  }

  return (
    <button
      onClick={handleAdd}
      disabled={adding}
      className="w-full rounded-full bg-ink-900 px-6 py-4 font-semibold text-sand-50 transition hover:bg-clay-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
    >
      {adding ? 'Opening your bag…' : 'Add to bag'}
    </button>
  );
}
