import { cp, rm } from 'node:fs/promises';

await rm('public', { recursive: true, force: true });
await cp('dist/web', 'public', { recursive: true });
