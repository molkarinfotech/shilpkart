import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
export default function CartPage() { return <main><SiteHeader /><section className="mx-auto max-w-3xl px-5 py-24 text-center"><div className="text-7xl">🛒</div><h1 className="mt-6 text-4xl font-bold text-stone-900">Your cart is waiting</h1><p className="mt-4 text-lg text-stone-600">Explore the marketplace and add something handmade.</p><Link href="/marketplace" className="mt-8 inline-block rounded-full bg-orange-700 px-7 py-3.5 font-bold text-white">Browse products →</Link></section></main>; }
