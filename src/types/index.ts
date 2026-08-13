export type JourneyStageId = 'awareness' | 'consideration' | 'readiness' | 'onboarding' | 'activation';
export type Language = 'en' | 'zh';
export type SkillStatus = 'Active' | 'Pilot' | 'Draft';
export type ContentFormat = 'email' | 'faq' | 'checklist';
export type RetrievalMode = 'lexical' | 'embedding';

export interface JourneyStage { id: JourneyStageId; order: number; name: string; zhName: string; objective: string; successSignal: string; }
export interface SellerProfile { id: string; name: string; location: string; category: string; currentMarkets: string[]; targetMarkets: string[]; teamSize: number; readiness: number; strengths: string[]; gaps: string[]; }
export interface MessagingAsset { id: string; category: string; title: string; en: string; zh: string; evidence: string; prohibited: string[]; }
export interface AgentSkillExample { question?: string; answer?: string; [key: string]: unknown; }
export interface AgentSkill { id: string; name: string; stage: JourneyStageId; version: string; status: SkillStatus; priority: number; keywords: string[]; objective: string; inputs: string[]; requiredMessages: string[]; guardrails: string[]; outputSchema: string[]; prompt: string; examples: AgentSkillExample[]; }
export interface RouteDecision { agentId: string; stageId: JourneyStageId; confidence: number; matchedKeywords: string[]; }
export interface KnowledgeDocument { id: string; file: string; content: string; tokens: string[]; }
export interface RetrievedDocument { id: string; file: string; content: string; score: number; overlap: string[]; retrievalMode: RetrievalMode; retrievalFallback?: string; }
export interface EvidenceItem { source: string; excerpt: string; score: number; retrievalMode: RetrievalMode; }
export interface ReadinessResult { band: 'high' | 'medium' | 'developing'; score: number; strengths: string[]; gaps: string[]; disclaimer: string; }
export interface SellerAction { text: string; status: 'recommended'; }
export interface SellerAnswer { headline: string; summary: string; actions: SellerAction[]; guardrail: string; cta: string; provider: 'deterministic' | 'openai'; model?: string; providerFallback?: string; sellerContext: string; evidence: EvidenceItem[]; }
export interface QualityChecks { hasCTA: boolean; hasGuardrail: boolean; hasEvidence: boolean; hasActions: boolean; hasSellerContext: boolean; noProhibitedClaims: boolean; }
export interface QualityEvaluation { score: number; checks: QualityChecks; violations: string[]; expected: Record<string, unknown>; }
export interface EvaluationCase { question: string; sellerId: string; expectedAgent: string; expectedStage: JourneyStageId; }
export interface EvaluationRow { case: EvaluationCase; route: RouteDecision; routeCorrect: boolean; answer: SellerAnswer; quality: QualityEvaluation; }
export interface EvaluationSummary { cases: number; routingAccuracy: number; groundingRate: number; claimSafetyRate: number; ctaCompleteness: number; averageQuality: number; }
export interface GeneratedContent { format: ContentFormat; seller: SellerProfile; language: Language; title: string; body: string; }
export interface AuditEvent { id: number; type: string; timestamp: string; metadata: Record<string, unknown>; }
