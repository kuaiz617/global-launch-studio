import { useState } from 'react';
import { useContentGenerator } from '../hooks/useContentGenerator';
import type { ContentFormat, Language, SellerProfile } from '../types';
import { SellerSelector } from '../components/SellerSelector';

export function ContentPage({ sellers }: { sellers: SellerProfile[] }) {
  const [sellerId, setSellerId] = useState(sellers[0]?.id ?? '');
  const [format, setFormat] = useState<ContentFormat>('email');
  const [language, setLanguage] = useState<Language>('en');
  const content = useContentGenerator();
  const seller = sellers.find(item => item.id === sellerId);

  return (
    <div className="two-column">
      <section className="panel stack-md">
        <div><h2>Content brief</h2><p>Generate seller-facing education from the same governed messaging and seller context used by the agent journey.</p></div>
        <SellerSelector sellers={sellers} value={sellerId} onChange={setSellerId} />
        {seller && <div className="seller-context-card"><strong>{seller.category}</strong><p>{seller.currentMarkets.join(', ')} → {seller.targetMarkets.join(', ')}</p></div>}
        <label><strong>Format</strong><select value={format} onChange={event => setFormat(event.target.value as ContentFormat)}><option value="email">Seller email</option><option value="faq">FAQ</option><option value="checklist">Checklist</option></select></label>
        <label><strong>Language</strong><select value={language} onChange={event => setLanguage(event.target.value as Language)}><option value="en">English</option><option value="zh">中文</option></select></label>
        <button type="button" disabled={content.busy || !sellerId} onClick={() => content.generate(sellerId, format, language)}>{content.busy ? 'Generating…' : 'Generate grounded asset'}</button>
        {content.error && <div className="error-box">{content.error}</div>}
      </section>
      <section className="panel stack-md">
        <h2>Generated asset</h2>
        {content.result ? <div><div className="chip-row"><span className="status-chip">{content.result.format}</span><span className="outline-chip">{content.result.language === 'zh' ? '中文' : 'English'}</span></div><h3>{content.result.title}</h3><pre className="content-output">{content.result.body}</pre></div> : <p>Choose a format and generate a grounded seller-education asset.</p>}
      </section>
    </div>
  );
}
