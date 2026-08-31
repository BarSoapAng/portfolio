-- Run this in the Supabase SQL editor to set up all tables

CREATE TABLE page_views (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page text NOT NULL DEFAULT '/',
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_page_views_page ON page_views (page);

CREATE TABLE post_views (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_post_views_slug ON post_views (slug);

CREATE TABLE post_likes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL,
  visitor_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (slug, visitor_id)
);
CREATE INDEX idx_post_likes_slug ON post_likes (slug);

CREATE TABLE drawings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id text NOT NULL,
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 40),
  image_data text NOT NULL,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX idx_drawings_visitor ON drawings (visitor_id);
CREATE INDEX idx_drawings_published ON drawings (is_published) WHERE is_published = true;

-- Enable RLS on all tables (service_role key bypasses RLS)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE drawings ENABLE ROW LEVEL SECURITY;
