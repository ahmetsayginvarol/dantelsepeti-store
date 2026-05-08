import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateContactLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Dantel Sepeti hakkında bilgi edinin.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian-900 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-20">
            <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold-500 block mb-4">
              Hikayemiz
            </span>
            <h1 className="font-display text-5xl sm:text-6xl text-ivory-100 mb-6">
              Dantel Sepeti
              <span className="block italic text-gold-gradient">Hakkında</span>
            </h1>
            <div className="section-divider mb-6" />
            <p className="font-body text-xl text-ivory-400 leading-relaxed">
              Her kadının kendini özel ve güzel hissetmeye hakkı vardır.
            </p>
          </div>

          {/* Story */}
          <div className="prose-luxury mb-20">
            <div className="luxury-card p-10 mb-8">
              <h2 className="font-display text-3xl text-gold-400 mb-6">Vizyonumuz</h2>
              <p className="font-body text-lg text-ivory-400 leading-relaxed mb-4">
                Dantel Sepeti, her kadının kendine özel, lüks ve kaliteli iç çamaşırına kolayca
                erişebileceği inancıyla kuruldu. Türkiye&apos;nin dört bir yanına premium lingerie
                ulaştırıyoruz.
              </p>
              <p className="font-body text-lg text-ivory-400 leading-relaxed">
                Seçtiğimiz her parça; kaliteli kumaştan, özenli işçilikten ve zarif tasarımdan
                oluşur. Müşterilerimizin her birini özel hissettirmek en büyük motivasyonumuz.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                {
                  icon: "◈",
                  title: "Premium Kalite",
                  desc: "Her ürün en kaliteli kumaşlardan özenle üretilir.",
                },
                {
                  icon: "✦",
                  title: "Gizlilik",
                  desc: "Siparişleriniz her zaman gizli paketleme ile teslim edilir.",
                },
                {
                  icon: "◇",
                  title: "Müşteri Odaklı",
                  desc: "Memnuniyetiniz için 7/24 WhatsApp destek sunuyoruz.",
                },
              ].map((v) => (
                <div
                  key={v.title}
                  className="luxury-card p-6 text-center"
                >
                  <span className="text-3xl text-gold-500 block mb-3">{v.icon}</span>
                  <h3 className="font-display text-xl text-ivory-100 mb-2">{v.title}</h3>
                  <p className="font-body text-ivory-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

            {/* How to order */}
            <div id="siparis" className="luxury-card p-10 mb-8">
              <h2 className="font-display text-3xl text-gold-400 mb-6">
                Sipariş Nasıl Verilir?
              </h2>
              <div className="space-y-4">
                {[
                  { step: "01", text: "Web sitemizden beğendiğiniz ürünü seçin." },
                  { step: "02", text: "Ürün sayfasındaki 'WhatsApp ile Sipariş Ver' butonuna tıklayın." },
                  { step: "03", text: "Beden ve renk tercihlerinizi bize bildirin." },
                  { step: "04", text: "Ödeme bilgileri ve kargo ayrıntıları için size ulaşacağız." },
                  { step: "05", text: "Siparişiniz 1-3 iş günü içinde kapınıza teslim edilir." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <span className="font-display text-gold-500/50 text-2xl leading-none shrink-0 w-8">
                      {item.step}
                    </span>
                    <p className="font-body text-ivory-400 text-lg leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy & Return */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div id="gizlilik" className="luxury-card p-8">
                <h2 className="font-display text-2xl text-ivory-100 mb-4">
                  Gizlilik Politikası
                </h2>
                <p className="font-body text-ivory-500 leading-relaxed">
                  Kişisel bilgileriniz ve alışveriş geçmişiniz kesinlikle üçüncü taraflarla
                  paylaşılmaz. Tüm iletişim ve ödeme bilgileriniz güvende tutulur.
                </p>
              </div>
              <div id="iade" className="luxury-card p-8">
                <h2 className="font-display text-2xl text-ivory-100 mb-4">Değişim & İade</h2>
                <p className="font-body text-ivory-500 leading-relaxed">
                  Teslimattan itibaren 14 gün içinde, ürün etiketi sökülmemiş ve kullanılmamış
                  olmak koşuluyla değişim ya da iade yapabilirsiniz.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href={generateContactLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-10 py-4 inline-flex items-center gap-3 text-sm"
            >
              <span>WhatsApp&apos;tan Ulaşın</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
