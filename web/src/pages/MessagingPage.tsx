import { useMemo, useState } from 'react';
import type { MessagingAsset } from '../types';

export function MessagingPage({ messaging }: { messaging: MessagingAsset[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedId, setSelectedId] = useState(messaging[0]?.id ?? '');
  const categories = ['All', ...new Set(messaging.map(item => item.category))];
  const filtered = useMemo(() => messaging.filter(item => {
    const matchesCategory = category === 'All' || item.category === category;
    const haystack = `${item.title} ${item.en} ${item.zh} ${item.evidence}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }), [messaging, query, category]);
  const selected = messaging.find(item => item.id === selectedId) ?? filtered[0] ?? messaging[0];

  if (!selected) return <div className="panel">No messaging assets configured.</div>;

  return <div className="messaging-workbench">
    <aside className="panel messaging-browser">
      <div><span className="eyebrow">GOVERNED LIBRARY</span><h2>{messaging.length} messaging assets</h2><p>Search the bilingual source of truth used to keep agent language consistent and claim-safe.</p></div>
      <input className="search-input" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search messaging…" />
      <div className="chip-row category-filter">{categories.map(item => <button type="button" className={`filter-chip${category === item ? ' active' : ''}`} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="message-list">
        {filtered.map(item => <button type="button" className={`message-list-item${selected.id === item.id ? ' active' : ''}`} key={item.id} onClick={() => setSelectedId(item.id)}>
          <div className="row-between"><span className="status-chip">{item.category}</span><span className="muted-label">{item.id}</span></div>
          <strong>{item.title}</strong>
          <small>{item.en}</small>
        </button>)}
        {!filtered.length && <div className="empty-state compact-empty"><p>No messaging assets match this filter.</p></div>}
      </div>
    </aside>

    <section className="panel messaging-inspector stack-md">
      <div className="section-heading"><div><div className="chip-row"><span className="status-chip">{selected.category}</span><span className="outline-chip">{selected.id}</span></div><h2>{selected.title}</h2><p>One governed message, two languages, explicit evidence notes, and a prohibited-claims boundary.</p></div><span className="governance-badge">Governed copy</span></div>

      <div className="two-column messaging-language-grid">
        <article className="language-editor-card"><div className="row-between"><strong>English</strong><span className="muted-label">Seller-facing copy</span></div><p>{selected.en}</p></article>
        <article className="language-editor-card"><div className="row-between"><strong>中文</strong><span className="muted-label">卖家教育文案</span></div><p>{selected.zh}</p></article>
      </div>

      <div className="evidence-box messaging-grounding"><div className="row-between"><strong>Evidence / grounding note</strong><span className="outline-chip">Review required</span></div><p>{selected.evidence}</p></div>

      <div className="two-column nested-grid">
        <div className="panel-inset"><span className="eyebrow">CLAIM BOUNDARY</span><h3>Prohibited wording</h3>{selected.prohibited.length ? <ul className="guardrail-list compact">{selected.prohibited.map(claim => <li key={claim}>{claim}</li>)}</ul> : <p>No additional prohibited claims configured.</p>}</div>
        <div className="panel-inset"><span className="eyebrow">GOVERNANCE MODEL</span><h3>How this asset is used</h3><ol className="numbered-flow"><li><span>1</span><div><strong>Define approved value proposition</strong><p>Keep English and Chinese meaning aligned.</p></div></li><li><span>2</span><div><strong>Attach grounding notes</strong><p>Make assumptions and evidence boundaries explicit.</p></div></li><li><span>3</span><div><strong>Feed agent and content workflows</strong><p>Reuse governed language instead of rewriting claims ad hoc.</p></div></li></ol></div>
      </div>
    </section>
  </div>;
}
