# Architecture

## Runtime flow

1. A seller question enters `/api/simulate` from the React/TSX Seller Simulator.
2. The typed Skill Router scores structured Agent Skill keywords and stage priority.
3. The retrieval layer ranks Markdown product knowledge using lexical retrieval by default, with optional embedding-based semantic ranking.
4. The Grounded Generator combines seller context, the selected skill, retrieved evidence, approved messaging boundaries, and the configured model mode.
5. The Evaluator checks evidence presence, CTA completeness, actions, seller context, guardrails, prohibited claims, and expected routing behavior.
6. The API returns the route, seller context, evidence, answer, actions, guardrail, CTA, provider metadata, and quality result to the React UI.
7. Audit records the simulation event without storing hidden reasoning.

## Frontend

`web/` is a React + TypeScript application built with Vite. It contains typed pages, reusable UI components, API helpers, and hooks for the Seller Simulator and Content Studio. The production Vite build is emitted to `public/`, which is served by the TypeScript backend.

## Agent assets

Each of the six Agent Skills has its own configuration package under `config/agents/` with a structured skill definition, system prompt, and examples. Product messaging and knowledge are maintained separately so prompt behavior is inspectable rather than buried in one application file.

## Delivery

GitHub Actions validates backend TypeScript, tests, the labeled evaluation set, React/TSX type checking, the Vite build, and the multi-stage Docker image. The Docker runtime contains the compiled backend, built React assets, Agent Skill configuration, and knowledge base.

## Design goal

The architecture mirrors an agent-enabled product marketing workflow while remaining inspectable and reproducible for portfolio review. External AI providers are optional; the default local mode does not require an API key.
