import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { getFeatured } from "@/lib/supabase-queries";

export default async function FeaturedProducts() {
  const products = await getFeatured();

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-obsidian-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold-500 block mb-4">
            Özenle Seçildi
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-ivory-100 mb-4">
            Seçkin Koleksiyon
          </h2>
          <div className="section-divider mb-6" />
          <p className="font-body text-xl text-ivory-400 max-w-lg mx-auto">
            En çok tercih edilen ve özel tasarım parçalarımızı keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop" className="btn-ghost px-8 py-3.5 inline-flex items-center gap-3 group">
            <span>Tüm Koleksiyonu Gör</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
