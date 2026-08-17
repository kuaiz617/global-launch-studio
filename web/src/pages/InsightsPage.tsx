import { useState } from 'react';
import { MetricCard } from '../components/MetricCard';
import type { EvaluationResponse } from '../types';

export function InsightsPage({ evaluation }: { evaluation?: EvaluationResponse }) {
  const [view, setView] = useState<'all' | 'failures'>('all');
  const [selectedAgent, setSelectedAgent] = useState('All');
  if (!evaluation) return <div className="panel">Loading evaluation data…</div>;

  const m = evaluation.summary;
  const agents = ['All', ...new Set(evaluation.rows.map(row => row.case.expectedAgent))];
  const agentStats = agents.filter(agent => agent !== 'All').map(agent => {
    const rows = evaluation.rows.filter(row => row.case.expectedAgent === agent);
    const correct = rows.filter(row => row.routeCorrect).length;
    const avgQuality = rows.length ? Math.round(rows.reduce((sum, row) => sum + row.quality.score, 0) / rows.length) : 0;
    return { agent, cases: rows.length, accuracy: rows.length ? Math.round((correct / rows.length) * 100) : 0, avgQuality };
  });

  const filteredRows = evaluation.rows.filter(row => {
    const matchesAgent = selectedAgent === 'All' || row.case.expectedAgent === selectedAgent;
    const matchesView = view === 'all' || !row.routeCorrect || row.quality.score < 100;
    return matchesAgent && matchesView;
  });

  const failureCount = evaluation.rows.filter(row => !row.routeCorrect || row.quality.score < 100).length;

  return <div className="stack-lg">
    <section className="panel evaluation-intro">
      <div><span className="eyebrow">CURATED TEST SET</span><h2>Measure whether the journey behaves as designed</h2><p>These metrics describe the included {m.cases} labeled portfolio scenarios. They are evaluation-set results, not production business performance.</p></div>
      <div className="evaluation-scope"><strong>{m.cases}</strong><span>labeled cases</span><small>{failureCount} cases need review under the current checks</small></div>
    </section>

    <div className="metric-grid"><MetricCard label="Routing" value={`${m.routingAccuracy}%`} note={`${m.cases} labeled cases`} /><MetricCard label="Grounding" value={`${m.groundingRate}%`} note="evidence attached" /><MetricCard label="Claim safety" value={`${m.claimSafetyRate}%`} note="included test set" /><MetricCard label="CTA completeness" value={`${m.ctaCompleteness}%`} note="next-step coverage" /></div>

    <section className="panel stack-md">
      <div className="section-heading"><div><span className="eyebrow">AGENT DIAGNOSTICS</span><h3>Performance by expected skill</h3><p>Separate routing coverage from structured answer quality so a perfect headline metric does not hide what was actually tested.</p></div><span className="muted-label">Synthetic evaluation scenarios</span></div>
      <div className="agent-stat-grid">{agentStats.map(stat => <button type="button" key={stat.agent} className={`agent-stat-card${selectedAgent === stat.agent ? ' active' : ''}`} onClick={() => setSelectedAgent(selectedAgent === stat.agent ? 'All' : stat.agent)}><strong>{stat.agent}</strong><div><span>Routing</span><b>{stat.accuracy}%</b></div><div><span>Avg quality</span><b>{stat.avgQuality}%</b></div><small>{stat.cases} cases</small></button>)}</div>
    </section>

    <section className="panel stack-md">
      <div className="evaluation-toolbar"><div><span className="eyebrow">CASE EXPLORER</span><h3>Inspect labeled scenarios</h3></div><div className="toolbar-controls"><select value={selectedAgent} onChange={event => setSelectedAgent(event.target.value)}>{agents.map(agent => <option key={agent}>{agent}</option>)}</select><div className="segmented-control"><button type="button" className={view === 'all' ? 'active' : ''} onClick={() => setView('all')}>All cases</button><button type="button" className={view === 'failures' ? 'active' : ''} onClick={() => setView('failures')}>Needs review</button></div></div></div>
      <div className="table-wrap"><table className="evaluation-table"><thead><tr><th>Question</th><th>Expected</th><th>Routed</th><th>Route</th><th>Quality</th><th>Evidence</th></tr></thead><tbody>{filteredRows.map((row, index) => <tr key={`${row.case.question}-${index}`}><td><strong>{row.case.question}</strong><small>{row.case.expectedStage}</small></td><td>{row.case.expectedAgent}</td><td>{row.route.agentId}</td><td><span className={`result-pill ${row.routeCorrect ? 'pass' : 'fail'}`}>{row.routeCorrect ? 'Pass' : 'Review'}</span></td><td>{row.quality.score}%</td><td>{row.answer.evidence.length} source{row.answer.evidence.length === 1 ? '' : 's'}</td></tr>)}</tbody></table></div>
      {!filteredRows.length && <div className="empty-state"><strong>No cases match this view.</strong><p>Try showing all cases or choosing another expected agent.</p></div>}
    </section>
  </div>;
}
