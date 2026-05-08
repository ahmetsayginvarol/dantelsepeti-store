# 🌹 Dantel Sepeti — Lüks Lingerie Showcase Websitesi

Modern, lüks tasarımlı iç çamaşırı koleksiyon ve katalog websitesi. Next.js 14, TailwindCSS ve Supabase ile geliştirilmiştir.

## ✨ Özellikler

### Müşteri Tarafı
- **Ana Sayfa**: Hero, öne çıkan ürünler, kategoriler, promo banner, Instagram galerisi
- **Koleksiyon**: Kategori filtreli ürün listeleme
- **Ürün Detayı**: Çoklu görsel, beden seçimi, WhatsApp sipariş butonu
- **Kategoriler**: Görsel kategori kartları
- **Hakkımızda**: Marka hikayesi, sipariş rehberi, iade politikası
- **İletişim**: WhatsApp & Instagram entegrasyonu

### Admin Paneli (`/admin`)
- Giriş sayfası (Supabase Auth)
- Dashboard — istatistikler ve son ürünler
- Ürün yönetimi (ekle/düzenle/sil, öne çıkar, aktif/pasif)
- Kategori yönetimi
- Responsive admin arayüzü

### Teknik Özellikler
- Next.js 14 App Router
- TypeScript
- TailwindCSS — özel lüks tema
- Supabase (Auth + PostgreSQL + Storage)
- SEO dostu
- Mobile-first tasarım
- WhatsApp sipariş entegrasyonu

---

## 🚀 Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Supabase Ayarları

1. [supabase.com](https://supabase.com) üzerinde proje oluşturun
2. SQL editöründe `supabase-schema.sql` dosyasını çalıştırın
3. Authentication > Settings > Site URL'yi güncelleyin
4. İlk admin kullanıcısını Authentication > Users'dan oluşturun

### 3. Environment Variables

`.env.example` dosyasını `.env.local` olarak kopyalayın:

```bash
cp .env.example .env.local
```

Değerleri doldurun:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxx...
NEXT_PUBLIC_WHATSAPP_NUMBER=905xxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://dantelsepeti.com
```

> **WhatsApp Numarası**: Başında `+` olmadan, ülke kodu ile yazın. Örn: `905551234567`

### 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama: `http://localhost:3000`
Admin panel: `http://localhost:3000/admin`

### 5. Production Build

```bash
npm run build
npm start
```

---

## 📁 Proje Yapısı

```
dantel-sepeti/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Ana Sayfa
│   │   ├── shop/page.tsx         # Koleksiyon
│   │   ├── products/[id]/        # Ürün Detay
│   │   ├── categories/page.tsx   # Kategoriler
│   │   ├── about/page.tsx        # Hakkımızda
│   │   ├── contact/page.tsx      # İletişim
│   │   └── admin/                # Admin Panel
│   │       ├── page.tsx          # Dashboard
│   │       ├── login/            # Giriş
│   │       ├── products/         # Ürün Yönetimi
│   │       └── categories/       # Kategori Yönetimi
│   ├── components/
│   │   ├── layout/               # Navbar, Footer
│   │   ├── home/                 # Ana sayfa bileşenleri
│   │   ├── products/             # Ürün kartları
│   │   └── admin/                # Admin bileşenleri
│   ├── lib/
│   │   ├── supabase.ts           # Supabase client
│   │   ├── whatsapp.ts           # WhatsApp link üreteci
│   │   ├── demo-data.ts          # Demo ürün verileri
│   │   └── utils.ts              # Yardımcı fonksiyonlar
│   └── types/index.ts            # TypeScript tipleri
├── supabase-schema.sql           # Veritabanı şeması
└── .env.example                  # Örnek env dosyası
```

---

## 📱 WhatsApp Entegrasyonu

Her ürün kartı ve detay sayfasında dinamik WhatsApp linki otomatik oluşturulur:

```
Merhaba! Sipariş vermek istiyorum:
Ürün: Siyah Dantel Bra Set
Kod: DS-101
Beden: M
```

`.env.local` dosyasında `NEXT_PUBLIC_WHATSAPP_NUMBER` değerini kendi numaranızla güncelleyin.

---

## 🎨 Tasarım Sistemi

| Renk | Değer |
|------|-------|
| Altın | `#c9a96e` |
| Altın (Açık) | `#e4be7e` |
| Fildişi | `#f8f4ed` |
| Obsidiyen | `#0a0a0a` |

**Yazı Tipleri:**
- `Playfair Display` — Başlıklar
- `Cormorant Garamond` — Metin
- `Jost` — UI elemanları

---

## 🗃️ Supabase Veritabanı

```sql
categories       -- Kategoriler
products         -- Ürünler
product_images   -- Ürün görselleri
```

Storage bucket: `products` (public)

---

## 📦 Deploy (Vercel)

```bash
# Vercel CLI ile
npm i -g vercel
vercel

# Environment variables'ları Vercel dashboard'dan ekleyin
```

---

## 📞 Destek

WhatsApp: Ürün sayfasındaki butonu kullanın
Instagram: @dantelsepeti
"# dantelsepeti-store" 
"# dantelsepeti-store" 
