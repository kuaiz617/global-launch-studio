import { useEffect, useState } from 'react';
import { useSimulator } from '../hooks/useSimulator';
import type { SellerProfile, SimulationResponse, SimulatorPreset } from '../types';
import { SellerSelector } from './SellerSelector';
import { SimulationPanel } from './SimulationPanel';

const quickQuestions = [
  'What compliance requirements should I verify before launching in Germany?',
  'How should we plan inbound inventory for a new market?',
  'What should our onboarding checklist include before launch?'
];

interface HistoryEntry {
  id: number;
  time: string;
  result: SimulationResponse;
}

export function SimulatorForm({ sellers, preset }: { sellers: SellerProfile[]; preset?: SimulatorPreset }) {
  const [sellerId, setSellerId] = useState(preset?.sellerId ?? sellers[0]?.id ?? '');
  const [question, setQuestion] = useState(preset?.question ?? 'How should we plan inbound inventory?');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [selectedResult, setSelectedResult] = useState<SimulationResponse>();
  const simulation = useSimulator();
  const seller = sellers.find(item => item.id === sellerId);

  useEffect(() => {
    if (!preset) return;
    setSellerId(preset.sellerId);
    setQuestion(preset.question);
  }, [preset]);

  async function runScenario() {
    const result = await simulation.run(sellerId, question);
    if (!result) return;
    setSelectedResult(result);
    setHistory(current => [{ id: Date.now(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), result }, ...current].slice(0, 5));
  }

  const visibleResult = selectedResult ?? simulation.result;

  return (
    <div className="stack-lg">
      <section className="simulator-workbench">
        <div className="panel stack-md simulator-controls">
          <div><span className="eyebrow">SCENARIO INPUT</span><h2>Test a seller moment</h2><p>Change seller context and ask a realistic question. The system will expose each step of the agent journey.</p></div>
          <SellerSelector sellers={sellers} value={sellerId} onChange={setSellerId} />
          {seller && <div className="seller-context-card"><div className="row-between"><strong>{seller.category}</strong><span className="status-chip">Readiness {seller.readiness}</span></div><p>{seller.location} · {seller.currentMarkets.join(', ')} → {seller.targetMarkets.join(', ')}</p><div className="chip-row">{seller.gaps.map(gap => <span className="outline-chip" key={gap}>{gap}</span>)}</div></div>}
          <label htmlFor="seller-question"><strong>Seller question</strong></label>
          <textarea id="seller-question" rows={6} value={question} onChange={event => setQuestion(event.target.value)} />
          <div className="quick-question-block"><span className="muted-label">Quick prompts</span><div className="chip-row">{quickQuestions.map(item => <button type="button" className="prompt-chip" key={item} onClick={() => setQuestion(item)}>{item}</button>)}</div></div>
          <button type="button" className="run-button" disabled={simulation.busy || !sellerId || !question.trim()} onClick={runScenario}>{simulation.busy ? 'Running agent journey…' : 'Run agent journey →'}</button>
          {simulation.error && <div className="error-box">{simulation.error}</div>}
        </div>

        <div className="panel simulator-output"><div className="section-heading"><div><span className="eyebrow">TRACE & RESULT</span><h2>Agent journey</h2></div>{visibleResult && <span className="status-chip">Quality {visibleResult.quality.score}%</span>}</div><SimulationPanel result={visibleResult} /></div>
      </section>

      <section className="panel stack-md">
        <div className="section-heading"><div><span className="eyebrow">RUN HISTORY</span><h3>Compare recent tests</h3><p>This browser session keeps the five most recent runs so you can inspect different routes without losing context.</p></div><span className="muted-label">{history.length}/5 runs</span></div>
        {history.length ? <div className="history-grid">{history.map(entry => {
          const itemSeller = sellers.find(item => item.id === entry.result.sellerId);
          const active = visibleResult === entry.result;
          return <button type="button" className={`history-card${active ? ' active' : ''}`} key={entry.id} onClick={() => setSelectedResult(entry.result)}>
            <div className="row-between"><span className="status-chip">{entry.result.route.agentId}</span><span className="muted-label">{entry.time}</span></div>
            <strong>{itemSeller?.name ?? entry.result.sellerId}</strong>
            <p>{entry.result.question}</p>
            <div className="skill-meta"><span>{entry.result.route.stageId}</span><span>Quality {entry.result.quality.score}%</span><span>{entry.result.answer.evidence.length} sources</span></div>
          </button>;
        })}</div> : <div className="empty-state"><strong>No runs yet</strong><p>Run a seller scenario above. Your recent tests will appear here for side-by-side exploration.</p></div>}
      </section>
    </div>
  );
}
