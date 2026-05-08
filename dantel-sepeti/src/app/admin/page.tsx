"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Package, Tag, Star, AlertCircle, TrendingUp, ShoppingBag } from "lucide-react";
import { demoProducts, demoCategories } from "@/lib/demo-data";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboard() {
  const totalProducts = demoProducts.length;
  const featuredCount = demoProducts.filter((p) => p.is_featured).length;
  const unavailableCount = demoProducts.filter((p) => !p.is_available).length;
  const totalCategories = demoCategories.length;

  const stats = [
    { label: "Toplam Ürün", value: totalProducts, icon: Package, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { label: "Öne Çıkan", value: featuredCount, icon: Star, color: "text-gold-400", bg: "bg-gold-500/10 border-gold-500/20" },
    { label: "Tükendi", value: unavailableCount, icon: AlertCircle, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
    { label: "Kategoriler", value: totalCategories, icon: Tag, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  ];

  return (
    <div className="flex min-h-screen bg-obsidian-900">
      <AdminSidebar />

      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-obsidian-800 border-b border-gold-500/10 flex items-center justify-between px-6">
          <h1 className="font-display text-xl text-ivory-100">Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs text-ivory-500 tracking-wider">
              admin@dantelsepeti.com
            </span>
            <div className="w-8 h-8 bg-gold-500/15 border border-gold-500/20 flex items-center justify-center">
              <span className="text-gold-500 font-sans text-xs">A</span>
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className={`luxury-card p-5 border ${stat.bg}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 border flex items-center justify-center ${stat.bg}`}>
                    <stat.icon size={16} className={stat.color} />
                  </div>
                </div>
                <div className={`font-display text-3xl ${stat.color} mb-1`}>{stat.value}</div>
                <div className="font-sans text-xs tracking-wider text-ivory-500 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent products */}
          <div className="luxury-card overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gold-500/10">
              <h2 className="font-display text-lg text-ivory-200">Son Ürünler</h2>
              <Link
                href="/admin/products"
                className="font-sans text-xs tracking-wider text-gold-400 hover:text-gold-300 transition-colors uppercase"
              >
                Tümünü Gör →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold-500/5">
                    {["SKU", "Ürün Adı", "Fiyat", "Kategori", "Durum"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-6 py-3 font-sans text-[10px] tracking-[0.2em] uppercase text-ivory-600"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {demoProducts.slice(0, 6).map((product) => {
                    const category = demoCategories.find((c) => c.id === product.category_id);
                    return (
                      <tr
                        key={product.id}
                        className="border-b border-obsidian-600/50 hover:bg-obsidian-700/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-sans text-xs text-gold-500/70 tracking-wider">
                          {product.sku}
                        </td>
                        <td className="px-6 py-4 font-body text-base text-ivory-200">
                          {product.title}
                        </td>
                        <td className="px-6 py-4 font-sans text-sm text-ivory-300">
                          {formatPrice(product.price)}
                        </td>
                        <td className="px-6 py-4 font-sans text-xs text-ivory-500 tracking-wider">
                          {category?.name || "—"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`font-sans text-[10px] tracking-wider uppercase px-2 py-1 ${
                              product.is_available
                                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }`}
                          >
                            {product.is_available ? "Aktif" : "Tükendi"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
