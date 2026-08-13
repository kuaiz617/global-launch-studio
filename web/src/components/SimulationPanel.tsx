import type { SimulationResponse } from '../types';

export function SimulationPanel({ result }: { result?: SimulationResponse }) {
  if (!result) return <p>Run a scenario to inspect routing and response quality.</p>;
  return <div><p><b>{result.route.agentId}</b> · {result.route.stageId} · Quality {result.quality.score}%</p><h3>{result.answer.headline}</h3><p>{result.answer.summary}</p><strong>{result.answer.cta}</strong></div>;
}
