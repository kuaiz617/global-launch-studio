import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleApi } from '../src/http/api.js';

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const host = req.headers.host || 'localhost';
  const protocol = String(req.headers['x-forwarded-proto'] || 'https');
  const url = new URL(req.url || '/api/health', `${protocol}://${host}`);
  const handled = await handleApi(req, res, url);

  if (!handled && !res.writableEnded) {
    res.statusCode = 404;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'API route not found.' }));
  }
}
