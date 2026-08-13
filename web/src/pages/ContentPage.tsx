import { useState } from 'react';
import { useContentGenerator } from '../hooks/useContentGenerator';
import type { ContentFormat, Language, SellerProfile } from '../types';

export function ContentPage({ sellers }: { sellers: SellerProfile[] }) {
  const [sellerId, setSellerId] = useState(sellers[0]?.id ?? '');
  const [format, setFormat] = useState<ContentFormat>('email');
  const [language, setLanguage] = useState<Language>('en');
  const content = useContentGenerator();
  return <div className="two-column"><section className="panel"><h2>Content brief</h2><select value={sellerId} onChange={e => setSellerId(e.target.value)}>{sellers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select><select value={format} onChange={e => setFormat(e.target.value as ContentFormat)}><option value="email">Seller email</option><option value="faq">FAQ</option><option value="checklist">Checklist</option></select><select value={language} onChange={e => setLanguage(e.target.value as Language)}><option value="en">English</option><option value="zh">中文</option></select><button type="button" onClick={() => content.generate(sellerId, format, language)}>Generate content</button></section><section className="panel"><h2>Generated asset</h2>{content.result ? <div><h3>{content.result.title}</h3><pre>{content.result.body}</pre></div> : <p>Choose a format and generate a seller-education asset.</p>}</section></div>;
}
