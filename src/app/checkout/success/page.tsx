'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';

export default function CheckoutSuccessPage() { const searchParams = useSearchParams(); const order = searchParams.get('order'); return <main className="min-h-screen bg-sand-50"><SiteHeader /><section className="mx-auto max-w-2xl px-5 py-20 text-center md:py-28"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss-500 text-3xl text-sand-50">✓</div><p className="mt-7 text-[11px] font-semibold uppercase tracking-[.24em] text-clay-600">Order confirmed</p><h1 className="mt-3 font-display text-4xl text-ink-900 md:text-5xl">Thank you for choosing handmade.</h1><p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-ink-600">Your order has been received. We’ll contact you with delivery updates before your pieces begin their journey to you.</p>{order ? <p className="mt-7 rounded-full bg-sand-100 px-5 py-3 font-mono text-sm text-ink-700">Order reference: {order}</p> : null}<Link href="/marketplace" className="mt-9 inline-block rounded-full bg-ink-900 px-6 py-3.5 text-sm font-semibold text-sand-50 transition hover:bg-clay-700">Continue shopping</Link></section></main>; }
