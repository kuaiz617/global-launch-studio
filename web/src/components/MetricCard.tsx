type Props = { label: string; value: string | number; note: string };

export function MetricCard({ label, value, note }: Props) {
  return <div className="metric-card"><span className="metric-label">{label}</span><strong>{value}</strong><span className="metric-note">{note}</span></div>;
}
