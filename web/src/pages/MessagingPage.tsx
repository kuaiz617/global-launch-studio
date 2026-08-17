import type { MessagingAsset } from '../types';

export function MessagingPage({ messaging }: { messaging: MessagingAsset[] }) {
  return (
    <div className="card-grid">
      {messaging.map(item => (
        <section className="panel message-card" key={item.id}>
          <div className="row-between"><span className="status-chip">{item.category}</span><span className="muted-label">{item.id}</span></div>
          <h2>{item.title}</h2>
          <div className="language-block"><strong>English</strong><p>{item.en}</p></div>
          <div className="language-block"><strong>中文</strong><p>{item.zh}</p></div>
          <div className="evidence-box"><strong>Evidence / grounding note</strong><p>{item.evidence}</p></div>
          <div className="guardrail"><strong>Prohibited claims</strong>{item.prohibited.length ? <ul>{item.prohibited.map(claim => <li key={claim}>{claim}</li>)}</ul> : <p>No additional prohibited claims configured.</p>}</div>
        </section>
      ))}
    </div>
  );
}
