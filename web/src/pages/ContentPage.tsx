import { useState } from 'react';
import { SellerSelector } from '../components/SellerSelector';
import { useContentGenerator } from '../hooks/useContentGenerator';
import type { ContentFormat, GeneratedContent, Language, SellerProfile } from '../types';

const formats: Array<{ id: ContentFormat; label: string; note: string }> = [
  { id: 'email', label: 'Seller email', note: 'Concise education + next steps' },
  { id: 'faq', label: 'FAQ', note: 'Reusable seller questions and answers' },
  { id: 'checklist', label: 'Checklist', note: 'Operational readiness sequence' }
];

export function ContentPage({ sellers }: { sellers: SellerProfile[] }) {
  const [sellerId, setSellerId] = useState(sellers[0]?.id ?? '');
  const [format, setFormat] = useState<ContentFormat>('email');
  const [language, setLanguage] = useState<Language>('en');
  const [history, setHistory] = useState<GeneratedContent[]>([]);
  const [selected, setSelected] = useState<GeneratedContent>();
  const content = useContentGenerator();
  const seller = sellers.find(item => item.id === sellerId);
  const visible = selected ?? content.result;

  async function generate() {
    const next = await content.generate(sellerId, format, language);
    if (!next) return;
    setSelected(next);
    setHistory(current => [next, ...current].slice(0, 6));
  }

  return <div className="stack-lg">
    <section className="content-workbench">
      <div className="panel stack-md content-brief-panel">
        <div><span className="eyebrow">CONTENT BRIEF</span><h2>Turn governed messaging into seller education</h2><p>Choose a seller, format, and language. The deterministic portfolio generator reuses seller context and approved messaging rules without requiring a paid model.</p></div>
        <SellerSelector sellers={sellers} value={sellerId} onChange={setSellerId} />
        {seller && <div className="seller-context-card"><div className="row-between"><strong>{seller.name}</strong><span className="status-chip">Readiness {seller.readiness}</span></div><p>{seller.category} · {seller.location}</p><div className="chip-row">{seller.gaps.map(gap => <span className="outline-chip" key={gap}>{gap}</span>)}</div></div>}

        <div><strong>Format</strong><div className="format-grid">{formats.map(item => <button type="button" key={item.id} className={`format-card${format === item.id ? ' active' : ''}`} onClick={() => setFormat(item.id)}><strong>{item.label}</strong><small>{item.note}</small></button>)}</div></div>
        <div><strong>Language</strong><div className="segmented-control"><button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>English</button><button type="button" className={language === 'zh' ? 'active' : ''} onClick={() => setLanguage('zh')}>中文</button></div></div>
        <button type="button" className="run-button" disabled={content.busy || !sellerId} onClick={generate}>{content.busy ? 'Generating asset…' : 'Generate governed asset →'}</button>
        {content.error && <div className="error-box">{content.error}</div>}
      </div>

      <div className="panel stack-md content-output-panel">
        <div className="section-heading"><div><span className="eyebrow">ASSET PREVIEW</span><h2>Seller-facing output</h2></div>{visible && <div className="chip-row"><span className="status-chip">{visible.format}</span><span className="outline-chip">{visible.language === 'zh' ? '中文' : 'English'}</span></div>}</div>
        {visible ? <div className="asset-preview"><div className="asset-preview-header"><small>GLOBAL LAUNCH EDUCATION</small><h3>{visible.title}</h3><p>{visible.seller.name} · {visible.seller.category}</p></div><pre className="content-output">{visible.body}</pre><div className="asset-footer"><span>Generated from synthetic seller context + governed portfolio messaging</span><span>No outcome guarantees</span></div></div> : <div className="empty-state"><strong>No asset generated yet</strong><p>Choose a seller and content format, then generate a seller-education asset.</p></div>}
      </div>
    </section>

    <section className="panel stack-md">
      <div className="section-heading"><div><span className="eyebrow">ASSET HISTORY</span><h3>Recent generated variants</h3><p>Compare formats and languages from this browser session.</p></div><span className="muted-label">{history.length}/6 assets</span></div>
      {history.length ? <div className="asset-history-grid">{history.map((item, index) => <button type="button" className={`asset-history-card${visible === item ? ' active' : ''}`} key={`${item.format}-${item.language}-${index}`} onClick={() => setSelected(item)}><div className="row-between"><span className="status-chip">{item.format}</span><span className="outline-chip">{item.language === 'zh' ? '中文' : 'EN'}</span></div><strong>{item.title}</strong><small>{item.seller.name}</small></button>)}</div> : <div className="empty-state compact-empty"><p>Generated variants will appear here.</p></div>}
    </section>
  </div>;
}
