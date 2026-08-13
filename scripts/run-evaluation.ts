import { runEvaluation } from '../src/core/evaluation-runner.js';
const result = await runEvaluation();
console.log(JSON.stringify(result.summary, null, 2));
if (result.summary.routingAccuracy < 100) process.exitCode = 1;
