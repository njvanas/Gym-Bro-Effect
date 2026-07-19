import { describe, expect, it } from 'vitest';

import {
  getRecipesForPhase,
  phases,
  recipes,
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

  it('has recipes for every phase', () => {
    for (const phase of phases) {
      expect(getRecipesForPhase(phase.id).length).toBeGreaterThan(0);
    }
    expect(recipes.length).toBeGreaterThanOrEqual(14);
  });

  it('passes integrity checks', () => {
    expect(validateFuelIntegrity()).toEqual([]);
  });
});
