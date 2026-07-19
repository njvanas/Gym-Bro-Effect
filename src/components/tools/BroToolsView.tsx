import { useMemo, useState } from 'react';

import { filterToolsByTier, tools } from '../../lib/tools-db';
import type { ToolCategory, ToolTier } from '../../schema';
import { ExternalLink } from '../ExternalLink';

const tiers: Array<ToolTier | 'all'> = ['all', 'essential', 'advised', 'want', 'alternative'];

function tierLabel(tier: ToolTier | 'all'): string {
  switch (tier) {
    case 'all':
      return 'All';
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

function categoryEmoji(category: ToolCategory): string {
  switch (category) {
    case 'body-composition':
      return '📏';
    case 'nutrition':
      return '🥗';
    case 'training':
      return '🏋️';
    case 'recovery':
      return '😴';
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
    <section className="stack tools-section">
      <header className="section-masthead">
        <p className="section-kicker">Gear & tracking</p>
        <h2 className="section-display-title">
          Bro <span className="accent">Tools</span>
        </h2>
        <p className="section-lede">
          Essential, advised, and optional gear for the journey — filter by what you actually need.
        </p>
      </header>

      <div className="legends-filter-rail" role="group" aria-label="Filter tools by tier">
        {tiers.map((item) => (
          <button
            key={item}
            type="button"
            className={`legends-filter-chip${tier === item ? ' active' : ''}`}
            aria-pressed={tier === item}
            onClick={() => setTier(item)}
          >
            {tierLabel(item)}
          </button>
        ))}
      </div>

      <p className="legends-search-hint">
        {filtered.length} of {tools.length} tools
        {tier !== 'all' ? ` · ${tierLabel(tier)}` : ''}
      </p>

      {filtered.length === 0 ? (
        <div className="empty">No tools in that tier.</div>
      ) : (
        [...grouped.entries()].map(([category, list]) => (
          <section className="tools-category" key={category}>
            <div className="tools-category-head">
              <span aria-hidden>{categoryEmoji(category)}</span>
              <h3>{categoryLabel(category)}</h3>
              <span className="muted">{list.length}</span>
            </div>
            <div className="tools-grid">
              {list.map((tool) => (
                <article className={`tool-card tool-card--${tool.tier}`} key={tool.id}>
                  <div className="tool-card-top">
                    <span className={`tag accent tool-tier tool-tier--${tool.tier}`}>
                      {tierLabel(tool.tier)}
                    </span>
                  </div>
                  <h4 className="tool-card-title">{tool.name}</h4>
                  <p className="tool-card-tracks">
                    <strong>Tracks</strong> {tool.tracks}
                  </p>
                  <p className="tool-card-body">{tool.necessity}</p>
                  <p className="tool-card-advice muted">{tool.advice}</p>
                  <p className="tool-card-purchase muted">
                    <strong>Purchase:</strong> {tool.purchaseReason}
                  </p>
                  {tool.url ? (
                    <ExternalLink className="tool-card-link" href={tool.url}>
                      Learn more →
                    </ExternalLink>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </section>
  );
}
