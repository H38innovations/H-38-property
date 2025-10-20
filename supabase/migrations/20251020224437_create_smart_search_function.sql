/*
  # Create smart search function for articles

  1. New Functions
    - `smart_search_articles` - Intelligent search that combines:
      - Full-text search across title, content, and brief
      - Tag matching with boost
      - Relevance ranking based on multiple factors
      - Fuzzy matching for better results
    
  2. Parameters
    - `search_query` (text) - The search query from user
    - `result_limit` (int) - Maximum number of results (default 10)
    
  3. Features
    - Uses PostgreSQL's ts_rank for relevance scoring
    - Boosts title matches higher than content matches
    - Tag exact matches get priority
    - Returns results ordered by relevance score

  4. Notes
    - Uses websearch_to_tsquery for better query parsing
    - Handles multi-word queries intelligently
    - Case-insensitive search
*/

-- Create smart search function
CREATE OR REPLACE FUNCTION smart_search_articles(
  search_query text,
  result_limit int DEFAULT 10
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
  relevance float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    a.id,
    a.url,
    a.title,
    a.tag,
    a.brief,
    a.content,
    a.image,
    a.author,
    a.date,
    (
      -- Title match (highest weight)
      ts_rank(to_tsvector('english', a.title), websearch_to_tsquery('english', search_query)) * 4.0 +
      -- Brief match (medium weight)
      ts_rank(to_tsvector('english', a.brief), websearch_to_tsquery('english', search_query)) * 2.0 +
      -- Content match (normal weight)
      ts_rank(to_tsvector('english', a.content), websearch_to_tsquery('english', search_query)) * 1.0 +
      -- Tag exact match bonus
      CASE WHEN LOWER(a.tag) = LOWER(search_query) THEN 5.0
           WHEN LOWER(a.tag) LIKE '%' || LOWER(search_query) || '%' THEN 3.0
           ELSE 0.0 END +
      -- Keyword in title bonus
      CASE WHEN LOWER(a.title) LIKE '%' || LOWER(search_query) || '%' THEN 2.0 ELSE 0.0 END
    ) as relevance
  FROM articles a
  WHERE
    -- Match in any text field
    to_tsvector('english', a.title || ' ' || a.brief || ' ' || a.content) @@ websearch_to_tsquery('english', search_query)
    OR LOWER(a.tag) LIKE '%' || LOWER(search_query) || '%'
    OR LOWER(a.title) LIKE '%' || LOWER(search_query) || '%'
  ORDER BY relevance DESC
  LIMIT result_limit;
END;
$$;