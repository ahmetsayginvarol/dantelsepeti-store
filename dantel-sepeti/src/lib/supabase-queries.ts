import { unstable_noStore as noStore } from 'next/cache';
import { supabase } from "./supabase";
import { Product, Category } from "@/types";

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  noStore();
  let query = supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      images:product_images(*)
    `)
    .order("created_at", { ascending: false });

  if (categorySlug) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();
    if (cat) query = query.eq("category_id", cat.id);
  }

  const { data, error } = await query;
  if (error) { console.error(error); return []; }
  return data as Product[];
}

export async function getFeatured(): Promise<Product[]> {
  noStore();
  const { data, error } = await supabase
    .from("products")
    .select(`*, category:categories(*), images:product_images(*)`)
    .eq("is_featured", true)
    .eq("is_available", true)
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) { console.error(error); return []; }
  return data as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  noStore();
  const { data, error } = await supabase
    .from("products")
    .select(`*, category:categories(*), images:product_images(*)`)
    .eq("id", id)
    .single();

  if (error) { console.error(error); return null; }
  return data as Product;
}

export async function getCategories(): Promise<Category[]> {
  noStore();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) { console.error(error); return []; }
  return data as Category[];
}

export async function getSiteContent(): Promise<Record<string, string>> {
  noStore();
  const { data, error } = await supabase
    .from("site_content")
    .select("key, value");

  if (error) { console.error(error); return {}; }
  return Object.fromEntries(data.map((row) => [row.key, row.value ?? ""]));
}