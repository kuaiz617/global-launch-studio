import type { AuditEvent } from '../types/index.js';
const events: AuditEvent[] = [];
let nextId = 1;
export function recordAudit(type: string, metadata: Record<string, unknown>): AuditEvent {
  const event: AuditEvent = { id:nextId++, type, timestamp:new Date().toISOString(), metadata };
  events.unshift(event);
  if (events.length > 100) events.length = 100;
  return event;
}
export function listAudit(): AuditEvent[] { return [...events]; }
export function clearAuditForTests(): void { events.length = 0; nextId = 1; }
