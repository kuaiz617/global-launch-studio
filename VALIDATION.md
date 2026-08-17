# Validation

The completed TypeScript + React/TSX portfolio build was validated on the `portfolio-finish` branch with GitHub Actions on Node.js 22.

- Backend dependency installation: passed.
- `npm run typecheck`: strict backend TypeScript type checking passed.
- `npm test`: 16 TypeScript core tests passed.
- `npm run build`: production backend compilation passed.
- `npm run eval`: all 24 included labeled seller questions routed to the expected agent/stage; the evaluation command passed.
- Frontend dependency installation: passed.
- `web` `npm run typecheck`: strict React/TSX type checking passed.
- `web` `npm run build`: Vite production build passed.
- Docker multi-stage image build: passed.
- GitHub Actions run `31981889903` concluded with `success` for all of the checks above.

The included evaluation results describe only the repository's fictional/curated simulation set. They are not seller conversion, revenue, eligibility, Amazon-internal, or production-performance claims.
