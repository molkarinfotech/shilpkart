type Product = {
  id: string;
  seller_id: string;
  category_id: string | null;
  title: string;
  slug: string;
  description: string | null;
  base_price: number;
  sale_price: number | null;
  image_url: string | null;
  in_stock: boolean;
  status: 'draft' | 'active' | 'sold_out' | 'archived';
  created_at: string;
  updated_at: string;
};

export type { Product };
