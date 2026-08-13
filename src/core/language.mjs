export function languageOf(text=""){ return /[\u3400-\u9fff]/.test(text) ? "zh" : "en"; }
