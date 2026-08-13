import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleApi } from "./src/http/api.mjs";
import { createStaticHandler } from "./src/http/static.mjs";
import { sendJson } from "./src/http/response.mjs";
const root=path.dirname(fileURLToPath(import.meta.url)); const serveStatic=createStaticHandler(path.join(root,'public')); const port=Number(process.env.PORT||4173);
const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,`http://${req.headers.host}`);if(url.pathname.startsWith('/api/')){const handled=await handleApi(req,res,url);if(handled!==false)return;return sendJson(res,404,{error:'API route not found.'});}return serveStatic(req,res);}catch(error){return sendJson(res,500,{error:error.message||'Unexpected server error.'});}});
server.listen(port,'127.0.0.1',()=>console.log(`GlobalLaunch Studio v2 running at http://127.0.0.1:${port}`));
