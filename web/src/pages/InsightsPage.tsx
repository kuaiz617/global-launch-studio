import { MetricCard } from '../components/MetricCard';
import type { EvaluationResponse } from '../types';

export function InsightsPage({ evaluation }: { evaluation?: EvaluationResponse }) {
  if (!evaluation) return <div className="panel">Loading evaluation data…</div>;
  const m = evaluation.summary;
  return <div className="stack-lg"><div className="metric-grid"><MetricCard label="Routing" value={`${m.routingAccuracy}%`} note={`${m.cases} labeled cases`} /><MetricCard label="Grounding" value={`${m.groundingRate}%`} note="evidence attached" /><MetricCard label="Claim safety" value={`${m.claimSafetyRate}%`} note="included test set" /><MetricCard label="CTA completeness" value={`${m.ctaCompleteness}%`} note="next-step coverage" /></div><section className="panel"><h2>Evaluation cases</h2><div className="table-wrap"><table><thead><tr><th>Question</th><th>Expected</th><th>Routed</th><th>Quality</th></tr></thead><tbody>{evaluation.rows.map((row, index) => <tr key={`${row.case.question}-${index}`}><td>{row.case.question}</td><td>{row.case.expectedAgent}</td><td>{row.route.agentId}</td><td>{row.quality.score}%</td></tr>)}</tbody></table></div></section></div>;
}
