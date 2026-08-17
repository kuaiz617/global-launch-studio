import { useState } from 'react';
import { postJSON } from '../lib/api';
import type { SimulationResponse } from '../types';

export function useSimulator() {
  const [result, setResult] = useState<SimulationResponse>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function run(sellerId: string, question: string) {
    setBusy(true);
    setError('');
    try {
      setResult(await postJSON<SimulationResponse>('/api/simulate', { sellerId, question }));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return { result, busy, error, run };
}
