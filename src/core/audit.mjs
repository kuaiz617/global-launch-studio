const events=[]; let nextId=1;
export function recordAudit(type,payload={}){ const event={id:nextId++,type,createdAt:new Date().toISOString(),...payload}; events.unshift(event); if(events.length>100) events.pop(); return event; }
export function listAudit(limit=20){ return events.slice(0,limit); }
