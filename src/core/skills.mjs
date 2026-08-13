import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../config/agents");
let cache;
export async function loadSkills(){
  if(cache) return cache;
  const dirs = await readdir(root);
  const skills=[];
  for(const dir of dirs){
    const base=path.join(root,dir);
    const skill=JSON.parse(await readFile(path.join(base,"skill.json"),"utf8"));
    skill.prompt=await readFile(path.join(base,"prompt.md"),"utf8");
    skill.examples=JSON.parse(await readFile(path.join(base,"examples.json"),"utf8"));
    skills.push(skill);
  }
  cache=skills.sort((a,b)=>b.priority-a.priority);
  return cache;
}
export async function getSkill(id){ return (await loadSkills()).find(skill=>skill.id===id); }
