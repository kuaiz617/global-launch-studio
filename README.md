# GlobalLaunch Studio

**AI-powered seller education and go-to-market orchestration for cross-border commerce.**

GlobalLaunch Studio is a portfolio application for AI Product Marketing workflows: agent skills, seller education journeys, messaging governance, product-knowledge retrieval, bilingual content, and agent evaluation.

## Architecture

The backend and AI application core are written in **TypeScript**. The browser experience is now a **React + TSX** application under `web/`, built with Vite.

The core flow is: seller question → typed skill router → knowledge retrieval → structured agent response → quality evaluation → audit event.

### Product modules

- Command Center
- Journey Architect
- Agent Skill Studio
- Messaging Library
- Seller Simulator
- Content Studio
- Evaluation Center

### Engineering layers

- TypeScript API/runtime
- six structured Agent Skill packages
- lexical RAG with optional embedding retrieval
- optional model provider with deterministic fallback
- React + TSX component UI
- typed client API and hooks
- automated backend tests and a labeled evaluation set
- separate backend and frontend type checking/builds in GitHub Actions

## Local setup

Use Node.js 22. Install backend dependencies from the repository root with `npm install`. Then install frontend dependencies in `web/` with `npm install` and run `npm run build` there. Return to the repository root and run `npm run dev`; the built application is available at `http://127.0.0.1:4173`.

For frontend development, run the backend on port 4173 and run `npm run dev` inside `web/`; Vite serves the React app on port 5173 and proxies API requests to the backend.

## Validation

Backend validation uses `npm run typecheck`, `npm test`, `npm run build`, and `npm run eval`. Frontend validation uses `npm run typecheck` and `npm run build` inside `web/`.

## Scope

This project uses fictional sellers and curated portfolio knowledge. It does not use Amazon internal data, does not claim to represent a real Amazon product, and does not fabricate business KPI improvements. Evaluation metrics refer only to the included labeled simulation set.
