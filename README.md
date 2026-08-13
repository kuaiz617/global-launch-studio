# GlobalLaunch Studio

**AI-powered seller education and go-to-market orchestration for cross-border commerce.**

GlobalLaunch Studio is a portfolio MVP designed around an AI Product Marketing role. It demonstrates how product messaging, seller education, agent skills, and journey orchestration can be managed as one system.

## What is included

- Command Center with seller readiness and journey coverage
- Five-stage Journey Architect: Awareness → Consideration → Readiness → Onboarding → Activation
- Six structured Agent Skills with objectives, inputs, required messaging, and guardrails
- Bilingual Messaging Library with evidence notes and prohibited claims
- Seller Journey Simulator with deterministic bilingual routing
- Content Studio for English and Mandarin emails, FAQs, and checklists
- Quality Insights with transparent evaluation criteria
- Node tests for routing, generation, guardrails, and bilingual output

## Run locally

No third-party packages are required. You only need Node.js 20 or newer.

```bash
npm run demo
```

Open:

```text
http://127.0.0.1:4173
```

## Test

```bash
npm test
npm run check
```

## Project structure

```text
public/             Browser interface
src/data.mjs        Seller stages, skills, messages, personas, test cases
src/engine.mjs      Routing, response generation, quality checks
server.mjs          Zero-dependency Node HTTP server and APIs
tests/              Automated tests
docs/               Case study and job-alignment writing
```

## Important scope statement

This is a functional portfolio MVP using curated demo data. It does not use Amazon internal information, does not claim to represent an actual Amazon product, and does not fabricate conversion or revenue outcomes. The local generation engine demonstrates structured AI-product-marketing logic without requiring an external API key.
