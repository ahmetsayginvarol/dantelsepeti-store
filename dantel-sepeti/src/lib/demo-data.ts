import { Category, Product } from "@/types";

export const demoCategories: Category[] = [
  {
    id: "1",
    name: "İç Çamaşırı",
    slug: "ic-camasiri",
    description: "Zarif ve şık iç çamaşırı koleksiyonumuz",
    image_url: "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Bodysuitler",
    slug: "bodysuitler",
    description: "Vücudu saran seksi bodysuit modelleri",
    image_url: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Gecelikler",
    slug: "gecelikler",
    description: "Romantik ve konforlu gecelik koleksiyonu",
    image_url: "https://images.unsplash.com/photo-1602810319428-019690571b5b?w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Fantezi",
    slug: "fantezi",
    description: "Cesur ve eşsiz fantezi koleksiyonu",
    image_url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Aksesuarlar",
    slug: "aksesuarlar",
    description: "Tamamlayıcı lüks aksesuarlar",
    image_url: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=600&q=80",
    created_at: new Date().toISOString(),
  },
];

export const demoProducts: Product[] = [
  {
    id: "1",
    sku: "DS-101",
    title: "Siyah Dantel Bra Set",
    description:
      "İnce fransız danteli ile işlenmiş, zarif siyah bra & külot seti. Ayarlanabilir askılar ve yumuşak iç astar ile maksimum konfor sunar.",
    price: 485,
    original_price: 650,
    category_id: "1",
    sizes: ["XS", "S", "M", "L", "XL"],
    is_featured: true,
    is_available: true,
    images: [
      {
        id: "1",
        product_id: "1",
        url: "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=800&q=80",
        sort_order: 0,
        is_primary: true,
      },
      {
        id: "2",
        product_id: "1",
        url: "https://images.unsplash.com/photo-1610384100842-be7b6e4ce09b?w=800&q=80",
        sort_order: 1,
        is_primary: false,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    sku: "DS-102",
    title: "Pembe Saten Gecelik",
    description:
      "İpeksi saten kumaştan üretilmiş, vücudu saran midi gecelik. İnce askılar ve v yaka ile kadınsı bir şıklık sunar.",
    price: 620,
    original_price: null,
    category_id: "3",
    sizes: ["XS", "S", "M", "L"],
    is_featured: true,
    is_available: true,
    images: [
      {
        id: "3",
        product_id: "2",
        url: "https://images.unsplash.com/photo-1602810319428-019690571b5b?w=800&q=80",
        sort_order: 0,
        is_primary: true,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    sku: "DS-103",
    title: "Kırmızı Dantel Bodysuit",
    description:
      "Cesur kırmızı dantelden üretilmiş, vücut hatlarını vurgulayan bodysuit. Çıtçıtlı alt kapama ile pratik kullanım.",
    price: 750,
    original_price: 920,
    category_id: "2",
    sizes: ["S", "M", "L", "XL"],
    is_featured: true,
    is_available: true,
    images: [
      {
        id: "5",
        product_id: "3",
        url: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80",
        sort_order: 0,
        is_primary: true,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    sku: "DS-104",
    title: "Ekru Dantel Corset",
    description:
      "Vintage ilhamlı ekru renkli korset. Balinen ve ayarlanabilir bağcıklarıyla mükemmel oturum sağlar.",
    price: 895,
    original_price: null,
    category_id: "1",
    sizes: ["XS", "S", "M", "L"],
    is_featured: false,
    is_available: true,
    images: [
      {
        id: "7",
        product_id: "4",
        url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=80",
        sort_order: 0,
        is_primary: true,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    sku: "DS-105",
    title: "Siyah İpek Robe",
    description:
      "Saf ipekten üretilmiş lüks kimono robe. Vücuda yumuşakça sarılan kumaşı ile en özel anlarınız için.",
    price: 1250,
    original_price: 1550,
    category_id: "3",
    sizes: ["S/M", "L/XL"],
    is_featured: true,
    is_available: true,
    images: [
      {
        id: "9",
        product_id: "5",
        url: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=800&q=80",
        sort_order: 0,
        is_primary: true,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    sku: "DS-106",
    title: "Altın Detaylı Fantezi Set",
    description:
      "Altın zincir detayları ile süslenmiş cesur fantezi seti. Set içeriği: bra, g-string ve garter belt.",
    price: 1100,
    original_price: null,
    category_id: "4",
    sizes: ["XS", "S", "M", "L"],
    is_featured: false,
    is_available: true,
    images: [
      {
        id: "11",
        product_id: "6",
        url: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=800&q=80",
        sort_order: 0,
        is_primary: true,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    sku: "DS-107",
    title: "Şampanya Saten Slip Set",
    description:
      "Şampanya renkli saten bra ve külot ikilisi. Minimalist tasarımı ve yumuşak dokusu ile günlük şıklık.",
    price: 420,
    original_price: 520,
    category_id: "1",
    sizes: ["XS", "S", "M", "L", "XL"],
    is_featured: false,
    is_available: true,
    images: [
      {
        id: "13",
        product_id: "7",
        url: "https://images.unsplash.com/photo-1631671268049-1d05f30d8c6a?w=800&q=80",
        sort_order: 0,
        is_primary: true,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    sku: "DS-108",
    title: "İnci Detaylı Askılı Korse",
    description:
      "İnce inci detaylarıyla süslenmiş zarif korse. Göğüs altı tel destekli, ince kumaş yapısı.",
    price: 980,
    original_price: null,
    category_id: "1",
    sizes: ["S", "M", "L"],
    is_featured: false,
    is_available: false,
    images: [
      {
        id: "15",
        product_id: "8",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        sort_order: 0,
        is_primary: true,
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function getCategoryById(id: string): Category | undefined {
  return demoCategories.find((c) => c.id === id);
}

export function getProductById(id: string): Product | undefined {
  const product = demoProducts.find((p) => p.id === id);
  if (product) {
    return {
      ...product,
      category: getCategoryById(product.category_id),
    };
  }
  return undefined;
}

export function getFeaturedProducts(): Product[] {
  return demoProducts
    .filter((p) => p.is_featured && p.is_available)
    .map((p) => ({ ...p, category: getCategoryById(p.category_id) }));
}

export function getProductsByCategory(categoryId: string): Product[] {
  return demoProducts
    .filter((p) => p.category_id === categoryId)
    .map((p) => ({ ...p, category: getCategoryById(p.category_id) }));
}
