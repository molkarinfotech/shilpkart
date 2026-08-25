import { SiteHeader } from '@/components/site-header';
import { ProductCard } from '@/components/product-card';
import { getDemoProducts } from '@/lib/demo-products';

const categories = ['textiles', 'jewellery', 'handicrafts', 'handbags', 'shawls'];

export default async function MarketplacePage({ searchParams }: { searchParams: { category?: string } }) {
  const products = await getDemoProducts();
  const category = searchParams.category?.toLowerCase();
  const visible = category ? products.filter((product) => product.category_slug === category) : products;

  return (
    <main className="min-h-screen bg-sand-50">
      <SiteHeader />
      <section className="border-b border-ink-200/60 bg-sand-100">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-clay-600">The ShilpKart edit</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight text-ink-900 md:text-6xl">Made slowly. Chosen thoughtfully.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-600">A growing collection of pieces made by independent artisans across India.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-8 flex flex-wrap gap-2">
          <a href="/marketplace" className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-sand-50">All pieces</a>
          {categories.map((item) => (
            <a key={item} href={`/marketplace?category=${item}`} className="rounded-full border border-ink-200 bg-sand-50 px-4 py-2 text-sm font-semibold capitalize text-ink-700 transition hover:border-clay-400 hover:text-clay-700">
              {item}
            </a>
          ))}
        </div>
        <h2 className="font-display text-2xl text-ink-900">{category ? `${category[0].toUpperCase()}${category.slice(1)} pieces` : 'Featured pieces'}</h2>
        <p className="mt-1 text-sm text-ink-500">{visible.length} artisan-made items</p>
        {visible.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-ink-300 bg-sand-100 p-12 text-center">
            <p className="font-display text-xl text-ink-800">This craft collection is coming soon.</p>
            <a href="/marketplace" className="mt-4 inline-block font-semibold text-clay-700">View all pieces →</a>
          </div>
        )}
      </section>
    </main>
  );
}
