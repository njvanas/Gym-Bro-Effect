# URL Routing & Visible Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace React `useState` screen switching with clean URL routes, browser history, GitHub Pages–safe deep links, breadcrumbs, and clearer nested page hierarchy.

**Architecture:** Add `react-router-dom` with `BrowserRouter` (`basename` from Vite `BASE_URL`), declare routes for every practical screen, drive Training/Fuel/Legends from `useParams`/`Link` instead of nested state, add shared `Breadcrumbs` + back control, and ship `dist/404.html` (= `index.html`) so GitHub Pages refreshes work.

**Tech Stack:** Vite 5, React 18, TypeScript 5, react-router-dom 6, Vitest, existing Zod-validated `src/data/` + `src/lib/*-db` helpers.

**Spec:** `docs/superpowers/specs/2026-07-24-url-routing-navigation-design.md`

## Global Constraints

- Prefer editing validated JSON in `src/data/` over hardcoding content in components — **do not change JSON/schemas for this pass**.
- Never modify backup repos `Training-Collection` or `Gym-Bro-Recipes`.
- External links must use `ExternalLink` / `rel="noopener noreferrer"`.
- No `dangerouslySetInnerHTML` for guide/recipe copy.
- Exhaustive `switch` + `never` for unions/enums.
- Filters, search, and modals stay **out of the URL**.
- Before finishing: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

---

## File structure (target)

```
src/
├── main.tsx                         # BrowserRouter + basename
├── App.tsx                          # <Routes> tree inside AppShell layout
├── vite.config.ts                   # base: '/Gym-Bro-Effect/'
├── package.json                     # react-router-dom; postbuild 404 copy
├── lib/
│   ├── routes.ts                    # NEW path helpers + pillarFromPathname
│   ├── routes.test.ts               # NEW
│   ├── crumbs.ts                    # NEW crumb builders for nested screens
│   └── crumbs.test.ts               # NEW
├── components/
│   ├── AppShell.tsx                 # Link-based pillar nav; <Outlet />
│   ├── Breadcrumbs.tsx              # NEW
│   ├── NotFoundView.tsx             # NEW soft 404 / unknown entity
│   ├── HomeView.tsx                 # Link journey cards
│   ├── fuel/
│   │   ├── BroFuelView.tsx          # hub only (or FuelHubPage)
│   │   ├── FuelPhasePage.tsx        # NEW route wrapper for phase
│   │   └── FuelFoodsPage.tsx        # NEW route wrapper for foods
│   └── training/
│       ├── BroTrainingView.tsx      # hub + overview/exercises sub-nav Links
│       ├── BroLegendsView.tsx       # browse-only (detail/workout extracted)
│       ├── LegendDetailPage.tsx     # NEW (or keep LegendDetail + route page)
│       ├── WorkoutDetailPage.tsx    # NEW
│       ├── BroPersonalView.tsx      # Link back
│       └── BroExercisesView.tsx     # unchanged filters; route-mounted
.github/workflows/deploy.yml         # ensure 404.html in artifact (if not postbuild)
```

Keep existing visual language (`.section-masthead`, `.back`, volt accent). Add minimal `.breadcrumbs` CSS.

---

### Task 1: Route path helpers (TDD)

**Files:**
- Create: `src/lib/routes.ts`
- Create: `src/lib/routes.test.ts`
- Test: `src/lib/routes.test.ts`

**Interfaces:**
- Consumes: `Pillar` from `src/lib/nav.ts`; `PhaseId` from `src/schema`
- Produces:
  - `paths` object with string builders listed below
  - `pillarFromPathname(pathname: string): Pillar`
  - `isPhaseId(value: string): value is PhaseId`

```ts
// paths shape (exact keys)
paths.home                              // '/'
paths.training                          // '/training'
paths.trainingLegends                   // '/training/legends'
paths.trainingLegend(styleId)           // `/training/legends/${styleId}`
paths.trainingWorkout(styleId, routineId)
paths.trainingPersonal                  // '/training/personal'
paths.trainingExercises                 // '/training/exercises'
paths.fuel                              // '/fuel'
paths.fuelPhase(phaseId)                // `/fuel/phases/${phaseId}`
paths.fuelFoods                         // '/fuel/foods'
paths.tools                             // '/tools'
paths.who                               // '/who'
```

- [ ] **Step 1: Write the failing test**

Create `src/lib/routes.test.ts`:

```ts
import { describe, expect, it } from 'vitest';

import { isPhaseId, paths, pillarFromPathname } from './routes';

describe('paths', () => {
  it('builds deep training and fuel URLs', () => {
    expect(paths.home).toBe('/');
    expect(paths.trainingLegend('arnold-golden-era')).toBe(
      '/training/legends/arnold-golden-era',
    );
    expect(paths.trainingWorkout('arnold-golden-era', 'arnold-chest-back')).toBe(
      '/training/legends/arnold-golden-era/workout/arnold-chest-back',
    );
    expect(paths.fuelPhase('cutting')).toBe('/fuel/phases/cutting');
  });
});

describe('pillarFromPathname', () => {
  it('maps pathname prefixes to pillars', () => {
    expect(pillarFromPathname('/')).toBe('home');
    expect(pillarFromPathname('/training/legends/arnold-golden-era')).toBe(
      'training',
    );
    expect(pillarFromPathname('/fuel/foods')).toBe('fuel');
    expect(pillarFromPathname('/tools')).toBe('tools');
    expect(pillarFromPathname('/who')).toBe('who');
    expect(pillarFromPathname('/nope')).toBe('home');
  });
});

describe('isPhaseId', () => {
  it('accepts known phase ids only', () => {
    expect(isPhaseId('bulking')).toBe(true);
    expect(isPhaseId('nope')).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/routes.test.ts`

Expected: FAIL (module not found / exports missing)

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/routes.ts`:

```ts
import type { PhaseId } from '../schema';
import type { Pillar } from './nav';

const PHASE_IDS: readonly PhaseId[] = [
  'maintaining',
  'cutting',
  'bulking',
  'recomposition',
];

export function isPhaseId(value: string): value is PhaseId {
  return (PHASE_IDS as readonly string[]).includes(value);
}

export const paths = {
  home: '/',
  training: '/training',
  trainingLegends: '/training/legends',
  trainingLegend: (styleId: string) => `/training/legends/${styleId}`,
  trainingWorkout: (styleId: string, routineId: string) =>
    `/training/legends/${styleId}/workout/${routineId}`,
  trainingPersonal: '/training/personal',
  trainingExercises: '/training/exercises',
  fuel: '/fuel',
  fuelPhase: (phaseId: PhaseId) => `/fuel/phases/${phaseId}`,
  fuelFoods: '/fuel/foods',
  tools: '/tools',
  who: '/who',
} as const;

/** `pathname` is React Router's location.pathname (no Vite basename). */
export function pillarFromPathname(pathname: string): Pillar {
  if (pathname === '/' || pathname === '') return 'home';
  if (pathname === '/who' || pathname.startsWith('/who/')) return 'who';
  if (pathname === '/tools' || pathname.startsWith('/tools/')) return 'tools';
  if (pathname === '/fuel' || pathname.startsWith('/fuel/')) return 'fuel';
  if (pathname === '/training' || pathname.startsWith('/training/')) {
    return 'training';
  }
  return 'home';
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/routes.test.ts`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/routes.ts src/lib/routes.test.ts
git commit -m "feat(nav): add URL path helpers for deep links"
```

---

### Task 2: Crumb builders (TDD)

**Files:**
- Create: `src/lib/crumbs.ts`
- Create: `src/lib/crumbs.test.ts`
- Test: `src/lib/crumbs.test.ts`

**Interfaces:**
- Consumes: `paths` from `./routes`; `phaseLabel` from `./fuel-nav`; optionally display names passed in (do not import heavy UI)
- Produces:
  - `export type Crumb = { label: string; to?: string }`
  - `trainingLegendCrumbs(styleName: string, styleId: string): Crumb[]`
  - `trainingWorkoutCrumbs(styleName: string, styleId: string, workoutName: string): Crumb[]`
  - `fuelPhaseCrumbs(phaseId: PhaseId): Crumb[]`
  - `fuelFoodsCrumbs(): Crumb[]`
  - `trainingPersonalCrumbs(): Crumb[]`
  - `trainingExercisesCrumbs(): Crumb[]`
  - `trainingLegendsBrowseCrumbs(): Crumb[]`

Last crumb has **no** `to` (current page). Ancestors use `paths.*`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest';

import {
  fuelFoodsCrumbs,
  fuelPhaseCrumbs,
  trainingLegendCrumbs,
  trainingWorkoutCrumbs,
} from './crumbs';

describe('crumbs', () => {
  it('builds legend detail crumbs', () => {
    expect(trainingLegendCrumbs('Golden Era Volume', 'arnold-golden-era')).toEqual([
      { label: 'Bro Training', to: '/training' },
      { label: 'Legends', to: '/training/legends' },
      { label: 'Golden Era Volume' },
    ]);
  });

  it('builds workout crumbs', () => {
    expect(
      trainingWorkoutCrumbs(
        'Golden Era Volume',
        'arnold-golden-era',
        'Competitive Split - Chest & Back',
      ),
    ).toEqual([
      { label: 'Bro Training', to: '/training' },
      { label: 'Legends', to: '/training/legends' },
      { label: 'Golden Era Volume', to: '/training/legends/arnold-golden-era' },
      { label: 'Competitive Split - Chest & Back' },
    ]);
  });

  it('builds fuel phase and foods crumbs', () => {
    expect(fuelPhaseCrumbs('cutting')).toEqual([
      { label: 'Bro Fuel', to: '/fuel' },
      { label: 'Cutting' },
    ]);
    expect(fuelFoodsCrumbs()).toEqual([
      { label: 'Bro Fuel', to: '/fuel' },
      { label: 'Foods' },
    ]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/crumbs.test.ts`

Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

Implement `src/lib/crumbs.ts` with the helpers above using `paths` and `phaseLabel`. Also implement `trainingPersonalCrumbs`, `trainingExercisesCrumbs`, `trainingLegendsBrowseCrumbs` (same pattern: Training → leaf).

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/crumbs.test.ts`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/crumbs.ts src/lib/crumbs.test.ts
git commit -m "feat(nav): add breadcrumb builders for nested routes"
```

---

### Task 3: Install router, Vite base, SPA 404 fallback

**Files:**
- Modify: `package.json` (dependency + `postbuild` script)
- Modify: `vite.config.ts`
- Modify: `src/main.tsx`
- Modify: `.github/workflows/deploy.yml` only if postbuild is not enough (prefer postbuild)

**Interfaces:**
- Consumes: none
- Produces: app boots inside `BrowserRouter`; `import.meta.env.BASE_URL` === `/Gym-Bro-Effect/`; `npm run build` writes `dist/404.html`

- [ ] **Step 1: Install react-router-dom**

```bash
npm install react-router-dom@6
```

- [ ] **Step 2: Set Vite base**

In `vite.config.ts`, change:

```ts
base: '/Gym-Bro-Effect/',
```

(Keep the comment that custom domain later uses `base: '/'`.)

- [ ] **Step 3: Add postbuild 404 copy**

In `package.json` scripts:

```json
"build": "tsc -b && vite build && node scripts/copy-spa-404.mjs"
```

Create `scripts/copy-spa-404.mjs`:

```js
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve('dist');
const index = resolve(dist, 'index.html');
const notFound = resolve(dist, '404.html');

if (!existsSync(index)) {
  console.error('dist/index.html missing — run vite build first');
  process.exit(1);
}

copyFileSync(index, notFound);
console.log('Wrote dist/404.html for GitHub Pages SPA fallback');
```

- [ ] **Step 4: Wrap app in BrowserRouter**

Update `src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { applyTheme, getStoredTheme } from './lib/theme';
import './index.css';

applyTheme(getStoredTheme());

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found');

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

Do **not** wire all routes yet — `App` can still use state until Task 4, but Router must wrap so later `<Link>` works. If App still uses state-only, that is OK for this commit as long as the app renders at `/Gym-Bro-Effect/` in dev.

- [ ] **Step 5: Verify build writes 404.html**

Run: `npm run build`

Expected: success; `dist/404.html` exists

Run: `npm test`

Expected: PASS (existing + Task 1–2)

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vite.config.ts src/main.tsx scripts/copy-spa-404.mjs
git commit -m "chore: add react-router, Pages base path, and SPA 404 fallback"
```

---

### Task 4: Breadcrumbs UI + NotFoundView

**Files:**
- Create: `src/components/Breadcrumbs.tsx`
- Create: `src/components/NotFoundView.tsx`
- Modify: `src/index.css` (append breadcrumbs styles near `.back`)

**Interfaces:**
- Consumes: `Crumb` from `src/lib/crumbs.ts`; `Link` from react-router-dom; `paths`
- Produces:
  - `Breadcrumbs({ items: Crumb[] })`
  - `NotFoundView({ title?: string; parentLabel: string; parentTo: string })`

- [ ] **Step 1: Implement Breadcrumbs**

```tsx
import { Link } from 'react-router-dom';

import type { Crumb } from '../lib/crumbs';

type BreadcrumbsProps = { items: Crumb[] };

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li className="breadcrumbs-item" key={`${item.label}-${index}`}>
              {index > 0 ? (
                <span className="breadcrumbs-sep" aria-hidden="true">
                  ›
                </span>
              ) : null}
              {item.to && !isLast ? (
                <Link className="breadcrumbs-link" to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumbs-current" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

- [ ] **Step 2: Implement NotFoundView**

```tsx
import { Link } from 'react-router-dom';

import { Breadcrumbs } from './Breadcrumbs';

type NotFoundViewProps = {
  title?: string;
  parentLabel: string;
  parentTo: string;
  crumbs?: { label: string; to?: string }[];
};

export function NotFoundView({
  title = 'Not found',
  parentLabel,
  parentTo,
  crumbs,
}: NotFoundViewProps) {
  return (
    <section className="stack">
      {crumbs && crumbs.length > 0 ? <Breadcrumbs items={crumbs} /> : null}
      <Link className="back" to={parentTo}>
        ← {parentLabel}
      </Link>
      <header className="section-masthead">
        <p className="section-kicker">Missing page</p>
        <h2 className="section-display-title">{title}</h2>
        <p className="section-lede">
          That link does not match anything in the catalog. Head back and try another path.
        </p>
      </header>
    </section>
  );
}
```

- [ ] **Step 3: Add CSS**

Append to `src/index.css`:

```css
.breadcrumbs {
  margin: 0 0 0.75rem;
}

.breadcrumbs-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.breadcrumbs-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.breadcrumbs-sep {
  opacity: 0.7;
}

.breadcrumbs-link {
  color: var(--accent-ink);
  text-decoration: none;
}

.breadcrumbs-link:hover {
  text-decoration: underline;
}

.breadcrumbs-current {
  color: var(--text);
  font-weight: 600;
}

a.back {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}
```

(Ensure `a.back` inherits existing `.back` button look.)

- [ ] **Step 4: Typecheck**

Run: `npm run typecheck`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Breadcrumbs.tsx src/components/NotFoundView.tsx src/index.css
git commit -m "feat(nav): add Breadcrumbs and soft NotFound views"
```

---

### Task 5: AppShell + App route tree (pillars)

**Files:**
- Modify: `src/components/AppShell.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/HomeView.tsx`

**Interfaces:**
- Consumes: `paths`, `pillarFromPathname`; `Outlet`, `Link`, `useLocation` from react-router-dom
- Produces: all pillar hubs reachable via URL; shell active state from pathname

- [ ] **Step 1: Convert AppShell to Links + Outlet**

Replace props `pillar` / `onNavigate` / `children` with router-driven shell:

```tsx
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { pillarLabel, type Pillar } from '../lib/nav';
import { paths, pillarFromPathname } from '../lib/routes';
import { BackgroundBros } from './BackgroundBros';
import { IconBackdrop } from './IconBackdrop';
import { ThemeToggle } from './ThemeToggle';

const pillars: Pillar[] = ['home', 'training', 'fuel', 'tools', 'who'];

function pillarPath(pillar: Pillar): string {
  switch (pillar) {
    case 'home':
      return paths.home;
    case 'training':
      return paths.training;
    case 'fuel':
      return paths.fuel;
    case 'tools':
      return paths.tools;
    case 'who':
      return paths.who;
    default: {
      const _exhaustive: never = pillar;
      return _exhaustive;
    }
  }
}

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const pillar = pillarFromPathname(pathname);

  return (
    <div className="app-shell">
      <IconBackdrop />
      <BackgroundBros />
      <header className="app-header">
        <Link className="brand" to={paths.home} onClick={() => setMenuOpen(false)}>
          Gym Bro Effect
        </Link>
        {/* menu toggle unchanged */}
        <nav id="primary-nav" className={menuOpen ? 'pillar-nav open' : 'pillar-nav'} aria-label="Primary navigation">
          {pillars.map((item) => (
            <Link
              key={item}
              className={item === pillar ? 'nav-link active' : 'nav-link'}
              to={pillarPath(item)}
              aria-current={item === pillar ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {pillarLabel(item)}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <nav className="bottom-nav" aria-label="Mobile navigation">
        {pillars.map((item) => (
          <Link
            key={item}
            className={item === pillar ? 'nav-link active' : 'nav-link'}
            to={pillarPath(item)}
            aria-current={item === pillar ? 'page' : undefined}
          >
            {pillarLabel(item)}
          </Link>
        ))}
      </nav>
    </div>
  );
}
```

Keep the existing menu-toggle button markup; only swap nav buttons → Links and children → Outlet.

- [ ] **Step 2: Rewrite App.tsx routes**

```tsx
import { Route, Routes } from 'react-router-dom';

import { AppShell } from './components/AppShell';
import { HomeView } from './components/HomeView';
import { NotFoundView } from './components/NotFoundView';
import { WhoIsBroView } from './components/WhoIsBroView';
import { BroFuelView } from './components/fuel/BroFuelView';
import { FuelFoodsPage } from './components/fuel/FuelFoodsPage';
import { FuelPhasePage } from './components/fuel/FuelPhasePage';
import { BroToolsView } from './components/tools/BroToolsView';
import { BroExercisesView } from './components/training/BroExercisesView';
import { BroLegendsView } from './components/training/BroLegendsView';
import { BroPersonalView } from './components/training/BroPersonalView';
import { BroTrainingView } from './components/training/BroTrainingView';
import { LegendDetailPage } from './components/training/LegendDetailPage';
import { WorkoutDetailPage } from './components/training/WorkoutDetailPage';
import { paths } from './lib/routes';

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomeView />} />
        <Route path="training" element={<BroTrainingView />} />
        <Route path="training/legends" element={<BroLegendsView />} />
        <Route path="training/legends/:styleId" element={<LegendDetailPage />} />
        <Route
          path="training/legends/:styleId/workout/:routineId"
          element={<WorkoutDetailPage />}
        />
        <Route path="training/personal" element={<BroPersonalView />} />
        <Route path="training/exercises" element={<BroExercisesView />} />
        <Route path="fuel" element={<BroFuelView />} />
        <Route path="fuel/phases/:phaseId" element={<FuelPhasePage />} />
        <Route path="fuel/foods" element={<FuelFoodsPage />} />
        <Route path="tools" element={<BroToolsView />} />
        <Route path="who" element={<WhoIsBroView />} />
        <Route
          path="*"
          element={
            <NotFoundView parentLabel="Home" parentTo={paths.home} title="Page not found" />
          }
        />
      </Route>
    </Routes>
  );
}
```

If page components from later tasks are not ready yet, implement **stubs** in the same commit that immediately re-export existing view behavior, then flesh them in Tasks 6–7 — prefer completing Fuel stubs in Task 6 and Legends in Task 7 in order. **For this task:** wire home, tools, who, and training/fuel hubs that still work with temporary in-file Links even if deep pages come next.

Practical order inside this task: change AppShell + HomeView + App routes for hubs that already exist as top-level views (`BroToolsView`, `WhoIsBroView`, and temporarily keep `BroFuelView` / `BroTrainingView` / `BroLegendsView` working via their old internal state **only if** you have not yet split them — but the goal is to remove state in Tasks 6–7. Minimum for Task 5: shell Links + Home + tools + who + catch-all; training/fuel can still mount hub components.

- [ ] **Step 3: Convert HomeView to Links**

Remove `onNavigate` prop. Use `Link` with `paths.training` etc. Keep `journey-card` class on the Link (update CSS if `button.journey-card` selectors need `a.journey-card`).

- [ ] **Step 4: Fix brand/nav CSS for anchors**

Ensure `.brand`, `.nav-link` styles apply to `a` as well as `button` (add `a.brand`, `a.nav-link` if needed).

- [ ] **Step 5: Manual smoke**

Run: `npm run dev`

Open `http://localhost:5173/Gym-Bro-Effect/` — pillar Links change the URL; Back/Forward works between Home ↔ Tools ↔ Who.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/components/AppShell.tsx src/components/HomeView.tsx src/index.css
git commit -m "feat(nav): wire AppShell and pillar routes to the URL"
```

---

### Task 6: Bro Fuel route pages

**Files:**
- Modify: `src/components/fuel/BroFuelView.tsx` (hub only)
- Create: `src/components/fuel/FuelPhasePage.tsx`
- Create: `src/components/fuel/FuelFoodsPage.tsx`
- Modify: `src/App.tsx` (ensure fuel routes point here — already listed in Task 5)

**Interfaces:**
- Consumes: `paths`, `isPhaseId`, crumb helpers, `getPhase` / `phases`, `Breadcrumbs`, `NotFoundView`, `PhaseDetail`, `FoodsCatalog`, `Link`
- Produces: `/fuel`, `/fuel/phases/:phaseId`, `/fuel/foods` fully URL-driven

- [ ] **Step 1: Slim BroFuelView to hub**

Remove `useState` / `FuelScreen`. Hub cards become:

```tsx
<Link className="training-hub-card fuel-hub-card" to={paths.fuelFoods}>...</Link>
<Link className={`training-hub-card fuel-hub-card fuel-hub-card--${item.id}`} to={paths.fuelPhase(item.id)}>...</Link>
```

Cross-link to training: `<Link className="text-link" to={paths.training}>Browse Bro Training →</Link>` (drop `onNavigateToTraining` prop).

- [ ] **Step 2: FuelPhasePage**

```tsx
import { Link, useParams } from 'react-router-dom';

import { getPhase } from '../../lib/fuel-db';
import { fuelPhaseCrumbs } from '../../lib/crumbs';
import { isPhaseId, paths } from '../../lib/routes';
import { Breadcrumbs } from '../Breadcrumbs';
import { NotFoundView } from '../NotFoundView';
import { PhaseDetail } from './PhaseDetail';

export function FuelPhasePage() {
  const { phaseId = '' } = useParams();
  if (!isPhaseId(phaseId)) {
    return (
      <NotFoundView
        title="Phase not found"
        parentLabel="Bro Fuel"
        parentTo={paths.fuel}
        crumbs={[{ label: 'Bro Fuel', to: paths.fuel }, { label: 'Unknown phase' }]}
      />
    );
  }
  const phase = getPhase(phaseId);
  if (!phase) {
    return (
      <NotFoundView
        title="Phase not found"
        parentLabel="Bro Fuel"
        parentTo={paths.fuel}
        crumbs={fuelPhaseCrumbs(phaseId)}
      />
    );
  }

  return (
    <section className="stack fuel-section">
      <Breadcrumbs items={fuelPhaseCrumbs(phaseId)} />
      <Link className="back" to={paths.fuel}>
        ← Bro Fuel
      </Link>
      <PhaseDetail phase={phase} onBrowseFoodsPath={paths.fuelFoods} />
      <Link className="text-link" to={paths.training}>
        Browse Bro Training →
      </Link>
    </section>
  );
}
```

Update `PhaseDetail` so “browse foods” uses `Link`/`to` (rename prop from callback to `foodsTo: string`) instead of `onBrowseFoods` callback.

- [ ] **Step 3: FuelFoodsPage**

Same pattern: breadcrumbs via `fuelFoodsCrumbs()`, back Link to `paths.fuel`, render `<FoodsCatalog />`.

- [ ] **Step 4: Run checks**

Run: `npm run typecheck` && `npm test`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/fuel src/App.tsx
git commit -m "feat(fuel): deep-link phases and foods catalog"
```

---

### Task 7: Bro Training hub + personal + exercises routes

**Files:**
- Modify: `src/components/training/BroTrainingView.tsx`
- Modify: `src/components/training/BroPersonalView.tsx`
- Modify: `src/components/training/BroExercisesView.tsx` (wrap with crumbs/back only if needed)
- Modify: `src/App.tsx` (routes already planned)

**Interfaces:**
- Consumes: `paths`, crumb helpers, `Link`, `NavLink` or `Link` + pathname
- Produces: `/training`, `/training/personal`, `/training/exercises` URL-driven

- [ ] **Step 1: BroTrainingView hub only**

Remove `TrainingSub` state. Hub cards:

- Legends → `Link` to `paths.trainingLegends`
- Personal → `Link` to `paths.trainingPersonal`

Sub-nav tabs: Overview → `paths.training`, Exercises → `paths.trainingExercises`. Active when pathname matches (use `useLocation`). On legends/personal routes, Overview stays visually active **or** hide hub sub-nav on those pages (prefer: sub-nav only on `/training` and `/training/exercises` pages — put sub-nav in a small shared `TrainingSectionNav` used by hub + exercises pages).

- [ ] **Step 2: BroPersonalView**

Remove `onBack` callback. Add:

```tsx
<Breadcrumbs items={trainingPersonalCrumbs()} />
<Link className="back" to={paths.training}>← Bro Training</Link>
```

- [ ] **Step 3: BroExercisesView page chrome**

At top of section:

```tsx
<Breadcrumbs items={trainingExercisesCrumbs()} />
```

Keep search/muscle/modal state local (no URL). Include `TrainingSectionNav` so Overview/Exercises tabs still work.

- [ ] **Step 4: Typecheck + commit**

```bash
npm run typecheck
git add src/components/training/BroTrainingView.tsx src/components/training/BroPersonalView.tsx src/components/training/BroExercisesView.tsx
git commit -m "feat(training): route hub, personal, and exercises pages"
```

---

### Task 8: Legends browse + detail + workout deep links

**Files:**
- Modify: `src/components/training/BroLegendsView.tsx` (browse only; remove `View` state machine)
- Create: `src/components/training/LegendDetailPage.tsx`
- Create: `src/components/training/WorkoutDetailPage.tsx`
- Keep `LegendDetail` / workout detail presentational components in `BroLegendsView.tsx` **or** move to sibling files if the file is too large — prefer extracting to `LegendDetail.tsx` / `WorkoutDetail.tsx` if >~400 lines of presentational UI already exists

**Interfaces:**
- Consumes: `useParams`, `Link`, `getStyle`, `getRoutine`, crumb helpers, `NotFoundView`
- Produces: `/training/legends`, `/training/legends/:styleId`, `/training/legends/:styleId/workout/:routineId`

- [ ] **Step 1: BroLegendsView = browse list only**

- Add breadcrumbs: `trainingLegendsBrowseCrumbs()`
- Back link to `paths.training`
- Each bodybuilder/style card: `Link` to `paths.trainingLegend(styleId)` (replace `setView`)
- Keep query / filter state local

- [ ] **Step 2: LegendDetailPage**

```tsx
export function LegendDetailPage() {
  const { styleId = '' } = useParams();
  const style = getStyle(styleId);
  if (!style) {
    return (
      <NotFoundView
        title="Legend not found"
        parentLabel="Legends"
        parentTo={paths.trainingLegends}
        crumbs={[
          { label: 'Bro Training', to: paths.training },
          { label: 'Legends', to: paths.trainingLegends },
          { label: 'Unknown' },
        ]}
      />
    );
  }

  return (
    <section className="stack">
      <Breadcrumbs items={trainingLegendCrumbs(style.name, style.id)} />
      <LegendDetail
        style={style}
        backTo={paths.trainingLegends}
        workoutTo={(routineId) => paths.trainingWorkout(style.id, routineId)}
      />
    </section>
  );
}
```

Refactor `LegendDetail` props: replace `onBack` / `onOpenWorkout` with `backTo: string` and `workoutTo: (routineId: string) => string` using `Link`s.

- [ ] **Step 3: WorkoutDetailPage**

- Resolve `styleId` + `routineId`
- If style missing, routine missing, or `routine.styleId !== styleId`, show `NotFoundView` parented to legends or legend detail
- Else render existing workout detail UI with crumbs `trainingWorkoutCrumbs(style.name, style.id, routine.name)` and back `Link` to `paths.trainingLegend(style.id)`

- [ ] **Step 4: Manual deep-link check**

Dev server:

1. Open `/Gym-Bro-Effect/training/legends/arnold-golden-era`
2. Open a workout URL
3. Browser Back returns to legend, then browse
4. Refresh on workout URL still shows workout (will fully work on Pages after 404.html; Vite preview serves SPA fallback differently — confirm client route match at least)

- [ ] **Step 5: Commit**

```bash
git add src/components/training src/App.tsx
git commit -m "feat(training): deep-link Bro Legends and workouts"
```

---

### Task 9: Wire remaining App routes + CSS polish + verification

**Files:**
- Modify: `src/App.tsx` (ensure all Task 5 routes import real pages)
- Modify: `src/index.css` (journey-card / nav-link / back as anchors)
- Modify: `README.md` only if it documents `base: './'` — update to `/Gym-Bro-Effect/` and note custom domain `/`

**Interfaces:**
- Consumes: all prior pages
- Produces: green lint/typecheck/test/build; `dist/404.html` present

- [ ] **Step 1: Grep for leftover state routers**

Search for `setPillar`, `setScreen`, `setSub`, `onNavigate`, `FuelScreen`, `TrainingSub`, and `setView({ kind` in `src/`. Remove leftovers.

- [ ] **Step 2: Full verification**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Expected: all green; `dist/404.html` exists and matches `dist/index.html`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(nav): finish URL routing polish and verification"
```

(Only stage intentional source/docs changes — do not commit `legends-week-batch2.json` or `scripts/ah-images-result.json` unless they are part of this work.)

---

## Self-review (plan vs spec)

| Spec requirement | Task |
|------------------|------|
| Clean path routes + BrowserRouter + basename | 3, 5 |
| Full deep route map | 5–8 |
| Filters/modals out of URL | 6–8 (explicit) |
| Soft not found | 4, 6, 8 |
| Breadcrumbs + back + mastheads | 2, 4, 6–8 |
| Pillar/home Links | 5 |
| Vite base for Pages + custom domain note | 3, 9 |
| `404.html` SPA fallback | 3, 9 |
| Tests for helpers | 1, 2 |
| lint/typecheck/test/build | 9 |

No intentional placeholders remain. Crumb helper names in Tasks 6–8 match Task 2. Sample ids `arnold-golden-era` / `arnold-chest-back` exist in `src/data/`.
