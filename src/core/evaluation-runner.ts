import { evaluationSet } from '../data/evaluation-set.js';
import { routeQuestion } from './router.js';
import { generateSellerAnswer } from './generator.js';
import { evaluateAnswer } from './evaluator.js';
import type { EvaluationRow, EvaluationSummary } from '../types/index.js';
export async function runEvaluation(){
 const rows:EvaluationRow[]=[];
 for(const testCase of evaluationSet){const route=await routeQuestion(testCase.question);const answer=await generateSellerAnswer({question:testCase.question,sellerId:testCase.sellerId,route});const quality=evaluateAnswer(answer,{expectedAgent:testCase.expectedAgent,expectedStage:testCase.expectedStage});rows.push({case:testCase,route,routeCorrect:route.agentId===testCase.expectedAgent&&route.stageId===testCase.expectedStage,answer,quality});}
 const total=rows.length||1;
 const summary:EvaluationSummary={cases:rows.length,routingAccuracy:Math.round(rows.filter(r=>r.routeCorrect).length/total*100),groundingRate:Math.round(rows.filter(r=>r.quality.checks.hasEvidence).length/total*100),claimSafetyRate:Math.round(rows.filter(r=>r.quality.checks.noProhibitedClaims).length/total*100),ctaCompleteness:Math.round(rows.filter(r=>r.quality.checks.hasCTA).length/total*100),averageQuality:Math.round(rows.reduce((sum,r)=>sum+r.quality.score,0)/total)};
 return {summary,rows};
}
