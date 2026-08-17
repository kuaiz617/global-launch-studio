import { useMemo, useState } from 'react';
import type { AgentSkill, JourneyStage } from '../types';

export function JourneyPage({ stages, agents }: { stages: JourneyStage[]; agents: AgentSkill[] }) {
  const [selectedId, setSelectedId] = useState(stages[0]?.id ?? '');
  const selected = stages.find(stage => stage.id === selectedId) ?? stages[0];
  const selectedAgents = useMemo(() => agents.filter(agent => agent.stage === selected?.id), [agents, selected]);
  const requiredMessages = [...new Set(selectedAgents.flatMap(agent => agent.requiredMessages))];
  const guardrails = [...new Set(selectedAgents.flatMap(agent => agent.guardrails))];

  if (!selected) return <div className="panel">No journey stages configured.</div>;

  return <div className="stack-lg">
    <section className="panel stack-md">
      <div className="section-heading">
        <div><span className="eyebrow">SELLER LIFECYCLE</span><h2>Choose a stage to inspect the education design</h2><p>Each stage combines a seller objective, agent ownership, required messaging, and a measurable success signal.</p></div>
        <span className="muted-label">{stages.length} stages · {agents.length} agent skills</span>
      </div>
      <div className="journey-rail" role="tablist" aria-label="Seller journey stages">
        {stages.map((stage, index) => {
          const stageAgents = agents.filter(agent => agent.stage === stage.id);
          const active = stage.id === selected.id;
          return <button type="button" role="tab" aria-selected={active} className={`journey-node${active ? ' active' : ''}`} key={stage.id} onClick={() => setSelectedId(stage.id)}>
            <span className="journey-node-number">{String(stage.order).padStart(2, '0')}</span>
            <strong>{stage.name}</strong>
            <small>{stage.zhName}</small>
            <span className="journey-node-meta">{stageAgents.length} agent{stageAgents.length === 1 ? '' : 's'}</span>
            {index < stages.length - 1 && <span className="journey-arrow">→</span>}
          </button>;
        })}
      </div>
    </section>

    <section className="journey-detail-grid">
      <div className="panel journey-focus-card">
        <div className="row-between"><div className="chip-row"><span className="status-chip">Stage {selected.order}</span><span className="outline-chip">{selected.id}</span></div><span className="stage-watermark">{String(selected.order).padStart(2, '0')}</span></div>
        <h2>{selected.name} · {selected.zhName}</h2>
        <div className="detail-block"><strong>Seller objective</strong><p>{selected.objective}</p></div>
        <div className="detail-block success-block"><strong>Success signal</strong><p>{selected.successSignal}</p></div>
      </div>

      <div className="panel stack-md">
        <div><span className="eyebrow">AGENT OWNERSHIP</span><h3>Who delivers the experience?</h3></div>
        {selectedAgents.length ? selectedAgents.map(agent => <button type="button" className="agent-owner-card" key={agent.id}>
          <div className="row-between"><strong>{agent.name}</strong><span className="outline-chip">v{agent.version}</span></div>
          <p>{agent.objective}</p>
          <div className="skill-meta"><span>{agent.status}</span><span>Priority {agent.priority}</span><span>{agent.keywords.length} routing terms</span></div>
        </button>) : <p className="muted-label">No primary agent is assigned to this stage.</p>}
      </div>
    </section>

    <div className="two-column">
      <section className="panel"><span className="eyebrow">KNOWLEDGE DELIVERY</span><h3>What sellers need to hear</h3>{requiredMessages.length ? <ul className="check-list">{requiredMessages.map(message => <li key={message}>{message}</li>)}</ul> : <p>No required messages configured.</p>}</section>
      <section className="panel"><span className="eyebrow">SAFETY BOUNDARIES</span><h3>What agents must not overclaim</h3>{guardrails.length ? <ul className="guardrail-list">{guardrails.map(item => <li key={item}>{item}</li>)}</ul> : <p>No stage-specific guardrails configured.</p>}</section>
    </div>
  </div>;
}
