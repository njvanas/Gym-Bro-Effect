import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  bodybuilders,
  getLegendRoutineGroupsByStyle,
  getRoutinesByStyle,
  getStyle,
} from '../../lib/db';
import { muscleLabel } from '../../lib/format';
import { parentCrumb, trainingLegendsBrowseCrumbs } from '../../lib/crumbs';
import { paths } from '../../lib/routes';
import type { Bodybuilder, TrainingStyle } from '../../schema';
import { BackLink } from '../BackLink';
import { Breadcrumbs } from '../Breadcrumbs';
import { Avatar } from './LegendDetail';

type FilterChip = {
  id: string;
  label: string;
  match: (bodybuilder: Bodybuilder, style: TrainingStyle | undefined) => boolean;
};

/** Browse chips for the unified bodybuilder roster. */
const FILTER_CHIPS: FilterChip[] = [
  {
    id: 'has-workouts',
    label: 'Has workouts',
    match: (_b, style) => Boolean(style && getRoutinesByStyle(style.id).length > 0),
  },
  {
    id: 'needs-sources',
    label: 'Needs sources',
    match: (_b, style) => Boolean(style?.tags.includes('Needs primary sources')),
  },
  {
    id: 'hit',
    label: 'HIT',
    match: (_b, style) =>
      Boolean(
        style?.tags.some((t) =>
          /hit|one set|beyond failure|infrequent|low frequency/i.test(t),
        ),
      ),
  },
  {
    id: 'volume',
    label: 'High volume',
    match: (_b, style) =>
      Boolean(style?.tags.some((t) => /high volume|20 working|moderate volume/i.test(t))),
  },
  {
    id: 'old-school',
    label: 'Old school',
    match: (_b, style) =>
      Boolean(style?.tags.some((t) => /old school|golden|olympia|nickname/i.test(t))),
  },
  {
    id: 'aesthetics',
    label: 'Aesthetics',
    match: (_b, style) =>
      Boolean(
        style?.tags.some((t) => /aesthetics|mind-muscle|stretching|longevity/i.test(t)),
      ),
  },
  {
    id: 'pump',
    label: 'Pump / FST',
    match: (_b, style) =>
      Boolean(style?.tags.some((t) => /fst|fascia|pump|pre-exhaust/i.test(t))),
  },
  {
    id: 'power',
    label: 'Power / compounds',
    match: (_b, style) =>
      Boolean(
        style?.tags.some((t) =>
          /heavy compounds|metroflex|progressive overload|failure training/i.test(t),
        ),
      ),
  },
];

function matchesBodybuilderQuery(
  bodybuilder: Bodybuilder,
  style: TrainingStyle | undefined,
  query: string,
): boolean {
  if (!query) return true;
  const hay = [bodybuilder.name, bodybuilder.era, bodybuilder.why, ...bodybuilder.titles]
    .join(' ')
    .toLowerCase();
  if (hay.includes(query)) return true;
  if (!style) return false;

  const styleHay = [
    style.name,
    style.creator,
    style.summary,
    ...style.tags,
    ...style.principles,
    ...style.splitOverview.map((d) => `${d.day} ${d.focus}`),
  ]
    .join(' ')
    .toLowerCase();
  if (styleHay.includes(query)) return true;

  const groups = getLegendRoutineGroupsByStyle(style.id);
  for (const group of groups) {
    if (group.label.toLowerCase().includes(query)) return true;
    for (const workout of group.workouts) {
      const workoutHay = [
        workout.name,
        workout.day ?? '',
        workout.description ?? '',
        ...workout.labels,
        ...workout.focus.map(muscleLabel),
      ]
        .join(' ')
        .toLowerCase();
      if (workoutHay.includes(query)) return true;
    }
  }

  return false;
}

function matchesFilter(
  bodybuilder: Bodybuilder,
  style: TrainingStyle | undefined,
  filterId: string | null,
): boolean {
  if (!filterId) return true;
  const chip = FILTER_CHIPS.find((c) => c.id === filterId);
  return chip ? chip.match(bodybuilder, style) : true;
}

function BodybuilderCard({
  bodybuilder,
  style,
  index,
}: {
  bodybuilder: Bodybuilder;
  style: TrainingStyle;
  index: number;
}) {
  const workouts = getRoutinesByStyle(style.id).length;

  return (
    <Link
      className="legend-card"
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
      to={paths.trainingLegend(style.id)}
    >
      <div className="legend-card-glow" aria-hidden />
      <Avatar name={bodybuilder.name} gradientKey={style.id} size="lg" />
      <div className="legend-card-body">
        <p className="legend-card-creator">{bodybuilder.era}</p>
        <h3 className="legend-card-name">{bodybuilder.name}</h3>
        <p className="legend-card-blurb">{style.summary}</p>
        <div className="chips">
          {style.tags.slice(0, 3).map((tag) => (
            <span className="chip" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="legend-card-meta">
          {style.name} · {workouts} workout{workouts === 1 ? '' : 's'}
        </div>
      </div>
      <span className="legend-card-cta">Open training system →</span>
    </Link>
  );
}

export function BroLegendsView() {
  const [query, setQuery] = useState('');
  const [filterId, setFilterId] = useState<string | null>(null);

  const normalized = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return bodybuilders.filter((bodybuilder) => {
      const style = bodybuilder.styleId ? getStyle(bodybuilder.styleId) : undefined;
      return (
        matchesBodybuilderQuery(bodybuilder, style, normalized) &&
        matchesFilter(bodybuilder, style, filterId)
      );
    });
  }, [normalized, filterId]);

  const crumbs = trainingLegendsBrowseCrumbs();

  return (
    <section className="stack">
      <Breadcrumbs items={crumbs} />
      <BackLink parent={parentCrumb(crumbs)} />
      <div className="legends-browse">
        <section className="legends-masthead">
          <p className="legends-kicker">Bro Legends</p>
          <h1 className="legends-headline">
            {bodybuilders.length} <span className="accent">bodybuilders</span>, A–Z
          </h1>
          <p className="legends-lede">
            Top 50 selection — every athlete has a full training program covering the
            physique (not one signature day), plus methodology, guidelines, split, and sources.
          </p>

          <div className="legends-search-shell">
            <label className="visually-hidden" htmlFor="legend-search">
              Find a bodybuilder, method, or workout
            </label>
            <div className="legends-search-row">
              <input
                id="legend-search"
                className="legends-search"
                type="search"
                placeholder="Arnold, Yates, HIT, FST-7…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
              {query || filterId ? (
                <button
                  type="button"
                  className="legends-search-clear"
                  onClick={() => {
                    setQuery('');
                    setFilterId(null);
                  }}
                >
                  Clear
                </button>
              ) : null}
              <button
                type="button"
                className="legends-search-go"
                aria-label="Search bodybuilders"
                onClick={() => {
                  document.getElementById('legend-results')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
              >
                →
              </button>
            </div>
          </div>

          <div
            className="legends-filter-rail"
            role="group"
            aria-label="Browse by school"
          >
            <button
              type="button"
              className={`legends-filter-chip${filterId === null ? ' active' : ''}`}
              onClick={() => setFilterId(null)}
              aria-pressed={filterId === null}
            >
              All
            </button>
            {FILTER_CHIPS.map((chip) => (
              <button
                type="button"
                key={chip.id}
                className={`legends-filter-chip${filterId === chip.id ? ' active' : ''}`}
                onClick={() =>
                  setFilterId((current) => (current === chip.id ? null : chip.id))
                }
                aria-pressed={filterId === chip.id}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <p className="legends-search-hint" id="legend-results">
            {filtered.length} of {bodybuilders.length} bodybuilders
            {normalized ? ` matching “${query.trim()}”` : ''}
            {filterId
              ? ` · ${FILTER_CHIPS.find((c) => c.id === filterId)?.label ?? ''}`
              : ''}
          </p>
        </section>

        {filtered.length === 0 ? (
          <div className="empty legends-empty">
            No bodybuilders match that search. Try a name, title, or method.
          </div>
        ) : (
          <div className="legend-grid">
            {filtered.map((bodybuilder, index) => {
              const style = getStyle(bodybuilder.styleId!);
              if (!style) return null;
              return (
                <BodybuilderCard
                  key={bodybuilder.id}
                  bodybuilder={bodybuilder}
                  style={style}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
