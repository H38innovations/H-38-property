/* Netlify Function: Smart-ish search powered by OpenAI Responses API */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const MAX_RESULTS = parseInt(process.env.SEARCH_MAX_RESULTS || '5', 10);
let ARTICLES = null;

function loadArticles() {
  if (!ARTICLES) {
    ARTICLES = require('./search-index.json');
    if (!Array.isArray(ARTICLES)) {
      throw new Error('search-index.json must export an array');
    }
  }
  return ARTICLES;
}

if (!OPENAI_API_KEY) {
  console.warn('[search] Warning: OPENAI_API_KEY is not set. Requests will fail.');
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
From the following articles (each with TITLE, TAG, BRIEF, CONTENT, URL), infer the best answer.
Respond ONLY in JSON with the shape {"summary": "two or three sentences summarising relevant insights", "results": [{"title": "...", "url": "...", "tag": "...", "brief": "..."}, ...]}.
Include at most ${MAX_RESULTS} results ordered by relevance. The summary must rely on article content only. If nothing fits, return {"summary": "No relevant articles found.", "results": []}.
\nArticles:\n${items}`;
}

function extractResults(data) {
  if (!data || !Array.isArray(data.output)) return { summary: '', results: [] };
  const combined = data.output
    .map((segment) => {
      if (!segment || !Array.isArray(segment.content)) return '';
      return segment.content
        .filter((chunk) => chunk.type === 'output_text')
        .map((chunk) => chunk.text)
        .join('\n');
    })
    .join('\n');
  const cleaned = combined.replace(/```[a-z]*\n?/gi, '').replace(/```/g, '');
  try {
    const parsed = JSON.parse(cleaned);
    if (parsed && typeof parsed === 'object') {
      return {
        summary: typeof parsed.summary === 'string' ? parsed.summary : '',
        results: Array.isArray(parsed.results) ? parsed.results.slice(0, MAX_RESULTS) : [],
      };
    }
  } catch (error) {
    console.warn('[search] Could not parse model response', error.message, combined);
  }
  return { summary: '', results: [] };
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
    const subset = loadArticles().slice(0, 20);
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
    const { summary, results } = extractResults(data);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ summary, results }),
    };
  } catch (error) {
    console.error('[search] error', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Search failed' }),
    };
  }
};
