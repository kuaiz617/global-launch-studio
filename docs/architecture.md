# Architecture

## Flow
1. Seller question enters `/api/simulate`.
2. Skill Router scores structured agent keywords and stage priority.
3. Retrieval ranks Markdown knowledge documents by lexical overlap.
4. Grounded Generator combines seller context, the selected skill, retrieved evidence, and approved boundaries.
5. Evaluator checks evidence, CTA, actions, seller context, guardrails, and prohibited claims.
6. Audit records the simulation event without storing hidden reasoning.

## Design goal
The architecture mirrors an agent-enabled product marketing workflow while remaining fully local and inspectable for portfolio review.
