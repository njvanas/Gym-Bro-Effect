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

      <div className="product-grid product-grid--compact">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>
    </div>
  );
}
