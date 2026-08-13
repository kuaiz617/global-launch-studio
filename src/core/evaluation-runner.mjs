import { evaluationSet } from "../data/evaluation-set.mjs";
import { routeQuestion } from "./router.mjs";
import { generateSellerAnswer } from "./generator.mjs";
import { evaluateAnswer, aggregateEvaluation } from "./evaluator.mjs";
export async function runEvaluation(){
 const rows=[]; for(const item of evaluationSet){ const route=await routeQuestion(item.question); const answer=await generateSellerAnswer({...item,route}); const quality=evaluateAnswer(answer,item); rows.push({...item,route,answer,quality,routeCorrect:route.agentId===item.expectedAgent && route.stageId===item.expectedStage}); }
 return { metrics:aggregateEvaluation(rows), rows };
}
