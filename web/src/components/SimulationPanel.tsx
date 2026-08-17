import type { SimulationResponse } from '../types';

export function SimulationPanel({ result }: { result?: SimulationResponse }) {
  if (!result) return <p>Run a scenario to inspect routing, retrieval, grounded messaging, and quality evaluation.</p>;

  return (
    <div className="simulation-result stack-md">
      <div className="row-between">
        <div className="chip-row"><span className="status-chip">{result.route.agentId}</span><span className="outline-chip">{result.route.stageId}</span></div>
        <strong className="quality-score">Quality {result.quality.score}%</strong>
      </div>
      <div className="route-meta">
        <span>Confidence {Math.round(result.route.confidence * 100)}%</span>
        <span>Provider {result.answer.provider}{result.answer.model ? ` · ${result.answer.model}` : ''}</span>
      </div>
      {result.route.matchedKeywords.length > 0 && <div className="detail-block"><strong>Matched routing terms</strong><div className="chip-row">{result.route.matchedKeywords.map(keyword => <span className="outline-chip" key={keyword}>{keyword}</span>)}</div></div>}
      <div><h2>{result.answer.headline}</h2><p>{result.answer.summary}</p></div>
      <div className="evidence-box"><strong>Seller context</strong><p>{result.answer.sellerContext}</p></div>
      <div className="detail-block">
        <strong>Retrieved evidence ({result.answer.evidence.length})</strong>
        <div className="evidence-list">
          {result.answer.evidence.map((item, index) => (
            <article className="evidence-item" key={`${item.source}-${index}`}>
              <div className="row-between"><b>{item.source}</b><span className="muted-label">{item.retrievalMode} · score {item.score}</span></div>
              <p>{item.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="detail-block"><strong>Recommended actions</strong><ol>{result.answer.actions.map((action, index) => <li key={`${action.text}-${index}`}>{action.text}</li>)}</ol></div>
      <div className="guardrail"><strong>Guardrail</strong><p>{result.answer.guardrail}</p></div>
      {result.quality.violations.length > 0 && <div className="guardrail warning"><strong>Quality flags</strong><ul>{result.quality.violations.map(item => <li key={item}>{item}</li>)}</ul></div>}
      <div className="cta-box"><span>Next seller action</span><strong>{result.answer.cta}</strong></div>
      {result.answer.providerFallback && <small className="muted-label">Provider fallback: {result.answer.providerFallback}</small>}
    </div>
  );
}
