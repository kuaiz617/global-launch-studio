# Validation

Validated locally with Node.js 22.16.0 (project requires Node.js 20+).

- `npm test`: 16/16 tests passed.
- `npm run check`: 34 JavaScript modules passed syntax checks.
- `npm run eval`: 24/24 labeled seller questions routed to the expected agent and stage; grounding, prohibited-claim safety, CTA completeness, and structural quality checks all passed on this included test set.
- HTTP smoke test: `/api/health`, `/api/bootstrap`, `/api/simulate`, and `/api/evaluation` returned successful responses.

These metrics describe only the repository's simulation/evaluation set and are not seller conversion or business-performance claims.
