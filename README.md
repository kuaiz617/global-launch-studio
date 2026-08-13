# GlobalLaunch Studio

**AI-powered seller education and go-to-market orchestration for cross-border commerce.**

GlobalLaunch Studio is a functional portfolio MVP designed around AI Product Marketing work: authoring agent skills, mapping seller education journeys, governing product messaging, retrieving product knowledge, generating bilingual content, and evaluating agent behavior.

## Architecture

The application core is written in **TypeScript**. Six structured agent skill packages feed a typed router, RAG retrieval layer, seller-response generator, quality evaluator, evaluation runner, HTTP API, and server runtime. The browser UI is currently modular JavaScript and is intentionally kept separate from this first TypeScript migration.

`seller question → typed skill router → knowledge retrieval → structured agent response → quality evaluation → audit event`

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:4173`.

## Validate

```bash
npm run typecheck
npm test
npm run build
npm run eval
```

Production output is compiled to `dist/` and can be started with:

```bash
npm start
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

By default, the project uses deterministic local generation plus lexical retrieval so the demo remains reproducible without an API key. When `LLM_MODE=openai` and `OPENAI_API_KEY` are configured, the server can use an OpenAI Responses API provider. When `RAG_MODE=openai`, the retrieval layer can use embeddings for semantic ranking and falls back to lexical retrieval if the external provider is unavailable. API keys remain server-side.

## Optional real AI mode

```bash
# macOS / Linux
export OPENAI_API_KEY=...
export LLM_MODE=openai
export RAG_MODE=openai
npm run dev
```

On Windows PowerShell, set the same environment variables with `$env:NAME="value"`.

## Scope

This project uses fictional sellers and curated portfolio knowledge. It does not use Amazon internal data, does not claim to represent a real Amazon product, and does not fabricate business KPI improvements. Evaluation metrics refer only to the included labeled simulation set.
