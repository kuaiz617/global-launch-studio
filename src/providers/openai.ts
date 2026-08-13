import type { AgentSkill, EvidenceItem, JourneyStage, Language, ReadinessResult, SellerAction, SellerProfile } from '../types/index.js';

const apiBase = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';
const apiKey = (): string => process.env.OPENAI_API_KEY || '';

interface OpenAIErrorShape { error?: { message?: string } }
interface ResponsesApiShape { output_text?: string; output?: Array<{ content?: Array<{ text?: string }> }> }
interface EmbeddingsApiShape { data?: Array<{ embedding?: number[] }> }

function requireKey(): void {
  if (!apiKey()) throw new Error('OPENAI_API_KEY is not configured.');
}

async function post<T>(path: string, body: unknown): Promise<T> {
  requireKey();
  const response = await fetch(`${apiBase}${path}`, {
    method:'POST',
    headers:{ Authorization:`Bearer ${apiKey()}`, 'Content-Type':'application/json' },
    body:JSON.stringify(body)
  });
  const json = await response.json().catch(() => ({})) as T & OpenAIErrorShape;
  if (!response.ok) throw new Error(json.error?.message || `OpenAI request failed with ${response.status}`);
  return json;
}

function extractText(response: ResponsesApiShape): string {
  if (typeof response.output_text === 'string') return response.output_text;
  for (const item of response.output ?? []) {
    for (const content of item.content ?? []) {
      if (typeof content.text === 'string') return content.text;
    }
  }
  return '';
}

export function openAIEnabled(): boolean {
  return Boolean(apiKey());
}

export async function createEmbedding(input: string): Promise<number[]> {
  const model = process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small';
  const response = await post<EmbeddingsApiShape>('/embeddings', { model, input });
  const vector = response.data?.[0]?.embedding;
  if (!Array.isArray(vector)) throw new Error('Embedding response did not include a vector.');
  return vector;
}

export interface StructuredSellerAnswerInput {
  question: string;
  seller: SellerProfile;
  skill: AgentSkill;
  stage: JourneyStage;
  evidence: EvidenceItem[];
  readiness: ReadinessResult;
  language: Language;
}

export interface OpenAISellerAnswer {
  headline: string;
  summary: string;
  actions: SellerAction[];
  guardrail: string;
  cta: string;
  provider: 'openai';
  model: string;
}

function isStructuredPayload(value: unknown): value is Omit<OpenAISellerAnswer, 'provider' | 'model'> {
  if (!value || typeof value !== 'object') return false;
  const raw = value as Record<string, unknown>;
  return typeof raw.headline === 'string' && typeof raw.summary === 'string' && typeof raw.guardrail === 'string' && typeof raw.cta === 'string' && Array.isArray(raw.actions);
}

export async function generateStructuredSellerAnswer(input: StructuredSellerAnswerInput): Promise<OpenAISellerAnswer> {
  const { question, seller, skill, stage, evidence, readiness, language } = input;
  const model = process.env.OPENAI_MODEL || 'gpt-5-mini';
  const context = evidence.map((item, index) => `[${index + 1}] ${item.source}\n${item.excerpt}`).join('\n\n');
  const prompt = `You are an AI product-marketing education agent for a fictional cross-border commerce portfolio demo.\n\nAgent: ${skill.name}\nObjective: ${skill.objective}\nJourney stage: ${stage.name}\nSeller: ${JSON.stringify(seller)}\nReadiness score: ${readiness.score}/100\nQuestion: ${question}\nLanguage: ${language === 'zh' ? 'Simplified Chinese' : 'English'}\n\nRetrieved knowledge:\n${context}\n\nGuardrails:\n${skill.guardrails.map(item => `- ${item}`).join('\n')}\n\nReturn ONLY valid JSON with this exact shape:\n{\n  \"headline\": \"string\",\n  \"summary\": \"string\",\n  \"actions\": [{\"text\": \"string\", \"status\": \"recommended\"}],\n  \"guardrail\": \"string\",\n  \"cta\": \"string\"\n}\nDo not claim access to Amazon internal data. Do not guarantee sales, eligibility, compliance, or business outcomes. Ground factual product explanations only in the retrieved knowledge above.`;
  const response = await post<ResponsesApiShape>('/responses', { model, input:prompt, store:false });
  const cleaned = extractText(response).trim().replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  const parsed = JSON.parse(cleaned) as unknown;
  if (!isStructuredPayload(parsed)) throw new Error('OpenAI response did not match the required seller-answer schema.');
  return { ...parsed, actions: parsed.actions as SellerAction[], provider:'openai', model };
}
