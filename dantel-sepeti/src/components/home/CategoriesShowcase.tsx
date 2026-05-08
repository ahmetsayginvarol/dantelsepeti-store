import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { demoCategories } from "@/lib/demo-data";

export default function CategoriesShowcase() {
  const featured = demoCategories.slice(0, 5);

  return (
    <section className="py-24 bg-obsidian-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
          <div>
            <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold-500 block mb-3">
              Kategoriler
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-ivory-100">
              Her Zevke Göre
            </h2>
          </div>
          <Link
            href="/categories"
            className="font-sans text-xs tracking-[0.2em] uppercase text-gold-400 hover:text-gold-300 flex items-center gap-2 group self-start sm:self-auto"
          >
            Tümünü Gör
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {featured.map((category, index) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className={`group relative overflow-hidden ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  index === 0 ? "aspect-square" : "aspect-[3/4]"
                } bg-obsidian-700`}
              >
                {category.image_url ? (
                  <Image
                    src={category.image_url}
                    alt={category.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-obsidian-600 to-obsidian-800" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/80 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 px-3 text-center">
                  <h3 className="font-display text-lg text-ivory-100 leading-tight mb-1">
                    {category.name}
                  </h3>
                  <div className="w-6 h-px bg-gold-500 group-hover:w-10 transition-all duration-300" />
                </div>

                {/* Arrow on hover */}
                <div className="absolute top-4 right-4 w-7 h-7 bg-gold-500/0 group-hover:bg-gold-500/20 border border-gold-500/0 group-hover:border-gold-500/50 flex items-center justify-center transition-all duration-300">
                  <ArrowRight
                    size={11}
                    className="text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
