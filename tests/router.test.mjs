import test from 'node:test';import assert from 'node:assert/strict';import { routeQuestion } from '../src/core/router.mjs';
const cases=[['进入德国需要哪些认证？','compliance-education'],['How should we plan inventory?','inventory-education'],['给我开通步骤','onboarding-planner'],['Are we ready to expand?','seller-fit'],['What blocker remains before launch?','launch-coach'],['Why expand globally?','global-opportunity']];
for(const [question,expected] of cases)test(`routes ${expected}`,async()=>assert.equal((await routeQuestion(question)).agentId,expected));
