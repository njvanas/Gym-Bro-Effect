import { useMemo, useState } from 'react';

import { styles } from '../../lib/db';
import { filterStylesByQuery } from '../../lib/training-filters';
import { ExternalLink } from '../ExternalLink';

export function BroMethodsView() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => filterStylesByQuery(styles, query), [query]);
  const [selectedId, setSelectedId] = useState(filtered[0]?.id ?? styles[0]?.id ?? '');
  const selected = styles.find((s) => s.id === selectedId) ?? filtered[0];

  return (
    <div className="stack">
      <div className="search-row">
        <input
          type="search"
          placeholder="Search methods by name, creator, or tag"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search Bro Methods"
        />
      </div>
      <div className="split">
        <div className="stack">
          {filtered.map((style) => (
            <button
              key={style.id}
              type="button"
              className={style.id === selected?.id ? 'list-button active' : 'list-button'}
              onClick={() => setSelectedId(style.id)}
            >
              <strong>{style.name}</strong>
              <div className="muted">{style.creator}</div>
              <div className="tag-row">
                {style.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
        {selected ? (
          <article className="detail-panel stack">
            <header>
              <h3>{selected.name}</h3>
              <p className="muted">{selected.creator}</p>
              <p>{selected.summary}</p>
            </header>
            <section>
              <h4>Principles</h4>
              <ul className="clean">
                {selected.principles.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h4>Guidelines</h4>
              <ul className="clean">
                <li>Days/week: {selected.guidelines.trainingDaysPerWeek}</li>
                <li>Frequency: {selected.guidelines.frequencyPerMuscle}</li>
                <li>Warm-up: {selected.guidelines.warmupProtocol}</li>
                <li>Working sets: {selected.guidelines.workingSetProtocol}</li>
              </ul>
            </section>
            <section>
              <h4>Split overview</h4>
              <ul className="clean">
                {selected.splitOverview.map((day) => (
                  <li key={`${day.day}-${day.focus}`}>
                    <strong>{day.day}:</strong> {day.focus}
                  </li>
                ))}
              </ul>
            </section>
            {selected.sources.length > 0 ? (
              <section>
                <h4>Sources</h4>
                <ul className="clean">
                  {selected.sources.map((source) => (
                    <li key={source.url}>
                      <ExternalLink href={source.url}>{source.title}</ExternalLink>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </article>
        ) : (
          <p className="muted">No methods match that search.</p>
        )}
      </div>
    </div>
  );
}
