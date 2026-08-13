import type { ServerResponse } from 'node:http';
export function sendJson(res: ServerResponse, status: number, payload: unknown): true {
  const body = JSON.stringify(payload);
  res.writeHead(status, { 'Content-Type':'application/json; charset=utf-8', 'Content-Length':Buffer.byteLength(body), 'Cache-Control':'no-store' });
  res.end(body);
  return true;
}
