/* Netlify Function: Smart-ish search powered by OpenAI Responses API */

const fs = require('fs/promises');
const path = require('path');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const MAX_RESULTS = parseInt(process.env.SEARCH_MAX_RESULTS || '5', 10);

if (!OPENAI_API_KEY) {
  console.warn('[search] Warning: OPENAI_API_KEY is not set. Requests will fail.');
}

let ARTICLES = null;

async function loadArticles() {
  if (ARTICLES) return ARTICLES;
  const indexPath = path.join(process.cwd(), 'search-index.json');
  const raw = await fs.readFile(indexPath, 'utf-8');
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error('search-index.json must be an array');
  ARTICLES = parsed;
  return ARTICLES;
}

function buildPrompt(query, articles) {
  const items = articles
    .map((item, idx) => {
      const content = [
        `TITLE: ${item.title}`,
        `TAG: ${item.tag}`,
        item.brief ? `BRIEF: ${item.brief}` : '',
        item.content ? `CONTENT: ${item.content}` : '',
        `URL: ${item.url}`,
      ]
        .filter(Boolean)
        .join('\n');
      return `ARTICLE ${idx + 1}\n${content}`;
    })
    .join('\n\n');

  return `You are an expert curator for the H-38 studio knowledge hub. A visitor submitted the query: "${query}".
For each article below, consider TITLE, TAG, BRIEF, CONTENT, and URL. Return up to ${MAX_RESULTS} relevant articles as JSON array with objects {"title", "url", "tag", "brief"}. Include only direct JSON, no explanation. If nothing matches, return [].
\nArticles:\n${items}`;
}

function extractResults(data) {
  if (!data || !Array.isArray(data.output)) return [];
  const combined = data.output
    .map((segment) => {
      if (!segment || !Array.isArray(segment.content)) return '';
      return segment.content
        .filter((chunk) => chunk.type === 'output_text')
        .map((chunk) => chunk.text)
        .join('\n');
    })
    .join('\n');
  try {
    const parsed = JSON.parse(combined);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RESULTS) : [];
  } catch (error) {
    console.warn('[search] Could not parse model response', error.message, combined);
    return [];
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const query = (event.queryStringParameters.q || '').trim();
  if (!query) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing query' }) };
  }
  if (!OPENAI_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Search unavailable' }) };
  }

  try {
    const articles = await loadArticles();
    const subset = articles.slice(0, 15);
    const prompt = buildPrompt(query, subset);

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        input: prompt,
        max_output_tokens: 900,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`OpenAI API error ${response.status}: ${detail}`);
    }

    const data = await response.json();
    const results = extractResults(data);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ results }),
    };
  } catch (error) {
    console.error('[search] error', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Search failed' }),
    };
  }
};
