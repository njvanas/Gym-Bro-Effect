# Gym Bro Effect

Central hub for **Bro Training**, **Bro Fuel**, and **Bro Tools** — a journey-first bodybuilding resource.

- **Live POC:** https://njvanas.github.io/Gym-Bro-Effect/
- **Future domain:** https://gymbroeffect.com/ (cutover later)

## Pillars

| Pillar | What you get |
| --- | --- |
| **Bro Training** | Bro Methods, Bro Routines (Hevy + legend splits), Bro Exercises |
| **Bro Fuel** | Maintaining / Cutting / Bulking guides, staple foods, recipes, daily schedules |
| **Bro Tools** | Essential / Advised / Want gear and apps |

Training and fuel stay separate on purpose: surplus vs deficit drives growth or fat loss; methods and routines live under Bro Training.

## Stack

Vite + React + TypeScript, Zod-validated JSON under `src/data/`, Vitest integrity tests, GitHub Actions CI + Pages.

## Scripts

| Command | Description |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Type-check only |
| `npm test` | Vitest data/UI helper suite |

## Adding content

Edit JSON in `src/data/`, then run `npm test`. Do not change workout truth casually — training files were imported from Training Collection.

## Backups

`Training-Collection` and `Gym-Bro-Recipes` remain untouched backup repos of the original sites.
