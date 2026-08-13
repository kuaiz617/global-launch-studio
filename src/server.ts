import { createServer } from 'node:http';
import { handleApi } from './http/api.js';
import { serveStatic } from './http/static.js';

const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '127.0.0.1';

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || `${host}:${port}`}`);
  const handled = url.pathname.startsWith('/api/') ? await handleApi(req, res, url) : false;
  if (!handled) await serveStatic(req, res, url);
});

server.listen(port, host, () => {
  console.log(`GlobalLaunch Studio running at http://${host}:${port}`);
});
