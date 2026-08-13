import { useState } from 'react';
import { postJSON } from '../lib/api';
import type { SimulationResponse } from '../types';

export function useSimulator() {
  const [result, setResult] = useState<SimulationResponse>();
  const [busy, setBusy] = useState(false);
  async function run(sellerId: string, question: string) {
    setBusy(true);
    try { setResult(await postJSON<SimulationResponse>('/api/simulate', { sellerId, question })); }
    finally { setBusy(false); }
  }
  return { result, busy, run };
}
