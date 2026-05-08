"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
      } else if (data.session) {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-900 flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.04)_0%,transparent_60%)]" />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-display text-3xl tracking-[0.3em] uppercase text-ivory-100 leading-none">
            Dantel
          </p>
          <p className="font-display text-3xl tracking-[0.3em] uppercase text-gold-500 leading-none">
            Sepeti
          </p>
          <p className="font-sans text-xs tracking-[0.35em] uppercase text-ivory-600 mt-3">
            Yönetim Paneli
          </p>
        </div>

        {/* Card */}
        <div className="luxury-card p-8">
          <h1 className="font-display text-2xl text-ivory-100 mb-2">Giriş Yap</h1>
          <p className="font-body text-ivory-500 mb-8">
            Devam etmek için lütfen giriş yapın.
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-900/20 border border-red-500/30 text-red-400 font-sans text-xs tracking-wider">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-sans text-xs tracking-[0.2em] uppercase text-ivory-500 block mb-2">
                E-posta
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@dantelsepeti.com"
                className="w-full bg-obsidian-700 border border-obsidian-500 focus:border-gold-500/60 text-ivory-200 px-4 py-3 font-sans text-sm outline-none transition-colors placeholder:text-ivory-600"
              />
            </div>

            <div>
              <label className="font-sans text-xs tracking-[0.2em] uppercase text-ivory-500 block mb-2">
                Şifre
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-obsidian-700 border border-obsidian-500 focus:border-gold-500/60 text-ivory-200 px-4 py-3 pr-12 font-sans text-sm outline-none transition-colors placeholder:text-ivory-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-500 hover:text-ivory-200 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3.5 flex items-center justify-center gap-2.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <LogIn size={15} className="relative z-10" />
              <span>{loading ? "Giriş yapılıyor..." : "Giriş Yap"}</span>
            </button>
          </form>
        </div>

        <p className="text-center font-sans text-xs text-ivory-600 mt-6 tracking-wider">
          © 2024 Dantel Sepeti Admin
        </p>
      </div>
    </div>
  );
}
