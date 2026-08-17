import { MetricCard } from '../components/MetricCard';
import type { SimulatorPreset } from '../App';
import type { BootstrapData, EvaluationResponse, PageId } from '../types';

const demoScenarios: SimulatorPreset[] = [
  {
    sellerId: 'sz-electronics',
    label: 'Germany compliance',
    question: 'I sell consumer electronics from Shenzhen and want to expand to Germany. What compliance and launch steps should I understand first?'
  },
  {
    sellerId: 'sz-electronics',
    label: 'Japan localization',
    question: 'We already sell in the US and want to launch in Japan. What listing localization should we prepare before onboarding?'
  },
  {
    sellerId: 'gz-home',
    label: 'North America inventory',
    question: 'We sell home and kitchen products in the UK and want to expand to the US and Canada. How should we plan inventory and inbound preparation?'
  }
];

const workflow: Array<{ id: PageId; number: string; title: string; copy: string }> = [
  { id: 'messaging', number: '01', title: 'Govern messaging', copy: 'Define bilingual claims, evidence notes, and prohibited wording.' },
  { id: 'skills', number: '02', title: 'Encode agent skills', copy: 'Turn messaging into reusable prompts, routing rules, inputs, and guardrails.' },
  { id: 'journey', number: '03', title: 'Place agents in journey', copy: 'Assign the right education to awareness, readiness, onboarding, and activation.' },
  { id: 'simulator', number: '04', title: 'Test seller scenarios', copy: 'Route real questions through retrieval, response generation, and quality checks.' },
  { id: 'content', number: '05', title: 'Generate education', copy: 'Reuse the same governed system for emails, FAQs, and seller checklists.' },
  { id: 'insights', number: '06', title: 'Evaluate quality', copy: 'Inspect labeled routing cases, grounding, safety, and CTA completeness.' }
];

export function DashboardPage({ data, evaluation, onNavigate, onRunScenario }: {
  data: BootstrapData;
  evaluation?: EvaluationResponse;
  onNavigate: (page: PageId) => void;
  onRunScenario: (preset: SimulatorPreset) => void;
}) {
  const metrics = evaluation?.summary;
  return <div className="stack-lg">
    <section className="hero-panel">
      <div>
        <span className="eyebrow">LIVE PORTFOLIO WORKBENCH</span>
        <h2>From product messaging to a tested seller journey.</h2>
        <p>GlobalLaunch Studio shows how product marketers can govern what AI agents say, decide where they appear in the seller lifecycle, and evaluate the experience before launch.</p>
      </div>
      <button type="button" className="hero-action" onClick={() => onRunScenario(demoScenarios[0]!)}>Run flagship demo →</button>
    </section>

    <div className="metric-grid">
      <MetricCard label="Agent skills" value={data.agents.length} note="versioned skill packages" />
      <MetricCard label="Journey stages" value={data.stages.length} note="end-to-end seller path" />
      <MetricCard label="Evaluation cases" value={metrics?.cases ?? '—'} note="curated labeled scenarios" />
      <MetricCard label="Routing accuracy" value={metrics ? `${metrics.routingAccuracy}%` : '—'} note="included test set" />
    </div>

    <section className="panel stack-md">
      <div className="section-heading"><div><span className="eyebrow">TRY THE SYSTEM</span><h2>Three demo scenarios</h2><p>Use a realistic seller question to see routing, retrieval, agent response, guardrails, and evaluation in one flow.</p></div><button className="button-secondary" type="button" onClick={() => onNavigate('simulator')}>Open simulator</button></div>
      <div className="scenario-grid">
        {demoScenarios.map(preset => {
          const seller = data.sellers.find(item => item.id === preset.sellerId);
          return <button type="button" className="scenario-card" key={preset.label} onClick={() => onRunScenario(preset)}>
            <div className="row-between"><span className="status-chip">{preset.label}</span><span className="scenario-arrow">↗</span></div>
            <h3>{seller?.name}</h3>
            <p>{preset.question}</p>
            <small>{seller?.location} · {seller?.currentMarkets.join(', ')} → {seller?.targetMarkets.join(', ')}</small>
          </button>;
        })}
      </div>
    </section>

    <section className="panel stack-md">
      <div className="section-heading"><div><span className="eyebrow">OPERATING MODEL</span><h2>One connected product-marketing workflow</h2></div><span className="muted-label">Click any step to inspect the implementation</span></div>
      <div className="workflow-rail">
        {workflow.map((step, index) => <button type="button" className="workflow-step" key={step.id} onClick={() => onNavigate(step.id)}>
          <span className="workflow-number">{step.number}</span>
          <strong>{step.title}</strong>
          <p>{step.copy}</p>
          {index < workflow.length - 1 && <span className="workflow-connector">→</span>}
        </button>)}
      </div>
    </section>

    <div className="two-column dashboard-lower-grid">
      <section className="panel"><div className="section-heading"><div><span className="eyebrow">SELLER COVERAGE</span><h3>Representative personas</h3></div><button className="text-button" type="button" onClick={() => onNavigate('simulator')}>Test →</button></div>{data.sellers.map(seller => <div className="seller-row" key={seller.id}><span><strong>{seller.name}</strong><small>{seller.location} · {seller.category}</small></span><span className="readiness-badge">{seller.readiness}</span></div>)}</section>
      <section className="panel"><div className="section-heading"><div><span className="eyebrow">QUALITY HEALTH</span><h3>What the evaluation checks</h3></div><button className="text-button" type="button" onClick={() => onNavigate('insights')}>Details →</button></div><div className="quality-list"><div><span>Grounding</span><b>{metrics?.groundingRate ?? '—'}%</b></div><div><span>Claim safety</span><b>{metrics?.claimSafetyRate ?? '—'}%</b></div><div><span>CTA completeness</span><b>{metrics?.ctaCompleteness ?? '—'}%</b></div><div><span>Average structured quality</span><b>{metrics?.averageQuality ?? '—'}%</b></div></div></section>
    </div>
  </div>;
}
