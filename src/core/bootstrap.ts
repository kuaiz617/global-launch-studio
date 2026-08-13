import { stages } from '../data/stages.js';
import { sellers } from '../data/sellers.js';
import { messaging } from '../data/messaging.js';
import { loadSkills } from './skills.js';
export async function bootstrap() {
  return { stages, sellers, messaging, agents:await loadSkills() };
}
