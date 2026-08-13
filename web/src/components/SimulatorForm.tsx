import { useState } from 'react';
import { useSimulator } from '../hooks/useSimulator';
import type { SellerProfile } from '../types';
import { SellerSelector } from './SellerSelector';
import { SimulationPanel } from './SimulationPanel';

export function SimulatorForm({ sellers }: { sellers: SellerProfile[] }) {
  const [sellerId, setSellerId] = useState(sellers[0]?.id ?? '');
  const [question, setQuestion] = useState('How should we plan inbound inventory?');
  const simulation = useSimulator();
  return <div className="two-column"><section className="panel"><SellerSelector sellers={sellers} value={sellerId} onChange={setSellerId} /><textarea rows={6} value={question} onChange={event => setQuestion(event.target.value)} /><button type="button" onClick={() => simulation.run(sellerId, question)}>Run agent journey</button></section><section className="panel"><SimulationPanel result={simulation.result} /></section></div>;
}
