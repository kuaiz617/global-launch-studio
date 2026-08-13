import { runEvaluation } from "../src/core/evaluation-runner.mjs";
const result=await runEvaluation(); console.log(JSON.stringify(result.metrics,null,2)); if(result.metrics.routingAccuracy<90||result.metrics.claimSafetyRate<100) process.exitCode=1;
