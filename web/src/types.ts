export type PageId = 'dashboard' | 'journey' | 'skills' | 'messaging' | 'simulator' | 'content' | 'insights';
export type Language = 'en' | 'zh';
export type ContentFormat = 'email' | 'faq' | 'checklist';
export type RetrievalMode = 'lexical' | 'embedding';

export interface SimulatorPreset {
  sellerId: string;
  question: string;
  label: string;
}

export interface JourneyStage {
  id: string;
  order: number;
  name: string;
  zhName: string;
  objective: string;
  successSignal: string;
}

export interface SellerProfile {
  id: string;
  name: string;
  location: string;
  category: string;
  currentMarkets: string[];
  targetMarkets: string[];
  teamSize: number;
  readiness: number;
  strengths: string[];
  gaps: string[];
}

export interface AgentSkill {
  id: string;
  name: string;
  stage: string;
  version: string;
  status: string;
  priority: number;
  keywords: string[];
  objective: string;
  inputs: string[];
  requiredMessages: string[];
  guardrails: string[];
  outputSchema: string[];
  prompt: string;
  examples: Array<Record<string, unknown>>;
}

export interface MessagingAsset {
  id: string;
  category: string;
  title: string;
  en: string;
  zh: string;
  evidence: string;
  prohibited: string[];
}

export interface BootstrapData {
  stages: JourneyStage[];
  sellers: SellerProfile[];
  messaging: MessagingAsset[];
  agents: AgentSkill[];
}

export interface EvidenceItem {
  source: string;
  excerpt: string;
  score: number;
  retrievalMode: RetrievalMode;
}

export interface SellerAnswer {
  headline: string;
  summary: string;
  actions: Array<{ text: string; status: 'recommended' }>;
  guardrail: string;
  cta: string;
  provider: 'deterministic' | 'openai';
  model?: string;
  providerFallback?: string;
  sellerContext: string;
  evidence: EvidenceItem[];
}

export interface RouteDecision {
  agentId: string;
  stageId: string;
  confidence: number;
  matchedKeywords: string[];
}

export interface QualityEvaluation {
  score: number;
  checks: Record<string, boolean>;
  violations: string[];
}

export interface SimulationResponse {
  sellerId: string;
  question: string;
  route: RouteDecision;
  answer: SellerAnswer;
  quality: QualityEvaluation;
}

export interface GeneratedContent {
  format: ContentFormat;
  seller: SellerProfile;
  language: Language;
  title: string;
  body: string;
}

export interface EvaluationSummary {
  cases: number;
  routingAccuracy: number;
  groundingRate: number;
  claimSafetyRate: number;
  ctaCompleteness: number;
  averageQuality: number;
}

export interface EvaluationRow {
  case: {
    question: string;
    sellerId: string;
    expectedAgent: string;
    expectedStage: string;
  };
  route: RouteDecision;
  routeCorrect: boolean;
  answer: SellerAnswer;
  quality: QualityEvaluation;
}

export interface EvaluationResponse {
  summary: EvaluationSummary;
  rows: EvaluationRow[];
}
