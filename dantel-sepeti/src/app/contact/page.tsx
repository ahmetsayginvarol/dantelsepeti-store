import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MessageCircle, Instagram, Clock, MapPin } from "lucide-react";
import { generateContactLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Dantel Sepeti ile iletişime geçin.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian-900 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold-500 block mb-4">
              Bize Ulaşın
            </span>
            <h1 className="font-display text-5xl text-ivory-100 mb-4">İletişim</h1>
            <div className="section-divider mb-5" />
            <p className="font-body text-xl text-ivory-400 max-w-md mx-auto">
              Sorularınız için bize WhatsApp üzerinden ulaşın.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-4">
              {[
                {
                  icon: <MessageCircle size={18} className="text-gold-500" />,
                  title: "WhatsApp",
                  value: "+90 5xx xxx xx xx",
                  sub: "Sipariş & Bilgi için",
                  href: generateContactLink(),
                },
                {
                  icon: <Instagram size={18} className="text-gold-500" />,
                  title: "Instagram",
                  value: "@dantelsepeti",
                  sub: "Yeni ürünler & kampanyalar",
                  href: "https://instagram.com/dantelsepeti",
                },
                {
                  icon: <Clock size={18} className="text-gold-500" />,
                  title: "Çalışma Saatleri",
                  value: "09:00 — 21:00",
                  sub: "Pazartesi — Cumartesi",
                  href: null,
                },
                {
                  icon: <MapPin size={18} className="text-gold-500" />,
                  title: "Kargo",
                  value: "Türkiye Geneli",
                  sub: "1–3 iş günü teslimat",
                  href: null,
                },
              ].map((item) => (
                <div key={item.title} className="luxury-card p-5">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 border border-gold-500/20 flex items-center justify-center mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold-500/70 mb-1">
                        {item.title}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-ivory-200 text-lg hover:text-gold-400 transition-colors block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-body text-ivory-200 text-lg">{item.value}</p>
                      )}
                      <p className="font-body text-ivory-500 text-sm mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA panel */}
            <div className="lg:col-span-3">
              <div className="luxury-card p-10 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                  <MessageCircle size={28} className="text-green-400" />
                </div>
                <h2 className="font-display text-3xl text-ivory-100 mb-4">
                  WhatsApp ile Sipariş
                </h2>
                <p className="font-body text-ivory-500 text-lg leading-relaxed mb-8 max-w-xs">
                  Sipariş vermek, fiyat sormak veya bilgi almak için WhatsApp&apos;tan bize yazın.
                  Hızlıca yanıt veriyoruz.
                </p>
                <a
                  href={generateContactLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold px-10 py-4 inline-flex items-center gap-3 mb-4 w-full max-w-xs justify-center"
                >
                  <MessageCircle size={15} className="relative z-10" />
                  <span>WhatsApp Yaz</span>
                </a>
                <p className="font-sans text-xs text-ivory-600 tracking-wider">
                  Ortalama yanıt süresi: &lt; 1 saat
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
