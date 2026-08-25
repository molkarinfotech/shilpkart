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
  in_stock: boolean;
};

export const fallbackProducts: DemoProduct[] = [
  { id: '1', slug: 'indigo-ajrak-silk-stole', title: 'Indigo Ajrak Silk Stole', artisan_name: 'Meera Khatri', artisan_location: 'Ajrakhpur, Gujarat', category_slug: 'shawls', description: 'A fluid silk stole printed in deep indigo with traditional Ajrak-inspired geometry.', story: 'Block printing, natural dyes and patient finishing bring this small-batch piece to life.', price_inr: 2890, compare_at_price_inr: 3490, badge: 'Limited batch', palette: 'indigo', image_label: 'Indigo block print', in_stock: true },
  { id: '2', slug: 'hand-hammered-silver-earrings', title: 'Hand-Hammered Silver Earrings', artisan_name: 'Riya Sharma', artisan_location: 'Jaipur, Rajasthan', category_slug: 'jewellery', description: 'Light-catching silver-tone earrings with a hand-hammered texture and graceful drop.', story: 'Made in a family workshop where metalwork has been practised for three generations.', price_inr: 1850, compare_at_price_inr: null, badge: 'Handmade', palette: 'rose', image_label: 'Hammered silver', in_stock: true },
  { id: '3', slug: 'kantha-embroidered-tote', title: 'Kantha Embroidered Tote', artisan_name: 'Nandini Das', artisan_location: 'Kolkata, West Bengal', category_slug: 'handbags', description: 'A roomy cotton tote finished with joyful running-stitch Kantha embroidery.', story: 'Every stitch varies slightly, making every bag completely individual.', price_inr: 2390, compare_at_price_inr: 2790, badge: 'One of a kind', palette: 'marigold', image_label: 'Kantha threadwork', in_stock: true },
  { id: '4', slug: 'handwoven-cotton-table-runner', title: 'Handwoven Cotton Table Runner', artisan_name: 'Arun Kumar', artisan_location: 'Bhuj, Gujarat', category_slug: 'textiles', description: 'Textured handloom cotton with a warm earthy border for everyday tables.', story: 'Woven slowly on a wooden loom by a small cooperative of craftspeople.', price_inr: 1690, compare_at_price_inr: null, badge: 'Handloom', palette: 'terracotta', image_label: 'Handloom weave', in_stock: true },
  { id: '5', slug: 'brass-lotus-diya-set', title: 'Brass Lotus Diya Set', artisan_name: 'Sanjay Verma', artisan_location: 'Moradabad, Uttar Pradesh', category_slug: 'handicrafts', description: 'A pair of sculptural brass diyas shaped with a quiet lotus silhouette.', story: 'Cast, polished and finished by hand in Moradabad’s metal-craft tradition.', price_inr: 2190, compare_at_price_inr: 2590, badge: 'Gift ready', palette: 'gold', image_label: 'Brass lotus', in_stock: true },
  { id: '6', slug: 'pashmina-wool-wrap', title: 'Soft Pashmina Wool Wrap', artisan_name: 'Zoya Bhat', artisan_location: 'Srinagar, Kashmir', category_slug: 'shawls', description: 'A lightweight wool wrap with a soft brushed finish and generous drape.', story: 'Crafted in limited quantities by a women-led workshop in Kashmir.', price_inr: 4990, compare_at_price_inr: null, badge: 'Artisan pick', palette: 'sage', image_label: 'Woven wool', in_stock: true },
];

export function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export async function getDemoProducts(): Promise<DemoProduct[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return fallbackProducts;
  try {
    const response = await fetch(`${url}/rest/v1/demo_products?select=*&order=created_at.asc`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 60 },
    });
    if (!response.ok) return fallbackProducts;
    const data = (await response.json()) as DemoProduct[];
    return data.length ? data : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getDemoProduct(slug: string) {
  const products = await getDemoProducts();
  return products.find((product) => product.slug === slug);
}
