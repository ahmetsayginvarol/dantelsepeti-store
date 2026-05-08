import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dantel Sepeti | Lüks İç Çamaşırı Koleksiyonu",
    template: "%s | Dantel Sepeti",
  },
  description:
    "Dantel Sepeti — Seçkin lüks iç çamaşırı, gecelik ve fantezi koleksiyonları. Her kadın için özenle seçilmiş premium ürünler.",
  keywords: ["iç çamaşırı", "lüks lingerie", "dantel", "gecelik", "bodysuit", "türkiye"],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://dantelsepeti.com",
    siteName: "Dantel Sepeti",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="bg-obsidian-900 text-ivory-100 antialiased">{children}</body>
    </html>
  );
}
