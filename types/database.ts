export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          role: 'buyer' | 'seller' | 'admin' | 'superadmin';
          created_at: string;
          updated_at: string;
        };
      };
      seller_profiles: {
        Row: {
          id: string;
          business_name: string;
          status: 'pending' | 'verified' | 'rejected' | 'suspended';
          commission_rate: number;
          total_sales: number;
          rating_avg: number;
          created_at: string;
        };
      };
      products: {
        Row: {
          id: string;
          seller_id: string;
          category_id: string | null;
          title: string;
          slug: string;
          base_price: number;
          sale_price: number | null;
          status: 'draft' | 'active' | 'sold_out' | 'archived';
          created_at: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          parent_id: string | null;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          buyer_id: string | null;
          total_amount: number;
          status: string;
          created_at: string;
        };
      };
    };
    Enums: {
      user_role: 'buyer' | 'seller' | 'admin' | 'superadmin';
      seller_status: 'pending' | 'verified' | 'rejected' | 'suspended';
      product_status: 'draft' | 'active' | 'sold_out' | 'archived';
    };
  };
}
