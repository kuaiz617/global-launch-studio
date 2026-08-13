import { prohibitedClaims } from '../data/messaging.js';
import type { EvaluationRow, EvaluationSummary, QualityEvaluation, SellerAnswer } from '../types/index.js';

export function evaluateAnswer(answer: SellerAnswer, expected: Record<string, unknown> = {}): QualityEvaluation {
  const text = JSON.stringify(answer).toLowerCase();
  const violations = prohibitedClaims.filter(claim => text.includes(claim));
  const checks = {
    hasCTA:Boolean(answer.cta),
    hasGuardrail:Boolean(answer.guardrail),
    hasEvidence:Array.isArray(answer.evidence) && answer.evidence.length > 0,
    hasActions:Array.isArray(answer.actions) && answer.actions.length > 0,
    hasSellerContext:Boolean(answer.sellerContext),
    noProhibitedClaims:violations.length === 0
  };
  const passed = Object.values(checks).filter(Boolean).length;
  return { score:Math.round((passed / Object.keys(checks).length) * 100), checks, violations, expected };
}
