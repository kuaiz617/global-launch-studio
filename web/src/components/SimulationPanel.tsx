import type { SimulationResponse } from '../types';

export function SimulationPanel({ result }: { result?: SimulationResponse }) {
  if (!result) return <div className="empty-state"><strong>Run a scenario to see the trace.</strong><p>The result will expose routing, retrieval, generation mode, quality checks, evidence, and the next seller action.</p></div>;

  const retrievalMode = result.answer.evidence[0]?.retrievalMode ?? 'none';
  const passedChecks = Object.values(result.quality.checks).filter(Boolean).length;
  const totalChecks = Object.keys(result.quality.checks).length;

  return (
    <div className="simulation-result stack-md">
      <div className="trace-pipeline">
        <div className="trace-step"><span>01</span><small>Router</small><strong>{result.route.agentId}</strong><em>{Math.round(result.route.confidence * 100)}% confidence</em></div>
        <div className="trace-step"><span>02</span><small>Retrieval</small><strong>{retrievalMode}</strong><em>{result.answer.evidence.length} sources</em></div>
        <div className="trace-step"><span>03</span><small>Generation</small><strong>{result.answer.provider}</strong><em>{result.answer.model ?? 'resilient demo mode'}</em></div>
        <div className="trace-step"><span>04</span><small>Evaluation</small><strong>{result.quality.score}%</strong><em>{passedChecks}/{totalChecks} checks passed</em></div>
        <div className="trace-step"><span>05</span><small>Seller action</small><strong>CTA ready</strong><em>{result.route.stageId}</em></div>
      </div>

      {result.answer.providerFallback && <div className="fallback-banner"><div><strong>Resilient demo mode active</strong><p>OpenAI generation was unavailable, so the system automatically used deterministic generation and/or lexical retrieval instead of failing the seller experience.</p></div><span className="outline-chip">Fallback handled</span></div>}

      <div className="row-between result-heading">
        <div><div className="chip-row"><span className="status-chip">{result.route.agentId}</span><span className="outline-chip">{result.route.stageId}</span></div><h2>{result.answer.headline}</h2><p>{result.answer.summary}</p></div>
        <strong className="quality-score">{result.quality.score}%</strong>
      </div>

      {result.route.matchedKeywords.length > 0 && <div className="detail-block"><strong>Why this agent was selected</strong><p className="muted-label">Matched routing vocabulary from the skill registry.</p><div className="chip-row">{result.route.matchedKeywords.map(keyword => <span className="outline-chip" key={keyword}>{keyword}</span>)}</div></div>}

      <div className="evidence-box"><strong>Seller context</strong><p>{result.answer.sellerContext}</p></div>

      <div className="detail-block">
        <div className="row-between"><div><strong>Retrieved evidence</strong><p className="muted-label">The answer is grounded in the highest-ranked portfolio knowledge sources.</p></div><span className="outline-chip">{result.answer.evidence.length} sources</span></div>
        <div className="evidence-list">
          {result.answer.evidence.map((item, index) => (
            <article className="evidence-item" key={`${item.source}-${index}`}>
              <div className="row-between"><b>{item.source}</b><span className="muted-label">{item.retrievalMode} · score {item.score}</span></div>
              <p>{item.excerpt}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="two-column nested-grid result-actions-grid">
        <div className="detail-block"><strong>Recommended actions</strong><ol>{result.answer.actions.map((action, index) => <li key={`${action.text}-${index}`}>{action.text}</li>)}</ol></div>
        <div className="detail-block"><strong>Quality checks</strong><div className="quality-check-grid">{Object.entries(result.quality.checks).map(([name, passed]) => <div className={passed ? 'quality-check passed' : 'quality-check failed'} key={name}><span>{passed ? '✓' : '!'}</span><strong>{name.replace(/([A-Z])/g, ' $1').replace(/^./, value => value.toUpperCase())}</strong></div>)}</div></div>
      </div>

      <div className="guardrail"><strong>Guardrail</strong><p>{result.answer.guardrail}</p></div>
      {result.quality.violations.length > 0 && <div className="guardrail warning"><strong>Quality flags</strong><ul>{result.quality.violations.map(item => <li key={item}>{item}</li>)}</ul></div>}
      <div className="cta-box"><span>Next seller action</span><strong>{result.answer.cta}</strong></div>
    </div>
  );
}
