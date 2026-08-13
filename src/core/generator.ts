import { stageMap } from '../data/stages.js';
import { getSeller } from '../data/sellers.js';
import { getSkill } from './skills.js';
import { retrieve } from './retrieval.js';
import { languageOf } from './language.js';
import { readinessNotes } from './readiness.js';
import { generateStructuredSellerAnswer, openAIEnabled } from '../providers/openai.js';
import { localAnswer } from './local-generator.js';
import type { EvidenceItem, RouteDecision, SellerAnswer } from '../types/index.js';
export async function generateSellerAnswer(input:{question:string;sellerId?:string;route:RouteDecision}):Promise<SellerAnswer>{
 const seller=getSeller(input.sellerId); const skill=await getSkill(input.route.agentId); const stage=stageMap[input.route.stageId]; const language=languageOf(input.question); const readiness=readinessNotes(seller);
 const docs=await retrieve(`${input.question} ${skill.objective} ${seller.category}`,3);
 const evidence:EvidenceItem[]=docs.map(doc=>({source:doc.file,excerpt:doc.content.replace(/^#.*$/m,'').trim().slice(0,420),score:Number(doc.score.toFixed(3)),retrievalMode:doc.retrievalMode}));
 let core=localAnswer(skill,stage,language,evidence.length);
 if((process.env.LLM_MODE||'deterministic').toLowerCase()==='openai'&&openAIEnabled()){
   try{core=await generateStructuredSellerAnswer({question:input.question,seller,skill,stage,evidence,readiness,language});}
   catch(error){core={...core,providerFallback:error instanceof Error?error.message:String(error)};}
 }
 const sellerContext=language==='zh'?`${seller.location}｜${seller.category}｜准备度：${readiness.score}/100`:`${seller.location} | ${seller.category} | Readiness: ${readiness.score}/100`;
 return {...core,sellerContext,evidence};
}
