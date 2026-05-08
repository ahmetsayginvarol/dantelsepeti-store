export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  sort_order: number;
  is_primary: boolean;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category_id: string;
  category?: Category;
  images?: ProductImage[];
  sizes: string[];
  is_featured: boolean;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export type SortOption = "newest" | "price_asc" | "price_desc" | "featured";

export interface AdminUser {
  id: string;
  email: string;
  role: "admin" | "super_admin";
}
