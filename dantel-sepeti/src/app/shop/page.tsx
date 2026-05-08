import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { demoProducts, demoCategories } from "@/lib/demo-data";
import Link from "next/link";
import { Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "Koleksiyon",
  description: "Tüm lüks iç çamaşırı, gecelik ve bodysuit koleksiyonumuzu keşfedin.",
};

interface ShopPageProps {
  searchParams: { category?: string; sort?: string };
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  const { category, sort } = searchParams;

  let products = demoProducts;

  if (category) {
    const cat = demoCategories.find((c) => c.slug === category);
    if (cat) {
      products = products.filter((p) => p.category_id === cat.id);
    }
  }

  const activeCategory = demoCategories.find((c) => c.slug === category);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian-900 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-14">
            <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold-500 block mb-3">
              {activeCategory ? activeCategory.name : "Tüm Ürünler"}
            </span>
            <h1 className="font-display text-5xl text-ivory-100 mb-4">
              {activeCategory ? activeCategory.name : "Koleksiyon"}
            </h1>
            <div className="section-divider mb-5" />
            <p className="font-body text-xl text-ivory-400 max-w-md mx-auto">
              {activeCategory?.description ||
                "Tüm premium koleksiyonumuzu keşfedin. Her zevke ve bedene uygun seçenekler."}
            </p>
          </div>

          {/* Filters row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-gold-500/10">
            {/* Category filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href="/shop"
                className={`font-sans text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-all ${
                  !category
                    ? "border-gold-500 text-gold-400 bg-gold-500/5"
                    : "border-obsidian-500 text-ivory-500 hover:border-gold-500/40 hover:text-ivory-300"
                }`}
              >
                Tümü
              </Link>
              {demoCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  className={`font-sans text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-all ${
                    category === cat.slug
                      ? "border-gold-500 text-gold-400 bg-gold-500/5"
                      : "border-obsidian-500 text-ivory-500 hover:border-gold-500/40 hover:text-ivory-300"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 text-ivory-500">
              <Filter size={13} />
              <span className="font-sans text-xs tracking-wider">
                {products.length} ürün
              </span>
            </div>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-display text-2xl text-ivory-500 mb-3">Ürün bulunamadı</p>
              <p className="font-body text-ivory-600">Bu kategoride henüz ürün bulunmuyor.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
