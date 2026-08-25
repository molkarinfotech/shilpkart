'use client';

import { useState } from 'react';
import type { DemoProduct } from '@/lib/demo-products';
import { useDemoCart } from '@/components/demo-cart-provider';

export function AddToBag({ product }: { product: DemoProduct }) {
  const { add } = useDemoCart();
  const [added, setAdded] = useState(false);
  function handleAdd() {
    add({ id: product.id, slug: product.slug, title: product.title, priceInr: product.price_inr, imageUrl: product.image_url, imageLabel: product.image_label, artisanName: product.artisan_name, artisanLocation: product.artisan_location });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }
  return <button onClick={handleAdd} className="w-full rounded-full bg-ink-900 px-6 py-4 font-semibold text-sand-50 transition hover:bg-clay-700 sm:w-auto">{added ? 'Added to bag' : 'Add to bag'}</button>;
}
