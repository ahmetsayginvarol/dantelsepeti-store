import { Category, Product } from "@/types";

export const demoCategories: Category[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "İç Çamaşırı",
    slug: "ic-camasiri",
    description: "Zarif ve şık iç çamaşırı koleksiyonumuz",
    image_url: "https://images.unsplash.com/photo-1616697088797-97d013ef7d98?w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "Bodysuitler",
    slug: "bodysuitler",
    description: "Vücudu saran seksi bodysuit modelleri",
    image_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    name: "Gecelikler",
    slug: "gecelikler",
    description: "Romantik ve konforlu gecelik koleksiyonu",
    image_url: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    name: "Fantezi",
    slug: "fantezi",
    description: "Cesur ve eşsiz fantezi koleksiyonu",
    image_url: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    name: "Aksesuarlar",
    slug: "aksesuarlar",
    description: "Tamamlayıcı lüks aksesuarlar",
    image_url: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80",
    created_at: new Date().toISOString(),
  },
];

export const demoProducts: Product[] = [];

export function getCategoryById(id: string): Category | undefined {
  return demoCategories.find((c) => c.id === id);
}

export function getProductById(id: string): Product | undefined {
  return undefined;
}

export function getFeaturedProducts(): Product[] {
  return [];
}

export function getProductsByCategory(categoryId: string): Product[] {
  return [];
}
