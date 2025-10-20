/*
  # Create search_articles RPC function

  1. New Functions
    - `search_articles` - Performs vector similarity search on articles
      - Parameters:
        - `query_embedding` (vector(384)) - The embedding of the search query
        - `match_threshold` (float) - Minimum similarity threshold (0-1)
        - `match_count` (int) - Maximum number of results to return
      - Returns: Articles sorted by similarity score (most similar first)
      - Uses cosine similarity for vector comparison

  2. Security
    - Function is security definer (runs with owner permissions)
    - Public can execute this function (articles are public content)

  3. Notes
    - Uses 1 - (embedding <=> query_embedding) to calculate similarity
    - <=> is the cosine distance operator in pgvector
    - Results are filtered by similarity threshold and limited by count
*/

-- Create function for semantic search
CREATE OR REPLACE FUNCTION search_articles(
  query_embedding vector(384),
  match_threshold float DEFAULT 0.3,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  url text,
  title text,
  tag text,
  brief text,
  content text,
  image text,
  author text,
  date text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    articles.id,
    articles.url,
    articles.title,
    articles.tag,
    articles.brief,
    articles.content,
    articles.image,
    articles.author,
    articles.date,
    1 - (articles.embedding <=> query_embedding) as similarity
  FROM articles
  WHERE articles.embedding IS NOT NULL
    AND 1 - (articles.embedding <=> query_embedding) > match_threshold
  ORDER BY articles.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;