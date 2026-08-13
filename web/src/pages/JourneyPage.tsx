import type { AgentSkill, JourneyStage } from '../types';

export function JourneyPage({ stages, agents }: { stages: JourneyStage[]; agents: AgentSkill[] }) {
  return <div>{stages.map(stage => <section key={stage.id}><h2>{stage.name}</h2><p>{stage.objective}</p><small>{agents.filter(agent => agent.stage === stage.id).map(agent => agent.name).join(', ')}</small></section>)}</div>;
}
