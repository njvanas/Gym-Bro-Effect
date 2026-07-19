import { useMemo, useState } from 'react';

import {
  filterToolsByTiers,
  groupToolsByTier,
  TOOL_TIER_ORDER,
  tools,
} from '../../lib/tools-db';
import type { ToolTier } from '../../schema';
import { ExternalLink } from '../ExternalLink';

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

function tierSectionEmoji(tier: ToolTier): string {
  switch (tier) {
    case 'essential':
      return '✅';
    case 'advised':
      return '💡';
    case 'want':
      return '✨';
    case 'alternative':
      return '🔄';
    default: {
      const _exhaustive: never = tier;
      return _exhaustive;
    }
  }
}

export function BroToolsView() {
  const [selectedTiers, setSelectedTiers] = useState<ToolTier[]>([]);

  const showingAll = selectedTiers.length === 0;

  const filtered = useMemo(
    () => filterToolsByTiers(tools, selectedTiers),
    [selectedTiers],
  );

  const grouped = useMemo(() => groupToolsByTier(filtered), [filtered]);

  function selectAll() {
    setSelectedTiers([]);
  }

  function toggleTier(tier: ToolTier) {
    setSelectedTiers((current) => {
      if (current.includes(tier)) {
        return current.filter((item) => item !== tier);
      }
      return TOOL_TIER_ORDER.filter((item) => item === tier || current.includes(item));
    });
  }

  const filterHint = showingAll
    ? 'All tiers'
    : selectedTiers.map((tier) => tierLabel(tier)).join(' · ');

  return (
    <section className="stack tools-section">
      <header className="section-masthead">
        <p className="section-kicker">Gear & tracking</p>
        <h2 className="section-display-title">
          Bro <span className="accent">Tools</span>
        </h2>
        <p className="section-lede">
          Laid out as Essential → Advised → Want → Alternative. Pick one or more filters — All shows
          everything.
        </p>
      </header>

      <div className="legends-filter-rail" role="group" aria-label="Filter tools by tier">
        <button
          type="button"
          className={`legends-filter-chip${showingAll ? ' active' : ''}`}
          aria-pressed={showingAll}
          onClick={selectAll}
        >
          All
        </button>
        {TOOL_TIER_ORDER.map((tier) => {
          const active = selectedTiers.includes(tier);
          return (
            <button
              key={tier}
              type="button"
              className={`legends-filter-chip${active ? ' active' : ''}`}
              aria-pressed={active}
              onClick={() => toggleTier(tier)}
            >
              {tierLabel(tier)}
            </button>
          );
        })}
      </div>

      <p className="legends-search-hint">
        {filtered.length} of {tools.length} tools · {filterHint}
      </p>

      {filtered.length === 0 ? (
        <div className="empty">No tools match those filters.</div>
      ) : (
        grouped.map(({ tier, items }) => (
          <section className={`tools-category tools-tier-section tools-tier-section--${tier}`} key={tier}>
            <div className="tools-category-head">
              <span aria-hidden>{tierSectionEmoji(tier)}</span>
              <h3>{tierLabel(tier)}</h3>
              <span className="muted">{items.length}</span>
            </div>
            <div className="tools-grid">
              {items.map((tool) => (
                <article className={`tool-card tool-card--${tool.tier}`} key={tool.id}>
                  <div className="tool-card-top">
                    <span className={`tag accent tool-tier tool-tier--${tool.tier}`}>
                      {tierLabel(tool.tier)}
                    </span>
                    <span className="tool-card-category muted">{formatCategory(tool.category)}</span>
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

function formatCategory(category: (typeof tools)[number]['category']): string {
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
