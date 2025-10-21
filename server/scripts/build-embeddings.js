import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = process.env.HF_EMBED_MODEL || 'sentence-transformers/all-MiniLM-L6-v2';

if (!HF_API_KEY) {
  console.error('HF_API_KEY is required. Set it before running this script.');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const INDEX_PATH = path.join(ROOT, 'search-index.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'article-embeddings.json');

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

async function embedText(text) {
  const res = await fetch(`https://api-inference.huggingface.co/pipeline/feature-extraction/${HF_MODEL}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(text),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`HF request failed (${res.status}): ${detail}`);
  }
  const data = await res.json();
  return meanPool(data);
}

async function main() {
  const raw = await fs.readFile(INDEX_PATH, 'utf-8');
  const source = JSON.parse(raw);
  if (!Array.isArray(source)) {
    throw new Error('search-index.json must contain an array of articles');
  }

  const output = [];
  for (const article of source) {
    const combined = [
      article.title,
      article.tag,
      article.brief,
      article.content,
    ]
      .filter(Boolean)
      .join(' \n ');

    console.log(`Embedding: ${article.title}`);
    const embedding = await embedText(combined);
    output.push({
      url: article.url,
      title: article.title,
      tag: article.tag,
      brief: article.brief,
      image: article.image,
      embedding,
    });
  }

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`Wrote ${output.length} embeddings to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
