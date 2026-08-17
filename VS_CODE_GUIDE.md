# VS Code quick start

1. Clone or download the repository.
2. Open the `global-launch-studio` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run `npm run setup` to install backend and React frontend dependencies.
5. Run `npm run build:web` to build the React/TSX application into `public/`.
6. Run `npm run dev`.
7. Open `http://127.0.0.1:4173`.

For active frontend development, keep `npm run dev` running in the root terminal and open a second terminal with `npm --prefix web run dev`. Vite runs on port 5173 and proxies API calls to the backend.

Useful commands:
- `npm run check` — backend + frontend TypeScript type checking
- `npm test` — automated backend tests
- `npm run eval` — labeled agent evaluation
- `npm run build:all` — backend + React production builds
- `npm run validate:all` — full local validation suite

Windows users can also double-click `start-windows.bat`; it installs both dependency sets, builds the React frontend, opens the browser, and starts the application.
