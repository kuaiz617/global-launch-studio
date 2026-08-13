import { getSeller } from '../data/sellers.js';
import type { ContentFormat, GeneratedContent, Language } from '../types/index.js';
export function generateContent(input:{format?:ContentFormat;sellerId?:string;language?:Language}):GeneratedContent {
 const format=input.format||'email'; const language=input.language||'en'; const seller=getSeller(input.sellerId); const market=seller.targetMarkets[0]||'priority market';
 const title=language==='zh'?`${market} 卖家教育内容`:`${market} seller education`;
 const body=format==='checklist'?(language==='zh'?'1. 确认目标市场\n2. 检查商品与库存\n3. 整理合规问题\n4. 确认负责人':'1. Confirm target market\n2. Review product and inventory\n3. Organize compliance questions\n4. Confirm owners'):(language==='zh'?'先完成准备度评估，再进入下一阶段。该内容仅用于教育优先级。':'Complete a readiness assessment before the next stage. This content supports education prioritization only.');
 return {format,seller,language,title,body};
}
