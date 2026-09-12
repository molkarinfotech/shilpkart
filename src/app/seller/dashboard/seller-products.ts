import { createServerSupabaseClient, getSession } from '@/lib/supabase/server';

export async function getSellerProducts() {
  const session = await getSession();
  if (!session) return [];

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('seller_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load seller products:', error);
    return [];
  }

  return data ?? [];
}
