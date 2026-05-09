"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { supabase } from "@/lib/supabase";
import { Save, Loader2, CheckCircle } from "lucide-react";

interface ContentRow {
  id: string;
  key: string;
  label: string;
  value: string;
  type: string;
}

export default function AdminContentPage() {
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("*")
      .order("label")
      .then(({ data }) => {
        if (data) setRows(data as ContentRow[]);
        setLoading(false);
      });
  }, []);

  const handleChange = (key: string, value: string) => {
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, value } : r)));
  };

  const handleSave = async (row: ContentRow) => {
    setSaving(row.key);
    const { error } = await supabase
      .from("site_content")
      .update({ value: row.value, updated_at: new Date().toISOString() })
      .eq("key", row.key);

    setSaving(null);
    if (!error) {
      setSaved(row.key);
      setTimeout(() => setSaved(null), 2000);
    }
  };

  return (
    <div className="flex min-h-screen bg-obsidian-900">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        <header className="h-16 bg-obsidian-800 border-b border-gold-500/10 flex items-center px-6">
          <h1 className="font-display text-xl text-ivory-100">İçerik Yönetimi</h1>
        </header>

        <main className="p-4 lg:p-8 max-w-3xl">
          {loading ? (
            <div className="flex items-center gap-3 text-ivory-500 py-20 justify-center">
              <Loader2 size={18} className="animate-spin" />
              <span className="font-sans text-sm">Yükleniyor...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {rows.map((row) => (
                <div key={row.key} className="luxury-card p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-gold-500/70 mb-1.5">
                        {row.label}
                      </label>
                      <p className="font-sans text-[10px] text-ivory-600 mb-3 tracking-wider">
                        {row.key}
                      </p>
                      {row.type === "textarea" ? (
                        <textarea
                          value={row.value}
                          onChange={(e) => handleChange(row.key, e.target.value)}
                          rows={3}
                          className="w-full bg-obsidian-700 border border-obsidian-500 focus:border-gold-500/50 text-ivory-200 px-3.5 py-2.5 font-sans text-sm outline-none transition-colors resize-none"
                        />
                      ) : (
                        <input
                          value={row.value}
                          onChange={(e) => handleChange(row.key, e.target.value)}
                          className="w-full bg-obsidian-700 border border-obsidian-500 focus:border-gold-500/50 text-ivory-200 px-3.5 py-2.5 font-sans text-sm outline-none transition-colors"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => handleSave(row)}
                      disabled={saving === row.key}
                      className="shrink-0 mt-8 w-9 h-9 flex items-center justify-center border transition-all disabled:opacity-50"
                      style={{
                        borderColor: saved === row.key ? "rgb(74 222 128 / 0.4)" : "rgb(201 169 110 / 0.3)",
                        color: saved === row.key ? "rgb(74 222 128)" : "rgb(201 169 110)",
                      }}
                      title="Kaydet"
                    >
                      {saving === row.key ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : saved === row.key ? (
                        <CheckCircle size={14} />
                      ) : (
                        <Save size={14} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
