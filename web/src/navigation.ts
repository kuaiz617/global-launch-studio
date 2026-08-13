import type { PageId } from './types';

export const navigation: Array<{ id: PageId; label: string; index: string; eyebrow: string; title: string; subtitle: string }> = [
  { id: 'dashboard', label: 'Command Center', index: '01', eyebrow: 'COMMAND CENTER', title: 'Seller education, orchestrated.', subtitle: 'Design which agent delivers which knowledge at every stage of a global seller journey.' },
  { id: 'journey', label: 'Journey Architect', index: '02', eyebrow: 'JOURNEY ARCHITECT', title: 'Build the end-to-end seller journey.', subtitle: 'Map stage objectives, ownership, and activation outcomes.' },
  { id: 'skills', label: 'Agent Skill Studio', index: '03', eyebrow: 'AGENT SKILL STUDIO', title: 'Turn product messaging into reusable skills.', subtitle: 'Inspect structured objectives, prompts, and guardrails.' },
  { id: 'messaging', label: 'Messaging Library', index: '04', eyebrow: 'MESSAGING LIBRARY', title: 'One source of truth for every agent.', subtitle: 'Govern bilingual value propositions and evidence notes.' },
  { id: 'simulator', label: 'Seller Simulator', index: '05', eyebrow: 'SELLER SIMULATOR', title: 'Test the experience before sellers see it.', subtitle: 'Route seller questions and inspect agent quality.' },
  { id: 'content', label: 'Content Studio', index: '06', eyebrow: 'CONTENT STUDIO', title: 'Scale seller-facing education.', subtitle: 'Generate bilingual GTM assets from one messaging system.' },
  { id: 'insights', label: 'Evaluation Center', index: '07', eyebrow: 'EVALUATION CENTER', title: 'Measure the agent journey.', subtitle: 'Evaluate routing, grounding, claim safety, and CTA completeness.' }
];
