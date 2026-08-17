import { useState } from 'react';
import type { AgentSkill } from '../types';

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return <div className="detail-block"><strong>{title}</strong><ul className="check-list compact">{items.map(item => <li key={item}>{item}</li>)}</ul></div>;
}

export function SkillsPage({ agents, onTestSkill }: { agents: AgentSkill[]; onTestSkill: () => void }) {
  const [selectedId, setSelectedId] = useState(agents[0]?.id ?? '');
  const [tab, setTab] = useState<'design' | 'prompt' | 'examples'>('design');
  const agent = agents.find(item => item.id === selectedId) ?? agents[0];

  if (!agent) return <div className="panel">No agent skills configured.</div>;

  return <div className="skill-workbench">
    <aside className="panel skill-browser">
      <div className="skill-browser-header"><span className="eyebrow">SKILL REGISTRY</span><h2>{agents.length} reusable skills</h2><p>Select an agent to inspect its routing contract, messaging rules, and prompt design.</p></div>
      <div className="skill-list">
        {agents.map(item => <button type="button" className={`skill-list-item${item.id === agent.id ? ' active' : ''}`} key={item.id} onClick={() => { setSelectedId(item.id); setTab('design'); }}>
          <div className="row-between"><span className="status-chip">{item.stage}</span><span className="muted-label">v{item.version}</span></div>
          <strong>{item.name}</strong>
          <small>{item.objective}</small>
          <div className="skill-meta"><span>{item.status}</span><span>Priority {item.priority}</span></div>
        </button>)}
      </div>
    </aside>

    <section className="panel skill-inspector">
      <div className="skill-inspector-header">
        <div><div className="chip-row"><span className="status-chip">{agent.stage}</span><span className="outline-chip">{agent.status}</span><span className="outline-chip">v{agent.version}</span></div><h2>{agent.name}</h2><p>{agent.objective}</p></div>
        <button type="button" onClick={onTestSkill}>Test in simulator →</button>
      </div>

      <div className="skill-summary-strip">
        <div><span>Routing terms</span><strong>{agent.keywords.length}</strong></div>
        <div><span>Required messages</span><strong>{agent.requiredMessages.length}</strong></div>
        <div><span>Guardrails</span><strong>{agent.guardrails.length}</strong></div>
        <div><span>Examples</span><strong>{agent.examples.length}</strong></div>
      </div>

      <div className="tab-bar" role="tablist">
        <button type="button" className={tab === 'design' ? 'active' : ''} onClick={() => setTab('design')}>Skill design</button>
        <button type="button" className={tab === 'prompt' ? 'active' : ''} onClick={() => setTab('prompt')}>System prompt</button>
        <button type="button" className={tab === 'examples' ? 'active' : ''} onClick={() => setTab('examples')}>Examples</button>
      </div>

      {tab === 'design' && <div className="stack-md">
        <div className="two-column nested-grid">
          <ListBlock title="Inputs" items={agent.inputs} />
          <ListBlock title="Output schema" items={agent.outputSchema} />
        </div>
        <div className="two-column nested-grid">
          <ListBlock title="Required messaging" items={agent.requiredMessages} />
          <div className="detail-block"><strong>Guardrails</strong><ul className="guardrail-list compact">{agent.guardrails.map(item => <li key={item}>{item}</li>)}</ul></div>
        </div>
        <div className="detail-block"><strong>Routing vocabulary</strong><p className="muted-label">Questions containing these concepts increase this skill's routing score.</p><div className="chip-row routing-chip-cloud">{agent.keywords.map(keyword => <span className="outline-chip" key={keyword}>{keyword}</span>)}</div></div>
      </div>}

      {tab === 'prompt' && <div className="prompt-editor-shell"><div className="prompt-toolbar"><span>Read-only portfolio prompt</span><span className="muted-label">Version {agent.version}</span></div><pre>{agent.prompt}</pre></div>}

      {tab === 'examples' && <div className="example-grid">{agent.examples.map((example, index) => <article className="example-card" key={index}><div className="row-between"><strong>Example {index + 1}</strong><span className="outline-chip">{String(example.language ?? 'scenario')}</span></div><pre>{JSON.stringify(example, null, 2)}</pre></article>)}</div>}
    </section>
  </div>;
}
