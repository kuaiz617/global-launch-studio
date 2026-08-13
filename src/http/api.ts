import type { IncomingMessage, ServerResponse } from 'node:http';
import { readJson } from './body.js';
import { sendJson } from './response.js';
import { bootstrap } from '../core/bootstrap.js';
import { routeQuestion } from '../core/router.js';
import { generateSellerAnswer } from '../core/generator.js';
import { evaluateAnswer } from '../core/evaluator.js';
import { generateContent } from '../core/content.js';
import { runEvaluation } from '../core/evaluation-runner.js';
import { listAudit, recordAudit } from '../core/audit.js';
import { retrieve } from '../core/retrieval.js';
import type { ContentFormat, Language } from '../types/index.js';

interface SimulateBody extends Record<string, unknown> { question?: string; sellerId?: string }
interface RetrieveBody extends Record<string, unknown> { query?: string; limit?: number }
interface ContentBody extends Record<string, unknown> { format?: ContentFormat; sellerId?: string; language?: Language }

export async function handleApi(req: IncomingMessage, res: ServerResponse, url: URL): Promise<boolean> {
  try {
    if (req.method === 'GET' && url.pathname === '/api/health') return sendJson(res, 200, { ok:true, service:'global-launch-studio', version:'2.1', runtime:'typescript' });
    if (req.method === 'GET' && url.pathname === '/api/bootstrap') return sendJson(res, 200, await bootstrap());
    if (req.method === 'GET' && url.pathname === '/api/evaluation') return sendJson(res, 200, await runEvaluation());
    if (req.method === 'GET' && url.pathname === '/api/audit') return sendJson(res, 200, { events:listAudit() });
    if (req.method === 'POST' && url.pathname === '/api/retrieve') {
      const body = await readJson<RetrieveBody>(req);
      return sendJson(res, 200, { results:await retrieve(body.query || '', body.limit || 3) });
    }
    if (req.method === 'POST' && url.pathname === '/api/simulate') {
      const body = await readJson<SimulateBody>(req);
      if (!body.question) return sendJson(res, 400, { error:'A question is required.' });
      const route = await routeQuestion(body.question);
      const answer = await generateSellerAnswer({ question:body.question, sellerId:body.sellerId, route });
      const quality = evaluateAnswer(answer);
      recordAudit('simulation', { sellerId:body.sellerId, agentId:route.agentId, stageId:route.stageId, quality:quality.score });
      return sendJson(res, 200, { ...body, route, answer, quality });
    }
    if (req.method === 'POST' && url.pathname === '/api/content') {
      const body = await readJson<ContentBody>(req);
      const result = generateContent(body);
      recordAudit('content-generation', { sellerId:body.sellerId, format:body.format || 'email' });
      return sendJson(res, 200, result);
    }
    return false;
  } catch (error) {
    return sendJson(res, 500, { error:error instanceof Error ? error.message : 'Unexpected server error.' });
  }
}
