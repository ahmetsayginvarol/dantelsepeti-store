import Image from "next/image";
import { Instagram } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=500&q=80",
    caption: "Yeni koleksiyon",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1602810319428-019690571b5b?w=500&q=80",
    caption: "Saten gecelikler",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500&q=80",
    caption: "Bodysuit koleksiyonu",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=500&q=80",
    caption: "Lüks aksesuarlar",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500&q=80",
    caption: "Fantezi koleksiyon",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1631671268049-1d05f30d8c6a?w=500&q=80",
    caption: "Şampanya serisi",
  },
];

export default function GallerySection() {
  return (
    <section className="py-24 bg-obsidian-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Instagram size={16} className="text-gold-500" />
            <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold-500">
              @dantelsepeti
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-ivory-100 mb-4">
            Instagram&apos;dan İlham Al
          </h2>
          <div className="section-divider" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {galleryImages.map((img) => (
            <a
              key={img.id}
              href="https://instagram.com/dantelsepeti"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-obsidian-700"
            >
              <Image
                src={img.url}
                alt={img.caption}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-obsidian-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram size={20} className="text-ivory-100" />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href="https://instagram.com/dantelsepeti"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs tracking-[0.25em] uppercase text-gold-400 hover:text-gold-300 transition-colors inline-flex items-center gap-2"
          >
            <Instagram size={13} />
            Instagram&apos;ı Takip Edin
          </a>
        </div>
      </div>
    </section>
  );
}
