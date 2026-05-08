"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { generateContactLink } from "@/lib/whatsapp";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1589810264340-0ce27f85a42e?w=1800&q=85"
          alt="Dantel Sepeti Lüks Koleksiyon"
          fill
          className="object-cover object-center opacity-25"
          priority
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-900 via-obsidian-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-obsidian-900/60" />
        {/* Subtle gold vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,0.6)_100%)]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-px h-64 bg-gradient-to-b from-transparent via-gold-500/30 to-transparent hidden lg:block" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-gold-500" />
            <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold-400">
              Yeni Koleksiyon 2024
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-ivory-100 leading-[0.9] mb-6">
            <span className="block">Kendinize</span>
            <span className="block italic text-gold-gradient">Lüks</span>
            <span className="block">Hissedin</span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-xl text-ivory-400 leading-relaxed mb-10 max-w-md">
            Özenle seçilmiş dantel, saten ve ipek koleksiyonlarıyla her anınızı özel kılın.
            Sadece sizin için.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="btn-gold px-8 py-4 inline-flex items-center justify-center gap-3 group"
            >
              <span>Koleksiyonu Keşfet</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform relative z-10" />
            </Link>
            <a
              href={generateContactLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-8 py-4 inline-flex items-center justify-center gap-2"
            >
              WhatsApp ile Ulaşın
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-16 pt-10 border-t border-gold-500/10">
            {[
              { value: "500+", label: "Ürün Çeşidi" },
              { value: "1000+", label: "Mutlu Müşteri" },
              { value: "5★", label: "Puan" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl text-gold-400">{stat.value}</div>
                <div className="font-sans text-xs tracking-wider text-ivory-500 mt-1 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 animate-bounce">
        <span className="font-sans text-xs tracking-[0.25em] uppercase text-ivory-500">
          Keşfet
        </span>
        <ChevronDown size={14} className="text-gold-500" />
      </div>
    </section>
  );
}
