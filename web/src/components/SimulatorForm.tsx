import { useState } from 'react';
import { useSimulator } from '../hooks/useSimulator';
import type { SellerProfile } from '../types';
import { SellerSelector } from './SellerSelector';
import { SimulationPanel } from './SimulationPanel';

export function SimulatorForm({ sellers }: { sellers: SellerProfile[] }) {
  const [sellerId, setSellerId] = useState(sellers[0]?.id ?? '');
  const [question, setQuestion] = useState('How should we plan inbound inventory?');
  const simulation = useSimulator();
  const seller = sellers.find(item => item.id === sellerId);

  return (
    <div className="two-column simulator-layout">
      <section className="panel stack-md">
        <div><h2>Seller scenario</h2><p>Change the seller context and question to test agent routing, knowledge retrieval, and response quality.</p></div>
        <SellerSelector sellers={sellers} value={sellerId} onChange={setSellerId} />
        {seller && <div className="seller-context-card"><div className="row-between"><strong>{seller.category}</strong><span className="status-chip">Readiness {seller.readiness}</span></div><p>{seller.location} · {seller.currentMarkets.join(', ')} → {seller.targetMarkets.join(', ')}</p><div className="chip-row">{seller.gaps.map(gap => <span className="outline-chip" key={gap}>{gap}</span>)}</div></div>}
        <label htmlFor="seller-question"><strong>Seller question</strong></label>
        <textarea id="seller-question" rows={7} value={question} onChange={event => setQuestion(event.target.value)} />
        <button type="button" disabled={simulation.busy || !sellerId || !question.trim()} onClick={() => simulation.run(sellerId, question)}>{simulation.busy ? 'Running agent journey…' : 'Run agent journey'}</button>
        {simulation.error && <div className="error-box">{simulation.error}</div>}
      </section>
      <section className="panel"><h2>Agent result</h2><SimulationPanel result={simulation.result} /></section>
    </div>
  );
}
