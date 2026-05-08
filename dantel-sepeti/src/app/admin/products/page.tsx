"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { demoProducts, demoCategories } from "@/lib/demo-data";
import { formatPrice } from "@/lib/utils";
import { Plus, Search, Edit, Trash2, Star, ToggleLeft, ToggleRight, X } from "lucide-react";
import { Product } from "@/types";

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
        {/* Top bar */}
        <header className="h-16 bg-obsidian-800 border-b border-gold-500/10 flex items-center justify-between px-6">
          <h1 className="font-display text-xl text-ivory-100">Ürün Yönetimi</h1>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="btn-gold px-4 py-2 flex items-center gap-2 text-xs"
          >
            <Plus size={13} className="relative z-10" />
            <span>Yeni Ürün</span>
          </button>
        </header>

        <main className="p-6 lg:p-8">
          {/* Filters */}
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
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="luxury-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold-500/10">
                    {["SKU", "Ürün", "Kategori", "Fiyat", "Öne Çıkan", "Durum", "İşlemler"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3.5 font-sans text-[10px] tracking-[0.2em] uppercase text-ivory-600"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((product) => {
                    const category = demoCategories.find((c) => c.id === product.category_id);
                    return (
                      <tr
                        key={product.id}
                        className="border-b border-obsidian-600/40 hover:bg-obsidian-700/20 transition-colors"
                      >
                        <td className="px-5 py-4 font-sans text-xs text-gold-500/60 tracking-wider">
                          {product.sku}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-body text-base text-ivory-200 line-clamp-1">
                            {product.title}
                          </p>
                        </td>
                        <td className="px-5 py-4 font-sans text-xs text-ivory-500 tracking-wider">
                          {category?.name || "—"}
                        </td>
                        <td className="px-5 py-4 font-sans text-sm text-ivory-300 whitespace-nowrap">
                          {formatPrice(product.price)}
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => toggleFeatured(product.id)}
                            className="transition-colors"
                            title="Öne çıkanı değiştir"
                          >
                            <Star
                              size={15}
                              className={
                                product.is_featured
                                  ? "text-gold-400 fill-gold-400"
                                  : "text-ivory-600 hover:text-gold-500"
                              }
                            />
                          </button>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => toggleAvailability(product.id)}
                            title="Durumu değiştir"
                          >
                            {product.is_available ? (
                              <ToggleRight size={20} className="text-green-400" />
                            ) : (
                              <ToggleLeft size={20} className="text-ivory-600" />
                            )}
                          </button>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingProduct(product);
                                setShowForm(true);
                              }}
                              className="text-ivory-500 hover:text-gold-400 transition-colors"
                              title="Düzenle"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="text-ivory-500 hover:text-red-400 transition-colors"
                              title="Sil"
                            >
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

      {/* Product Form Modal */}
      {showForm && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

function ProductFormModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isEdit ? "Ürün güncellendi! (Demo)" : "Ürün eklendi! (Demo)");
    onClose();
  };

  return (
    <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
      <div className="luxury-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold-500/10">
          <h2 className="font-display text-xl text-ivory-100">
            {isEdit ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
          </h2>
          <button onClick={onClose} className="text-ivory-500 hover:text-ivory-200 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Ürün Adı</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="admin-input"
                placeholder="Siyah Dantel Bra Set"
              />
            </div>
            <div>
              <label className="admin-label">SKU Kodu</label>
              <input
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
                required
                className="admin-input"
                placeholder="DS-101"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Fiyat (₺)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                className="admin-input"
                placeholder="485"
              />
            </div>
            <div>
              <label className="admin-label">Orijinal Fiyat (₺)</label>
              <input
                type="number"
                value={form.original_price}
                onChange={(e) => setForm({ ...form, original_price: e.target.value })}
                className="admin-input"
                placeholder="650 (opsiyonel)"
              />
            </div>
          </div>

          <div>
            <label className="admin-label">Kategori</label>
            <select
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="admin-input"
            >
              <option value="">Kategori Seçin</option>
              {demoCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="admin-label">Açıklama</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="admin-input resize-none"
              placeholder="Ürün açıklaması..."
            />
          </div>

          <div>
            <label className="admin-label">Bedenler (virgülle ayırın)</label>
            <input
              value={form.sizes}
              onChange={(e) => setForm({ ...form, sizes: e.target.value })}
              className="admin-input"
              placeholder="XS, S, M, L, XL"
            />
          </div>

          {/* Image upload placeholder */}
          <div>
            <label className="admin-label">Ürün Görselleri</label>
            <div className="border-2 border-dashed border-obsidian-500 hover:border-gold-500/40 transition-colors p-8 text-center cursor-pointer">
              <p className="font-sans text-xs text-ivory-500 tracking-wider">
                Görselleri buraya sürükleyin veya tıklayın
              </p>
              <p className="font-sans text-xs text-ivory-600 mt-1">(Supabase Storage ile)</p>
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                className="accent-gold-500"
              />
              <span className="font-sans text-xs tracking-wider text-ivory-400">Öne Çıkan</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_available}
                onChange={(e) => setForm({ ...form, is_available: e.target.checked })}
                className="accent-gold-500"
              />
              <span className="font-sans text-xs tracking-wider text-ivory-400">Aktif / Stokta</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-gold flex-1 py-3 text-xs tracking-wider">
              <span>{isEdit ? "Güncelle" : "Ekle"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost flex-1 py-3 text-xs tracking-wider"
            >
              İptal
            </button>
          </div>
        </form>
      </div>

      <style jsx global>{`
        .admin-label {
          display: block;
          font-family: var(--font-jost), sans-serif;
          font-size: 0.625rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgb(200 185 165 / 0.6);
          margin-bottom: 0.375rem;
        }
        .admin-input {
          width: 100%;
          background: rgb(26 26 26);
          border: 1px solid rgb(61 61 61);
          color: rgb(248 244 237 / 0.9);
          padding: 0.625rem 0.875rem;
          font-family: var(--font-jost), sans-serif;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .admin-input:focus {
          border-color: rgb(201 169 110 / 0.5);
        }
      `}</style>
    </div>
  );
}
