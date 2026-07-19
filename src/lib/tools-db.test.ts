import { describe, expect, it } from 'vitest';

import {
  filterToolsByTier,
  filterToolsByTiers,
  groupToolsByTier,
  TOOL_TIER_ORDER,
  tools,
  validateToolsIntegrity,
} from './tools-db';

describe('tools database', () => {
  it('loads a full catalog', () => {
    expect(tools.length).toBeGreaterThanOrEqual(10);
  });

  it('filters by a single tier', () => {
    expect(filterToolsByTier(tools, 'essential').every((t) => t.tier === 'essential')).toBe(
      true,
    );
  });

  it('supports multi-select tiers and empty selection as all', () => {
    expect(filterToolsByTiers(tools, []).length).toBe(tools.length);

    const mixed = filterToolsByTiers(tools, ['essential', 'want']);
    expect(mixed.length).toBeGreaterThan(0);
    expect(mixed.every((t) => t.tier === 'essential' || t.tier === 'want')).toBe(true);
  });

  it('groups filtered tools in Essential → Advised → Want → Alternative order', () => {
    const grouped = groupToolsByTier(tools);
    expect(grouped.map((g) => g.tier)).toEqual(
      TOOL_TIER_ORDER.filter((tier) => tools.some((t) => t.tier === tier)),
    );
  });

  it('passes integrity checks', () => {
    expect(validateToolsIntegrity()).toEqual([]);
  });
});
