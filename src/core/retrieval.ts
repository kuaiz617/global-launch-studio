import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createEmbedding, openAIEnabled } from '../providers/openai.js';
import type { KnowledgeDocument, RetrievedDocument } from '../types/index.js';

const knowledgeDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../knowledge');
let docs: KnowledgeDocument[] | undefined;
const embeddingCache = new Map<string, number[]>();

function tokens(text: string): string[] {
  return [...new Set((text.toLowerCase().match(/[a-z0-9]+|[\u3400-\u9fff]/g) ?? []).filter(token => token.length > 1 || /[\u3400-\u9fff]/.test(token)))];
}

function cosine(a: number[], b: number[]): number {
  let dot = 0; let aa = 0; let bb = 0;
  const length = Math.min(a.length, b.length);
  for (let index = 0; index < length; index += 1) {
    const av = a[index] ?? 0; const bv = b[index] ?? 0;
    dot += av * bv; aa += av * av; bb += bv * bv;
  }
  return dot / (Math.sqrt(aa) * Math.sqrt(bb) || 1);
}

export async function loadKnowledge(): Promise<KnowledgeDocument[]> {
  if (docs) return docs;
  const files = (await readdir(knowledgeDir)).filter(file => file.endsWith('.md'));
  docs = [];
  for (const file of files) {
    const content = await readFile(path.join(knowledgeDir, file), 'utf8');
    docs.push({ id:file.replace('.md', ''), file, content, tokens:tokens(content) });
  }
  return docs;
}

async function lexicalRetrieve(query: string, limit: number): Promise<RetrievedDocument[]> {
  const queryTokens = tokens(query);
  const all = await loadKnowledge();
  return all
    .map(doc => {
      const overlap = queryTokens.filter(token => doc.tokens.includes(token));
      return { id:doc.id, file:doc.file, content:doc.content, score:overlap.length / (Math.sqrt(queryTokens.length || 1) * Math.sqrt(doc.tokens.length || 1)), overlap, retrievalMode:'lexical' as const };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

async function embeddingForDoc(doc: KnowledgeDocument): Promise<number[]> {
  const cached = embeddingCache.get(doc.id);
  if (cached) return cached;
  const vector = await createEmbedding(`${doc.file}\n${doc.content}`);
  embeddingCache.set(doc.id, vector);
  return vector;
}

async function embeddingRetrieve(query: string, limit: number): Promise<RetrievedDocument[]> {
  const all = await loadKnowledge();
  const queryVector = await createEmbedding(query);
  const scored: RetrievedDocument[] = [];
  for (const doc of all) {
    const vector = await embeddingForDoc(doc);
    scored.push({ id:doc.id, file:doc.file, content:doc.content, score:cosine(queryVector, vector), overlap:[], retrievalMode:'embedding' });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}

export async function retrieve(query: string, limit = 3): Promise<RetrievedDocument[]> {
  const mode = (process.env.RAG_MODE || 'lexical').toLowerCase();
  if (mode === 'openai' && openAIEnabled()) {
    try {
      return await embeddingRetrieve(query, limit);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return (await lexicalRetrieve(query, limit)).map(item => ({ ...item, retrievalFallback:message }));
    }
  }
  return lexicalRetrieve(query, limit);
}

export function clearRetrievalCachesForTests(): void {
  docs = undefined;
  embeddingCache.clear();
}
