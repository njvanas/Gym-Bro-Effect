# Bro Fuel Foods Catalog — Design

**Date:** 2026-07-23  
**Status:** Approved for implementation planning  
**Pillar:** Bro Fuel

## Problem

Bro Fuel phase guides today use generic staple food names and placeholder recipes that do not reflect how the author actually ate during bulk, cut, maintain, and recomp. The real shopping pattern — Muscle Meat convenience proteins, Albert Heijn high-protein dairy/snacks, pantry staples, zero drinks, and a small supplement stack — is not represented as structured, linkable reference data.

## Goals

1. Add a **Foods** catalog: personal product/shopping reference with macros, notes, buy links, and images where available.
2. Keep **Phases** as the strategy entry point; lightly clean them and point at Foods.
3. Remove generic **recipes**; replace with a clear **“My meal examples — coming soon”** signal.
4. Include **supplements** in the same catalog (not a separate Fuel sibling).
5. Frame all macros/links as **NL reference examples** — quantities and brands differ elsewhere.

## Non-goals (this pass)

- Curated shopping-list documents per phase
- Filled-in personal day-by-day meal stacking / meal diaries
- Meal logging, checkboxes persistence, or backend
- Redesigning the whole Bro Fuel visual system
- Modifying backup repos (`Gym-Bro-Recipes`, `Training-Collection`)

## Information architecture

Bro Fuel hub exposes two equal entry points:

| Entry | Purpose |
|-------|---------|
| **Phases** | Maintain / Cut / Bulk / Recomp — strategy, TDEE, nutrition guidelines, featured products, daily routine |
| **Foods** | Filterable product catalog (shopping + macro reference) |

Navigation stays in-app React state (no URL router required for this pass), consistent with the current pillar model.

### Phase detail (this pass)

**Keep**

- Overview copy (light editorial pass only)
- Nutrition guidelines
- Daily routine
- TDEE callout / accordion

**Change**

- Replace `stapleFoods` string lists with `featuredProductIds` resolved against the catalog
- Remove recipe cards and recipe jump-nav / hero chips
- Add a **Meal examples — coming soon** panel: states that personal how-I-stacked-these-foods examples for this phase are on the way; CTA to browse Foods now

### Foods detail

- Category filter chips
- Product cards: image (when present), name, brand, serving label, macros, optional notes, external buy link via `ExternalLink` (`rel="noopener noreferrer"`)
- Short intro disclaimer: reference-only NL examples; clean-eating preference (avoid sugar-sweetened junk); zero drinks as appetite/indulgence helpers on bulk/cut

## Data model

### New: `src/data/products.json`

Validated by Zod (extend `src/schema/fuel.ts` or adjacent fuel schema module).

```ts
productCategory:
  | 'protein'
  | 'carbs'
  | 'ready-meals'
  | 'dairy-snacks'
  | 'drinks'
  | 'supplements'
  | 'pantry'

product: {
  id: string;              // stable slug
  name: string;
  brand?: string;
  category: productCategory;
  servingLabel: string;    // e.g. "per 100g", "per bar", "per 1L"
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  url?: string;            // buy / product page
  imageSrc?: string;       // local asset path
  notes?: string;
  tags?: string[];         // e.g. convenience, clean, zero-cal
}
```

### Phases: `src/data/phases.json`

- Remove `stapleFoods: { category, items: string[] }[]`
- Add `featuredProductIds: string[]` (must exist in products)
- Keep `overview`, `nutritionGuidelines`, `dailyRoutine`
- Meal-examples “coming soon” is **UI copy** (not empty recipe JSON stubs)

### Recipes

- Remove `recipes.json` from the Fuel load path
- Remove `recipeSchema` / recipe UI (`RecipeCard`) / integrity rule “≥1 recipe per phase”
- Do not leave hollow recipe records

### Integrity (`fuel-db`)

- Exactly four phases with required ids
- All product ids unique
- Every `featuredProductIds` entry resolves to a product
- Product `url` values, when present, are valid URLs

## Content inventory (seed)

### Linked products (crawl for macros + images)

- Muscle Meat: high-protein beef taco mince, smokey BBQ chicken wings, ultimate spicy chicken fillet, chicken meatballs (plain + vadouvan), brown rice, basmati rice, sweet potato fries, sriracha mayo chili, protein milk, roasted chicken fillet cubes/strips
- Albert Heijn: HiPRO drinks/kwark/puddings, Campina HP Greek yoghurt, AH protein mousse/kwark, XXL Fitquark, Starbucks protein drinks, Melkunie protein yoghurt, AH + Barebells protein bars, AH pasta tuna / chicken kebab, Go-Tan mihoen, Coca-Cola Zero, Fitmeals chicken teriyaki, Freasy tandoori chicken biryani

### Pantry staples (reference macros; optional generic imagery)

Oats, tuna, eggs, brown bread, peanut butter, honey — quantities were the lever between cut and bulk.

### Supplements (same catalog, `supplements` category)

- Creatine — daily, on/off cycles
- Multivitamin stack — mainly Animal Stak, on/off
- Vitamin D — ongoing (NL / low sunlight)
- Protein shake / mass gainer — phase timing stories deferred; products can still appear if listed as used convenience tools, with notes that “when/why” comes with meal examples later

### Editorial notes to capture (catalog intro + product notes, not meal diaries)

- Preference against sugar-sweetened “sweet” foods; keep it relatively clean
- Zero drinks (e.g. Coke Zero) as life-savers for adherence and getting food down on a bulk

## Content sourcing

1. Crawl author-provided Muscle Meat and AH product URLs for name, nutrition, and product imagery.
2. Save images as **local assets** (e.g. `src/assets/products/`) — no hotlinking.
3. For pantry staples and supplements without a specific SKU page, use typical label / public reference macros and mark as reference-only in `notes` or catalog intro.
4. Never use `dangerouslySetInnerHTML` for guide/product copy.

## UI components (expected)

| Component | Role |
|-----------|------|
| `BroFuelView` | Hub with Phases + Foods entry; phase or foods detail state |
| `FoodsCatalog` (new) | Filters + product grid |
| `ProductCard` (new) | Macros, notes, `ExternalLink` |
| `PhaseDetail` | Featured products, coming-soon meal panel; no recipes |
| `MealExamplesComingSoon` (new or inline) | Shared coming-soon messaging + CTA to Foods |

Preserve existing Fuel CSS patterns (`fuel-` / phase heroes); extend rather than redesign.

## Testing

- Schema parse tests for `products.json` and updated `phases.json`
- Integrity tests for featured product id resolution
- Update / remove recipe-centric `fuel-db` tests
- Smoke: Fuel hub → Foods → product link; Fuel hub → Phase → coming soon + featured products

## Future work (explicitly deferred)

- Personal meal examples per phase (how foods were stacked daily; when mass gainer vs shake; cut vs bulk quantities)
- Optional curated shopping lists once meal examples exist
- Deep-linkable Fuel routes if the app adds a router later

## Success criteria

- User can browse a real product catalog with macros and buy links from Bro Fuel
- Phase pages no longer show generic recipes; they show featured products + an unmistakable “meal examples coming soon”
- Supplements appear in the same Foods catalog
- Lint, typecheck, tests, and build pass
