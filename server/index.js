import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = process.env.HF_EMBED_MODEL || 'sentence-transformers/all-MiniLM-L6-v2';

if (!HF_API_KEY) {
  console.warn('[search-api] Warning: HF_API_KEY not set. Requests will fail.');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, 'data', 'article-embeddings.json');

let ARTICLES = [];

async function loadEmbeddings() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Embeddings file must export an array');
    ARTICLES = parsed;
    console.log(`[search-api] Loaded ${ARTICLES.length} article embeddings.`);
  } catch (error) {
    console.error('[search-api] Failed to load embeddings:', error.message);
    ARTICLES = [];
  }
}

function meanPool(vectors) {
  if (!Array.isArray(vectors) || !vectors.length) return [];
  if (!Array.isArray(vectors[0])) return vectors;
  const length = vectors[0].length;
  const accumulator = new Array(length).fill(0);
  vectors.forEach((token) => {
    for (let i = 0; i < length; i += 1) {
      accumulator[i] += token[i];
    }
  });
  return accumulator.map((value) => value / vectors.length);
}

function cosineSimilarity(a, b) {
  if (!a || !b || a.length !== b.length) return -Infinity;
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i += 1) {
    const va = a[i];
    const vb = b[i];
    dot += va * vb;
    magA += va * va;
    magB += vb * vb;
  }
  if (!magA || !magB) return -Infinity;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

async function embedQuery(text) {
  if (!HF_API_KEY) throw new Error('HF_API_KEY missing');
  const res = await fetch(`https://api-inference.huggingface.co/pipeline/feature-extraction/${HF_MODEL}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(text),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Hugging Face API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return meanPool(data);
}

await loadEmbeddings();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/search', async (req, res) => {
  const query = (req.query.q || '').trim();
  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }
  if (!ARTICLES.length) {
    return res.status(503).json({ error: 'Embedding index not ready. Run build-embeddings.' });
  }

  try {
    const queryVector = await embedQuery(query);
    if (!queryVector.length) throw new Error('Empty embedding');

    const ranked = ARTICLES
      .map((article) => ({
        ...article,
        score: cosineSimilarity(queryVector, article.embedding),
      }))
      .filter((item) => Number.isFinite(item.score))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ embedding, score, ...rest }) => ({ ...rest, score }));

    res.json({ results: ranked });
  } catch (error) {
    console.error('[search-api] search failed:', error.message);
    res.status(500).json({ error: 'Search service unavailable' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[search-api] Listening on http://localhost:${PORT}`);
});
