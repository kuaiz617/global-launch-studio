import test from "node:test";
import assert from "node:assert/strict";
import { generateContent, qualityCheck, routeQuestion, simulate } from "../src/engine.mjs";
import { testCases } from "../src/data.mjs";

test("all curated questions route to the expected agent and stage", () => {
  for (const item of testCases) {
    const result = routeQuestion(item.question);
    assert.equal(result.agentId, item.expectedAgent, item.question);
    assert.equal(result.stageId, item.expectedStage, item.question);
  }
});

test("Chinese compliance question produces a guarded response", () => {
  const result = simulate({ sellerId: "seller-beauty", question: "我们的美容产品进入美国需要哪些认证？" });
  assert.equal(result.language, "zh");
  assert.equal(result.agent.id, "compliance-education");
  assert.match(result.answer.guardrail, /法律|税务|监管/);
  assert.equal(result.quality.score, 100);
});

test("English inventory question produces next actions", () => {
  const result = simulate({ sellerId: "seller-electronics", question: "How should we think about inventory and replenishment across markets?" });
  assert.equal(result.agent.id, "inventory-education");
  assert.ok(result.answer.actions.length >= 3);
  assert.ok(result.answer.cta);
});

test("content generator creates bilingual seller assets", () => {
  const en = generateContent({ sellerId: "seller-electronics", format: "email", language: "en" });
  const zh = generateContent({ sellerId: "seller-electronics", format: "checklist", language: "zh" });
  assert.match(en.title, /Germany/);
  assert.match(zh.body, /上线前复核/);
});

test("quality checker rejects prohibited claims", () => {
  const result = qualityCheck({
    sellerContext: "Demo seller",
    actions: ["Launch"],
    guardrail: "Boundary",
    cta: "Next",
    summary: "Guaranteed revenue growth"
  });
  assert.equal(result.checks.noProhibitedClaims, false);
  assert.equal(result.score, 80);
});
