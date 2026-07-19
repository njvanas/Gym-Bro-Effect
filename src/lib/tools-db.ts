import toolsData from '../data/tools.json';
import { toolsFileSchema, type Tool, type ToolTier } from '../schema';

export const tools: Tool[] = toolsFileSchema.parse(toolsData);

/** Display / filter order for Bro Tools sections. */
export const TOOL_TIER_ORDER: ToolTier[] = [
  'essential',
  'advised',
  'want',
  'alternative',
];

/**
 * Filter tools by one or more tiers.
 * An empty `selected` list means “All” — return the full catalog.
 */
export function filterToolsByTiers(
  list: Tool[],
  selected: readonly ToolTier[],
): Tool[] {
  if (selected.length === 0) return list;
  const allowed = new Set(selected);
  return list.filter((tool) => allowed.has(tool.tier));
}

/** @deprecated Prefer filterToolsByTiers for multi-select. */
export function filterToolsByTier(list: Tool[], tier: ToolTier | 'all'): Tool[] {
  if (tier === 'all') return filterToolsByTiers(list, []);
  return filterToolsByTiers(list, [tier]);
}

export function groupToolsByTier(
  list: Tool[],
): Array<{ tier: ToolTier; items: Tool[] }> {
  return TOOL_TIER_ORDER.map((tier) => ({
    tier,
    items: list.filter((tool) => tool.tier === tier),
  })).filter((group) => group.items.length > 0);
}

export function validateToolsIntegrity(): string[] {
  const problems: string[] = [];
  if (tools.length < 10) {
    problems.push(`Expected at least 10 tools, found ${tools.length}`);
  }
  const ids = new Set<string>();
  for (const tool of tools) {
    if (ids.has(tool.id)) problems.push(`Duplicate tool id: ${tool.id}`);
    ids.add(tool.id);
  }
  return problems;
}
