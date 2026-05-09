"use client";
import { useState, useRef } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { demoProducts, demoCategories } from "@/lib/demo-data";
import { formatPrice } from "@/lib/utils";
import { Plus, Search, Edit, Trash2, Star, ToggleLeft, ToggleRight, X, Upload, Image as ImageIcon, Loader2, CheckCircle } from "lucide-react";
import { Product } from "@/types";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(demoProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = products.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || p.category_id === selectedCategory;
    return matchSearch && matchCat;
  });

  const toggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_featured: !p.is_featured } : p))
    );
  };

  const toggleAvailability = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_available: !p.is_available } : p))
    );
  };

  const deleteProduct = (id: string) => {
    if (confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-obsidian-900">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        <header className="h-16 bg-obsidian-800 border-b border-gold-500/10 flex items-center justify-between px-6">
          <h1 className="font-display text-xl text-ivory-100">Ürün Yönetimi</h1>
          <button
            onClick={() => { setEditingProduct(null); setShowForm(true); }}
            className="btn-gold px-4 py-2 flex items-center gap-2 text-xs"
          >
            <Plus size={13} className="relative z-10" />
            <span>Yeni Ürün</span>
          </button>
        </header>

        <main className="p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory-600" />
              <input
                type="text"
                placeholder="Ürün adı veya SKU ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-obsidian-700 border border-obsidian-500 focus:border-gold-500/50 text-ivory-200 pl-9 pr-4 py-2.5 font-sans text-sm outline-none transition-colors placeholder:text-ivory-600"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-obsidian-700 border border-obsidian-500 focus:border-gold-500/50 text-ivory-400 px-4 py-2.5 font-sans text-sm outline-none transition-colors sm:w-48"
            >
              <option value="">Tüm Kategoriler</option>
              {demoCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Mobile cards */}
          <div className="block lg:hidden space-y-3">
            {filtered.map((product) => {
              const category = demoCategories.find((c) => c.id === product.category_id);
              const primaryImage = product.images?.[0]?.url;
              return (
                <div key={product.id} className="luxury-card p-4 flex gap-3">
                  <div className="w-16 h-16 bg-obsidian-700 shrink-0 relative overflow-hidden">
                    {primaryImage ? (
                      <Image src={primaryImage} alt={product.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={16} className="text-ivory-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-sans text-[10px] text-gold-500/60 tracking-wider">{product.sku}</p>
                        <p className="font-body text-base text-ivory-200 truncate">{product.title}</p>
                        <p className="font-sans text-xs text-ivory-500">{category?.name} · {formatPrice(product.price)}</p>
                      </div>
                      <div className="flex gap-3 shrink-0 mt-1">
                        <button onClick={() => toggleFeatured(product.id)}>
                          <Star size={14} className={product.is_featured ? "text-gold-400 fill-gold-400" : "text-ivory-600"} />
                        </button>
                        <button onClick={() => toggleAvailability(product.id)}>
                          {product.is_available
                            ? <ToggleRight size={18} className="text-green-400" />
                            : <ToggleLeft size={18} className="text-ivory-600" />}
                        </button>
                        <button onClick={() => { setEditingProduct(product); setShowForm(true); }}>
                          <Edit size={14} className="text-ivory-500" />
                        </button>
                        <button onClick={() => deleteProduct(product.id)}>
                          <Trash2 size={14} className="text-ivory-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-ivory-500">
                <p className="font-body text-lg">Ürün bulunamadı</p>
              </div>
            )}
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block luxury-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold-500/10">
                    {["Görsel", "SKU", "Ürün", "Kategori", "Fiyat", "Öne Çıkan", "Durum", "İşlemler"].map((h) => (
                      <th key={h} className="text-left px-5 py-3.5 font-sans text-[10px] tracking-[0.2em] uppercase text-ivory-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((product) => {
                    const category = demoCategories.find((c) => c.id === product.category_id);
                    const primaryImage = product.images?.[0]?.url;
                    return (
                      <tr key={product.id} className="border-b border-obsidian-600/40 hover:bg-obsidian-700/20 transition-colors">
                        <td className="px-5 py-3">
                          <div className="w-10 h-10 bg-obsidian-700 relative overflow-hidden">
                            {primaryImage ? (
                              <Image src={primaryImage} alt={product.title} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon size={12} className="text-ivory-600" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4 font-sans text-xs text-gold-500/60 tracking-wider">{product.sku}</td>
                        <td className="px-5 py-4 font-body text-base text-ivory-200 line-clamp-1">{product.title}</td>
                        <td className="px-5 py-4 font-sans text-xs text-ivory-500 tracking-wider">{category?.name || "—"}</td>
                        <td className="px-5 py-4 font-sans text-sm text-ivory-300 whitespace-nowrap">{formatPrice(product.price)}</td>
                        <td className="px-5 py-4">
                          <button onClick={() => toggleFeatured(product.id)}>
                            <Star size={15} className={product.is_featured ? "text-gold-400 fill-gold-400" : "text-ivory-600 hover:text-gold-500"} />
                          </button>
                        </td>
                        <td className="px-5 py-4">
                          <button onClick={() => toggleAvailability(product.id)}>
                            {product.is_available
                              ? <ToggleRight size={20} className="text-green-400" />
                              : <ToggleLeft size={20} className="text-ivory-600" />}
                          </button>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => { setEditingProduct(product); setShowForm(true); }} className="text-ivory-500 hover:text-gold-400 transition-colors">
                              <Edit size={14} />
                            </button>
                            <button onClick={() => deleteProduct(product.id)} className="text-ivory-500 hover:text-red-400 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-16 text-ivory-500">
                  <p className="font-body text-lg">Ürün bulunamadı</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {showForm && (
        <ProductFormModal product={editingProduct} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}

function ImageUploader({ onUploaded }: { onUploaded: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setError("");

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setError("Sadece görsel dosyaları yükleyebilirsiniz.");
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Dosya boyutu 5MB'dan küçük olmalıdır.");
        continue;
      }

      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError(`Yükleme hatası: ${uploadError.message}`);
        continue;
      }

      const { data: urlData } = supabase.storage.from("products").getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;
      setUploadedUrls((prev) => [...prev, publicUrl]);
      onUploaded(publicUrl);
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className={`flex flex-col items-center justify-center border-2 border-dashed transition-colors cursor-pointer p-6 text-center ${
          uploading ? "border-gold-500/40 bg-gold-500/5" : "border-obsidian-500 hover:border-gold-500/40 hover:bg-obsidian-700/30"
        }`}
      >
        {uploading ? (
          <>
            <Loader2 size={24} className="text-gold-400 animate-spin mb-2" />
            <p className="font-sans text-xs text-gold-400 tracking-wider">Yükleniyor...</p>
          </>
        ) : (
          <>
            <Upload size={24} className="text-ivory-600 mb-2" />
            <p className="font-sans text-xs text-ivory-400 tracking-wider">Görsel seç veya buraya sürükle</p>
            <p className="font-sans text-[10px] text-ivory-600 mt-1">JPG, PNG, WEBP · Maks 5MB · Çoklu seçim</p>
          </>
        )}
      </label>
      {error && <p className="font-sans text-xs text-red-400 mt-2">{error}</p>}
      {uploadedUrls.length > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {uploadedUrls.map((url, i) => (
            <div key={i} className="relative w-14 h-14 bg-obsidian-700 overflow-hidden">
              <Image src={url} alt={`Görsel ${i + 1}`} fill className="object-cover" />
              <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                <CheckCircle size={14} className="text-green-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductFormModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    title: product?.title || "",
    sku: product?.sku || "",
    price: product?.price?.toString() || "",
    original_price: product?.original_price?.toString() || "",
    description: product?.description || "",
    category_id: product?.category_id || "",
    sizes: product?.sizes?.join(", ") || "",
    is_featured: product?.is_featured || false,
    is_available: product?.is_available ?? true,
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    product?.images?.map((i) => i.url) || []
  );

  const handleImageUploaded = (url: string) => {
    setUploadedImages((prev) => [...prev, url]);
  };

  const removeImage = (url: string) => {
    setUploadedImages((prev) => prev.filter((u) => u !== url));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedImages.length === 0) {
      alert("Lütfen en az bir görsel yükleyin.");
      return;
    }
    console.log("Kaydedildi:", { ...form, images: uploadedImages });
    alert(isEdit ? "Ürün güncellendi!" : "Ürün eklendi!");
    onClose();
  };
    console.log("Kaydedildi:", { ...form, images: uploadedImages });
    alert(isEdit ? "Ürün güncellendi!" : "Ürün eklendi!");
    onClose();
  };

  return (
    <div className="fixed inset-0 modal-backdrop z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="luxury-card w-full max-w-2xl my-4">
        <div className="flex items-center justify-between p-5 border-b border-gold-500/10 sticky top-0 bg-obsidian-800 z-10">
          <h2 className="font-display text-xl text-ivory-100">
            {isEdit ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
          </h2>
          <button onClick={onClose} className="text-ivory-500 hover:text-ivory-200 transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-ivory-600 mb-2">
              Ürün Görselleri
            </label>
            {uploadedImages.length > 0 && (
              <div className="flex gap-2 mb-3 flex-wrap">
                {uploadedImages.map((url, i) => (
                  <div key={i} className="relative w-16 h-16 bg-obsidian-700 overflow-hidden group">
                    <Image src={url} alt={`Görsel ${i + 1}`} fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      className="absolute inset-0 bg-red-900/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <X size={14} className="text-red-200" />
                    </button>
                    {i === 0 && (
                      <span className="absolute bottom-0 left-0 right-0 bg-gold-500/80 text-obsidian-900 text-[8px] text-center font-sans font-medium">ANA</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <ImageUploader onUploaded={handleImageUploaded} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Ürün Adı</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="admin-input" placeholder="Siyah Dantel Bra Set" />
            </div>
            <div>
              <label className="admin-label">SKU Kodu</label>
              <input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} required className="admin-input" placeholder="DS-101" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Fiyat (₺)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className="admin-input" placeholder="485" />
            </div>
            <div>
              <label className="admin-label">İndirimli Fiyat (₺)</label>
              <input type="number" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} className="admin-input" placeholder="650 (opsiyonel)" />
            </div>
          </div>

          <div>
            <label className="admin-label">Kategori</label>
            <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className="admin-input">
              <option value="">Kategori Seçin</option>
              {demoCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="admin-label">Açıklama</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="admin-input resize-none" placeholder="Ürün açıklaması..." />
          </div>

          <div>
            <label className="admin-label">Bedenler (virgülle ayırın)</label>
            <input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className="admin-input" placeholder="XS, S, M, L, XL" />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="accent-gold-500 w-4 h-4" />
              <span className="font-sans text-xs tracking-wider text-ivory-400">Öne Çıkan</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={form.is_available} onChange={(e) => setForm({ ...form, is_available: e.target.checked })} className="accent-gold-500 w-4 h-4" />
              <span className="font-sans text-xs tracking-wider text-ivory-400">Aktif / Stokta</span>
            </label>
          </div>

     