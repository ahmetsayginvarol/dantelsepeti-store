import Link from "next/link";
import { Instagram, Send } from "lucide-react";
import { generateContactLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-obsidian-800 border-t border-gold-500/10">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <p className="font-display text-2xl tracking-[0.3em] uppercase text-ivory-100 leading-none">
                Dantel
              </p>
              <p className="font-display text-2xl tracking-[0.3em] uppercase text-gold-500 leading-none">
                Sepeti
              </p>
            </div>
            <p className="font-body text-ivory-400 text-lg leading-relaxed max-w-xs">
              Her kadın için özenle seçilmiş premium iç çamaşırı ve gecelik koleksiyonları.
              Kendinizi özel hissedin.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com/dantelsepeti"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-gold-500/30 flex items-center justify-center text-gold-500/70 hover:text-gold-400 hover:border-gold-400 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href={generateContactLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-gold-500/30 flex items-center justify-center text-gold-500/70 hover:text-gold-400 hover:border-gold-400 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <Send size={14} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-sans text-xs tracking-[0.25em] uppercase text-gold-500 mb-6">
              Koleksiyon
            </h3>
            <ul className="space-y-3">
              {[
                { label: "İç Çamaşırı", href: "/shop?category=ic-camasiri" },
                { label: "Bodysuitler", href: "/shop?category=bodysuitler" },
                { label: "Gecelikler", href: "/shop?category=gecelikler" },
                { label: "Fantezi", href: "/shop?category=fantezi" },
                { label: "Aksesuarlar", href: "/shop?category=aksesuarlar" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-base text-ivory-400 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-sans text-xs tracking-[0.25em] uppercase text-gold-500 mb-6">
              Bilgi
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Hakkımızda", href: "/about" },
                { label: "İletişim", href: "/contact" },
                { label: "Sipariş Nasıl Verilir?", href: "/about#siparis" },
                { label: "Gizlilik Politikası", href: "/about#gizlilik" },
                { label: "Değişim & İade", href: "/about#iade" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-base text-ivory-400 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-ivory-500 tracking-widest">
            © 2024 Dantel Sepeti. Tüm hakları saklıdır.
          </p>
          <p className="font-sans text-xs text-ivory-500">
            Sipariş için:{" "}
            <a
              href={generateContactLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 hover:text-gold-400 transition-colors"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
