import { useMemo, useState } from 'react';

import { toolsHubCrumbs } from '../../lib/crumbs';
import {
  filterToolsByTiers,
  groupToolsByTier,
  TOOL_TIER_ORDER,
  tools,
} from '../../lib/tools-db';
import type { ToolTier } from '../../schema';
import { ExternalLink } from '../ExternalLink';
import { PageChrome } from '../PageChrome';

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
      <PageChrome crumbs={toolsHubCrumbs()} />
      <div className="legends-browse">
        <section className="legends-masthead">
          <p className="legends-kicker">Gear & tracking</p>
          <h1 className="legends-headline">
            Bro <span className="accent">Tools</span>
          </h1>
          <p className="legends-lede">
            Laid out as Essential → Advised → Want → Alternative. Pick one or more filters — All
            shows everything.
          </p>

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
        </section>

        {filtered.length === 0 ? (
          <div className="empty legends-empty">No tools match those filters.</div>
        ) : (
          grouped.map(({ tier, items }) => (
            <section className="tools-tier-group" key={tier}>
              <div className="tools-tier-head">
                <h2 className="legend-col-title">{tierLabel(tier)}</h2>
                <span className="tools-tier-count">{items.length}</span>
              </div>
              <div className="tools-grid">
                {items.map((tool) => (
                  <article className={`tool-card tool-card--${tool.tier}`} key={tool.id}>
                    <div className="tool-card-glow" aria-hidden />
                    <div className="tool-card-body">
                      <p className="tool-card-eyebrow">{formatCategory(tool.category)}</p>
                      <h3 className="tool-card-title">{tool.name}</h3>
                      <div className="chips">
                        <span className={`chip tool-tier tool-tier--${tool.tier}`}>
                          {tierLabel(tool.tier)}
                        </span>
                      </div>
                      <p className="tool-card-blurb">{tool.necessity}</p>
                      <p className="tool-card-tracks">
                        <strong>Tracks</strong> {tool.tracks}
                      </p>
                      <p className="tool-card-advice">{tool.advice}</p>
                      <p className="tool-card-meta">{tool.purchaseReason}</p>
                    </div>
                    {tool.url ? (
                      <ExternalLink className="tool-card-cta" href={tool.url}>
                        Learn more →
                      </ExternalLink>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </section>
  );
}
