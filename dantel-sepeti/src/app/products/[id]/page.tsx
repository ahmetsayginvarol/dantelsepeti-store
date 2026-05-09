"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ChevronLeft, Share2, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { generateOrderLink } from "@/lib/whatsapp";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(*), images:product_images(*)")
        .eq("id", params.id)
        .single();
      if (!error && data) setProduct(data as Product);
      setLoading(false);
    };
    fetchProduct();
  }, [params.id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-obsidian-900 flex items-center justify-center">
          <Loader2 size={24} className="text-gold-400 animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-obsidian-900 flex items-center justify-center text-center px-4">
          <div>
            <p className="font-display text-4xl text-ivory-500 mb-4">Ürün bulunamadı</p>
            <Link href="/shop" className="btn-ghost px-8 py-3 inline-block">
              Koleksiyona Dön
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const images = product.images ?? [];
  const discount = product.original_price
    ? calculateDiscount(product.original_price, product.price)
    : null;
  const category = (product as any).category;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian-900 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-2 py-6 mb-4">
            <Link
              href="/shop"
              className="flex items-center gap-1.5 text-ivory-500 hover:text-gold-400 transition-colors font-sans text-xs tracking-wider"
            >
              <ChevronLeft size={13} />
              Koleksiyon
            </Link>
            <span className="text-ivory-600">/</span>
            <span className="font-sans text-xs tracking-wider text-ivory-400 truncate">
              {product.title}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

            <div className="space-y-3">
              <div className="relative aspect-[4/5] overflow-hidden bg-obsidian-700">
                {images[selectedImage]?.url ? (
                  <Image
                    src={images[selectedImage].url}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gold-500/20 font-display text-6xl">DS</span>
                  </div>
                )}
                {product.is_featured && (
                  <span className="absolute top-4 left-4 badge-featured">Seçkin</span>
                )}
                {discount && (
                  <span className="absolute top-4 right-4 bg-red-900/80 text-red-200 text-xs px-2 py-1 font-sans">
                    -%{discount}
                  </span>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-16 h-16 overflow-hidden border-2 transition-all ${
                        selectedImage === i
                          ? "border-gold-500"
                          : "border-obsidian-500 hover:border-gold-500/40"
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={`${product.title} ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:pt-4">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-sans text-xs tracking-[0.2em] text-gold-500/70 uppercase">
                  {product.sku}
                </span>
                {category && (
                  <>
                    <span className="text-obsidian-500">·</span>
                    <Link
                      href={`/shop?category=${category.slug}`}
                      className="font-sans text-xs tracking-wider text-ivory-500 hover:text-gold-400 transition-colors uppercase"
                    >
                      {category.name}
                    </Link>
                  </>
                )}
              </div>

              <h1 className="font-display text-4xl text-ivory-100 leading-tight mb-6">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-sans text-3xl font-medium text-ivory-100">
                  {formatPrice(product.price)}
                </span>
                {product.original_price && (
                  <span className="font-sans text-xl text-ivory-500 line-through">
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>

              <div className="w-full h-px bg-gradient-to-r from-gold-500/20 to-transparent mb-8" />

              {product.description && (
                <p className="font-body text-lg text-ivory-400 leading-relaxed mb-8">
                  {product.description}
                </p>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-sans text-xs tracking-[0.2em] uppercase text-ivory-400">
                      Beden Seçin
                    </span>
                    {selectedSize && (
                      <span className="font-sans text-xs text-gold-400 tracking-wider">
                        Seçilen: {selectedSize}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2.5 font-sans text-xs tracking-[0.15em] uppercase border transition-all ${
                          selectedSize === size
                            ? "border-gold-500 text-gold-400"
                            : "border-obsidian-500 text-ivory-400 hover:border-gold-500/40"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {product.is_available ? (
                  <a
                    href={generateOrderLink(product.sku, product.title, selectedSize ?? undefined)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full py-4 flex items-center justify-center gap-3 text-sm tracking-[0.15em]"
                  >
                    <MessageCircle size={16} className="relative z-10" />
                    <span>WhatsApp ile Sipariş Ver</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-4 bg-obsidian-600 text-ivory-500 font-sans text-sm tracking-[0.15em] uppercase cursor-not-allowed"
                  >
                    Stokta Yok
                  </button>
                )}

                <button
                  onClick={handleShare}
                  className="btn-ghost w-full py-3.5 flex items-center justify-center gap-2"
                >
                  <Share2 size={13} />
                  <span>{copied ? "Bağlantı kopyalandı!" : "Paylaş"}</span>
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gold-500/10 grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "Hızlı Kargo", desc: "1-3 gün" },
                  { label: "Gizli Paket", desc: "Özel ambalaj" },
                  { label: "Kolay İade", desc: "14 gün" },
                ].map((info) => (
                  <div key={info.label}>
                    <p className="font-sans text-[10px] tracking-wider uppercase text-gold-500 mb-0.5">
                      {info.label}
                    </p>
                    <p className="font-body text-sm text-ivory-500">{info.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
