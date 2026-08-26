-- Menu categories enum
CREATE TYPE menu_category AS ENUM (
  'starters',
  'mains',
  'soups',
  'salads',
  'desserts',
  'beverages',
  'specials'
);

-- Menu items table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category menu_category NOT NULL,
  image_url TEXT,
  ingredients TEXT[],
  health_benefits TEXT[],
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  preparation_time INTEGER,
  calories INTEGER,
  protein DECIMAL(5, 1),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reservations table
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guest_count INTEGER NOT NULL,
  special_requests TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  confirmation_code VARCHAR(20) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category VARCHAR(100),
  image_url TEXT,
  author VARCHAR(255),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Contacts/Customer enquiries table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery table
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Admin users (extends Supabase auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'admin',
  full_name VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for menu_items (public read, admin write)
CREATE POLICY "menu_items_public_select" ON menu_items FOR SELECT
  TO public USING (true);

CREATE POLICY "menu_items_authenticated_all" ON menu_items FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for reservations
CREATE POLICY "reservations_insert" ON reservations FOR INSERT
  TO public WITH CHECK (true);

CREATE POLICY "reservations_authenticated_all" ON reservations FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for reviews
CREATE POLICY "reviews_public_select_approved" ON reviews FOR SELECT
  TO public USING (is_approved = true);

CREATE POLICY "reviews_insert" ON reviews FOR INSERT
  TO public WITH CHECK (true);

CREATE POLICY "reviews_authenticated_all" ON reviews FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for articles
CREATE POLICY "articles_public_select_published" ON articles FOR SELECT
  TO public USING (is_published = true);

CREATE POLICY "articles_authenticated_all" ON articles FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for contacts
CREATE POLICY "contacts_insert" ON contacts FOR INSERT
  TO public WITH CHECK (true);

CREATE POLICY "contacts_authenticated_all" ON contacts FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for gallery
CREATE POLICY "gallery_public_select" ON gallery FOR SELECT
  TO public USING (is_active = true);

CREATE POLICY "gallery_authenticated_all" ON gallery FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for user_profiles
CREATE POLICY "user_profiles_authenticated_all" ON user_profiles FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- Indexes for performance
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_reservations_date ON reservations(reservation_date);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reviews_approved ON reviews(is_approved);
CREATE INDEX idx_articles_published ON articles(is_published);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_gallery_category ON gallery(category);