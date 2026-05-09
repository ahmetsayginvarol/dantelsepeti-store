"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tag,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { LayoutDashboard, Package, Tag, FileText, LogOut, ChevronRight, Menu } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Ürünler", icon: Package },
  { href: "/admin/categories", label: "Kategoriler", icon: Tag },
  { href: "/admin/content", label: "İçerik", icon: FileText },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen sticky top-0 bg-obsidian-800 border-r border-gold-500/10 transition-all duration-300",
          collapsed ? "w-16" : "w-56"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gold-500/10 flex items-center justify-between min-h-[64px]">
          {!collapsed && (
            <div>
              <p className="font-display text-sm tracking-[0.2em] uppercase text-ivory-100 leading-none">
                Dantel
              </p>
              <p className="font-display text-sm tracking-[0.2em] uppercase text-gold-500 leading-none">
                Admin
              </p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-ivory-500 hover:text-gold-400 transition-colors ml-auto"
          >
            {collapsed ? <ChevronRight size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm transition-all rounded-sm",
                  active
                    ? "admin-nav-active"
                    : "text-ivory-500 hover:text-ivory-200 hover:bg-obsidian-700/50"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={16} className="shrink-0" />
                {!collapsed && (
                  <span className="font-sans text-xs tracking-wider">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-gold-500/10">
          <Link
            href="/admin/login"
            className="flex items-center gap-3 px-3 py-2.5 text-ivory-500 hover:text-red-400 transition-colors rounded-sm"
            title={collapsed ? "Çıkış" : undefined}
          >
            <LogOut size={16} className="shrink-0" />
            {!collapsed && (
              <span className="font-sans text-xs tracking-wider">Çıkış Yap</span>
            )}
          </Link>
        </div>
      </aside>

      {/* Mobile top bar handled in layout */}
    </>
  );
}
