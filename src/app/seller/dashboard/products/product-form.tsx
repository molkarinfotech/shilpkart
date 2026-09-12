'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SiteHeader } from '@/components/site-header';

export function SellerProductForm({ slug }: { slug?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: slug ? '' : '',
    description: '',
    base_price: '',
    sale_price: '',
    in_stock: true,
    status: 'draft',
  });
  const [message, setMessage] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);

  useState(async () => {
    if (!slug) return;
    try {
      const res = await fetch('/api/seller/products');
      const data = await res.json();
      const product = (data.products ?? []).find((p: any) => p.slug === slug);
      if (product) {
        setForm({
          title: product.title,
          description: product.description ?? '',
          base_price: product.base_price?.toString() ?? '',
          sale_price: product.sale_price?.toString() ?? '',
          in_stock: product.in_stock,
          status: product.status,
        });
      } else {
        router.push('/seller/dashboard');
      }
    } catch {
      router.push('/seller/dashboard');
    }
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const isNew = !slug;
      const res = await fetch('/api/seller/products', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          base_price: form.base_price ? Number(form.base_price) : undefined,
          sale_price: form.sale_price ? Number(form.sale_price) : null,
          id: slug ? (await getProductId(slug)) : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ kind: 'error', text: data.error ?? 'Could not save product.' });
        return;
      }

      setMessage({ kind: 'success', text: isNew ? 'Product created.' : 'Product updated.' });
      router.push('/seller/dashboard');
    } catch {
      setMessage({ kind: 'error', text: 'Something went wrong.' });
    } finally {
      setSaving(false);
    }
  }

  async function getProductId(slug: string): Promise<string | undefined> {
    const res = await fetch('/api/seller/products');
    const data = await res.json();
    const product = (data.products ?? []).find((p: any) => p.slug === slug);
    return product?.id;
  }

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-2xl px-5 py-20">
        <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-clay-600">
          {slug ? 'Edit product' : 'Add product'}
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink-900">
          {slug ? 'Edit product' : 'Add a new product'}
        </h1>
        <p className="mt-2 text-ink-600">
          {slug
            ? 'Update your product details.'
            : 'Add a product to your shop. Buyers will see it once you publish it.'}
        </p>

        {message && (
          <div
            className={
              message.kind === 'success'
                ? 'mt-6 rounded-xl border border-moss-300 bg-moss-50 p-4 text-sm text-moss-800'
                : 'mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800'
            }
          >
            {message.text}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-ink-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="block text-sm font-semibold text-ink-700">Title *</label>
            <input
              className="mt-2 w-full rounded-xl border border-ink-200 bg-sand-50 px-4 py-3 text-ink-900 focus:border-clay-500 outline-none transition"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Handwoven cotton saree"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink-700">Description</label>
            <textarea
              className="mt-2 w-full rounded-xl border border-ink-200 bg-sand-50 px-4 py-3 text-ink-900 focus:border-clay-500 outline-none transition"
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Tell the story of this piece — materials, techniques, where it's made."
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-ink-700">Base price (₹) *</label>
              <input
                className="mt-2 w-full rounded-xl border border-ink-200 bg-sand-50 px-4 py-3 text-ink-900 focus:border-clay-500 outline-none transition"
                type="number"
                min="1"
                step="1"
                value={form.base_price}
                onChange={(e) => setForm({ ...form, base_price: e.target.value })}
                placeholder="e.g. 2500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-700">
                Sale price (₹) — optional
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-ink-200 bg-sand-50 px-4 py-3 text-ink-900 focus:border-clay-500 outline-none transition"
                type="number"
                min="1"
                step="1"
                value={form.sale_price}
                onChange={(e) => setForm({ ...form, sale_price: e.target.value })}
                placeholder="e.g. 2000"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-ink-700">Status</label>
              <select
                className="mt-2 w-full rounded-xl border border-ink-200 bg-sand-50 px-4 py-3 text-ink-900 focus:border-clay-500 outline-none transition"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="sold_out">Sold out</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-3 text-sm font-semibold text-ink-700">
                <input
                  type="checkbox"
                  checked={form.in_stock}
                  onChange={(e) => setForm({ ...form, in_stock: e.target.checked })}
                  className="h-4 w-4 rounded border-ink-300 text-clay-600 focus:ring-clay-500"
                />
                In stock
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving || !form.title || !form.base_price}
              className="flex-1 rounded-xl bg-ink-900 px-5 py-3 text-sm font-semibold text-sand-50 transition hover:bg-ink-800 disabled:cursor-wait disabled:opacity-70"
            >
              {saving ? 'Saving…' : slug ? 'Update product' : 'Add product'}
            </button>
            <Link
              href="/seller/dashboard"
              className="rounded-xl border border-ink-200 px-5 py-3 text-sm font-semibold text-ink-700 transition hover:bg-sand-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export { SellerProductForm as ProductForm };
