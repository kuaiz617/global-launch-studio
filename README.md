# GlobalLaunch Studio 

**AI-powered seller education and go-to-market orchestration for cross-border commerce.**

GlobalLaunch Studio is a functional portfolio MVP designed around AI Product Marketing work: authoring agent skills, mapping seller education journeys, governing product messaging, retrieving product knowledge, generating bilingual content, and evaluating agent behavior.

## Why v2 is different

The first MVP concentrated most logic in a few files. v2 is intentionally modular: six agent skill packages, a knowledge base, retrieval engine, router, grounded response generator, quality evaluator, labeled evaluation set, modular HTTP APIs, modular browser UI, automated tests, CI, and Docker support.

## Run

Requires Node.js 20+. No `npm install` is needed.

```bash
npm run demo
```
Open `http://127.0.0.1:4173`.

## Validate

```bash
npm test
npm run check
npm run eval
```

## Main product modules

- Command Center
- Journey Architect
- Agent Skill Studio
- Messaging Library
- Seller Simulator
- Content Studio
- Evaluation Center

## AI architecture

`seller question → skill router → knowledge retrieval → structured agent response → quality evaluation → audit event`

The project is dual-mode. By default it runs a deterministic local generator plus lexical retrieval, so the demo is reproducible and requires no API key. When `LLM_MODE=openai` and `OPENAI_API_KEY` are configured, the server calls the OpenAI Responses API for real model generation. When `RAG_MODE=openai`, the retrieval layer uses embeddings for semantic ranking and automatically falls back to lexical retrieval if the external provider is unavailable. Retrieved evidence is passed into the generation step and returned with the answer for inspection.

## Optional real AI mode

```bash
# macOS / Linux
export OPENAI_API_KEY=...
export LLM_MODE=openai
export RAG_MODE=openai
npm run demo
```

On Windows PowerShell, set the same environment variables with `$env:NAME="value"`. API keys stay on the server side and are never sent to browser JavaScript.

## Scope

This project uses fictional sellers and curated portfolio knowledge. It does not use Amazon internal data, does not claim to represent a real Amazon product, and does not fabricate business KPI improvements. Evaluation metrics refer only to the included labeled simulation set.
