import type { Language } from '../types/index.js';
export function languageOf(text: string): Language {
  return /[\u3400-\u9fff]/.test(text) ? 'zh' : 'en';
}
