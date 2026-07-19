# Gym Bro Effect

Bro Training, Bro Fuel, and Bro Tools in one place — a static Vite + React app
with Zod-validated JSON data and GitHub Pages deployment.

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server. |
| `npm run build` | Type-check and build the production bundle to `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Type-check without emitting. |
| `npm test` | Run Vitest. |
| `npm run test:watch` | Run Vitest in watch mode. |

## Tech stack

Vite + React + TypeScript, Zod for schema validation, Vitest for tests, ESLint
for linting.

See `docs/superpowers/plans/2026-07-19-gym-bro-effect-implementation.md` for the
full implementation plan.
