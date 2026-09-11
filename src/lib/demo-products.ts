'use client';

import { createSupabaseBrowserClient, supabaseConfig } from '@/lib/supabase/config';

export type DemoProduct = {
  id: string;
  slug: string;
  title: string;
  artisan_name: string;
  artisan_location: string;
  category_slug: string;
  description: string;
  story: string;
  price_inr: number;
  compare_at_price_inr: number | null;
  badge: string | null;
  palette: string;
  image_label: string;
  image_url: string | null;
  in_stock: boolean;
};

/**
 * Lazy-initialized Supabase browser client.
 *
 * Importing this module must be safe during build, test, and preview
 * environments where NEXT_PUBLIC_SUPABASE_URL may be absent. The client
 * is created on first use, not at module load time, so the module import
 * itself never throws.
 */
let supabase: ReturnType<typeof createSupabaseBrowserClient> | null = null;

function getSupabase(): ReturnType<typeof createSupabaseBrowserClient> {
  if (!supabase) {
    supabase = createSupabaseBrowserClient();
  }
  return supabase;
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function getDemoProducts(): Promise<DemoProduct[]> {
  const { data, error } = await getSupabase()
    .from('demo_products')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data ?? []) as DemoProduct[];
}

export async function getDemoProduct(slug: string): Promise<DemoProduct | null> {
  const { data, error } = await getSupabase()
    .from('demo_products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data as DemoProduct | null;
}
