import { useMemo, useState } from 'react';

import { bodybuilders } from '../../lib/db';
import { curatorGradient, curatorInitials } from '../../lib/curator';
import type { Bodybuilder } from '../../schema';
import { AccordionItem } from '../Accordion';

type View = { kind: 'browse' } | { kind: 'card'; id: string };

function tierLabel(tier: Bodybuilder['tier']): string {
  switch (tier) {
    case 1:
      return 'Full system';
    case 2:
      return 'Documented style';
    case 3:
      return 'Roster card';
    default: {
      const _exhaustive: never = tier;
      return _exhaustive;
    }
  }
}

function matchesQuery(b: Bodybuilder, query: string): boolean {
  if (!query) return true;
  const hay = [b.name, b.era, b.why, ...b.titles, ...b.principles]
    .join(' ')
    .toLowerCase();
  return hay.includes(query);
}

function Avatar({ name, gradientKey }: { name: string; gradientKey: string }) {
  return (
    <span
      className="avatar lg"
      style={{ background: curatorGradient(gradientKey) }}
      aria-hidden
    >
      {curatorInitials(name)}
    </span>
  );
}

function RosterCard({
  bodybuilder,
  index,
  onSelect,
}: {
  bodybuilder: Bodybuilder;
  index: number;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className="legend-card"
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
      onClick={onSelect}
    >
      <div className="legend-card-glow" aria-hidden />
      <Avatar name={bodybuilder.name} gradientKey={bodybuilder.styleId ?? bodybuilder.id} />
      <div className="legend-card-body">
        <p className="legend-card-creator">{bodybuilder.era}</p>
        <h3 className="legend-card-name">{bodybuilder.name}</h3>
        <p className="legend-card-blurb">{bodybuilder.why}</p>
        <div className="chips">
          {bodybuilder.titles.slice(0, 2).map((title) => (
            <span className="chip" key={title}>
              {title}
            </span>
          ))}
          <span className="chip accent">{tierLabel(bodybuilder.tier)}</span>
        </div>
      </div>
      <span className="legend-card-cta">
        {bodybuilder.styleId ? 'View full training system →' : 'View roster card →'}
      </span>
    </button>
  );
}

function RosterDetail({
  bodybuilder,
  onBack,
}: {
  bodybuilder: Bodybuilder;
  onBack: () => void;
}) {
  return (
    <div className="legend-detail" key={bodybuilder.id}>
      <button type="button" className="back" onClick={onBack}>
        ← All bodybuilders
      </button>

      <header className="legend-detail-hero">
        <Avatar name={bodybuilder.name} gradientKey={bodybuilder.styleId ?? bodybuilder.id} />
        <div className="legend-detail-hero-copy">
          <p className="legend-eyebrow">{bodybuilder.era}</p>
          <h2 className="legend-detail-title">{bodybuilder.name}</h2>
          <div className="chips">
            {bodybuilder.titles.map((title) => (
              <span className="chip accent" key={title}>
                {title}
              </span>
            ))}
            <span className="chip">{tierLabel(bodybuilder.tier)}</span>
          </div>
        </div>
      </header>

      <div className="legend-method">
        <p className="legend-summary">{bodybuilder.why}</p>

        <div className="accordion legend-accordion">
          <AccordionItem
            title="Principles"
            summary={String(bodybuilder.principles.length)}
            defaultOpen
            anchorId={`${bodybuilder.id}-principles`}
          >
            <ol className="principle-list">
              {bodybuilder.principles.map((p, i) => (
                <li key={i}>
                  <span className="principle-num" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="principle-text">{p}</span>
                </li>
              ))}
            </ol>
          </AccordionItem>

          {bodybuilder.sources.length > 0 ? (
            <AccordionItem
              title="Sources"
              summary={String(bodybuilder.sources.length)}
              defaultOpen
              anchorId={`${bodybuilder.id}-sources`}
            >
              <ul className="principles source-list">
                {bodybuilder.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionItem>
          ) : (
            <p className="sub" style={{ marginTop: '0.75rem' }}>
              No verified sources yet for this roster card — thin sourcing is flagged honestly
              rather than filled with guesses.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function BroRosterView({
  onOpenStyle,
}: {
  onOpenStyle: (styleId: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<View>({ kind: 'browse' });

  const normalized = query.trim().toLowerCase();
  const filtered = useMemo(
    () => bodybuilders.filter((b) => matchesQuery(b, normalized)),
    [normalized],
  );

  if (view.kind === 'card') {
    const bodybuilder = bodybuilders.find((b) => b.id === view.id);
    if (!bodybuilder) {
      return (
        <div className="empty">
          Bodybuilder not found.{' '}
          <button type="button" className="back" onClick={() => setView({ kind: 'browse' })}>
            Go back
          </button>
        </div>
      );
    }
    return (
      <RosterDetail bodybuilder={bodybuilder} onBack={() => setView({ kind: 'browse' })} />
    );
  }

  return (
    <div className="legends-browse">
      <section className="legends-masthead">
        <p className="legends-kicker">Bro Roster</p>
        <h1 className="legends-headline">
          {bodybuilders.length}+ <span className="accent">bodybuilders</span>, one roster
        </h1>
        <p className="legends-lede">
          Every legend gets a card — titles, era, and sourced principles. Cards with a full
          documented system link straight into Bro Methods; the rest stay honest about how thin
          the sourcing still is.
        </p>

        <div className="legends-search-shell">
          <label className="visually-hidden" htmlFor="roster-search">
            Find a bodybuilder
          </label>
          <div className="legends-search-row">
            <input
              id="roster-search"
              className="legends-search"
              type="search"
              placeholder="Yates, Olympia, aesthetics…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            {query ? (
              <button type="button" className="legends-search-clear" onClick={() => setQuery('')}>
                Clear
              </button>
            ) : null}
          </div>
        </div>

        <p className="legends-search-hint">
          {filtered.length} of {bodybuilders.length} bodybuilders
          {normalized ? ` matching “${query.trim()}”` : ''}
        </p>
      </section>

      {filtered.length === 0 ? (
        <div className="empty legends-empty">No bodybuilders match that search.</div>
      ) : (
        <div className="legend-grid">
          {filtered.map((bodybuilder, index) => (
            <RosterCard
              key={bodybuilder.id}
              bodybuilder={bodybuilder}
              index={index}
              onSelect={() =>
                bodybuilder.styleId
                  ? onOpenStyle(bodybuilder.styleId)
                  : setView({ kind: 'card', id: bodybuilder.id })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
