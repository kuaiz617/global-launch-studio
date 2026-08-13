import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bootstrap, generateContent, simulate } from "./src/engine.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "public");
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png"
};

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new Error("Request body must be valid JSON.");
  }
}

async function serveStatic(req, res) {
  const rawPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  const requestPath = rawPath === "/" ? "/index.html" : rawPath;
  const filePath = path.normalize(path.join(publicDir, requestPath));
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  try {
    const details = await stat(filePath);
    if (!details.isFile()) throw new Error("Not a file");
    const data = await readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    res.end(data);
  } catch {
    const index = await readFile(path.join(publicDir, "index.html"));
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(index);
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (req.method === "GET" && url.pathname === "/api/health") {
      return sendJson(res, 200, { ok: true, service: "global-launch-studio", mode: "zero-dependency" });
    }
    if (req.method === "GET" && url.pathname === "/api/bootstrap") {
      return sendJson(res, 200, bootstrap());
    }
    if (req.method === "POST" && url.pathname === "/api/simulate") {
      const body = await readBody(req);
      if (!body.question || typeof body.question !== "string") {
        return sendJson(res, 400, { error: "A question is required." });
      }
      return sendJson(res, 200, simulate(body));
    }
    if (req.method === "POST" && url.pathname === "/api/content") {
      const body = await readBody(req);
      return sendJson(res, 200, generateContent(body));
    }
    return serveStatic(req, res);
  } catch (error) {
    return sendJson(res, 500, { error: error.message || "Unexpected server error." });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`GlobalLaunch Studio running at http://127.0.0.1:${port}`);
});
