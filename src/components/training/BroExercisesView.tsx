import { useMemo, useState } from 'react';

import { exercises } from '../../lib/db';
import { categoryLabel, equipmentLabel, muscleLabel } from '../../lib/format';
import { filterExercises } from '../../lib/training-filters';
import type { Exercise, MuscleGroup } from '../../schema';

export function BroExercisesView() {
  const [query, setQuery] = useState('');
  const [muscle, setMuscle] = useState<MuscleGroup | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const muscleOptions = useMemo(() => {
    const set = new Set<MuscleGroup>();
    for (const ex of exercises) set.add(ex.primaryMuscle);
    return [...set].sort((a, b) => muscleLabel(a).localeCompare(muscleLabel(b)));
  }, []);

  const filtered = useMemo(
    () => filterExercises(exercises, query, muscle),
    [query, muscle],
  );

  return (
    <div className="exercises-view stack">
      <header className="section-masthead">
        <p className="section-kicker">Library</p>
        <h3 className="exercises-heading">Bro Exercises</h3>
        <p className="section-lede">
          Search the library, filter by muscle, then expand a card for cues — no long side panel.
        </p>
      </header>

      <div className="exercises-toolbar">
        <input
          type="search"
          className="exercises-search"
          placeholder="Search name, Hevy name, or alias…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search Bro Exercises"
        />
        <div className="legends-filter-rail" role="group" aria-label="Filter by primary muscle">
          <button
            type="button"
            className={`legends-filter-chip${muscle === 'all' ? ' active' : ''}`}
            aria-pressed={muscle === 'all'}
            onClick={() => setMuscle('all')}
          >
            All
          </button>
          {muscleOptions.map((m) => (
            <button
              key={m}
              type="button"
              className={`legends-filter-chip${muscle === m ? ' active' : ''}`}
              aria-pressed={muscle === m}
              onClick={() => setMuscle((current) => (current === m ? 'all' : m))}
            >
              {muscleLabel(m)}
            </button>
          ))}
        </div>
        <p className="legends-search-hint">
          {filtered.length} of {exercises.length} exercises
          {muscle !== 'all' ? ` · ${muscleLabel(muscle)}` : ''}
          {query.trim() ? ` matching “${query.trim()}”` : ''}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">No exercises match those filters.</div>
      ) : (
        <div className="exercises-grid">
          {filtered.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              expanded={expandedId === exercise.id}
              onToggle={() =>
                setExpandedId((current) => (current === exercise.id ? null : exercise.id))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

type ExerciseCardProps = {
  exercise: Exercise;
  expanded: boolean;
  onToggle: () => void;
};

function ExerciseCard({ exercise, expanded, onToggle }: ExerciseCardProps) {
  const hasDetails =
    exercise.cues.length > 0 ||
    Boolean(exercise.bloodAndGutsNote) ||
    exercise.secondaryMuscles.length > 0;

  return (
    <article className={`exercise-card${expanded ? ' expanded' : ''}`}>
      <button type="button" className="exercise-card-main" onClick={onToggle}>
        <div className="exercise-card-top">
          <h4 className="exercise-card-title">{exercise.name}</h4>
          {hasDetails ? (
            <span className="exercise-card-chevron" aria-hidden>
              {expanded ? '−' : '+'}
            </span>
          ) : null}
        </div>
        {exercise.hevyName && exercise.hevyName !== exercise.name ? (
          <p className="exercise-hevy muted">Hevy: {exercise.hevyName}</p>
        ) : null}
        <div className="chips">
          <span className="chip accent">{muscleLabel(exercise.primaryMuscle)}</span>
          <span className="chip">{equipmentLabel(exercise.equipment)}</span>
          <span className="chip">{categoryLabel(exercise.category)}</span>
        </div>
      </button>

      {expanded && hasDetails ? (
        <div className="exercise-card-details">
          {exercise.secondaryMuscles.length > 0 ? (
            <div className="exercise-detail-block">
              <span className="exercise-detail-label">Also hits</span>
              <div className="chips">
                {exercise.secondaryMuscles.map((m) => (
                  <span className="chip" key={m}>
                    {muscleLabel(m)}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {exercise.cues.length > 0 ? (
            <div className="exercise-detail-block">
              <span className="exercise-detail-label">Cues</span>
              <ul className="exercise-cues">
                {exercise.cues.map((cue) => (
                  <li key={cue}>{cue}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {exercise.bloodAndGutsNote ? (
            <div className="exercise-detail-block exercise-note">
              <span className="exercise-detail-label">Blood &amp; Guts</span>
              <p>{exercise.bloodAndGutsNote}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
