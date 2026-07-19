# Gym Bro Effect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fresh Gym Bro Effect Vite/React app that imports Training Collection workout data unchanged and ports Gym Bro Recipes nutrition/recipes/tools into Bro Training, Bro Fuel, and Bro Tools.

**Architecture:** Static SPA with Zod-validated JSON under `src/data/`, query helpers in `src/lib/`, pillar views under `src/components/`, dark-first theme with volt lime accent and persisted light/dark toggle. No backend. GitHub Pages POC; `gymbroeffect.com` later.

**Tech Stack:** Vite 5, React 18, TypeScript 5 (strict), Zod 3, Vitest, ESLint, GitHub Actions (CI + Pages). Node 20+.

**Spec:** `docs/superpowers/specs/2026-07-19-gym-bro-effect-consolidation-design.md`

## Global Constraints

- Do **not** modify `Training-Collection` or `Gym-Bro-Recipes` repos (backups only; read/copy from them).
- Training JSON content IDs and workout truth stay identical to Training Collection.
- Bro Fuel never embeds full routines; Bro Training never embeds recipes.
- Default theme is **dark**; light mode via toggle; accent is **volt lime**.
- No `dangerouslySetInnerHTML` for content; external links use `rel="noopener noreferrer"`.
- Nav labels: **Bro Training**, **Bro Fuel**, **Bro Tools**; training sub-nav: **Bro Methods**, **Bro Routines**, **Bro Exercises**.
- Verify with `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` before calling a milestone done.
- Default git branch for deploy workflows: `main` (rename from `master` in Task 1 if needed).

---

## File structure (target)

```
Gym-Bro-Effect/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json, tsconfig.app.json, tsconfig.node.json
├── eslint.config.js
├── .gitignore
├── README.md
├── AGENTS.md
├── .github/workflows/ci.yml
├── .github/workflows/deploy.yml
├── docs/superpowers/specs/...   (exists)
├── docs/superpowers/plans/...   (this file)
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── vite-env.d.ts
    ├── index.css                 # theme tokens + layout
    ├── schema/
    │   ├── training.ts           # copied/adapted from Training Collection
    │   ├── fuel.ts               # Phase, Recipe
    │   ├── tools.ts              # Tool
    │   └── index.ts              # re-exports
    ├── data/
    │   ├── styles.json           # copy from Training Collection
    │   ├── exercises.json
    │   ├── routines.json
    │   ├── my-collection.json
    │   ├── phases.json           # new
    │   ├── recipes.json          # new
    │   └── tools.json            # new
    ├── lib/
    │   ├── theme.ts
    │   ├── theme.test.ts
    │   ├── db.ts                 # training loaders + queries
    │   ├── db.test.ts
    │   ├── fuel-db.ts
    │   ├── fuel-db.test.ts
    │   ├── tools-db.ts
    │   ├── tools-db.test.ts
    │   └── external-link.ts
    └── components/
        ├── AppShell.tsx
        ├── ThemeToggle.tsx
        ├── ExternalLink.tsx
        ├── HomeView.tsx
        ├── training/
        │   ├── BroTrainingView.tsx
        │   ├── BroMethodsView.tsx
        │   ├── BroRoutinesView.tsx
        │   └── BroExercisesView.tsx
        ├── fuel/
        │   ├── BroFuelView.tsx
        │   ├── PhaseDetail.tsx
        │   └── RecipeCard.tsx
        └── tools/
            └── BroToolsView.tsx
```

---

### Task 1: Scaffold the Vite + React + TypeScript app

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `.gitignore`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`, `src/index.css` (minimal stub), `README.md`, `AGENTS.md`
- Create: `src/lib/smoke.test.ts` (proves Vitest runs)

**Interfaces:**
- Consumes: none
- Produces: runnable `npm run dev` / `npm test` / `npm run build` pipeline

- [ ] **Step 1: Write the failing smoke test**

Create `src/lib/smoke.test.ts`:

```ts
import { describe, it, expect } from 'vitest';

describe('scaffold', () => {
  it('runs vitest', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails (no vitest yet)**

Run: `npm test`  
Expected: FAIL (npm scripts / vitest missing)

- [ ] **Step 3: Create package.json and install**

`package.json`:

```json
{
  "name": "gym-bro-effect",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "description": "Gym Bro Effect — Bro Training, Bro Fuel, and Bro Tools in one place.",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "typecheck": "tsc -b --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@eslint/js": "^9.13.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "eslint": "^9.13.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.5.3",
    "globals": "^15.11.0",
    "typescript": "^5.6.3",
    "typescript-eslint": "^8.11.0",
    "vite": "^5.4.10",
    "vitest": "^2.1.4"
  }
}
```

Copy TypeScript/ESLint/Vite config patterns from `C:\Users\BabaJaga\Documents\GitHub\Training-Collection` (`vite.config.ts` with `base: './'`, vitest `include: ['src/**/*.test.ts']`, `environment: 'node'`).

`index.html` title: `Gym Bro Effect`. Root: `<div id="root"></div>`, script `/src/main.tsx`.

Minimal `App.tsx` that renders `<h1>Gym Bro Effect</h1>`.

`.gitignore`: `node_modules`, `dist`, `*.local`, `tsconfig*.tsbuildinfo`.

Run: `npm install`

- [ ] **Step 4: Run tests and build**

Run: `npm test` → Expected: PASS  
Run: `npm run typecheck` → Expected: PASS  
Run: `npm run build` → Expected: PASS (`dist/` created)

- [ ] **Step 5: Ensure branch is `main` and commit**

```bash
git branch -M main
git add package.json package-lock.json vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json eslint.config.js .gitignore index.html src README.md AGENTS.md
git commit -m "chore: scaffold Gym Bro Effect Vite React app"
```

---

### Task 2: Theme tokens, dark default, toggle persistence

**Files:**
- Create: `src/lib/theme.ts`, `src/lib/theme.test.ts`, `src/components/ThemeToggle.tsx`
- Modify: `src/index.css`, `src/main.tsx`, `src/App.tsx`

**Interfaces:**
- Consumes: `localStorage`
- Produces:
  - `export type ThemeMode = 'dark' | 'light'`
  - `export const THEME_STORAGE_KEY = 'gym-bro-effect-theme'`
  - `export function getStoredTheme(): ThemeMode` — defaults to `'dark'` when missing/invalid
  - `export function setStoredTheme(mode: ThemeMode): void`
  - `export function applyTheme(mode: ThemeMode): void` — sets `document.documentElement.dataset.theme = mode`

- [ ] **Step 1: Write failing theme tests**

`src/lib/theme.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import {
  THEME_STORAGE_KEY,
  getStoredTheme,
  setStoredTheme,
} from './theme';

describe('theme', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to dark when nothing stored', () => {
    expect(getStoredTheme()).toBe('dark');
  });

  it('persists light mode', () => {
    setStoredTheme('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(getStoredTheme()).toBe('light');
  });

  it('falls back to dark for invalid values', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'neon');
    expect(getStoredTheme()).toBe('dark');
  });
});
```

Note: Vitest `environment: 'node'` has no `localStorage`. Either switch vitest to `happy-dom` / `jsdom`, or provide a tiny in-memory mock in the test file / `theme.ts` that uses a safe storage accessor. Prefer adding `happy-dom` and setting `environment: 'happy-dom'` in `vite.config.ts` for theme tests only is awkward — set global environment to `happy-dom` and keep data tests working (they don’t need DOM).

- [ ] **Step 2: Run test — expect FAIL**

Run: `npm test -- src/lib/theme.test.ts`  
Expected: FAIL (module not found)

- [ ] **Step 3: Implement theme module + CSS tokens**

`src/lib/theme.ts` — implement the interfaces above.

`src/index.css` — CSS variables:

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Teko:wght@500;600;700&display=swap');

:root,
[data-theme='dark'] {
  --bg: #0e0f12;
  --surface: #171a1f;
  --surface-2: #1e232b;
  --text: #f2f4f7;
  --text-muted: #9aa3b2;
  --border: #2a303a;
  --accent: #c8f542;
  --accent-text: #0e0f12;
  --danger: #ff5c5c;
  --font-display: 'Teko', sans-serif;
  --font-body: 'Outfit', sans-serif;
}

[data-theme='light'] {
  --bg: #f4f6f8;
  --surface: #ffffff;
  --surface-2: #e8ecf1;
  --text: #12151a;
  --text-muted: #5c6675;
  --border: #d0d6e0;
  --accent: #8fbf00;
  --accent-text: #0e0f12;
}

html, body, #root {
  min-height: 100%;
}
body {
  margin: 0;
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
}
```

`ThemeToggle.tsx` — button that toggles dark/light and calls `setStoredTheme` + `applyTheme`.

`main.tsx` — call `applyTheme(getStoredTheme())` before render.

- [ ] **Step 4: Run tests**

Run: `npm test -- src/lib/theme.test.ts` → PASS  
Run: `npm run build` → PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/theme.ts src/lib/theme.test.ts src/components/ThemeToggle.tsx src/index.css src/main.tsx src/App.tsx package.json package-lock.json vite.config.ts
git commit -m "feat: add dark-default theme with volt lime and toggle"
```

---

### Task 3: App shell, home, and pillar navigation

**Files:**
- Create: `src/components/AppShell.tsx`, `src/components/HomeView.tsx`, `src/components/ExternalLink.tsx`, `src/lib/external-link.ts`
- Create: placeholder pillar views `src/components/training/BroTrainingView.tsx`, `src/components/fuel/BroFuelView.tsx`, `src/components/tools/BroToolsView.tsx`
- Modify: `src/App.tsx`, `src/index.css`
- Create: `src/lib/nav.test.ts`

**Interfaces:**
- Consumes: `ThemeToggle`, theme helpers
- Produces:
  - `export type Pillar = 'home' | 'training' | 'fuel' | 'tools'`
  - `App` holds `pillar` state; `AppShell` renders brand, nav, theme toggle, children
  - Home shows three path cards that call `onNavigate(pillar)`
  - Mobile: collapsible hamburger or bottom nav; desktop: top nav
  - `ExternalLink` props: `{ href: string; children: React.ReactNode; className?: string }` — always `target="_blank"` + `rel="noopener noreferrer"`

- [ ] **Step 1: Write failing nav/exhaustive helper test**

`src/lib/nav.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { pillarLabel, type Pillar } from './nav';

describe('pillarLabel', () => {
  it('labels all pillars', () => {
    const pillars: Pillar[] = ['home', 'training', 'fuel', 'tools'];
    expect(pillars.map(pillarLabel)).toEqual([
      'Home',
      'Bro Training',
      'Bro Fuel',
      'Bro Tools',
    ]);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `npm test -- src/lib/nav.test.ts`  
Expected: FAIL

- [ ] **Step 3: Implement nav helper + shell UI**

`src/lib/nav.ts`:

```ts
export type Pillar = 'home' | 'training' | 'fuel' | 'tools';

export function pillarLabel(pillar: Pillar): string {
  switch (pillar) {
    case 'home':
      return 'Home';
    case 'training':
      return 'Bro Training';
    case 'fuel':
      return 'Bro Fuel';
    case 'tools':
      return 'Bro Tools';
    default: {
      const _exhaustive: never = pillar;
      return _exhaustive;
    }
  }
}
```

`HomeView.tsx` — brand hero “Gym Bro Effect”, one short pitch, three cards (Bro Training / Bro Fuel / Bro Tools). No stats strip, no dashboard clutter.

Placeholder pillar views render an `<h2>` with the pillar name only (filled in later tasks).

Wire `App.tsx` to switch on `pillar` with exhaustive `never` default.

- [ ] **Step 4: Manual + automated verify**

Run: `npm test` → PASS  
Run: `npm run dev` — confirm dark home, nav switches pillars, theme toggle works, layout usable at ~375px width.

- [ ] **Step 5: Commit**

```bash
git add src/lib/nav.ts src/lib/nav.test.ts src/components src/App.tsx src/index.css
git commit -m "feat: add app shell, home journey paths, and pillar nav"
```

---

### Task 4: Import training schemas, JSON, and db integrity tests

**Files:**
- Create: `src/schema/training.ts`, `src/schema/index.ts`
- Create: `src/data/styles.json`, `exercises.json`, `routines.json`, `my-collection.json` (binary-identical copies from Training Collection)
- Create: `src/lib/db.ts`, `src/lib/db.test.ts`
- Create: `src/lib/set-scheme.ts` (copy from Training Collection if Bro Routines need set labels)

**Interfaces:**
- Consumes: Training Collection files at:
  - `C:\Users\BabaJaga\Documents\GitHub\Training-Collection\src\schema\index.ts`
  - `C:\Users\BabaJaga\Documents\GitHub\Training-Collection\src\data\*.json`
  - `C:\Users\BabaJaga\Documents\GitHub\Training-Collection\src\lib\db.ts`
- Produces (same public surface as TC `db.ts`, names preserved):
  - `exercises`, `styles`, `routines`, `hevyCatalog`, `hevyFolders`, `legendRoutines`, `personalRoutines`
  - `getSortedRoutines`, `getLegendRoutineGroups`, `getRoutinesForStyle`, exercise/style lookups
  - Validation throws at module load if JSON fails Zod

- [ ] **Step 1: Write failing integrity tests first**

Port the assertions from Training Collection `src/lib/db.test.ts` into `src/lib/db.test.ts` (expect styles length ≥ 1, every routine exerciseId exists, legend routines have styleId, personal have hevyFolderId, etc.). Do not weaken assertions.

- [ ] **Step 2: Run — expect FAIL**

Run: `npm test -- src/lib/db.test.ts`  
Expected: FAIL (db/schema missing)

- [ ] **Step 3: Copy data + implement schema/db**

Copy the four JSON files unchanged (`Copy-Item` on Windows).

Split/adapt schema into `src/schema/training.ts` (full content of TC schema related to training). Re-export from `src/schema/index.ts`.

Implement `src/lib/db.ts` by adapting TC `db.ts` imports to local paths. Do not change JSON contents.

- [ ] **Step 4: Run tests**

Run: `npm test -- src/lib/db.test.ts` → PASS  
Run: `npm run typecheck` → PASS

- [ ] **Step 5: Commit**

```bash
git add src/schema src/data/styles.json src/data/exercises.json src/data/routines.json src/data/my-collection.json src/lib/db.ts src/lib/db.test.ts src/lib/set-scheme.ts
git commit -m "feat: import training data and Zod integrity checks"
```

---

### Task 5: Bro Training — Bro Methods UI

**Files:**
- Create: `src/components/training/BroMethodsView.tsx`
- Modify: `src/components/training/BroTrainingView.tsx`

**Interfaces:**
- Consumes: `styles` from `../lib/db`
- Produces: searchable/filterable list of methodologies; detail panel with summary, principles, guidelines, split overview, sources via `ExternalLink`

- [ ] **Step 1: Add a pure filter helper test**

Create `src/lib/training-filters.ts` + test:

```ts
export function filterStylesByQuery<T extends { name: string; creator: string; tags: string[] }>(
  styles: T[],
  query: string,
): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return styles;
  return styles.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.creator.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
```

Test: filtering `"yates"` returns Blood & Guts style when present in imported data (load from `db` in test).

- [ ] **Step 2: Run — FAIL then implement filter**

- [ ] **Step 3: Build BroMethodsView + BroTrainingView sub-nav**

`BroTrainingView` local state: `sub: 'methods' | 'routines' | 'exercises'` with exhaustive switch. Default `'methods'`.

Sub-nav labels exactly: Bro Methods · Bro Routines · Bro Exercises.

`BroMethodsView`: list + detail; sources use `ExternalLink`.

- [ ] **Step 4: Verify**

Run: `npm test` → PASS  
Run: `npm run dev` — Bro Training → Bro Methods lists all styles, search works on mobile width.

- [ ] **Step 5: Commit**

```bash
git add src/lib/training-filters.ts src/lib/training-filters.test.ts src/components/training
git commit -m "feat: add Bro Methods explorer under Bro Training"
```

---

### Task 6: Bro Training — Bro Routines UI

**Files:**
- Create: `src/components/training/BroRoutinesView.tsx`
- Modify: `src/components/training/BroTrainingView.tsx`

**Interfaces:**
- Consumes: `hevyFolders`, `legendRoutines`, `getLegendRoutineGroups`, `exercises`, set-scheme helpers
- Produces: two sections — Personal Hevy folders (open in Hevy via `ExternalLink`) and Legend routine groups with workout exercise lists (sets, repRange, setScheme labels)

- [ ] **Step 1: Write test for grouping helper already in db**

Assert `getLegendRoutineGroups().length >= 1` and each group has `workouts.length >= 1` in `db.test.ts` (add if missing).

- [ ] **Step 2: Run tests**

- [ ] **Step 3: Implement BroRoutinesView**

Render Hevy folder cards with name, summary/note, `ExternalLink` to folder URL.

Render legend groups expandable or selectable; show exercises resolved by `exerciseId` → `exercises` map; missing id must not crash (skip + console error only in dev — prefer fail in tests so data stays clean).

- [ ] **Step 4: Verify in browser + `npm test`**

- [ ] **Step 5: Commit**

```bash
git add src/components/training/BroRoutinesView.tsx src/components/training/BroTrainingView.tsx src/lib/db.test.ts
git commit -m "feat: add Bro Routines (Hevy folders + legend splits)"
```

---

### Task 7: Bro Training — Bro Exercises UI

**Files:**
- Create: `src/components/training/BroExercisesView.tsx`
- Modify: `src/components/training/BroTrainingView.tsx`
- Create/Modify: `src/lib/training-filters.ts` (+ test) for exercise search

**Interfaces:**
- Consumes: `exercises` from db
- Produces: filter by name/alias/muscle/equipment; list + detail with cues

- [ ] **Step 1: Failing test for `filterExercises`**

```ts
export function filterExercises(
  list: Exercise[],
  query: string,
  muscle?: MuscleGroup | 'all',
): Exercise[]
```

- [ ] **Step 2: Implement filter + BroExercisesView**

- [ ] **Step 3: Wire sub-nav `exercises` case**

- [ ] **Step 4: `npm test` + responsive check**

- [ ] **Step 5: Commit**

```bash
git add src/lib/training-filters.ts src/lib/training-filters.test.ts src/components/training/BroExercisesView.tsx src/components/training/BroTrainingView.tsx
git commit -m "feat: add Bro Exercises searchable library"
```

---

### Task 8: Fuel schemas, phases.json, recipes.json, integrity tests

**Files:**
- Create: `src/schema/fuel.ts`
- Modify: `src/schema/index.ts`
- Create: `src/data/phases.json`, `src/data/recipes.json`
- Create: `src/lib/fuel-db.ts`, `src/lib/fuel-db.test.ts`

**Interfaces:**
- Produces:

```ts
export const phaseIdSchema = z.enum(['maintaining', 'cutting', 'bulking']);
export type PhaseId = z.infer<typeof phaseIdSchema>;

export const foodCategorySchema = z.enum(['protein', 'carbs', 'fats', 'vegetables']);

export const phaseSchema = z.object({
  id: phaseIdSchema,
  name: z.string().min(1),
  tagline: z.string().min(1),
  overview: z.array(z.string().min(1)).min(1),
  nutritionGuidelines: z.array(z.string().min(1)).min(1),
  stapleFoods: z.array(
    z.object({
      category: foodCategorySchema,
      items: z.array(z.string().min(1)).min(1),
    }),
  ),
  dailyRoutine: z.array(
    z.object({
      time: z.string().min(1),
      label: z.string().min(1),
      detail: z.string().min(1).optional(),
    }),
  ),
});

export const recipeSchema = z.object({
  id: z.string().min(1),
  phaseId: phaseIdSchema,
  name: z.string().min(1),
  calories: z.number().nonnegative(),
  proteinG: z.number().nonnegative(),
  carbsG: z.number().nonnegative(),
  fatG: z.number().nonnegative(),
  ingredients: z.array(z.string().min(1)).min(1),
  steps: z.array(z.string().min(1)).min(1),
});
```

- `getPhase(id)`, `getRecipesForPhase(id)`, `phases`, `recipes` exports from `fuel-db.ts`
- Integrity: every `recipe.phaseId` exists; exactly 3 phases; ≥1 recipe per phase

**Source content:** Port text from:

- `C:\Users\BabaJaga\Documents\GitHub\Gym-Bro-Recipes\maintaining.html`
- `...\cutting.html`
- `...\bulking.html`

Omit Training Routine sections and bulking HIT modal. Port Foods & Nutrition, Recipes (~4 maintain, ~4 cut, ~6 bulk), Daily Routine.

- [ ] **Step 1: Write `fuel-db.test.ts` assertions first** (expect FAIL)

- [ ] **Step 2: Author JSON + schemas + loader until tests PASS**

- [ ] **Step 3: `npm run typecheck` + `npm test`**

- [ ] **Step 4: Commit**

```bash
git add src/schema/fuel.ts src/schema/index.ts src/data/phases.json src/data/recipes.json src/lib/fuel-db.ts src/lib/fuel-db.test.ts
git commit -m "feat: add Bro Fuel phase and recipe data with Zod checks"
```

---

### Task 9: Bro Fuel UI

**Files:**
- Create: `src/components/fuel/PhaseDetail.tsx`, `src/components/fuel/RecipeCard.tsx`
- Modify: `src/components/fuel/BroFuelView.tsx`

**Interfaces:**
- Consumes: `phases`, `getRecipesForPhase` from `fuel-db`
- Produces: phase picker (Maintaining / Cutting / Bulking); detail sections in order: overview, nutrition, staple foods, recipes, daily routine; optional text link “Browse Bro Training” calling `onNavigateToTraining?: () => void`

- [ ] **Step 1: Add `phaseLabel` helper + test in `src/lib/fuel-nav.ts`**

```ts
export function phaseLabel(id: PhaseId): string {
  switch (id) {
    case 'maintaining':
      return 'Maintaining';
    case 'cutting':
      return 'Cutting';
    case 'bulking':
      return 'Bulking';
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}
```

- [ ] **Step 2: Implement PhaseDetail + RecipeCard (no HTML injection — map strings to `<p>` / `<li>`)**

- [ ] **Step 3: Wire BroFuelView + pass navigate callback from App if desired**

- [ ] **Step 4: Verify all three phases render recipes; mobile layout OK**

- [ ] **Step 5: Commit**

```bash
git add src/lib/fuel-nav.ts src/lib/fuel-nav.test.ts src/components/fuel src/App.tsx
git commit -m "feat: add Bro Fuel phase guides and recipes UI"
```

---

### Task 10: Bro Tools data + UI

**Files:**
- Create: `src/schema/tools.ts`
- Create: `src/data/tools.json`
- Create: `src/lib/tools-db.ts`, `src/lib/tools-db.test.ts`
- Create: `src/components/tools/BroToolsView.tsx` (replace placeholder)
- Modify: `src/schema/index.ts`

**Interfaces:**

```ts
export const toolTierSchema = z.enum(['essential', 'advised', 'want', 'alternative']);
export const toolCategorySchema = z.enum([
  'body-composition',
  'nutrition',
  'training',
  'recovery',
]);

export const toolSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  tier: toolTierSchema,
  category: toolCategorySchema,
  tracks: z.string().min(1),
  necessity: z.string().min(1),
  advice: z.string().min(1),
  purchaseReason: z.string().min(1),
  url: z.string().url().optional(),
});
```

Port every `.tool-item` from `Gym-Bro-Recipes/tools.html`. Map HTML categories: Essential→`essential`, Advised→`advised`, Want→`want`, Alternative→`alternative`.

UI: filter by tier; group by category; `ExternalLink` when `url` present.

- [ ] **Step 1: Failing `tools-db.test.ts`** (count ≥ 10, all tiers valid)

- [ ] **Step 2: Author JSON + loader → PASS**

- [ ] **Step 3: BroToolsView UI**

- [ ] **Step 4: Full `npm test` + `npm run lint`**

- [ ] **Step 5: Commit**

```bash
git add src/schema/tools.ts src/data/tools.json src/lib/tools-db.ts src/lib/tools-db.test.ts src/components/tools/BroToolsView.tsx src/schema/index.ts
git commit -m "feat: add Bro Tools catalog and filterable UI"
```

---

### Task 11: Responsive polish + accessibility pass

**Files:**
- Modify: `src/index.css`, `AppShell.tsx`, pillar views as needed

**Interfaces:**
- Consumes: existing components
- Produces: usable layout at 375px / 768px / 1280px; focus-visible styles on nav/buttons; tap targets ≥ 44px where practical

- [ ] **Step 1: List polish checklist in a short comment-free PR note (no code yet) — then implement CSS**

Checklist to satisfy:
- No horizontal scroll on home or pillar pages at 375px
- Mobile nav does not obscure content
- Search inputs full-width on small screens
- Theme toggle reachable on mobile

- [ ] **Step 2: Implement CSS/layout fixes**

- [ ] **Step 3: Run `npm run build` and spot-check `npm run preview`**

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/components
git commit -m "fix: polish responsive shell and touch targets"
```

---

### Task 12: CI, GitHub Pages deploy, README

**Files:**
- Create: `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`
- Modify: `README.md`, `AGENTS.md`

**Interfaces:**
- CI on PR/push: `npm ci`, lint, typecheck, test, build
- Deploy on push to `main`: upload `dist` to GitHub Pages (mirror Training Collection deploy.yml; `base: './'` already set)

- [ ] **Step 1: Add workflow YAML files**

`ci.yml` jobs: checkout, setup-node 20, npm ci, lint, typecheck, test, build.

`deploy.yml`: same pattern as Training Collection `deploy.yml` (configure-pages enablement, upload-pages-artifact, deploy-pages).

- [ ] **Step 2: Finalize README**

Document: product name, three pillars, how to add JSON content, scripts table, note that Training-Collection and Gym-Bro-Recipes are backups, future domain gymbroeffect.com.

`AGENTS.md`: edit JSON under `src/data/`, run tests, Bro naming, do not touch backup repos.

- [ ] **Step 3: Local verify full gate**

Run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Expected: all PASS

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/ci.yml .github/workflows/deploy.yml README.md AGENTS.md
git commit -m "chore: add CI, Pages deploy, and project docs"
```

- [ ] **Step 5: Create GitHub remote and push (when user asks)**

```bash
gh repo create njvanas/Gym-Bro-Effect --private --source=. --remote=origin --push
```

(Adjust visibility/owner if user specifies otherwise. Do not push until explicitly requested.)

---

## Self-review (plan vs spec)

| Spec requirement | Task |
|------------------|------|
| Fresh Vite/React app | 1 |
| Dark default + toggle + volt lime | 2 |
| Home journey + Bro Training / Fuel / Tools | 3 |
| Import training JSON unchanged + Zod | 4 |
| Bro Methods / Routines / Exercises | 5–7 |
| Phases + recipes (no training blocks) | 8–9 |
| Bro Tools Essential/Advised/Want | 10 (`alternative` preserved from source HTML) |
| Secure static rendering / noopener links | 3 (`ExternalLink`), 9 |
| Responsive | 3, 11 |
| CI + Pages POC; domain later | 12 |
| Do not modify backup repos | Global Constraints |

No TBD placeholders. Types for Fuel/Tools defined before UI tasks consume them.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-19-gym-bro-effect-implementation.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks, fast iteration  
2. **Inline Execution** — execute tasks in this session with executing-plans and checkpoints  

Which approach?
