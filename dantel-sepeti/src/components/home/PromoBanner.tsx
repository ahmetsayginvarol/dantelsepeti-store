import { generateContactLink } from "@/lib/whatsapp";

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Main Banner */}
      <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-800 to-obsidian-900 py-20 relative">
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

        {/* Floating ornament */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold-500/3 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Top tag */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-gold-500/60" />
            <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold-400">
              Özel Teklif
            </span>
            <div className="w-8 h-px bg-gold-500/60" />
          </div>

          <h2 className="font-display text-5xl sm:text-6xl text-ivory-100 mb-6 leading-tight">
            İlk Siparişinize
            <span className="text-gold-gradient block italic">Özel Sürpriz</span>
          </h2>

          <p className="font-body text-xl text-ivory-400 mb-10 max-w-md mx-auto leading-relaxed">
            WhatsApp üzerinden sipariş verin, özel indirimler ve kampanyalardan haberdar olun.
          </p>

          <a
            href={generateContactLink("ilk sipariş indirimi")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-10 py-4 inline-flex items-center gap-3 text-sm"
          >
            <span>Hemen Sipariş Ver</span>
          </a>
        </div>
      </div>

      {/* Info strip */}
      <div className="bg-gold-500/5 border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "✦", title: "Premium Kalite", desc: "Seçkin kumaşlar" },
              { icon: "◈", title: "Hızlı Kargo", desc: "1-3 iş günü" },
              { icon: "◇", title: "Gizli Paket", desc: "Özel ambalaj" },
              { icon: "✧", title: "Kolay İade", desc: "14 gün içinde" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-1.5">
                <span className="text-gold-500 text-lg">{item.icon}</span>
                <span className="font-sans text-xs tracking-wider uppercase text-ivory-200">
                  {item.title}
                </span>
                <span className="font-body text-sm text-ivory-500">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
