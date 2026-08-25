import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { getDemoProduct, formatINR } from '@/lib/demo-products';
import { AddToBag } from '@/components/add-to-bag';

const backgrounds: Record<string, string> = {
  indigo: 'from-[#213b67] via-[#506fa1] to-[#d6c3a5]',
  rose: 'from-[#e4b3a6] via-[#f7ddd4] to-[#8d5d57]',
  marigold: 'from-[#d87c1d] via-[#f3be5d] to-[#8a3e1f]',
  terracotta: 'from-[#8f3f2c] via-[#c96d42] to-[#f1c68d]',
  gold: 'from-[#8c6324] via-[#d8aa4e] to-[#f7dd98]',
  sage: 'from-[#516c58] via-[#97aa81] to-[#e9dfc8]',
};

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getDemoProduct(params.slug);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[#fffdf9]">
      <SiteHeader />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-2 lg:py-20">
        <div className={`relative flex aspect-square items-end overflow-hidden rounded-[2rem] bg-gradient-to-br ${backgrounds[product.palette] ?? backgrounds.indigo} p-8 shadow-xl`}>
          <div className="relative rounded-3xl border border-white/40 bg-stone-950/15 p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-[.2em]">{product.image_label}</p>
            <p className="mt-3 text-4xl font-bold">Crafted by hand</p>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[.2em] text-orange-700">{product.artisan_location}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">{product.title}</h1>
          <p className="mt-4 text-lg text-stone-600">By {product.artisan_name}</p>
          <p className="mt-8 text-3xl font-bold text-stone-900">
            {formatINR(product.price_inr)}
            {product.compare_at_price_inr ? (
              <span className="ml-2 text-lg font-normal text-stone-400 line-through">{formatINR(product.compare_at_price_inr)}</span>
            ) : null}
          </p>
          <p className="mt-7 text-lg leading-8 text-stone-700">{product.description}</p>
          <div className="mt-8">
            <AddToBag product={product} />
          </div>
          <div className="mt-10 border-t border-stone-200 pt-7">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-orange-700">The maker’s story</p>
            <p className="mt-3 leading-8 text-stone-600">{product.story}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
