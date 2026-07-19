import { describe, expect, it } from 'vitest';

import { filterToolsByTier, tools, validateToolsIntegrity } from './tools-db';

describe('tools database', () => {
  it('loads a full catalog', () => {
    expect(tools.length).toBeGreaterThanOrEqual(10);
  });

  it('filters by tier', () => {
    expect(filterToolsByTier(tools, 'essential').every((t) => t.tier === 'essential')).toBe(
      true,
    );
  });

  it('passes integrity checks', () => {
    expect(validateToolsIntegrity()).toEqual([]);
  });
});
