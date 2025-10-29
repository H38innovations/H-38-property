p// Script to index all articles with AI embeddings
import * as cheerio from 'cheerio';
import { readFileSync } from 'fs';
import { config } from 'dotenv';

config();

const articles = [
  {
    url: 'articles/the-mandate-mirage.html',
    file: 'articles/the-mandate-mirage.html'
  },
  {
    url: 'articles/building-smarter.html',
    file: 'articles/building-smarter.html'
  },
  {
    url: 'articles/celebrating-promotions.html',
    file: 'articles/celebrating-promotions.html'
  },
  {
    url: 'articles/brisbane-2032-cultural-vision.html',
    file: 'articles/brisbane-2032-cultural-vision.html'
  },
  {
    url: 'articles/australia-posts-new-home.html',
    file: 'articles/australia-posts-new-home.html'
  },
  {
    url: 'articles/design-horizons.html',
    file: 'articles/design-horizons.html'
  }
];

async function indexArticles() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;

  for (const article of articles) {
    console.log(`Indexing ${article.url}...`);

    try {
      const html = readFileSync(article.file, 'utf-8');
      const $ = cheerio.load(html);

      const title = $('.post-title').text().trim();
      const tag = $('.chip').first().text().trim().toLowerCase();
      const author = $('.post-author').text().trim();
      const image = $('.post-hero').attr('src') || '';

      // Extract all content
      const headings = $('.block-heading').map((i, el) => $(el).text().trim()).get().join(' ');
      const paragraphs = $('.block-paragraph').map((i, el) => $(el).text().trim()).get().join(' ');
      const content = `${headings} ${paragraphs}`;

      // Get brief from first paragraph
      const brief = $('.block-paragraph').first().text().trim().substring(0, 200);

      const payload = {
        url: article.url,
        title,
        tag,
        brief,
        content,
        image,
        author,
        date: ''
      };

      const response = await fetch(`${supabaseUrl}/functions/v1/index-article`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.text();
        console.error(`Failed to index ${article.url}:`, error);
      } else {
        const result = await response.json();
        console.log(`✓ Indexed ${article.url}`);
      }
    } catch (error) {
      console.error(`Error processing ${article.url}:`, error.message);
    }
  }

  console.log('\nIndexing complete!');
}

indexArticles();
