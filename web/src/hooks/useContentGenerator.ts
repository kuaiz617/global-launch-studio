import { useState } from 'react';
import { postJSON } from '../lib/api';
import type { ContentFormat, GeneratedContent, Language } from '../types';

export function useContentGenerator() {
  const [result, setResult] = useState<GeneratedContent>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function generate(sellerId: string, format: ContentFormat, language: Language) {
    setBusy(true);
    setError('');
    try {
      setResult(await postJSON<GeneratedContent>('/api/content', { sellerId, format, language }));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return { result, busy, error, generate };
}
