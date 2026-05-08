import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { demoCategories } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Kategoriler",
  description: "Tüm koleksiyon kategorilerimizi keşfedin.",
};

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian-900 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold-500 block mb-4">
              Keşfet
            </span>
            <h1 className="font-display text-5xl text-ivory-100 mb-4">Kategoriler</h1>
            <div className="section-divider mb-5" />
            <p className="font-body text-xl text-ivory-400 max-w-md mx-auto">
              Her zevke ve tarza uygun seçkin koleksiyonlarımız
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoCategories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group luxury-card overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  {category.image_url ? (
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-obsidian-600 to-obsidian-800" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-2xl text-ivory-100 group-hover:text-gold-300 transition-colors mb-2">
                        {category.name}
                      </h2>
                      <p className="font-body text-ivory-500 text-base leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    <div className="shrink-0 w-8 h-8 border border-gold-500/30 group-hover:border-gold-500 flex items-center justify-center ml-4 transition-all">
                      <ArrowRight
                        size={13}
                        className="text-gold-500/50 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
