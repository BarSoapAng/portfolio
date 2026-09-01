-- Run this in the Supabase SQL editor to set up all tables and storage.
-- The statements are safe to rerun when adding storage to an existing project.

CREATE TABLE IF NOT EXISTS page_views (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page text NOT NULL DEFAULT '/',
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_page_views_page ON page_views (page);

CREATE TABLE IF NOT EXISTS post_views (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_post_views_slug ON post_views (slug);

CREATE TABLE IF NOT EXISTS post_likes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL,
  visitor_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (slug, visitor_id)
);
CREATE INDEX IF NOT EXISTS idx_post_likes_slug ON post_likes (slug);

CREATE TABLE IF NOT EXISTS drawings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id text NOT NULL,
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 40),
  image_data text NOT NULL, -- Storage object path; legacy rows may contain Base64 data URLs.
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_drawings_visitor ON drawings (visitor_id);
CREATE INDEX IF NOT EXISTS idx_drawings_published ON drawings (is_published) WHERE is_published = true;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('drawings', 'drawings', true, 500000, ARRAY['image/webp', 'image/png'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Enable RLS on all tables (service_role key bypasses RLS)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE drawings ENABLE ROW LEVEL SECURITY;
