import { MetricCard } from '../components/MetricCard';
import type { BootstrapData, EvaluationResponse } from '../types';

export function DashboardPage({ data, evaluation }: { data: BootstrapData; evaluation?: EvaluationResponse }) {
  const metrics = evaluation?.summary;
  return <div className="stack-lg">
    <div className="metric-grid">
      <MetricCard label="Agent skills" value={data.agents.length} note="structured packages" />
      <MetricCard label="Journey stages" value={data.stages.length} note="end-to-end path" />
      <MetricCard label="Evaluation cases" value={metrics?.cases ?? '—'} note="labeled scenarios" />
      <MetricCard label="Routing accuracy" value={metrics ? `${metrics.routingAccuracy}%` : '—'} note="test set" />
    </div>
    <section className="panel"><h2>Reference architecture</h2><p>Seller question → skill router → knowledge retrieval → agent response → quality evaluation.</p></section>
    <div className="two-column">
      <section className="panel"><h3>Seller personas</h3>{data.sellers.map(seller => <div className="seller-row" key={seller.id}><span><strong>{seller.name}</strong><small>{seller.location} · {seller.category}</small></span><b>{seller.readiness}</b></div>)}</section>
      <section className="panel"><h3>Quality signals</h3><div className="quality-list"><div><span>Grounding</span><b>{metrics?.groundingRate ?? '—'}%</b></div><div><span>Claim safety</span><b>{metrics?.claimSafetyRate ?? '—'}%</b></div><div><span>CTA completeness</span><b>{metrics?.ctaCompleteness ?? '—'}%</b></div></div></section>
    </div>
  </div>;
}
