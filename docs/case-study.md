# GlobalLaunch Studio Case Study

## Problem
Cross-border sellers encounter product information through help pages, sales conversations, webinars, and onboarding materials. The information is often fragmented, repeated, and poorly sequenced. A generic chatbot may answer questions, but it does not ensure that the right seller receives the right knowledge at the right stage or that product claims remain consistent.

## Product hypothesis
A product marketing team can scale seller education by managing AI behavior as a system of structured agent skills. Each skill should own a stage-specific educational job, use approved messages, apply claim guardrails, and end with one measurable next action.

## Solution
GlobalLaunch Studio combines:

1. A five-stage seller journey
2. Structured AI agent skills
3. A bilingual messaging source of truth
4. Seller profiles and readiness context
5. A simulator for testing routing and output
6. Content generation and quality checks

## Core design decisions

### Journey before chatbot
The system starts from seller stages rather than a free-form assistant. This makes the educational experience intentional and measurable.

### Skills as product marketing assets
Each skill contains an objective, inputs, outputs, required messages, guardrails, and version. The skill is therefore maintainable by product marketing teams rather than existing only as hidden prompt text.

### Messaging governance
The bilingual library separates product narratives, seller benefits, evidence notes, and prohibited claims. The generator can therefore explain capabilities without inventing unsupported outcomes.

### Transparent local evaluation
The default MVP uses deterministic routing and structured generation. This keeps the demonstration reproducible and avoids presenting an uncontrolled model response as proof of product quality.

## Evaluation
The repository includes eight bilingual routing scenarios and tests for compliance guardrails, inventory education, content generation, and prohibited-claim detection. These results describe only the included test set and are not presented as real seller conversion outcomes.

## Next iteration
A later version could add retrieval over an approved product knowledge base, LLM structured output, role-based review, skill version history, content experiments, and anonymized seller feedback analytics.
