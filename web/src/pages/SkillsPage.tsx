import type { AgentSkill } from '../types';

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return <div className="detail-block"><strong>{title}</strong><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></div>;
}

export function SkillsPage({ agents }: { agents: AgentSkill[] }) {
  return (
    <div className="card-grid">
      {agents.map(agent => (
        <section className="panel skill-card" key={agent.id}>
          <div className="row-between">
            <div>
              <div className="chip-row"><span className="status-chip">{agent.stage}</span><span className="outline-chip">{agent.status}</span></div>
              <h2>{agent.name}</h2>
            </div>
            <div className="version-badge">v{agent.version}</div>
          </div>
          <p>{agent.objective}</p>
          <div className="skill-meta"><span>Priority {agent.priority}</span><span>{agent.examples.length} examples</span><span>{agent.keywords.length} routing terms</span></div>
          <div className="two-column nested-grid">
            <ListBlock title="Inputs" items={agent.inputs} />
            <ListBlock title="Output schema" items={agent.outputSchema} />
          </div>
          <ListBlock title="Required messaging" items={agent.requiredMessages} />
          <ListBlock title="Guardrails" items={agent.guardrails} />
          <div className="detail-block"><strong>Routing vocabulary</strong><div className="chip-row">{agent.keywords.map(keyword => <span className="outline-chip" key={keyword}>{keyword}</span>)}</div></div>
          <details><summary>System prompt</summary><pre>{agent.prompt}</pre></details>
          <details><summary>Example conversations ({agent.examples.length})</summary><pre>{JSON.stringify(agent.examples, null, 2)}</pre></details>
        </section>
      ))}
    </div>
  );
}
