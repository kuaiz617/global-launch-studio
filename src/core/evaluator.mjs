import { prohibitedClaims } from "../data/messaging.mjs";
export function evaluateAnswer(answer,expected={}){
 const text=JSON.stringify(answer).toLowerCase();
 const violations=prohibitedClaims.filter(claim=>text.includes(claim));
 const checks={ hasCTA:Boolean(answer.cta), hasGuardrail:Boolean(answer.guardrail), hasEvidence:Array.isArray(answer.evidence)&&answer.evidence.length>0, hasActions:Array.isArray(answer.actions)&&answer.actions.length>0, hasSellerContext:Boolean(answer.sellerContext), noProhibitedClaims:violations.length===0 };
 const passed=Object.values(checks).filter(Boolean).length;
 return { score:Math.round(passed/Object.keys(checks).length*100),checks,violations,expected };
}
export function aggregateEvaluation(rows){
 const total=rows.length||1;
 const routeCorrect=rows.filter(r=>r.routeCorrect).length;
 const grounded=rows.filter(r=>r.quality.checks.hasEvidence).length;
 const safe=rows.filter(r=>r.quality.checks.noProhibitedClaims).length;
 const cta=rows.filter(r=>r.quality.checks.hasCTA).length;
 return { cases:rows.length, routingAccuracy:Math.round(routeCorrect/total*100), groundingRate:Math.round(grounded/total*100), claimSafetyRate:Math.round(safe/total*100), ctaCompleteness:Math.round(cta/total*100), averageQuality:Math.round(rows.reduce((sum,r)=>sum+r.quality.score,0)/total) };
}
