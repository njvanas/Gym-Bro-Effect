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
