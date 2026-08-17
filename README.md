# GlobalLaunch Studio

**AI-powered seller education and go-to-market orchestration for cross-border commerce.**

GlobalLaunch Studio is a portfolio application for AI Product Marketing workflows: structured Agent Skills, seller education journeys, governed product messaging, product-knowledge retrieval, bilingual content generation, and measurable agent evaluation.

## Architecture

The backend and AI application core are written in **TypeScript**. The browser experience is a **React + TSX** application under `web/`, built with Vite.

Core flow:

`seller question → typed skill router → knowledge retrieval → structured agent response → quality evaluation → audit event`

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
- six structured Agent Skill packages with prompts, examples, inputs, outputs, messaging requirements, and guardrails
- lexical RAG with optional embedding retrieval
- optional OpenAI model provider with deterministic fallback
- React + TSX component UI with typed API helpers and hooks
- labeled evaluation set and automated backend tests
- separate backend/frontend type checking and production builds
- GitHub Actions CI
- multi-stage Docker build

## Local setup

Use Node.js 22.

```bash
npm run setup
npm run build:web
npm run dev
```

Then open `http://127.0.0.1:4173`.

On Windows, `start-windows.bat` installs both dependency sets, builds the React frontend, opens the browser, and starts the server.

For frontend development, run the backend from the repository root with `npm run dev`, then in another terminal run:

```bash
npm --prefix web run dev
```

Vite serves the React app on `http://127.0.0.1:5173` and proxies `/api` requests to the backend on port 4173.

## Validate

After dependencies are installed:

```bash
npm run validate:all
```

This covers backend type checking, 16 core tests, backend build, the 24-case labeled agent evaluation, React/TSX type checking, and the Vite production build. GitHub Actions also builds the Docker image.

## Docker

```bash
docker build -t global-launch-studio .
docker run --rm -p 4173:4173 global-launch-studio
```

Open `http://127.0.0.1:4173`.

## AI modes

By default, the project uses deterministic local generation plus lexical retrieval so the demo is reproducible without an API key. With server-side environment variables configured, it can use an OpenAI Responses API provider and embedding-based semantic ranking. External-provider failures fall back to the local path.

## Scope

This project uses fictional seller personas and curated portfolio knowledge. It does **not** use Amazon internal data, does not claim to represent a real Amazon product, and does not fabricate seller conversion or revenue improvements. Evaluation metrics refer only to the repository's included labeled simulation set.
