# Validation Record

This file describes what was actually tested in the delivered package.

## Verified

- The application contains real source code, not only documentation.
- `npm run check` passes using Node's syntax checker.
- `npm test` passes all automated tests.
- `npm run demo` starts the application without installing dependencies.
- `/api/health` returns HTTP 200.
- `/api/bootstrap` returns journey, agent, message, and seller data.
- `/api/simulate` routes bilingual questions and generates structured responses.
- `/api/content` generates English and Mandarin seller assets.
- The browser UI loads its HTML, CSS, JavaScript, and API data successfully.

## Not claimed

- This is not a production Amazon system.
- It does not use Amazon internal data or approved Amazon product claims.
- It does not include a real LLM API call in the default local mode.
- Test accuracy refers only to the curated test set included in this repository.
