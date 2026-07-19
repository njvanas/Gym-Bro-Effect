import { useMemo, useState } from 'react';

import { muscleGroupSchema, type MuscleGroup } from '../../schema';
import { exercises } from '../../lib/db';
import { filterExercises } from '../../lib/training-filters';

const muscles: Array<MuscleGroup | 'all'> = ['all', ...muscleGroupSchema.options];

export function BroExercisesView() {
  const [query, setQuery] = useState('');
  const [muscle, setMuscle] = useState<MuscleGroup | 'all'>('all');
  const filtered = useMemo(
    () => filterExercises(exercises, query, muscle),
    [query, muscle],
  );
  const [selectedId, setSelectedId] = useState(filtered[0]?.id ?? exercises[0]?.id ?? '');
  const selected =
    filtered.find((e) => e.id === selectedId) ??
    exercises.find((e) => e.id === selectedId) ??
    filtered[0];

  return (
    <div className="stack">
      <div className="search-row">
        <input
          type="search"
          placeholder="Search exercises"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search Bro Exercises"
        />
        <select
          value={muscle}
          onChange={(e) => setMuscle(e.target.value as MuscleGroup | 'all')}
          aria-label="Filter by muscle"
        >
          {muscles.map((m) => (
            <option value={m} key={m}>
              {m === 'all' ? 'All muscles' : m}
            </option>
          ))}
        </select>
      </div>
      <div className="split">
        <div className="stack">
          {filtered.map((exercise) => (
            <button
              key={exercise.id}
              type="button"
              className={exercise.id === selected?.id ? 'list-button active' : 'list-button'}
              onClick={() => setSelectedId(exercise.id)}
            >
              <strong>{exercise.name}</strong>
              <div className="muted">
                {exercise.primaryMuscle} · {exercise.equipment} · {exercise.category}
              </div>
            </button>
          ))}
        </div>
        {selected ? (
          <article className="detail-panel stack">
            <header>
              <h3>{selected.name}</h3>
              {selected.hevyName ? (
                <p className="muted">Hevy: {selected.hevyName}</p>
              ) : null}
              <div className="tag-row">
                <span className="tag accent">{selected.primaryMuscle}</span>
                <span className="tag">{selected.equipment}</span>
                <span className="tag">{selected.category}</span>
              </div>
            </header>
            {selected.secondaryMuscles.length > 0 ? (
              <section>
                <h4>Secondary muscles</h4>
                <div className="tag-row">
                  {selected.secondaryMuscles.map((m) => (
                    <span className="tag" key={m}>
                      {m}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}
            {selected.cues.length > 0 ? (
              <section>
                <h4>Cues</h4>
                <ul className="clean">
                  {selected.cues.map((cue) => (
                    <li key={cue}>{cue}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {selected.bloodAndGutsNote ? (
              <section>
                <h4>Blood & Guts note</h4>
                <p>{selected.bloodAndGutsNote}</p>
              </section>
            ) : null}
          </article>
        ) : (
          <p className="muted">No exercises match that search.</p>
        )}
      </div>
    </div>
  );
}
