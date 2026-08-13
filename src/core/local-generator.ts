import type { AgentSkill, JourneyStage, Language, SellerAction, SellerAnswer } from '../types/index.js';
const stageActions: Record<string,string[]> = { awareness:['Choose one priority market','Complete a readiness assessment'], consideration:['Validate seller inputs','Close the highest-impact readiness gap'], readiness:['Verify market-specific requirements','Create an operational checklist'], onboarding:['Assign owners','Sequence dependencies'], activation:['Close one critical blocker','Review the next launch milestone'] };
export function localAnswer(skill: AgentSkill, stage: JourneyStage, language: Language, evidenceCount: number): Omit<SellerAnswer,'sellerContext'|'evidence'> {
 const actions: SellerAction[]=(stageActions[stage.id]||[]).map(text=>({text,status:'recommended'}));
 return {headline:`${skill.name} · ${language==='zh'?stage.zhName:stage.name}`,summary:language==='zh'?`回答基于 ${evidenceCount} 条检索知识。`:`The answer uses ${evidenceCount} retrieved knowledge sources.`,actions,guardrail:skill.guardrails[0]||'Use approved product claims only.',cta:language==='zh'?'下一步：确认优先市场。':'Next step: confirm one priority market.',provider:'deterministic'};
}
