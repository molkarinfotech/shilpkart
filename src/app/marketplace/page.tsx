import { SiteHeader } from '@/components/site-header';
import { ProductCard } from '@/components/product-card';
import { getDemoProducts } from '@/lib/demo-products';

const categories = ['textiles', 'jewellery', 'handicrafts', 'handbags', 'shawls'];

export default async function MarketplacePage({ searchParams }: { searchParams: { category?: string } }) {
  const products = await getDemoProducts();
  const category = searchParams.category?.toLowerCase();
  const visible = category ? products.filter((product) => product.category_slug === category) : products;

  return (
    <main className="min-h-screen bg-[#fffdf9]">
      <SiteHeader />
      <section className="border-b border-orange-100 bg-[#f4e4d1]">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="text-sm font-bold uppercase tracking-[.22em] text-orange-700">The ShilpKart edit</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-bold tracking-tight text-stone-900 md:text-6xl">Made slowly. Chosen thoughtfully.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">A growing collection of pieces made by independent artisans across India.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-8 flex flex-wrap gap-2">
          <a href="/marketplace" className="rounded-full bg-stone-900 px-4 py-2 text-sm font-bold text-white">All pieces</a>
          {categories.map((item) => (
            <a key={item} href={`/marketplace?category=${item}`} className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold capitalize text-stone-700 hover:border-orange-400">
              {item}
            </a>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-stone-900">{category ? `${category[0].toUpperCase()}${category.slice(1)} pieces` : 'Featured pieces'}</h2>
        <p className="mt-1 text-sm text-stone-500">{visible.length} artisan-made items</p>
        {visible.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-orange-300 bg-orange-50 p-12 text-center">
            <p className="text-xl font-bold">This craft collection is coming soon.</p>
            <a href="/marketplace" className="mt-4 inline-block font-bold text-orange-700">View all pieces →</a>
          </div>
        )}
      </section>
    </main>
  );
}
