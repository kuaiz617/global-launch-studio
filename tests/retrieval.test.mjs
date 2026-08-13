import test from 'node:test';import assert from 'node:assert/strict';import { retrieve } from '../src/core/retrieval.mjs';
test('retrieves compliance knowledge',async()=>{const rows=await retrieve('certification compliance legal Germany',2);assert.equal(rows[0].file,'compliance.md');});
test('retrieves inventory knowledge',async()=>{const rows=await retrieve('inventory inbound replenishment warehouse',2);assert.equal(rows[0].file,'inventory.md');});
