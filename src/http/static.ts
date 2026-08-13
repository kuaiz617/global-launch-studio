import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { IncomingMessage, ServerResponse } from 'node:http';

const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public');
const mime: Record<string, string> = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml' };

export async function serveStatic(_req: IncomingMessage, res: ServerResponse, url: URL): Promise<void> {
  const requested = url.pathname === '/' ? '/index.html' : url.pathname;
  const candidate = path.resolve(publicDir, `.${decodeURIComponent(requested)}`);
  if (!candidate.startsWith(publicDir + path.sep) && candidate !== publicDir) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  try {
    const info = await stat(candidate);
    if (!info.isFile()) throw new Error('Not a file');
    const body = await readFile(candidate);
    res.writeHead(200, { 'Content-Type':mime[path.extname(candidate)] || 'application/octet-stream', 'Content-Length':body.length });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type':'text/plain; charset=utf-8' });
    res.end('Not found');
  }
}
