"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { demoCategories } from "@/lib/demo-data";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { Category } from "@/types";
import Image from "next/image";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(demoCategories);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const deleteCategory = (id: string) => {
    if (confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-obsidian-900">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        <header className="h-16 bg-obsidian-800 border-b border-gold-500/10 flex items-center justify-between px-6">
          <h1 className="font-display text-xl text-ivory-100">Kategori Yönetimi</h1>
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="btn-gold px-4 py-2 flex items-center gap-2 text-xs"
          >
            <Plus size={13} className="relative z-10" />
            <span>Yeni Kategori</span>
          </button>
        </header>

        <main className="p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="luxury-card overflow-hidden">
                {cat.image_url && (
                  <div className="relative h-36 overflow-hidden">
                    <Image src={cat.image_url} alt={cat.name} fill className="object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/80 to-transparent" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg text-ivory-100">{cat.name}</h3>
                      <p className="font-sans text-xs text-gold-500/60 tracking-wider mt-0.5">/{cat.slug}</p>
                      {cat.description && (
                        <p className="font-body text-ivory-500 text-sm mt-2 line-clamp-2">{cat.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-3">
                      <button onClick={() => { setEditing(cat); setShowForm(true); }} className="text-ivory-500 hover:text-gold-400 transition-colors">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => deleteCategory(cat.id)} className="text-ivory-500 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {showForm && (
        <CategoryFormModal
          category={editing}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

function CategoryFormModal({ category, onClose }: { category: Category | null; onClose: () => void }) {
  const [form, setForm] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    image_url: category?.image_url || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(category ? "Kategori güncellendi! (Demo)" : "Kategori eklendi! (Demo)");
    onClose();
  };

  return (
    <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
      <div className="luxury-card w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gold-500/10">
          <h2 className="font-display text-xl text-ivory-100">
            {category ? "Kategoriyi Düzenle" : "Yeni Kategori"}
          </h2>
          <button onClick={onClose} className="text-ivory-500 hover:text-ivory-200">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-ivory-600 mb-1.5">Kategori Adı</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
              className="w-full bg-obsidian-700 border border-obsidian-500 focus:border-gold-500/50 text-ivory-200 px-4 py-2.5 text-sm font-sans outline-none" />
          </div>
          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-ivory-600 mb-1.5">Slug</label>
            <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} required
              className="w-full bg-obsidian-700 border border-obsidian-500 focus:border-gold-500/50 text-ivory-200 px-4 py-2.5 text-sm font-sans outline-none"
              placeholder="ic-camasiri" />
          </div>
          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-ivory-600 mb-1.5">Açıklama</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2}
              className="w-full bg-obsidian-700 border border-obsidian-500 focus:border-gold-500/50 text-ivory-200 px-4 py-2.5 text-sm font-sans outline-none resize-none" />
          </div>
          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-ivory-600 mb-1.5">Görsel URL</label>
            <input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})}
              className="w-full bg-obsidian-700 border border-obsidian-500 focus:border-gold-500/50 text-ivory-200 px-4 py-2.5 text-sm font-sans outline-none"
              placeholder="https://..." />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-gold flex-1 py-3 text-xs tracking-wider"><span>{category ? "Güncelle" : "Ekle"}</span></button>
            <button type="button" onClick={onClose} className="btn-ghost flex-1 py-3 text-xs tracking-wider">İptal</button>
          </div>
        </form>
      </div>
    </div>
  );
}
