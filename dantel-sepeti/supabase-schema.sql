-- =============================================
-- DANTEL SEPETİ - Supabase Database Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sku VARCHAR(50) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  sizes TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product images table
CREATE TABLE IF NOT EXISTS product_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Row Level Security (RLS)
-- =============================================

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read product_images" ON product_images FOR SELECT USING (true);

-- Admin full access (requires authenticated user with admin role)
CREATE POLICY "Admin all categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all product_images" ON product_images FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- Storage Buckets
-- =============================================

-- Create products storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Public read product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'products');

CREATE POLICY "Admin upload product images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "Admin update product images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "Admin delete product images" ON storage.objects
  FOR DELETE USING (bucket_id = 'products' AND auth.role() = 'authenticated');

-- =============================================
-- Sample Data
-- =============================================

INSERT INTO categories (id, name, slug, description, image_url) VALUES
  ('11111111-1111-1111-1111-111111111111', 'İç Çamaşırı', 'ic-camasiri', 'Zarif ve şık iç çamaşırı koleksiyonumuz', 'https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=600&q=80'),
  ('22222222-2222-2222-2222-222222222222', 'Bodysuitler', 'bodysuitler', 'Vücudu saran seksi bodysuit modelleri', 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=80'),
  ('33333333-3333-3333-3333-333333333333', 'Gecelikler', 'gecelikler', 'Romantik ve konforlu gecelik koleksiyonu', 'https://images.unsplash.com/photo-1602810319428-019690571b5b?w=600&q=80'),
  ('44444444-4444-4444-4444-444444444444', 'Fantezi', 'fantezi', 'Cesur ve eşsiz fantezi koleksiyonu', 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&q=80'),
  ('55555555-5555-5555-5555-555555555555', 'Aksesuarlar', 'aksesuarlar', 'Tamamlayıcı lüks aksesuarlar', 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=600&q=80');
