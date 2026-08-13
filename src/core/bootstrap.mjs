import { stages } from "../data/stages.mjs";
import { sellers } from "../data/sellers.mjs";
import { messaging } from "../data/messaging.mjs";
import { loadSkills } from "./skills.mjs";
export async function bootstrap(){ return { stages, sellers, messaging, agents:await loadSkills() }; }
