import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createEmbedding, openAIEnabled } from '../providers/openai.mjs';
const knowledgeDir=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../../knowledge");
let docs;
const embeddingCache = new Map();
function tokens(text){ return [...new Set((text.toLowerCase().match(/[a-z0-9]+|[\u3400-\u9fff]/g)||[]).filter(t=>t.length>1 || /[\u3400-\u9fff]/.test(t)))]; }
function cosine(a,b){ let dot=0,aa=0,bb=0; const n=Math.min(a.length,b.length); for(let i=0;i<n;i++){dot+=a[i]*b[i];aa+=a[i]*a[i];bb+=b[i]*b[i];} return dot/(Math.sqrt(aa)*Math.sqrt(bb)||1); }
export async function loadKnowledge(){
 if(docs) return docs;
 const files=(await readdir(knowledgeDir)).filter(f=>f.endsWith('.md'));
 docs=[]; for(const file of files){ const content=await readFile(path.join(knowledgeDir,file),'utf8'); docs.push({id:file.replace('.md',''),file,content,tokens:tokens(content)}); }
 return docs;
}
async function lexicalRetrieve(query,limit){
 const q=tokens(query); const all=await loadKnowledge();
 return all.map(doc=>{ const overlap=q.filter(t=>doc.tokens.includes(t)); return {...doc,score:overlap.length/(Math.sqrt(q.length||1)*Math.sqrt(doc.tokens.length||1)),overlap,retrievalMode:'lexical'}; })
   .sort((a,b)=>b.score-a.score).slice(0,limit).map(({tokens,...doc})=>doc);
}
async function embeddingForDoc(doc){
 if(embeddingCache.has(doc.id)) return embeddingCache.get(doc.id);
 const vector = await createEmbedding(`${doc.file}\n${doc.content}`);
 embeddingCache.set(doc.id, vector); return vector;
}
async function embeddingRetrieve(query,limit){
 const all=await loadKnowledge(); const queryVector=await createEmbedding(query);
 const scored=[]; for(const doc of all){ const vector=await embeddingForDoc(doc); scored.push({...doc,score:cosine(queryVector,vector),overlap:[],retrievalMode:'embedding'}); }
 return scored.sort((a,b)=>b.score-a.score).slice(0,limit).map(({tokens,...doc})=>doc);
}
export async function retrieve(query,limit=3){
 const mode=(process.env.RAG_MODE||'lexical').toLowerCase();
 if(mode==='openai' && openAIEnabled()){
   try{return await embeddingRetrieve(query,limit);}catch(error){
     const fallback=await lexicalRetrieve(query,limit); return fallback.map(item=>({...item,retrievalFallback:error.message}));
   }
 }
 return lexicalRetrieve(query,limit);
}
