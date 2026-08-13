import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AgentSkill, AgentSkillExample, JourneyStageId, SkillStatus } from '../types/index.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../config/agents');
let cache: AgentSkill[] | undefined;

function stringArray(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === 'string')) {
    throw new Error(`Invalid agent skill field: ${field}`);
  }
  return value;
}

function parseSkill(value: unknown, prompt: string, examples: AgentSkillExample[]): AgentSkill {
  if (!value || typeof value !== 'object') throw new Error('Agent skill must be an object.');
  const raw = value as Record<string, unknown>;
  const id = raw.id;
  const name = raw.name;
  const stage = raw.stage;
  const version = raw.version;
  const status = raw.status;
  const priority = raw.priority;
  const objective = raw.objective;
  if (typeof id !== 'string' || typeof name !== 'string' || typeof version !== 'string' || typeof objective !== 'string') {
    throw new Error('Agent skill is missing a required string field.');
  }
  if (!['awareness','consideration','readiness','onboarding','activation'].includes(String(stage))) {
    throw new Error(`Invalid journey stage for skill ${id}.`);
  }
  if (!['Active','Pilot','Draft'].includes(String(status))) throw new Error(`Invalid status for skill ${id}.`);
  if (typeof priority !== 'number' || !Number.isFinite(priority)) throw new Error(`Invalid priority for skill ${id}.`);
  return {
    id,
    name,
    stage: stage as JourneyStageId,
    version,
    status: status as SkillStatus,
    priority,
    keywords: stringArray(raw.keywords, 'keywords'),
    objective,
    inputs: stringArray(raw.inputs, 'inputs'),
    requiredMessages: stringArray(raw.requiredMessages, 'requiredMessages'),
    guardrails: stringArray(raw.guardrails, 'guardrails'),
    outputSchema: stringArray(raw.outputSchema, 'outputSchema'),
    prompt,
    examples
  };
}

export async function loadSkills(): Promise<AgentSkill[]> {
  if (cache) return cache;
  const dirs = await readdir(root);
  const skills: AgentSkill[] = [];
  for (const dir of dirs) {
    const base = path.join(root, dir);
    const rawSkill = JSON.parse(await readFile(path.join(base, 'skill.json'), 'utf8')) as unknown;
    const prompt = await readFile(path.join(base, 'prompt.md'), 'utf8');
    const examples = JSON.parse(await readFile(path.join(base, 'examples.json'), 'utf8')) as AgentSkillExample[];
    skills.push(parseSkill(rawSkill, prompt, examples));
  }
  cache = skills.sort((a, b) => b.priority - a.priority);
  return cache;
}

export async function getSkill(id: string): Promise<AgentSkill> {
  const skill = (await loadSkills()).find(item => item.id === id);
  if (!skill) throw new Error(`Unknown agent skill: ${id}`);
  return skill;
}

export function clearSkillCacheForTests(): void {
  cache = undefined;
}
