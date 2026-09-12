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
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          role?: 'buyer' | 'seller' | 'admin' | 'superadmin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          phone?: string | null;
          role?: 'buyer' | 'seller' | 'admin' | 'superadmin';
          updated_at?: string;
        };
      };
      seller_profiles: {
        Row: {
          id: string;
          seller_id: string;
          business_name: string | null;
          status: 'pending' | 'verified' | 'rejected' | 'suspended';
          commission_rate: number;
          total_sales: number;
          rating_avg: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          seller_id: string;
          business_name?: string | null;
          status?: 'pending' | 'verified' | 'rejected' | 'suspended';
          commission_rate?: number;
          total_sales?: number;
          rating_avg?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          business_name?: string | null;
          status?: 'pending' | 'verified' | 'rejected' | 'suspended';
          commission_rate?: number;
          total_sales?: number;
          rating_avg?: number;
          updated_at?: string;
        };
      };
      products: {
        Row: {
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
        Insert: {
          id: string;
          seller_id: string;
          category_id?: string | null;
          title: string;
          slug: string;
          description?: string | null;
          base_price: number;
          sale_price?: number | null;
          image_url?: string | null;
          in_stock?: boolean;
          status?: 'draft' | 'active' | 'sold_out' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          category_id?: string | null;
          title?: string;
          slug?: string;
          description?: string | null;
          base_price?: number;
          sale_price?: number | null;
          image_url?: string | null;
          in_stock?: boolean;
          status?: 'draft' | 'active' | 'sold_out' | 'archived';
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          parent_id: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          slug: string;
          parent_id?: string | null;
          created_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          parent_id?: string | null;
          updated_at?: string;
        };
      };
      seller_applications: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          email: string;
          phone: string;
          business_name: string;
          craft_category: string;
          craft_story: string;
          city: string;
          state: string;
          pincode: string;
          delivery_preference: string;
          aadhaar_last_four: string | null;
          verification_consent: boolean;
          status: 'pending' | 'approved' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          full_name: string;
          email: string;
          phone: string;
          business_name: string;
          craft_category: string;
          craft_story: string;
          city: string;
          state: string;
          pincode: string;
          delivery_preference: string;
          aadhaar_last_four?: string | null;
          verification_consent?: boolean;
          status?: 'pending' | 'approved' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string;
          email?: string;
          phone?: string;
          business_name?: string;
          craft_category?: string;
          craft_story?: string;
          city?: string;
          state?: string;
          pincode?: string;
          delivery_preference?: string;
          aadhaar_last_four?: string | null;
          verification_consent?: boolean;
          status?: 'pending' | 'approved' | 'rejected';
          updated_at?: string;
        };
      };
    };
    Functions: {
      // Admin-only: approve a seller application, promote profile to seller,
      // and create a verified seller_profiles row.
      approve_seller_application: {
        Args: { application_id: string };
        Returns: {
          application_id: string;
          status: string;
          seller_id?: string | null;
        };
      };
      // Admin-only: reject a seller application.
      reject_seller_application: {
        Args: { application_id: string };
        Returns: {
          application_id: string;
          status: string;
        };
      };
      // Called by auth trigger: create a buyer profile for a new user.
      handle_new_user: {
        Args: { user_id: string; email: string };
        Returns: void;
      };
    };
    Enums: {
      user_role: 'buyer' | 'seller' | 'admin' | 'superadmin';
      seller_status: 'pending' | 'verified' | 'rejected' | 'suspended';
      product_status: 'draft' | 'active' | 'sold_out' | 'archived';
      application_status: 'pending' | 'approved' | 'rejected';
    };
  };
}
