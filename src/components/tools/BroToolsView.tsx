import { useMemo, useState } from 'react';

import { filterToolsByTier, tools } from '../../lib/tools-db';
import type { ToolCategory, ToolTier } from '../../schema';
import { ExternalLink } from '../ExternalLink';

const tiers: Array<ToolTier | 'all'> = ['all', 'essential', 'advised', 'want', 'alternative'];

function tierLabel(tier: ToolTier | 'all'): string {
  switch (tier) {
    case 'all':
      return 'All tiers';
    case 'essential':
      return 'Essential';
    case 'advised':
      return 'Advised';
    case 'want':
      return 'Want';
    case 'alternative':
      return 'Alternative';
    default: {
      const _exhaustive: never = tier;
      return _exhaustive;
    }
  }
}

function categoryLabel(category: ToolCategory): string {
  switch (category) {
    case 'body-composition':
      return 'Body composition';
    case 'nutrition':
      return 'Nutrition';
    case 'training':
      return 'Training';
    case 'recovery':
      return 'Recovery';
    default: {
      const _exhaustive: never = category;
      return _exhaustive;
    }
  }
}

export function BroToolsView() {
  const [tier, setTier] = useState<ToolTier | 'all'>('all');
  const filtered = useMemo(() => filterToolsByTier(tools, tier), [tier]);

  const grouped = useMemo(() => {
    const map = new Map<ToolCategory, typeof filtered>();
    for (const tool of filtered) {
      const list = map.get(tool.category) ?? [];
      list.push(tool);
      map.set(tool.category, list);
    }
    return map;
  }, [filtered]);

  return (
    <section className="stack">
      <header>
        <h2>Bro Tools</h2>
        <p className="muted">Essential, advised, and optional gear for the journey.</p>
      </header>

      <div className="search-row">
        <select
          value={tier}
          onChange={(e) => setTier(e.target.value as ToolTier | 'all')}
          aria-label="Filter tools by tier"
        >
          {tiers.map((item) => (
            <option value={item} key={item}>
              {tierLabel(item)}
            </option>
          ))}
        </select>
      </div>

      {[...grouped.entries()].map(([category, list]) => (
        <section className="stack" key={category}>
          <h3>{categoryLabel(category)}</h3>
          <div className="journey-grid">
            {list.map((tool) => (
              <article className="card stack" key={tool.id}>
                <div className="tag-row">
                  <span className="tag accent">{tierLabel(tool.tier)}</span>
                </div>
                <h4>{tool.name}</h4>
                <p>
                  <strong>Tracks:</strong> {tool.tracks}
                </p>
                <p>
                  <strong>Necessity:</strong> {tool.necessity}
                </p>
                <p>
                  <strong>Advice:</strong> {tool.advice}
                </p>
                <p className="muted">
                  <strong>Purchase:</strong> {tool.purchaseReason}
                </p>
                {tool.url ? <ExternalLink href={tool.url}>Learn more</ExternalLink> : null}
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
