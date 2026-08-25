import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zqekrkuwxgzkqnuhwlyi.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxZWtya3V3eGd6a3FudWh3bHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NDk0OTEsImV4cCI6MjEwMzIyNTQ5MX0.7pA4VTPpHArpqn8GfN7ztZUH_cKU-K35LNFojIcthhI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

export function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function getDemoProducts(): Promise<DemoProduct[]> {
  const { data, error } = await supabase
    .from('demo_products')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data ?? []) as DemoProduct[];
}

export async function getDemoProduct(slug: string): Promise<DemoProduct | null> {
  const { data, error } = await supabase
    .from('demo_products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data as DemoProduct | null;
}
