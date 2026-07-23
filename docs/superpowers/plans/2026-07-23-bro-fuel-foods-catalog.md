# Bro Fuel Foods Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace generic Bro Fuel recipes/staples with a personal Foods product catalog (macros, images, buy links) and update phase pages to feature those products plus a clear “meal examples coming soon” signal.

**Architecture:** Zod-validated `products.json` loaded beside phases in `fuel-db.ts`. Bro Fuel hub gains Phases + Foods entry points (React state). Phase guides drop recipes and `stapleFoods` strings; they reference `featuredProductIds`. Product images live under `public/products/` with relative `imageSrc` paths so GitHub Pages `base: './'` keeps working.

**Tech Stack:** Vite 5, React 18, TypeScript 5, Zod 3, Vitest, existing `ExternalLink` / Fuel CSS patterns.

**Spec:** `docs/superpowers/specs/2026-07-23-bro-fuel-foods-catalog-design.md`

## Global Constraints

- Prefer editing validated JSON in `src/data/` over hardcoding content in components.
- Never modify backup repos `Training-Collection` or `Gym-Bro-Recipes`.
- External links must use `ExternalLink` / `rel="noopener noreferrer"`.
- No `dangerouslySetInnerHTML` for guide/product copy.
- Exhaustive `switch` + `never` for new category enums.
- Macros and links are **NL reference examples**, not universal prescriptions.
- Personal meal day-stacking stays **coming soon** — do not invent diaries.
- Before finishing: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

---

## File structure (target)

```
src/
├── data/
│   ├── phases.json          # stapleFoods → featuredProductIds; no recipes
│   ├── products.json        # NEW catalog
│   └── recipes.json         # DELETE
├── schema/
│   └── fuel.ts              # productSchema; phaseSchema update; drop recipeSchema
├── lib/
│   ├── fuel-db.ts           # load products; integrity for featured ids
│   ├── fuel-db.test.ts
│   ├── fuel-nav.ts          # productCategoryLabel
│   └── fuel-nav.test.ts
├── components/fuel/
│   ├── BroFuelView.tsx      # hub: Phases | Foods; detail routing state
│   ├── FoodsCatalog.tsx     # NEW
│   ├── ProductCard.tsx      # NEW
│   ├── MealExamplesComingSoon.tsx  # NEW
│   ├── PhaseDetail.tsx      # featured products + coming soon; no recipes
│   └── RecipeCard.tsx       # DELETE
├── public/products/         # NEW crawled / reference images ({id}.webp|png)
└── index.css                # product/foods styles; trim unused recipe rules if desired
```

---

### Task 1: Product + phase schema (TDD)

**Files:**
- Modify: `src/schema/fuel.ts`
- Modify: `src/lib/fuel-db.test.ts` (failing expectations first)
- Test: `src/lib/fuel-db.test.ts`

**Interfaces:**
- Consumes: none
- Produces:
  - `productCategorySchema` / `ProductCategory`
  - `productSchema` / `Product`
  - `productsFileSchema`
  - `phaseSchema` with `featuredProductIds: string[]` (min 1) instead of `stapleFoods`
  - Remove `recipeSchema`, `recipesFileSchema`, `Recipe` export

- [ ] **Step 1: Rewrite fuel-db tests to the new contracts (will fail until later tasks land)**

Replace `src/lib/fuel-db.test.ts` with:

```ts
import { describe, expect, it } from 'vitest';

import {
  getFeaturedProducts,
  getPhase,
  getProduct,
  products,
  phases,
  validateFuelIntegrity,
} from './fuel-db';

describe('fuel database', () => {
  it('loads four phases', () => {
    expect(phases.map((p) => p.id).sort()).toEqual([
      'bulking',
      'cutting',
      'maintaining',
      'recomposition',
    ]);
  });

  it('loads a non-empty products catalog', () => {
    expect(products.length).toBeGreaterThan(20);
  });

  it('resolves featured products for every phase', () => {
    for (const phase of phases) {
      const featured = getFeaturedProducts(phase.id);
      expect(featured.length).toBeGreaterThan(0);
      expect(featured.every((p) => p.id)).toBe(true);
    }
  });

  it('looks up products by id', () => {
    const sample = products[0];
    expect(getProduct(sample.id)?.id).toBe(sample.id);
    expect(getProduct('does-not-exist')).toBeUndefined();
  });

  it('passes integrity checks', () => {
    expect(validateFuelIntegrity()).toEqual([]);
  });

  it('exposes getPhase', () => {
    expect(getPhase('cutting')?.id).toBe('cutting');
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL (missing exports / schema / data)**

Run: `npm test -- src/lib/fuel-db.test.ts`  
Expected: FAIL (cannot resolve modules/exports or parse errors)

- [ ] **Step 3: Update `src/schema/fuel.ts`**

Replace file contents with:

```ts
import { z } from 'zod';

export const phaseIdSchema = z.enum([
  'maintaining',
  'cutting',
  'bulking',
  'recomposition',
]);
export type PhaseId = z.infer<typeof phaseIdSchema>;

export const productCategorySchema = z.enum([
  'protein',
  'carbs',
  'ready-meals',
  'dairy-snacks',
  'drinks',
  'supplements',
  'pantry',
]);
export type ProductCategory = z.infer<typeof productCategorySchema>;

export const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().min(1).optional(),
  category: productCategorySchema,
  servingLabel: z.string().min(1),
  calories: z.number().nonnegative(),
  proteinG: z.number().nonnegative(),
  carbsG: z.number().nonnegative(),
  fatG: z.number().nonnegative(),
  url: z.string().url().optional(),
  imageSrc: z.string().min(1).optional(),
  notes: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).optional(),
});
export type Product = z.infer<typeof productSchema>;

export const productsFileSchema = z.array(productSchema);

export const phaseSchema = z.object({
  id: phaseIdSchema,
  name: z.string().min(1),
  tagline: z.string().min(1),
  overview: z.array(z.string().min(1)).min(1),
  nutritionGuidelines: z.array(z.string().min(1)).min(1),
  featuredProductIds: z.array(z.string().min(1)).min(1),
  dailyRoutine: z.array(
    z.object({
      time: z.string().min(1),
      label: z.string().min(1),
      detail: z.string().min(1).optional(),
    }),
  ),
});
export type Phase = z.infer<typeof phaseSchema>;

export const phasesFileSchema = z.array(phaseSchema);
```

- [ ] **Step 4: Commit**

```bash
git add src/schema/fuel.ts src/lib/fuel-db.test.ts
git commit -m "test(fuel): redefine schema contracts for products catalog"
```

---

### Task 2: `fuel-db` loaders + integrity (still failing on missing JSON)

**Files:**
- Modify: `src/lib/fuel-db.ts`
- Modify: `src/lib/fuel-nav.ts`
- Modify: `src/lib/fuel-nav.test.ts`
- Create: `src/data/products.json` (minimal stub: ≥1 product so TypeScript can compile once phases exist — full catalog in Task 3)

**Interfaces:**
- Consumes: `productSchema`, `phaseSchema` from Task 1
- Produces:
  - `export const products: Product[]`
  - `export const phases: Phase[]`
  - `getProduct(id: string): Product | undefined`
  - `getFeaturedProducts(phaseId: PhaseId): Product[]`
  - `validateFuelIntegrity(): string[]` — 4 phases; unique product ids; every featured id exists; no recipe checks
  - `productCategoryLabel(category: ProductCategory): string` in `fuel-nav.ts`

- [ ] **Step 1: Write minimal stub `src/data/products.json`**

```json
[
  {
    "id": "pantry-oats",
    "name": "Oats",
    "category": "pantry",
    "servingLabel": "per 100g (dry, reference)",
    "calories": 389,
    "proteinG": 17,
    "carbsG": 66,
    "fatG": 7,
    "notes": "Reference macros — brand and country vary. Quantities were the lever between cut and bulk.",
    "tags": ["staple", "reference"]
  }
]
```

- [ ] **Step 2: Rewrite `src/lib/fuel-db.ts`**

```ts
import phasesData from '../data/phases.json';
import productsData from '../data/products.json';
import {
  phasesFileSchema,
  productsFileSchema,
  type Phase,
  type PhaseId,
  type Product,
} from '../schema';

export const phases: Phase[] = phasesFileSchema.parse(phasesData);
export const products: Product[] = productsFileSchema.parse(productsData);

const phasesById = new Map(phases.map((phase) => [phase.id, phase]));
const productsById = new Map(products.map((product) => [product.id, product]));

export function getPhase(id: PhaseId): Phase | undefined {
  return phasesById.get(id);
}

export function getProduct(id: string): Product | undefined {
  return productsById.get(id);
}

export function getFeaturedProducts(id: PhaseId): Product[] {
  const phase = phasesById.get(id);
  if (!phase) return [];
  return phase.featuredProductIds
    .map((productId) => productsById.get(productId))
    .filter((product): product is Product => product !== undefined);
}

export function validateFuelIntegrity(): string[] {
  const problems: string[] = [];
  if (phases.length !== 4) {
    problems.push(`Expected exactly 4 phases, found ${phases.length}`);
  }
  const ids = new Set(phases.map((p) => p.id));
  for (const required of [
    'maintaining',
    'cutting',
    'bulking',
    'recomposition',
  ] as const) {
    if (!ids.has(required)) problems.push(`Missing phase: ${required}`);
  }

  const productIds = new Set<string>();
  for (const product of products) {
    if (productIds.has(product.id)) {
      problems.push(`Duplicate product id: ${product.id}`);
    }
    productIds.add(product.id);
  }

  for (const phase of phases) {
    for (const productId of phase.featuredProductIds) {
      if (!productsById.has(productId)) {
        problems.push(
          `Phase "${phase.id}" features unknown product "${productId}"`,
        );
      }
    }
  }

  return problems;
}
```

- [ ] **Step 3: Add `productCategoryLabel` to `src/lib/fuel-nav.ts`**

```ts
import type { PhaseId, ProductCategory } from '../schema';

export function phaseLabel(id: PhaseId): string {
  switch (id) {
    case 'maintaining':
      return 'Maintaining';
    case 'cutting':
      return 'Cutting';
    case 'bulking':
      return 'Bulking';
    case 'recomposition':
      return 'Recomposition';
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

export function productCategoryLabel(category: ProductCategory): string {
  switch (category) {
    case 'protein':
      return 'Protein';
    case 'carbs':
      return 'Carbs';
    case 'ready-meals':
      return 'Ready meals';
    case 'dairy-snacks':
      return 'Dairy & snacks';
    case 'drinks':
      return 'Drinks';
    case 'supplements':
      return 'Supplements';
    case 'pantry':
      return 'Pantry';
    default: {
      const _exhaustive: never = category;
      return _exhaustive;
    }
  }
}
```

Add a small test in `src/lib/fuel-nav.test.ts` asserting labels for `protein` and `supplements`.

- [ ] **Step 4: Temporarily unblock phase parse — update each phase in `phases.json`**

For **every** phase object: delete `stapleFoods`, add:

```json
"featuredProductIds": ["pantry-oats"]
```

Keep overview / nutritionGuidelines / dailyRoutine unchanged for now.

- [ ] **Step 5: Run tests**

Run: `npm test -- src/lib/fuel-db.test.ts src/lib/fuel-nav.test.ts`  
Expected: `loads a non-empty products catalog` still FAIL (`products.length > 20`); other integrity/phase tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/fuel-db.ts src/lib/fuel-nav.ts src/lib/fuel-nav.test.ts src/data/products.json src/data/phases.json
git commit -m "feat(fuel): load products catalog and featured product ids"
```

---

### Task 3: Full `products.json` + images (crawl)

**Files:**
- Replace: `src/data/products.json` (full catalog)
- Create: `public/products/*` (images when crawl succeeds)
- Optional helper notes only in product `notes` / catalog intro later

**Interfaces:**
- Consumes: `productSchema`
- Produces: ≥30 products covering the inventory below; `imageSrc` like `products/{id}.webp` (relative, no leading `/`) when an image was saved

**Inventory (required ids + URLs)**

Crawl each URL for name, brand, serving, calories/P/C/F, and primary product image. If a page blocks scraping, fill macros from visible label text / nutrition table manually and omit `imageSrc`.

| id | category | url |
|----|----------|-----|
| `mm-high-protein-rundergehakt-taco` | protein | https://musclemeat.nl/product/high-protein-rundergehakt-taco/ |
| `mm-chicken-wings-smokey-bbq` | protein | https://musclemeat.nl/product/chicken-wings-smokey-bbq-3kg-iqf-kant-en-klaar/ |
| `mm-ultimate-spicy-kipfilet` | protein | https://musclemeat.nl/product/ultimate-spicy-kipfilet/ |
| `mm-chicken-meat-balls` | protein | https://musclemeat.nl/product/chicken-meat-balls/ |
| `mm-chicken-meat-balls-vadouvan` | protein | https://musclemeat.nl/product/chicken-meat-balls-vadouvan/ |
| `mm-roasted-kipfiletblokjes` | protein | https://musclemeat.nl/product/roasted-kipfiletblokjes/ |
| `mm-roasted-kipfiletreepjes-naturel` | protein | https://musclemeat.nl/product/kant-en-klare-roasted-kipfiletreepjes-naturel/ |
| `mm-bruine-rijst` | carbs | https://musclemeat.nl/product/bruine-rijst/ |
| `mm-basmati-rijst` | carbs | https://musclemeat.nl/product/basmati-rijst/ |
| `mm-zoete-aardappel-friet` | carbs | https://musclemeat.nl/product/zoete-aardappel-friet/ |
| `mm-sriracha-mayo-chili` | pantry | https://musclemeat.nl/product/sriracha-mayo-chili/ |
| `mm-proteine-melk` | drinks | https://musclemeat.nl/product/proteine-melk-1l-75g-eiwit/ |
| `ah-hipro-protein-drink-mango` | drinks | https://www.ah.nl/producten/product/wi515883/hipro-protein-drink-mango |
| `ah-hipro-protein-kwark-mango` | dairy-snacks | https://www.ah.nl/producten/product/wi556396/hipro-protein-kwark-mango |
| `ah-hipro-protein-pudding-karamel` | dairy-snacks | https://www.ah.nl/producten/product/wi556394/hipro-protein-pudding-karamel |
| `ah-hipro-protein-pudding-chocolade-hazelnoot` | dairy-snacks | https://www.ah.nl/producten/product/wi556395/hipro-protein-pudding-chocolade-hazelnoot |
| `ah-campina-high-protein-greek-yoghurt` | dairy-snacks | https://www.ah.nl/producten/product/wi585849/campina-high-protein-greek-yoghurt-1-5-fat |
| `ah-protein-mousse-chocolade` | dairy-snacks | https://www.ah.nl/producten/product/wi556294/ah-protein-mousse-chocoladesmaak |
| `ah-protein-kwark-framboos` | dairy-snacks | https://www.ah.nl/producten/product/wi585919/ah-protein-kwark-met-yoghurt-framboos |
| `ah-xxl-fitquark-peach-passion` | dairy-snacks | https://www.ah.nl/producten/product/wi585928/xxl-nutrition-fitquark-peach-passion |
| `ah-starbucks-protein-chocolate-mocha` | drinks | https://www.ah.nl/producten/product/wi588114/starbucks-protein-drink-chocolate-mocha-coffee |
| `ah-starbucks-protein-caramel-hazelnut` | drinks | https://www.ah.nl/producten/product/wi588113/starbucks-protein-drink-caramel-hazelnut-coffee |
| `ah-melkunie-protein-yoghurt-perzik-framboos` | dairy-snacks | https://www.ah.nl/producten/product/wi585902/melkunie-protein-yoghurt-perzik-framboos |
| `ah-protein-bar-white-choco-pinda-karamel` | dairy-snacks | https://www.ah.nl/producten/product/wi560850/ah-protein-bar-white-choco-pinda-karamel |
| `ah-protein-bar-melk-choco-pinda-karamel` | dairy-snacks | https://www.ah.nl/producten/product/wi560851/ah-protein-bar-melk-choco-pinda-karamel |
| `ah-barebells-white-chocolate-almond` | dairy-snacks | https://www.ah.nl/producten/product/wi444578/barebells-protein-bar-white-chocolate-almond |
| `ah-barebells-salty-peanut` | dairy-snacks | https://www.ah.nl/producten/product/wi430023/barebells-protein-bar-salty-peanut |
| `ah-barebells-caramel-cashew` | dairy-snacks | https://www.ah.nl/producten/product/wi414027/barebells-protein-bar-caramel-cashew |
| `ah-pasta-tonijn` | ready-meals | https://www.ah.nl/producten/product/wi365389/ah-pasta-tonijn-m |
| `ah-pasta-kip-kebab` | ready-meals | https://www.ah.nl/producten/product/wi563781/ah-pasta-kip-kebab-m |
| `ah-fitmeals-chicken-teriyaki` | ready-meals | https://www.ah.nl/producten/product/wi564363/fitmeals-chicken-teriyaki |
| `ah-freasy-tandoori-kip-biryani` | ready-meals | https://www.ah.nl/producten/product/wi582329/freasy-tandoori-kip-biryani |
| `ah-go-tan-mihoen` | carbs | https://www.ah.nl/producten/product/wi55943/go-tan-mihoen-rice-noodles |
| `ah-coca-cola-zero` | drinks | https://www.ah.nl/producten/product/wi137739/coca-cola-zero-sugar |

**Pantry (no URL — reference macros, `tags: ["staple","reference"]`):**

| id | notes focus |
|----|-------------|
| `pantry-oats` | cut/bulk quantity lever |
| `pantry-tuna` | lean convenience protein |
| `pantry-eggs` | whole eggs / whites by phase later |
| `pantry-brown-bread` | measured carbs |
| `pantry-peanut-butter` | calorie-dense; watch on cut |
| `pantry-honey` | measured carbs / taste |

**Supplements (no SKU URL required):**

| id | notes |
|----|-------|
| `supp-creatine` | Daily on/off cycles |
| `supp-animal-stak` | Multivitamin stack used on/off (Animal Stak) |
| `supp-vitamin-d` | Ongoing — NL low sunlight |
| `supp-whey-protein` | Used as needed; phase timing coming with meal examples |
| `supp-mass-gainer` | Bulk tool when appetite lagged; timing coming soon |

**Editorial notes to sprinkle (where true):**

- Prefer non–sugar-sweetened options; keep it relatively clean
- `ah-coca-cola-zero`: zero drinks helped adherence and getting food down on a bulk
- Convenience Muscle Meat / AH ready meals = life easier on busy training days

- [ ] **Step 1: Crawl linked pages; download images into `public/products/{id}.webp` (or `.png`)**

Use WebFetch / browser / Firecrawl as available. Prefer label “per 100g” or “per serving” consistency — set `servingLabel` to match the numbers you record. Do not hotlink images.

- [ ] **Step 2: Write full `src/data/products.json`**

Every row must pass `productSchema`. Include `url` for crawled SKUs. Set `imageSrc` only when the file exists under `public/products/`.

- [ ] **Step 3: Run schema/integrity path**

Run: `npm test -- src/lib/fuel-db.test.ts`  
Expected: catalog length assertion PASS; featured-id integrity still PASS (phases still only reference `pantry-oats` until Task 4).

- [ ] **Step 4: Commit**

```bash
git add src/data/products.json public/products
git commit -m "feat(fuel): seed personal foods product catalog with macros"
```

---

### Task 4: Phase `featuredProductIds` + light copy

**Files:**
- Modify: `src/data/phases.json`

**Interfaces:**
- Consumes: product ids from Task 3
- Produces: each phase features a sensible subset (≥5 ids); no invented meal diaries

**Suggested featured sets (adjust if a product id differs slightly):**

- **maintaining:** `mm-chicken-meat-balls`, `mm-bruine-rijst`, `pantry-oats`, `ah-campina-high-protein-greek-yoghurt`, `pantry-eggs`, `supp-creatine`, `supp-vitamin-d`
- **cutting:** `mm-roasted-kipfiletreepjes-naturel`, `mm-ultimate-spicy-kipfilet`, `pantry-tuna`, `ah-hipro-protein-kwark-mango`, `ah-coca-cola-zero`, `pantry-oats`, `supp-creatine`
- **bulking:** `mm-high-protein-rundergehakt-taco`, `mm-basmati-rijst`, `mm-proteine-melk`, `pantry-peanut-butter`, `ah-pasta-kip-kebab`, `supp-mass-gainer`, `ah-coca-cola-zero`
- **recomposition:** `mm-chicken-meat-balls-vadouvan`, `mm-zoete-aardappel-friet`, `ah-protein-mousse-chocolade`, `pantry-eggs`, `supp-whey-protein`, `supp-animal-stak`

Optional one-line overview tweak per phase mentioning Foods catalog / personal examples coming — keep short.

- [ ] **Step 1: Update all four phases’ `featuredProductIds`**

- [ ] **Step 2: Run tests**

Run: `npm test -- src/lib/fuel-db.test.ts`  
Expected: PASS including featured resolution + integrity

- [ ] **Step 3: Commit**

```bash
git add src/data/phases.json
git commit -m "feat(fuel): point phases at featured catalog products"
```

---

### Task 5: Remove recipes from the codebase

**Files:**
- Delete: `src/data/recipes.json`
- Delete: `src/components/fuel/RecipeCard.tsx`
- Modify any remaining imports (grep `Recipe`, `recipes`, `RecipeCard`, `getRecipesForPhase`)

**Interfaces:**
- Consumes: none
- Produces: no recipe types/exports remain; app may not compile until Task 6–8 update UI

- [ ] **Step 1: Grep and delete recipe artifacts**

```bash
rg "RecipeCard|recipes\.json|getRecipesForPhase|recipeSchema" src
```

Remove files and imports. Leave `PhaseDetail` temporarily broken until Task 8 if needed — or comment with a stub section in the same commit only if required for typecheck mid-flight (prefer finishing UI tasks same session).

- [ ] **Step 2: Commit when UI tasks also compile, or keep working tree until Task 8**

Prefer bundling the delete with Task 8 commit if mid-state cannot typecheck. If deleting now:

```bash
git add -u src/data/recipes.json src/components/fuel/RecipeCard.tsx
git commit -m "refactor(fuel): remove generic recipe data and UI"
```

---

### Task 6: `ProductCard` + `MealExamplesComingSoon`

**Files:**
- Create: `src/components/fuel/ProductCard.tsx`
- Create: `src/components/fuel/MealExamplesComingSoon.tsx`
- Modify: `src/index.css` (add `.product-card`, `.meal-examples-soon` styles near existing `.fuel-` / `.recipe-` blocks)

**Interfaces:**
- Consumes: `Product`, `ExternalLink`, `productCategoryLabel`
- Produces:
  - `ProductCard({ product }: { product: Product })`
  - `MealExamplesComingSoon({ onBrowseFoods?: () => void })`

- [ ] **Step 1: Implement `ProductCard`**

```tsx
import { ExternalLink } from '../ExternalLink';
import { productCategoryLabel } from '../../lib/fuel-nav';
import type { Product } from '../../schema';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      {product.imageSrc ? (
        <img
          className="product-card-image"
          src={product.imageSrc}
          alt=""
          loading="lazy"
        />
      ) : (
        <div className="product-card-image product-card-image--placeholder" aria-hidden />
      )}
      <div className="product-card-body">
        <p className="product-card-category">{productCategoryLabel(product.category)}</p>
        <h4 className="product-card-title">{product.name}</h4>
        {product.brand ? <p className="muted">{product.brand}</p> : null}
        <p className="product-card-serving">{product.servingLabel}</p>
        <div className="recipe-macro-row" aria-label="Macros">
          <span className="recipe-macro">
            <em>{product.calories}</em> cal
          </span>
          <span className="recipe-macro">
            <em>{product.proteinG}g</em> P
          </span>
          <span className="recipe-macro">
            <em>{product.carbsG}g</em> C
          </span>
          <span className="recipe-macro">
            <em>{product.fatG}g</em> F
          </span>
        </div>
        {product.notes ? <p className="product-card-notes">{product.notes}</p> : null}
        {product.url ? (
          <ExternalLink href={product.url} className="text-link">
            View product →
          </ExternalLink>
        ) : null}
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Implement `MealExamplesComingSoon`**

```tsx
type MealExamplesComingSoonProps = {
  onBrowseFoods?: () => void;
};

export function MealExamplesComingSoon({ onBrowseFoods }: MealExamplesComingSoonProps) {
  return (
    <section className="fuel-panel stack meal-examples-soon" aria-labelledby="meal-examples-soon-title">
      <h3 id="meal-examples-soon-title" className="legend-col-title">
        My meal examples — coming soon
      </h3>
      <p className="fuel-prose">
        How these foods were stacked day-to-day in each phase — portions for cut vs bulk, when a
        shake or mass gainer helped, and the real routines — is on the way. For now, browse the
        Foods catalog for the products and macros used along the way.
      </p>
      {onBrowseFoods ? (
        <button type="button" className="text-link" onClick={onBrowseFoods}>
          Browse Foods →
        </button>
      ) : null}
    </section>
  );
}
```

- [ ] **Step 3: Add CSS** (reuse macro row styles; new card grid)

```css
.product-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
}

.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  border-radius: 0.75rem;
  overflow: hidden;
  background: color-mix(in srgb, var(--surface) 92%, transparent);
}

.product-card-image {
  aspect-ratio: 4 / 3;
  width: 100%;
  object-fit: cover;
  background: var(--ink);
}

.product-card-image--placeholder {
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
}

.product-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.9rem 1rem 1rem;
}

.product-card-category {
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}

.product-card-title {
  margin: 0;
  font-size: 1.05rem;
}

.product-card-serving {
  font-size: 0.85rem;
  color: var(--muted);
}

.product-card-notes {
  font-size: 0.9rem;
  margin: 0.25rem 0 0;
}

.meal-examples-soon {
  border-style: dashed;
}

.foods-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.foods-intro {
  max-width: 42rem;
}
```

Match existing token names in `index.css` if `--border` / `--surface` / `--ink` / `--muted` differ — reuse whatever Fuel already uses.

- [ ] **Step 4: Commit**

```bash
git add src/components/fuel/ProductCard.tsx src/components/fuel/MealExamplesComingSoon.tsx src/index.css
git commit -m "feat(fuel): add product card and meal-examples coming soon"
```

---

### Task 7: `FoodsCatalog` view

**Files:**
- Create: `src/components/fuel/FoodsCatalog.tsx`

**Interfaces:**
- Consumes: `products` from `fuel-db`, `ProductCard`, `productCategoryLabel`, `ProductCategory`
- Produces: `FoodsCatalog()` with category filter (`all` + each category) and disclaimer intro

- [ ] **Step 1: Implement catalog**

```tsx
import { useState } from 'react';

import { products } from '../../lib/fuel-db';
import { productCategoryLabel } from '../../lib/fuel-nav';
import type { ProductCategory } from '../../schema';
import { ProductCard } from './ProductCard';

const CATEGORIES: Array<'all' | ProductCategory> = [
  'all',
  'protein',
  'carbs',
  'ready-meals',
  'dairy-snacks',
  'drinks',
  'supplements',
  'pantry',
];

export function FoodsCatalog() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('all');
  const visible =
    filter === 'all' ? products : products.filter((p) => p.category === filter);

  return (
    <div className="stack foods-catalog">
      <header className="section-masthead">
        <p className="section-kicker">Shopping reference</p>
        <h2 className="section-display-title">
          Bro <span className="accent">Foods</span>
        </h2>
        <p className="section-lede foods-intro">
          Products actually used on this journey — Muscle Meat, Albert Heijn, pantry staples, and a
          small supplement stack. Macros are NL label references; brands and numbers differ by
          country. Prefer cleaner options over sugar-sweetened junk; zero drinks helped adherence
          on hard bulk days.
        </p>
      </header>

      <div className="foods-filters" role="toolbar" aria-label="Filter by category">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={filter === category ? 'chip accent' : 'chip'}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category === 'all' ? 'All' : productCategoryLabel(category)}
          </button>
        ))}
      </div>

      <p className="muted">
        {visible.length} item{visible.length === 1 ? '' : 's'}
      </p>

      <div className="product-grid">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/fuel/FoodsCatalog.tsx
git commit -m "feat(fuel): add filterable Foods catalog view"
```

---

### Task 8: Wire `BroFuelView` + rewrite `PhaseDetail`

**Files:**
- Modify: `src/components/fuel/BroFuelView.tsx`
- Modify: `src/components/fuel/PhaseDetail.tsx`
- Delete leftovers from Task 5 if still present

**Interfaces:**
- Consumes: `FoodsCatalog`, `PhaseDetail`, `MealExamplesComingSoon`, `getFeaturedProducts`, `ProductCard`
- Produces: hub state `'hub' | { kind: 'phase'; id: PhaseId } | { kind: 'foods' }`

- [ ] **Step 1: Rewrite `BroFuelView` navigation state**

```tsx
import { useState } from 'react';

import { phases } from '../../lib/fuel-db';
import { phaseLabel } from '../../lib/fuel-nav';
import type { PhaseId } from '../../schema';
import { FoodsCatalog } from './FoodsCatalog';
import { PhaseDetail } from './PhaseDetail';
import { TdeeCallout } from './TdeeCallout';

type BroFuelViewProps = {
  onNavigateToTraining?: () => void;
};

type FuelScreen =
  | { kind: 'hub' }
  | { kind: 'phase'; id: PhaseId }
  | { kind: 'foods' };

export function BroFuelView({ onNavigateToTraining }: BroFuelViewProps) {
  const [screen, setScreen] = useState<FuelScreen>({ kind: 'hub' });

  if (screen.kind === 'phase') {
    const phase = phases.find((p) => p.id === screen.id);
    if (!phase) {
      setScreen({ kind: 'hub' });
      return null;
    }
    return (
      <section className="stack fuel-section">
        <button type="button" className="back" onClick={() => setScreen({ kind: 'hub' })}>
          ← Bro Fuel
        </button>
        <PhaseDetail phase={phase} onBrowseFoods={() => setScreen({ kind: 'foods' })} />
        {onNavigateToTraining ? (
          <button type="button" className="text-link" onClick={onNavigateToTraining}>
            Browse Bro Training →
          </button>
        ) : null}
      </section>
    );
  }

  if (screen.kind === 'foods') {
    return (
      <section className="stack fuel-section">
        <button type="button" className="back" onClick={() => setScreen({ kind: 'hub' })}>
          ← Bro Fuel
        </button>
        <FoodsCatalog />
      </section>
    );
  }

  return (
    <section className="stack fuel-section">
      <header className="section-masthead">
        <p className="section-kicker">Nutrition & phases</p>
        <h2 className="section-display-title">
          Bro <span className="accent">Fuel</span>
        </h2>
        <p className="section-lede">
          Phase strategy plus the real Foods shopping reference from this journey. Personal meal
          examples per phase are coming soon.
        </p>
        {onNavigateToTraining ? (
          <button type="button" className="text-link" onClick={onNavigateToTraining}>
            Browse Bro Training →
          </button>
        ) : null}
      </header>

      <TdeeCallout />

      <div className="training-hub-grid fuel-hub-grid">
        <button
          type="button"
          className="training-hub-card fuel-hub-card"
          onClick={() => setScreen({ kind: 'foods' })}
        >
          <span className="training-hub-kicker">Catalog</span>
          <strong className="training-hub-title">Foods</strong>
          <p>Products, macros, and buy links used on this journey.</p>
          <span className="training-hub-cta">Browse foods →</span>
        </button>
        {phases.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`training-hub-card fuel-hub-card fuel-hub-card--${item.id}`}
            onClick={() => setScreen({ kind: 'phase', id: item.id })}
          >
            <span className="training-hub-kicker">{phaseLabel(item.id)}</span>
            <strong className="training-hub-title">{item.name}</strong>
            <p>{item.tagline}</p>
            <TdeeCallout compact />
            <span className="training-hub-cta">Open phase →</span>
          </button>
        ))}
      </div>
    </section>
  );
}
```

Avoid calling `setScreen` during render if phase missing — use a safe fallback:

```tsx
if (screen.kind === 'phase') {
  const phase = phases.find((p) => p.id === screen.id) ?? null;
  if (!phase) {
    return (
      <section className="stack fuel-section">
        <button type="button" className="back" onClick={() => setScreen({ kind: 'hub' })}>
          ← Bro Fuel
        </button>
        <p>Phase not found.</p>
      </section>
    );
  }
  // ... PhaseDetail
}
```

- [ ] **Step 2: Rewrite `PhaseDetail`**

Remove staple emoji helpers and `RecipeCard`. Use:

```tsx
import { getFeaturedProducts } from '../../lib/fuel-db';
import type { Phase } from '../../schema';
import { MealExamplesComingSoon } from './MealExamplesComingSoon';
import { ProductCard } from './ProductCard';
import { TdeeAccordion } from './TdeeCallout';

type PhaseDetailProps = {
  phase: Phase;
  onBrowseFoods?: () => void;
};

export function PhaseDetail({ phase, onBrowseFoods }: PhaseDetailProps) {
  const featured = getFeaturedProducts(phase.id);

  return (
    <div className="stack phase-detail">
      <header className={`phase-hero phase-hero--${phase.id}`}>
        <p className="legend-eyebrow">Bro Fuel</p>
        <h2 className="legend-detail-title">{phase.name}</h2>
        <p className="phase-hero-tagline">{phase.tagline}</p>
        <div className="chips">
          <span className="chip accent">{featured.length} featured foods</span>
          <span className="chip">{phase.dailyRoutine.length} daily blocks</span>
          <span className="chip">Meal examples soon</span>
        </div>
      </header>

      <nav className="legend-jump" aria-label="On this phase">
        <a href={`#${phase.id}-tdee`}>TDEE</a>
        <a href={`#${phase.id}-overview`}>Overview</a>
        <a href={`#${phase.id}-nutrition`}>Nutrition</a>
        <a href={`#${phase.id}-foods`}>Foods</a>
        <a href={`#${phase.id}-meals`}>Meal examples</a>
        <a href={`#${phase.id}-routine`}>Daily routine</a>
      </nav>

      <TdeeAccordion phaseId={phase.id} />

      {/* overview + nutrition sections unchanged structurally */}

      <section className="stack" id={`${phase.id}-foods`}>
        <h3 className="legend-col-title">Featured foods</h3>
        <p className="fuel-prose">
          A slice of the Foods catalog that mattered in this phase. Full shopping reference lives
          under Bro Foods.
        </p>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {onBrowseFoods ? (
          <button type="button" className="text-link" onClick={onBrowseFoods}>
            Browse all Foods →
          </button>
        ) : null}
      </section>

      <div id={`${phase.id}-meals`}>
        <MealExamplesComingSoon onBrowseFoods={onBrowseFoods} />
      </div>

      {/* daily routine unchanged */}
    </div>
  );
}
```

Keep overview / nutrition / routine JSX from the current file; only swap foods + meals sections and chips/nav as above.

- [ ] **Step 3: Typecheck + test**

Run: `npm run typecheck` && `npm test`  
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/fuel/BroFuelView.tsx src/components/fuel/PhaseDetail.tsx
git add -u src/data/recipes.json src/components/fuel/RecipeCard.tsx
git commit -m "feat(fuel): hub Foods entry and phase featured products"
```

---

### Task 9: Verification + polish

**Files:**
- Possibly `src/index.css` (remove dead `.recipe-card` rules only if unused)
- Touch copy if anything reads “recipes”

- [ ] **Step 1: Grep for stale recipe/staple references**

```bash
rg "stapleFoods|RecipeCard|recipes\.json|getRecipesForPhase" src
```

Expected: no matches

- [ ] **Step 2: Full gate**

Run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Expected: all PASS

- [ ] **Step 3: Manual smoke (dev server)**

1. Bro Fuel hub shows Foods + 4 phases  
2. Foods filters work; product links open externally  
3. Phase shows featured products + coming-soon panel; no recipes  
4. Back navigation returns to hub  

- [ ] **Step 4: Final commit if polish landed**

```bash
git add -u
git commit -m "chore(fuel): verify foods catalog pillar pass"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Foods catalog with macros + links + images | 3, 6, 7 |
| Hub Phases + Foods | 8 |
| Phase featured products | 4, 8 |
| Remove recipes / coming soon meals | 5, 6, 8 |
| Supplements in same catalog | 3 |
| NL reference framing | 7 intro + product notes |
| No curated shopping lists | — out of scope |
| Integrity + tests | 1, 2, 9 |
| ExternalLink / no HTML injection | 6 |
| lint/typecheck/test/build | 9 |

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-23-bro-fuel-foods-catalog.md`. Two execution options:

**1. Subagent-Driven (recommended)** — fresh subagent per task, review between tasks, fast iteration  

**2. Inline Execution** — execute tasks in this session with executing-plans and checkpoints  

Which approach?
