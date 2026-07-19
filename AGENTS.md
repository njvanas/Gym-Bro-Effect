# AGENTS.md

## Project overview

**Gym Bro Effect** consolidates Bro Training (workouts from Training Collection),
Bro Fuel (nutrition/recipes from Gym Bro Recipes), and Bro Tools into one static
SPA. Content is validated JSON under `src/data/` (added in later tasks). See
`README.md` for scripts and the implementation plan in
`docs/superpowers/plans/2026-07-19-gym-bro-effect-implementation.md`.

## Cursor Cloud specific instructions

- Single-service front-end app (no backend). Run the dev server with
  `npm run dev` (Vite at http://localhost:5173).
- `npm run build` runs `tsc -b` first — TypeScript errors fail the build.
- Before marking work done, run `npm run lint`, `npm run typecheck`, `npm test`,
  and `npm run build`.
- Do not modify the Training Collection or Gym Bro Recipes backup repos; copy
  patterns or data from them only.
- Default theme will be dark with volt lime accent (Task 2+). Nav labels: Bro
  Training, Bro Fuel, Bro Tools.

## Automation workflow

1. Make the edit (data in `src/data/`, UI under `src/`).
2. Validate: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
3. Land on `main` (or feature branch → PR) once CI is green.
4. Deploy via GitHub Pages workflow (added in a later task).

Never force-push published history. Prefer JSON data over hardcoded content.
