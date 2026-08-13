import { loadSkills } from "./skills.mjs";
export async function routeQuestion(question=""){
  const normalized=question.toLowerCase();
  const skills=await loadSkills();
  const ranked=skills.map(skill=>({ skill, hits:skill.keywords.filter(k=>normalized.includes(k.toLowerCase())).length }))
    .filter(row=>row.hits>0).sort((a,b)=>(b.hits*b.skill.priority)-(a.hits*a.skill.priority));
  const winner=ranked[0]?.skill || skills.find(s=>s.id==="global-opportunity");
  return { agentId:winner.id, stageId:winner.stage, confidence:ranked.length ? Math.min(0.98,0.55+ranked[0].hits*0.12) : 0.45, matchedKeywords:ranked[0]?.skill.keywords.filter(k=>normalized.includes(k.toLowerCase())) || [] };
}
