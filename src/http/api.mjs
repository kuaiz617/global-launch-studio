import { readJson } from "./body.mjs";
import { sendJson } from "./response.mjs";
import { bootstrap } from "../core/bootstrap.mjs";
import { routeQuestion } from "../core/router.mjs";
import { generateSellerAnswer } from "../core/generator.mjs";
import { evaluateAnswer } from "../core/evaluator.mjs";
import { generateContent } from "../core/content.mjs";
import { runEvaluation } from "../core/evaluation-runner.mjs";
import { listAudit, recordAudit } from "../core/audit.mjs";
import { retrieve } from "../core/retrieval.mjs";
export async function handleApi(req,res,url){
 if(req.method==='GET'&&url.pathname==='/api/health') return sendJson(res,200,{ok:true,service:'global-launch-studio',version:'2.0',mode:'zero-dependency'});
 if(req.method==='GET'&&url.pathname==='/api/bootstrap') return sendJson(res,200,await bootstrap());
 if(req.method==='GET'&&url.pathname==='/api/evaluation') return sendJson(res,200,await runEvaluation());
 if(req.method==='GET'&&url.pathname==='/api/audit') return sendJson(res,200,{events:listAudit()});
 if(req.method==='POST'&&url.pathname==='/api/retrieve'){const body=await readJson(req);return sendJson(res,200,{results:await retrieve(body.query||'',body.limit||3)});}
 if(req.method==='POST'&&url.pathname==='/api/simulate'){const body=await readJson(req);if(!body.question) return sendJson(res,400,{error:'A question is required.'});const route=await routeQuestion(body.question);const answer=await generateSellerAnswer({...body,route});const quality=evaluateAnswer(answer);recordAudit('simulation',{sellerId:body.sellerId,agentId:route.agentId,stageId:route.stageId,quality:quality.score});return sendJson(res,200,{...body,route,answer,quality});}
 if(req.method==='POST'&&url.pathname==='/api/content'){const body=await readJson(req);const result=generateContent(body);recordAudit('content-generation',{sellerId:body.sellerId,format:body.format||'email'});return sendJson(res,200,result);}
 return false;
}
