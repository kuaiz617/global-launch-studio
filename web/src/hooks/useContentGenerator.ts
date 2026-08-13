import { useState } from 'react';
import { postJSON } from '../lib/api';
import type { ContentFormat, GeneratedContent, Language } from '../types';

export function useContentGenerator() {
  const [result, setResult] = useState<GeneratedContent>();
  async function generate(sellerId: string, format: ContentFormat, language: Language) {
    setResult(await postJSON<GeneratedContent>('/api/content', { sellerId, format, language }));
  }
  return { result, generate };
}
