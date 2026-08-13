import type { MessagingAsset } from '../types';

export function MessagingPage({ messaging }: { messaging: MessagingAsset[] }) {
  return <div className="card-grid">{messaging.map(item => <div className="panel" key={item.id}><span className="status-chip">{item.category}</span><h2>{item.title}</h2><p>{item.en}</p><p>{item.zh}</p><small>{item.evidence}</small></div>)}</div>;
}
