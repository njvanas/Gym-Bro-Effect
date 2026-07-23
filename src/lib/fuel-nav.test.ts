import { describe, expect, it } from 'vitest';

import type { PhaseId } from '../schema';
import { phaseLabel, productCategoryLabel } from './fuel-nav';

describe('phaseLabel', () => {
  it('labels all phases', () => {
    const ids: PhaseId[] = ['maintaining', 'cutting', 'bulking', 'recomposition'];
    expect(ids.map(phaseLabel)).toEqual([
      'Maintaining',
      'Cutting',
      'Bulking',
      'Recomposition',
    ]);
  });
});

describe('productCategoryLabel', () => {
  it('labels protein and supplements', () => {
    expect(productCategoryLabel('protein')).toBe('Protein');
    expect(productCategoryLabel('supplements')).toBe('Supplements');
  });
});
