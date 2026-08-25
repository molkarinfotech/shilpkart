export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { getDemoProduct, formatINR } from '@/lib/demo-products';
import { AddToBag } from '@/components/add-to-bag';

const textures: Record<string, string> = { indigo: 'bg-[#2b3a4a]', rose: 'bg-[#8a6a5a]', marigold: 'bg-[#a3703a]', terracotta: 'bg-clay-600', gold: 'bg-[#8a7245]', sage: 'bg-moss-600' };

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getDemoProduct(params.slug);
  if (!product) notFound();
  const texture = textures[product.palette] ?? textures.indigo;

  return <main className="min-h-screen bg-sand-50"><SiteHeader /><section className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-2 lg:py-20"><div className={`relative flex aspect-square items-end overflow-hidden rounded-2xl ${product.image_url ? '' : texture} p-8 shadow-lg`}>{product.image_url ? <img src={product.image_url} alt={product.title} className="absolute inset-0 h-full w-full object-cover" /> : <div className="absolute inset-0 opacity-[0.14] mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,.5) 0px, rgba(255,255,255,.5) 1px, transparent 1px, transparent 10px)' }} />}{product.image_url ? <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950/70 to-transparent" /> : null}<div className="relative border-t border-sand-50/25 pt-5 text-sand-50"><p className="text-[11px] font-medium uppercase tracking-[.22em] text-sand-100/80">{product.image_label}</p><p className="mt-2 font-display text-3xl">Crafted by hand</p></div></div><div className="flex flex-col justify-center"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-clay-600">{product.artisan_location}</p><h1 className="mt-4 font-display text-4xl tracking-tight text-ink-900 md:text-5xl">{product.title}</h1><p className="mt-4 text-lg text-ink-500">By {product.artisan_name}</p><p className="mt-8 font-display text-3xl text-ink-900">{formatINR(product.price_inr)}{product.compare_at_price_inr ? <span className="ml-2 text-lg font-sans font-normal text-ink-400 line-through">{formatINR(product.compare_at_price_inr)}</span> : null}</p><p className="mt-7 text-lg leading-8 text-ink-600">{product.description}</p><div className="mt-8"><AddToBag product={product} /></div><div className="mt-10 border-t border-ink-200 pt-7"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-clay-600">The maker’s story</p><p className="mt-3 leading-8 text-ink-600">{product.story}</p></div></div></section></main>;
}
