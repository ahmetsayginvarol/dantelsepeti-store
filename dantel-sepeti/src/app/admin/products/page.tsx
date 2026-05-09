"use client";
import { useState, useRef } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { demoProducts, demoCategories } from "@/lib/demo-data";
import { formatPrice } from "@/lib/utils";
import { Plus, Search, Edit, Trash2, Star, ToggleLeft, ToggleRight, X, Upload, Loader2, CheckCircle, Image as ImageIcon } from "lucide-react";
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
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, is_featured: !p.is_featured } : p)));
  };

  const toggleAvailability = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, is_available: !p.is_available } : p)));
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
                className="w-full bg-obsidian-700 border border-obsidian-500 text-ivory-200 pl-9 pr-4 py-2.5 font-sans text-sm outline-none"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-obsidian-700 border border-obsidian-500 text-ivory-400 px-4 py-2.5 font-sans text-sm outline-none sm:w-48"
            >
              <option value="">Tüm Kategoriler</option>
              {demoCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

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
                    <p className="font-sans text-[10px] text-gold-500/60 tracking-wider">{product.sku}</p>
                    <p className="font-body text-base text-ivory-200 truncate">{product.title}</p>
                    <p className="font-sans text-xs text-ivory-500">{category?.name} · {formatPrice(product.price)}</p>
                    <div className="flex gap-3 mt-2">
                      <button onClick={() => toggleFeatured(product.id)}>
                        <Star size={14} className={product.is_featured ? "text-gold-400 fill-gold-400" : "text-ivory-600"} />
                      </button>
                      <button onClick={() => toggleAvailability(product.id)}>
                        {product.is_available ? <ToggleRight size={18} className="text-green-400" /> : <ToggleLeft size={18} className="text-ivory-600" />}
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
              );
            })}
            {filtered.length === 0 && (
              <p className="text-center py-16 font-body text-lg text-ivory-500">Ürün bulunamadı</p>
            )}
          </div>

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
                        <td className="px-5 py-4 font-body text-base text-ivory-200">{product.title}</td>
                        <td className="px-5 py-4 font-sans text-xs text-ivory-500">{category?.name || "—"}</td>
                        <td className="px-5 py-4 font-sans text-sm text-ivory-300">{formatPrice(product.price)}</td>
                        <td className="px-5 py-4">
                          <button onClick={() => toggleFeatured(product.id)}>
                            <Star size={15} className={product.is_featured ? "text-gold-400 fill-gold-400" : "text-ivory-600"} />
                          </button>
                        </td>
                        <td className="px-5 py-4">
                          <button onClick={() => toggleAvailability(product.id)}>
                            {product.is_available ? <ToggleRight size={20} className="text-green-400" /> : <ToggleLeft size={20} className="text-ivory-600" />}
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
                <p className="text-center py-16 font-body text-lg text-ivory-500">Ürün bulunamadı</p>
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
  const [done, setDone] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setError("");

    for (const file of files) {
      if (!file.type.startsWith("image/")) { setError("Sadece görsel yüklenebilir."); continue; }
      if (file.size > 5 * 1024 * 1024) { setError("Maks 5MB olmalıdır."); continue; }

      const ext = file.name.split(".").pop();
      const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: err } = await supabase.storage.from("products").upload(path, file, { cacheControl: "3600", upsert: false });
      if (err) { setError(`Hata: ${err.message}`); continue; }

      const { data } = supabase.storage.from("products").getPublicUrl(path);
      setDone((prev) => [...prev, data.publicUrl]);
      onUploaded(data.publicUrl);
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleChange} className="hidden" id="img-upload" />
      <label htmlFor="img-upload" className="flex flex-col items-center justify-center border-2 border-dashed border-obsidian-500 hover:border-gold-500/40 cursor-pointer p-6 text-center transition-colors">
        {uploading ? (
          <><Loader2 size={22} className="text-gold-400 animate-spin mb-2" /><p className="font-sans text-xs text-gold-400">Yükleniyor...</p></>
        ) : (
          <><Upload size={22} className="text-ivory-600 mb-2" /><p className="font-sans text-xs text-ivory-400">Görsel seç veya sürükle</p><p className="font-sans text-[10px] text-ivory-600 mt-1">JPG, PNG, WEBP · Maks 5MB</p></>
        )}
      </label>
      {error && <p className="text-xs text-red-400 mt-2 font-sans">{error}</p>}
      {done.length > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {done.map((url, i) => (
            <div key={i} className="relative w-14 h-14 overflow-hidden bg-obsidian-700">
              <Image src={url} alt="" fill className="object-cover" />
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
    title: product?.title ?? "",
    sku: product?.sku ?? "",
    price: product?.price?.toString() ?? "",
    original_price: product?.original_price?.toString() ?? "",
    description: product?.description ?? "",
    category_id: product?.category_id ?? "",
    sizes: product?.sizes?.join(", ") ?? "",
    is_featured: product?.is_featured ?? false,
    is_available: product?.is_available ?? true,
  });
  const [images, setImages] = useState<string[]>(product?.images?.map((i) => i.url) ?? []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (images.length === 0) { alert("En az bir görsel yükleyin."); return; }

  try {
    // 1. Ürünü products tablosuna kaydet
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        sku: form.sku,
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        original_price: form.original_price ? parseFloat(form.original_price) : null,
        category_id: form.category_id || null,
        sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        is_featured: form.is_featured,
        is_available: form.is_available,
      })
      .select()
      .single();

    if (productError) { alert(`Hata: ${productError.message}`); return; }

    // 2. Görselleri product_images tablosuna kaydet
    const imageRows = images.map((url, i) => ({
      product_id: product.id,
      url,
      sort_order: i,
      is_primary: i === 0,
    }));

    const { error: imgError } = await supabase
      .from("product_images")
      .insert(imageRows);

    if (imgError) { alert(`Görsel kayıt hatası: ${imgError.message}`); return; }

    alert("Ürün başarıyla eklendi!");
    onClose();
    window.location.reload();
  } catch (err) {
    alert("Beklenmeyen hata oluştu.");
  }
};
  const inputClass = "w-full bg-[#1a1a1a] border border-[#3d3d3d] focus:border-[rgba(201,169,110,0.5)] text-[rgba(248,244,237,0.9)] px-3.5 py-2.5 font-sans text-sm outline-none transition-colors";
  const labelClass = "block font-sans text-[10px] tracking-[0.2em] uppercase text-[rgba(200,185,165,0.6)] mb-1.5";

  return (
    <div className="fixed inset-0 modal-backdrop z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="luxury-card w-full max-w-2xl my-4">
        <div className="flex items-center justify-between p-5 border-b border-gold-500/10 bg-obsidian-800">
          <h2 className="font-display text-xl text-ivory-100">{isEdit ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h2>
          <button onClick={onClose} className="text-ivory-500 hover:text-ivory-200 p-1"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label className={labelClass}>Ürün Görselleri</label>
            {images.length > 0 && (
              <div className="flex gap-2 mb-3 flex-wrap">
                {images.map((url, i) => (
                  <div key={i} className="relative w-16 h-16 bg-obsidian-700 overflow-hidden group">
                    <Image src={url} alt="" fill className="object-cover" />
                    <button type="button" onClick={() => setImages((prev) => prev.filter((u) => u !== url))} className="absolute inset-0 bg-red-900/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <X size={14} className="text-red-200" />
                    </button>
                    {i === 0 && <span className="absolute bottom-0 left-0 right-0 bg-gold-500/80 text-obsidian-900 text-[8px] text-center font-sans">ANA</span>}
                  </div>
                ))}
              </div>
            )}
            <ImageUploader onUploaded={(url) => setImages((prev) => [...prev, url])} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Ürün Adı</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className={inputClass} placeholder="Siyah Dantel Bra Set" />
            </div>
            <div>
              <label className={labelClass}>SKU Kodu</label>
              <input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} required className={inputClass} placeholder="DS-101" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Fiyat (₺)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className={inputClass} placeholder="485" />
            </div>
            <div>
              <label className={labelClass}>İndirimli Fiyat (₺)</label>
              <input type="number" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} className={inputClass} placeholder="opsiyonel" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Kategori</label>
            <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className={inputClass}>
              <option value="">Kategori Seçin</option>
              {demoCategories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Açıklama</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={`${inputClass} resize-none`} placeholder="Ürün açıklaması..." />
          </div>

          <div>
            <label className={labelClass}>Bedenler (virgülle ayırın)</label>
            <input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className={inputClass} placeholder="XS, S, M, L, XL" />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="w-4 h-4 accent-yellow-600" />
              <span className="font-sans text-xs text-ivory-400">Öne Çıkan</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_available} onChange={(e) => setForm({ ...form, is_available: e.target.checked })} className="w-4 h-4 accent-yellow-600" />
              <span className="font-sans text-xs text-ivory-400">Aktif / Stokta</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-gold flex-1 py-3.5 text-xs tracking-wider"><span>{isEdit ? "Güncelle" : "Ürünü Ekle"}</span></button>
            <button type="button" onClick={onClose} className="btn-ghost flex-1 py-3.5 text-xs tracking-wider">İptal</button>
          </div>
        </form>
      </div>
    </div>
  );
}
