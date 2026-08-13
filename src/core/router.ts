import { loadSkills } from './skills.js';
import type { RouteDecision } from '../types/index.js';

export async function routeQuestion(question = ''): Promise<RouteDecision> {
  const normalized = question.toLowerCase();
  const skills = await loadSkills();
  const ranked = skills
    .map(skill => ({ skill, hits:skill.keywords.filter(keyword => normalized.includes(keyword.toLowerCase())).length }))
    .filter(row => row.hits > 0)
    .sort((a,b) => (b.hits * b.skill.priority) - (a.hits * a.skill.priority));
  const winner = ranked[0]?.skill ?? skills.find(skill => skill.id === 'global-opportunity');
  if (!winner) throw new Error('No agent skills are configured.');
  return {
    agentId:winner.id,
    stageId:winner.stage,
    confidence:ranked.length ? Math.min(0.98, 0.55 + (ranked[0]?.hits ?? 0) * 0.12) : 0.45,
    matchedKeywords:ranked[0]?.skill.keywords.filter(keyword => normalized.includes(keyword.toLowerCase())) ?? []
  };
}
