import toolsData from '../data/tools.json';
import { toolsFileSchema, type Tool, type ToolTier } from '../schema';

export const tools: Tool[] = toolsFileSchema.parse(toolsData);

export function filterToolsByTier(list: Tool[], tier: ToolTier | 'all'): Tool[] {
  if (tier === 'all') return list;
  return list.filter((tool) => tool.tier === tier);
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
