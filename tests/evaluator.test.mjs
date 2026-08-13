import test from 'node:test';import assert from 'node:assert/strict';import { evaluateAnswer } from '../src/core/evaluator.mjs';
test('flags prohibited claim',()=>{const result=evaluateAnswer({cta:'go',guardrail:'safe',sellerContext:'x',actions:[1],evidence:[1],summary:'Guaranteed revenue growth'});assert.equal(result.checks.noProhibitedClaims,false);});
test('scores complete answer',()=>{const result=evaluateAnswer({cta:'go',guardrail:'safe',sellerContext:'x',actions:[1],evidence:[1],summary:'education'});assert.equal(result.score,100);});
