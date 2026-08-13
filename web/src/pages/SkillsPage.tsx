import type { AgentSkill } from '../types';

export function SkillsPage({ agents }: { agents: AgentSkill[] }) {
  return <div className="card-grid">{agents.map(agent => <section className="panel" key={agent.id}><div className="row-between"><h2>{agent.name}</h2><span className="status-chip">{agent.stage}</span></div><p>{agent.objective}</p><h3>Required messaging</h3><ul>{agent.requiredMessages.map(item => <li key={item}>{item}</li>)}</ul><h3>Guardrails</h3><ul>{agent.guardrails.map(item => <li key={item}>{item}</li>)}</ul><details><summary>System prompt</summary><pre>{agent.prompt}</pre></details></section>)}</div>;
}
