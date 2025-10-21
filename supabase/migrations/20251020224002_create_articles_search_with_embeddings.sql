/*
  # Create AI-powered search system with embeddings

  1. New Tables
    - `articles`
      - `id` (uuid, primary key) - Unique article identifier
      - `url` (text) - Relative URL path to article
      - `title` (text) - Article title
      - `tag` (text) - Category/tag (research, conversation, news, etc.)
      - `brief` (text) - Short description
      - `content` (text) - Full article text content
      - `image` (text) - Image URL
      - `author` (text) - Article author
      - `date` (text) - Publication date
      - `embedding` (vector(384)) - AI-generated embedding for semantic search
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Extensions
    - Enable `vector` extension for pgvector support (embeddings and similarity search)

  3. Indexes
    - Create HNSW index on embeddings for fast similarity search
    - Create GIN index on title and content for text search fallback

  4. Security
    - Enable RLS on `articles` table
    - Add policy for public read access (articles are public content)
    - Add policy for authenticated insert/update (for indexing operations)

  5. Functions
    - Create function to automatically update `updated_at` timestamp
    - Create trigger to call update function

  6. Notes
    - Using 384-dimensional embeddings (compatible with gte-small model)
    - HNSW index provides fast approximate nearest neighbor search
    - Public read access allows frontend to query without authentication
*/

-- Enable vector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Create articles table with embedding support
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text UNIQUE NOT NULL,
  title text NOT NULL,
  tag text DEFAULT '',
  brief text DEFAULT '',
  content text DEFAULT '',
  image text DEFAULT '',
  author text DEFAULT '',
  date text DEFAULT '',
  embedding vector(384),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS articles_updated_at ON articles;
CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create HNSW index for fast vector similarity search
CREATE INDEX IF NOT EXISTS articles_embedding_idx 
  ON articles 
  USING hnsw (embedding vector_cosine_ops);

-- Create GIN index for text search fallback
CREATE INDEX IF NOT EXISTS articles_text_search_idx 
  ON articles 
  USING gin (to_tsvector('english', title || ' ' || content || ' ' || brief));

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read articles (public content)
DROP POLICY IF EXISTS "Anyone can read articles" ON articles;
CREATE POLICY "Anyone can read articles"
  ON articles
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Authenticated users can insert articles (for indexing)
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON articles;
CREATE POLICY "Authenticated users can insert articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update articles (for indexing)
DROP POLICY IF EXISTS "Authenticated users can update articles" ON articles;
CREATE POLICY "Authenticated users can update articles"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);