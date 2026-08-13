import { stageMap } from "../data/stages.mjs";
import { getSeller } from "../data/sellers.mjs";
import { getSkill } from "./skills.mjs";
import { retrieve } from "./retrieval.mjs";
import { languageOf } from "./language.mjs";
import { readinessNotes } from "./readiness.mjs";
import { generateStructuredSellerAnswer, openAIEnabled } from '../providers/openai.mjs';
function snippet(doc){ return doc.content.replace(/^#.*$/m,'').trim().split(/\n\n/)[0].slice(0,420); }
function deterministic({seller,skill,stage,language,evidence,readiness}){
 const guardrail=skill.guardrails[0];
 const actionsByStage={ awareness:['Choose one priority market','Complete a readiness assessment','Compare opportunity with operating complexity'], consideration:['Validate seller inputs','Close the highest-impact readiness gap','Assign the next education module'], readiness:['Verify market-specific requirements','Create an operational checklist','Escalate unresolved high-risk questions'], onboarding:['Assign owners','Sequence dependencies','Resolve blockers before launch'], activation:['Separate completed and blocked work','Close one critical blocker','Review the next expansion step only after launch readiness'] };
 if(language==='zh') return { headline:`${skill.name} · ${stage.zhName}阶段`, summary:`根据 ${seller.name} 的卖家画像，这个问题应由 ${skill.name} 处理。系统检索到 ${evidence.length} 条相关产品教育知识，并将回答限制在已批准的信息边界内。`, actions:actionsByStage[stage.id].map(x=>({text:x,status:'recommended'})), guardrail:`边界说明：${guardrail}。准备度分数仅用于模拟教育优先级，不代表项目资格。`, cta:'下一步：确认一个优先市场，并完成与当前阶段匹配的教育模块。', provider:'deterministic' };
 return { headline:`${skill.name} · ${stage.name} stage`, summary:`For ${seller.name}, this question routes to the ${skill.name}. The system retrieved ${evidence.length} relevant knowledge sources and keeps the response within approved product-marketing boundaries.`, actions:actionsByStage[stage.id].map(text=>({text,status:'recommended'})), guardrail:`Boundary: ${guardrail}. The readiness score is a simulation for education prioritization, not an eligibility decision.`, cta:'Next step: confirm one priority market and complete the education module for this stage.', provider:'deterministic' };
}
export async function generateSellerAnswer({question,sellerId,route}){
 const seller=getSeller(sellerId); const skill=await getSkill(route.agentId); const stage=stageMap[route.stageId]; const language=languageOf(question); const readiness=readinessNotes(seller);
 const retrieved=await retrieve(`${question} ${skill.objective} ${seller.category}`,3);
 const evidence=retrieved.map(doc=>({source:doc.file,excerpt:snippet(doc),score:Number(doc.score.toFixed(3)),retrievalMode:doc.retrievalMode||'lexical'}));
 let generated;
 const llmMode=(process.env.LLM_MODE||'deterministic').toLowerCase();
 if(llmMode==='openai' && openAIEnabled()){
   try{ generated=await generateStructuredSellerAnswer({question,seller,skill,stage,evidence,readiness,language}); }
   catch(error){ generated={...deterministic({seller,skill,stage,language,evidence,readiness}),providerFallback:error.message}; }
 }else generated=deterministic({seller,skill,stage,language,evidence,readiness});
 return { ...generated, sellerContext: language==='zh' ? `${seller.location}｜${seller.category}｜当前市场：${seller.currentMarkets.join('、')}｜目标市场：${seller.targetMarkets.join('、')}｜准备度：${readiness.score}/100` : `${seller.location} | ${seller.category} | Current: ${seller.currentMarkets.join(', ')} | Target: ${seller.targetMarkets.join(', ')} | Readiness: ${readiness.score}/100`, evidence };
}
