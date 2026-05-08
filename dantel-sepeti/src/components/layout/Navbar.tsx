"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateContactLink } from "@/lib/whatsapp";

const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Koleksiyon", href: "/shop" },
  { label: "Kategoriler", href: "/categories" },
  { label: "Hakkımızda", href: "/about" },
  { label: "İletişim", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-obsidian-900/95 backdrop-blur-md border-b border-gold-500/10 py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <span className="font-display text-xl tracking-[0.3em] text-ivory-100 uppercase leading-none">
              Dantel
            </span>
            <span className="font-display text-xl tracking-[0.3em] text-gold-500 uppercase leading-none">
              Sepeti
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs tracking-[0.2em] uppercase text-ivory-300 hover:text-gold-400 transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={generateContactLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-5 py-2.5 rounded-none text-xs tracking-[0.15em] inline-flex items-center gap-2"
            >
              <span>WhatsApp ile Sipariş</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-ivory-200 hover:text-gold-400 transition-colors p-1"
            aria-label="Menüyü aç/kapat"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-obsidian-800/98 backdrop-blur-md border-b border-gold-500/10 transition-all duration-400 overflow-hidden",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-sans text-sm tracking-[0.2em] uppercase text-ivory-200 hover:text-gold-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gold-500/10">
            <a
              href={generateContactLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full px-5 py-3 rounded-none text-xs tracking-[0.15em] text-center block"
            >
              <span>WhatsApp ile Sipariş</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
