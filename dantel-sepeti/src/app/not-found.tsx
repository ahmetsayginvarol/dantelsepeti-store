import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian-900 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="font-display text-8xl text-gold-500/20 mb-4">404</p>
          <h1 className="font-display text-3xl text-ivory-100 mb-3">Sayfa Bulunamadı</h1>
          <div className="section-divider my-5" />
          <p className="font-body text-xl text-ivory-500 mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
          <Link href="/" className="btn-gold px-8 py-3.5 inline-flex items-center gap-2">
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
