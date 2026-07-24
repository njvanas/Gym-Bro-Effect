# URL routing & visible navigation — Design

**Date:** 2026-07-24  
**Status:** Approved for implementation planning  
**Product:** Gym Bro Effect  
**Deploy:** GitHub Pages POC now; https://gymbroeffect.com/ later

## 1. Goal

Replace in-app React `useState` “routing” with real URL routes so that:

1. Browser **Back / Forward** moves between screens
2. Deep links are **shareable and refresh-safe** on GitHub Pages
3. Navigation is **visibly clearer** via breadcrumbs and stronger in-page hierarchy

## 2. Problem

Today `App` holds `pillar` state; Bro Fuel, Bro Training, and Bro Legends each hold nested screen state. The URL never changes, so history stays on one page and deep content cannot be linked.

## 3. Approach (chosen)

**Clean path routes** with React Router (`BrowserRouter`) plus a GitHub Pages **SPA fallback** (`404.html` → `index.html`).

Rejected alternatives:

- **Hash routes** (`/#/...`) — most bulletproof on Pages, but uglier share URLs and a worse fit for the future custom domain
- **Hand-rolled `pushState`** — avoids a dependency but reinvents nested routes, active links, and testing for little gain

## 4. Route map

IDs reuse existing data identifiers (`styleId`, `routineId`, `PhaseId`).

| Path | Screen |
|------|--------|
| `/` | Home |
| `/training` | Bro Training hub |
| `/training/legends` | Legends browse |
| `/training/legends/:styleId` | Legend detail |
| `/training/legends/:styleId/workout/:routineId` | Workout detail |
| `/training/personal` | My Personal Hevy folders |
| `/training/exercises` | Exercise library |
| `/fuel` | Bro Fuel hub |
| `/fuel/phases/:phaseId` | Phase guide (`maintaining` \| `cutting` \| `bulking` \| `recomposition`) |
| `/fuel/foods` | Foods catalog |
| `/tools` | Bro Tools |
| `/who` | Who is Bro? |

### Out of URL (local UI state only)

- Foods category filter chips
- Tools tier filter toggles
- Exercise search / muscle filters
- Exercise detail modal
- Legends browse query / A–Z (or similar) filters

### Unknown params

Invalid `:styleId`, `:routineId`, or `:phaseId` renders a soft **not found** panel with breadcrumb / link back to the parent list. No crash; no blank main.

## 5. Visible navigation

### Breadcrumbs

- Show on every nested route (not on Home)
- Pattern: `Bro Training › Legends › {Name} › {Workout}` (segments are links to ancestors)
- Compact, text-first control above the page masthead
- Current page segment is plain text (not a link)

### In-page hierarchy

- Nested screens use a dedicated **masthead**: section kicker + title + short lede (align with existing Bro Fuel masthead language where it already exists)
- Shared **← Parent** control that navigates to the previous breadcrumb ancestor (in addition to browser Back)
- Top pillar nav and mobile bottom nav use real `<Link>` elements; `aria-current` / active class from the matched route
- Home journey cards become links to pillar hubs, not `setState` buttons
- Brand control links to `/`

### Filters / modals

Do not appear in breadcrumbs or the URL. Closing a modal or clearing filters does not push history entries.

## 6. Architecture

### Dependencies & entry

- Add `react-router-dom`
- Wrap the app in `BrowserRouter` with `basename={import.meta.env.BASE_URL}` so routes share Vite’s asset base
- `App` (or a thin router module) declares routes; pillar/`useState` switches are removed

### Base path & domains

| Environment | Vite `base` | Example deep URL |
|-------------|-------------|------------------|
| GitHub Pages project site | `/Gym-Bro-Effect/` (or the repo’s Pages path) | `https://<user>.github.io/Gym-Bro-Effect/training/legends/...` |
| Future custom domain | `/` | `https://gymbroeffect.com/training/legends/...` |

Relative `base: './'` is replaced by an absolute base for the Pages project path so path routing and asset URLs stay consistent. Local `npm run dev` / `preview` use the same base (open `/Gym-Bro-Effect/` on the Vite host). Switching to the custom domain is a config change (`base: '/'`), not a route redesign.

### Component boundaries

- `AppShell` reads the active pillar from the location (or a small helper) for active nav styling; receives children from the router outlet
- Shared `Breadcrumbs` component built from a small list of `{ label, to? }` crumbs derived per route
- Training / Fuel / Legends views become route-driven pages (or thin wrappers) instead of nested `useState` screen machines
- Cross-pillar CTAs (e.g. Fuel → Training) become `<Link>`s

### Data & labels

- Resolve `:styleId` / `:routineId` / `:phaseId` through existing `src/lib/*-db` helpers
- Breadcrumb labels use display names from data (athlete/style name, routine name, phase label), not raw ids

## 7. GitHub Pages SPA fallback

GitHub Pages has no server rewrite rules. Deep path refresh would 404 without a fallback.

**Deploy change:** after `vite build`, copy `dist/index.html` to `dist/404.html` (in the deploy workflow or a small postbuild step) so unknown paths serve the SPA shell; React Router then renders the correct route.

No change to backup repos. Keep Pages artifact upload of `dist`.

## 8. Error handling & edge cases

| Case | Behavior |
|------|----------|
| Unknown route path | Catch-all → soft not found + link Home |
| Known path, missing entity id | Soft not found + breadcrumb to parent |
| Direct load of deep URL | SPA fallback + client match → same screen as in-app navigation |
| Browser Back from workout → legend → browse | One history entry per route change |

## 9. Testing

- Unit tests for route path helpers / crumb builders where logic is non-trivial
- Update or add smoke tests that assert key paths resolve (home, training hub, a legend path shape, a fuel phase path)
- Manual / preview check: deep-link refresh on a nested path after build + `404.html` present
- Existing content/schema tests remain unchanged

## 10. Out of scope

- Server-side rendering or a non-static host
- Putting filters, search queries, or modals in the URL
- Changing training/fuel/tools JSON content or schemas for this pass
- Custom domain cutover itself (document the `base: '/'` switch only)

## 11. Success criteria

- Back / Forward traverse nested screens correctly
- Sharing or refreshing a deep URL lands on the same screen
- Nested screens show breadcrumbs and a clear masthead hierarchy
- Pillar nav uses real links with correct active state
- GitHub Pages deploy continues to work with SPA fallback
- Lint, typecheck, test, and build stay green
