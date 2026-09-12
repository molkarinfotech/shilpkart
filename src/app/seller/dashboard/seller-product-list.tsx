'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import type { Product } from './product';

export function SellerProductList() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useState(() => {
    fetch('/api/seller/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  });

  if (loading) {
    return (
      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-ink-500">Loading products…</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-ink-500">
          No products yet. Add your first product to start selling.
        </p>
        <button
          onClick={() => router.push('/seller/dashboard/products/new')}
          className="mt-4 rounded-xl bg-ink-900 px-4 py-2 text-sm font-semibold text-sand-50 transition hover:bg-ink-800"
        >
          Add product
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="group rounded-2xl border border-ink-200 bg-white p-4 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-ink-900">{product.title}</p>
              <p className="text-sm text-ink-500">
                {product.slug} · {product.status}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/seller/dashboard/products/${product.slug}`)}
                className="rounded-lg border border-ink-200 px-3 py-1.5 text-sm font-semibold text-ink-700 transition hover:bg-sand-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id, product.title)}
                className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
          {product.sale_price != null && product.sale_price < product.base_price && (
            <p className="mt-2 text-sm text-ink-600">
              Sale: ₹{product.sale_price} (was ₹{product.base_price})
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

async function handleDelete(id: string, title: string) {
  if (!confirm(`Delete "${title}"? This can't be undone.`)) return;

  const res = await fetch('/api/seller/products', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (res.ok) {
    window.location.reload();
  }
}
