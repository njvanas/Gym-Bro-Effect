# Gym Bro Effect — Consolidation Design

**Date:** 2026-07-19  
**Status:** Approved for implementation planning  
**Product:** Gym Bro Effect  
**Future domain:** https://gymbroeffect.com/ (not live yet; GitHub Pages POC first)

## 1. Goal

Build a **fresh** central app for people who want to change their lives or pursue bodybuilding. It consolidates:

- **Training Collection** — methodologies, personal Hevy routines, exercise DB (data preserved as-is)
- **Gym Bro Recipes** — phase guides (Maintaining / Cutting / Bulking), nutrition, recipes, tools

**Backup policy:** Existing repos `Training-Collection` and `Gym-Bro-Recipes` remain untouched as solid backups. This repo is the new product home.

## 2. Approach

**Fresh Vite + React + TypeScript app** (not a clone of Training Collection’s UI).

- Import training JSON and schemas from Training Collection without changing workout truth
- Port Gym Bro Recipes HTML content into new validated JSON + React views
- New journey-first layout, Bro naming, dark-first theme with volt lime accent

## 3. Information architecture

### Top-level navigation (three pillars)

| Pillar | Role |
|--------|------|
| **Bro Training** | Methods, routines, exercises |
| **Bro Fuel** | Phase nutrition, recipes, daily schedules |
| **Bro Tools** | Gear and apps (Essential / Advised / Want) |

Training and Fuel are **fully separate**. Fuel choice (surplus vs deficit) drives growth or fat loss; Bro Fuel does **not** embed full workout plans, and Bro Training does **not** embed recipes.

### Home

Single composition entry: brand **Gym Bro Effect**, one short journey pitch, three clear paths into Bro Training / Bro Fuel / Bro Tools. Not a dense dashboard.

### Bro Training (sub-nav)

- **Bro Methods** — former Iron Legends methodologies (UI copy may say “styles”; nav label is Bro Methods)
- **Bro Routines** — personal Hevy collection + legend reference routines
- **Bro Exercises** — searchable exercise library

### Bro Fuel (sub-nav)

Phase picker: **Maintaining** · **Cutting** · **Bulking**

Per phase (content only; no full training blocks):

- Overview / mindset
- Macros and nutrition guidelines
- Staple foods
- Recipes (linked to that phase)
- Daily routine / schedule

Optional cross-links only (e.g. “Browse Bro Training for methods”) — never duplicate routine JSON inside Fuel.

### Bro Tools

Port of Gym Bro `tools.html` items with tiers: Essential, Advised, Want.

## 4. Visual design

- **Default theme:** Dark mode on first visit; preference in `localStorage`; light mode available via toggle
- **Accent:** Volt lime (energy / growth)
- **Surfaces:** Near-black charcoal background, elevated slate panels, off-white / muted text hierarchy, subtle cool borders
- **Light mode:** Same layout and accent; inverted surfaces
- **Typography:** Distinct display + body fonts (not Inter / Roboto / system-only stacks)
- **Avoid:** Purple glow themes, cream/terracotta brochure look, cluttered hero overlays

## 5. Data model

### Imported unchanged (from Training Collection)

| File | Content |
|------|---------|
| `styles.json` | Training methodologies (Bro Methods) |
| `exercises.json` | Exercise DB |
| `routines.json` | Legend + personal routines |
| `my-collection.json` | Hevy folder catalog |

Zod schemas and referential integrity rules for these stay equivalent to Training Collection. UI labels rename Iron Legends → Bro Methods / Bro Styles; data IDs and workout content stay stable.

### New (ported from Gym Bro Recipes)

| File | Content |
|------|---------|
| `phases.json` | Maintaining / Cutting / Bulking guides (overview, macros, foods, daily routine) |
| `recipes.json` | Recipes with phase link, macros, ingredients, steps |
| `tools.json` | Bro Tools catalog with tier |

Loaders live alongside training loaders; Fuel/Tools integrity checks do not mutate training validation.

### Out of scope for Fuel JSON

- Full HIT / phase-specific workout tables from Gym Bro HTML (especially bulking modal)
- Incomplete “add your routine here” placeholders from maintaining/cutting pages

Those belong in Bro Training (already covered by imported data) or are dropped as incomplete.

## 6. Engineering standards

### Stack

- Vite + React 18 + TypeScript (strict)
- Zod at JSON boundaries
- Vitest for schema + integrity tests
- ESLint; CI runs lint, typecheck, test, build
- GitHub Pages for POC deploy; custom domain later

### Security (static app)

- No backend, no auth, no secrets in repo for the POC
- Render all guide/recipe copy as structured React text — no `dangerouslySetInnerHTML` for content
- External links use `rel="noopener noreferrer"`
- Lockfile + CI dependency checks
- When moving to gymbroeffect.com: HTTPS and host security headers suitable for a static SPA

### Responsive UX

- Mobile-first shell: collapsible or bottom nav on small screens; full top nav on desktop
- Touch-friendly controls; readable type; no horizontal overflow traps
- Search/filter usable on narrow viewports

### Code habits

- Pillar-focused components; shared layout/theme primitives
- Exhaustive switches for tabs, phases, tool tiers
- Imports at top of modules
- Verify lint, typecheck, test, and build before calling a milestone done

## 7. Source mapping

| Source | Destination |
|--------|-------------|
| Training Collection `src/data/*.json` + schemas | Bro Training data (copy, preserve) |
| Gym Bro Recipes `maintaining.html` / `cutting.html` / `bulking.html` nutrition & recipes & schedules | `phases.json` + `recipes.json` |
| Gym Bro Recipes `tools.html` | `tools.json` |
| Training Collection React UI | **Not** copied; rebuild for Gym Bro Effect IA |
| Branding Iron Legends / Gym Bro Effect HTML chrome | Replaced by Gym Bro Effect Bro naming |

## 8. Deployment & repos

1. Develop and POC on GitHub Pages from this repo
2. Later point https://gymbroeffect.com/ at the production build
3. Do not delete or rewrite Training-Collection or Gym-Bro-Recipes during this work

## 9. Success criteria

- User can start from home and reach methods, a routine, an exercise, a phase guide, a recipe, and a tool within a few clear taps
- All Training Collection training data loads and validates without content changes
- All Gym Bro phase nutrition/recipes/tools content is available under Bro Fuel / Bro Tools
- Dark mode is default; light mode toggle works and persists
- Site is usable on phone and desktop
- CI green: lint, typecheck, test, build

## 10. Explicit non-goals (this phase)

- Live backend, user accounts, or meal logging
- Pedagogical “training inside Fuel” combined phase programs
- Publishing to gymbroeffect.com (domain cutover is later)
- Migrating or shutting down the two backup repos
