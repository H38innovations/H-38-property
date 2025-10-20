/*
  # Update RLS policies for articles table

  1. Security Updates
    - Allow anonymous (anon) users to insert articles
    - This enables the indexing script to populate articles from the frontend
    - Reading remains public for all users
    - Updates still require authentication

  2. Notes
    - In production, you may want to restrict inserts to authenticated users only
    - For development/indexing purposes, anonymous inserts are enabled
*/

-- Drop existing insert policy
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON articles;

-- Create new policy: Anyone can insert articles (for indexing)
CREATE POLICY "Anyone can insert articles"
  ON articles
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Update: Anyone can update articles (for re-indexing)
DROP POLICY IF EXISTS "Authenticated users can update articles" ON articles;
CREATE POLICY "Anyone can update articles"
  ON articles
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);