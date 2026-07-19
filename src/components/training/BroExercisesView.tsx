import { useEffect, useMemo, useState } from 'react';

import { exercises } from '../../lib/db';
import { categoryLabel, equipmentLabel, muscleLabel } from '../../lib/format';
import { filterExercises } from '../../lib/training-filters';
import type { Exercise, MuscleGroup } from '../../schema';

export function BroExercisesView() {
  const [query, setQuery] = useState('');
  const [muscle, setMuscle] = useState<MuscleGroup | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const muscleOptions = useMemo(() => {
    const set = new Set<MuscleGroup>();
    for (const ex of exercises) set.add(ex.primaryMuscle);
    return [...set].sort((a, b) => muscleLabel(a).localeCompare(muscleLabel(b)));
  }, []);

  const filtered = useMemo(
    () => filterExercises(exercises, query, muscle),
    [query, muscle],
  );

  const selected = selectedId
    ? (exercises.find((exercise) => exercise.id === selectedId) ?? null)
    : null;

  useEffect(() => {
    if (!selected) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setSelectedId(null);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selected]);

  return (
    <div className="exercises-view stack">
      <header className="section-masthead">
        <p className="section-kicker">Library</p>
        <h3 className="exercises-heading">Bro Exercises</h3>
        <p className="section-lede">
          Search the library, filter by muscle, then open a card for cues — the grid stays put.
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
              selected={selectedId === exercise.id}
              onOpen={() => setSelectedId(exercise.id)}
            />
          ))}
        </div>
      )}

      {selected ? (
        <ExerciseDetailModal exercise={selected} onClose={() => setSelectedId(null)} />
      ) : null}
    </div>
  );
}

type ExerciseCardProps = {
  exercise: Exercise;
  selected: boolean;
  onOpen: () => void;
};

function ExerciseCard({ exercise, selected, onOpen }: ExerciseCardProps) {
  return (
    <button
      type="button"
      className={`exercise-card${selected ? ' selected' : ''}`}
      onClick={onOpen}
    >
      <div className="exercise-card-top">
        <h4 className="exercise-card-title">{exercise.name}</h4>
        <span className="exercise-card-chevron" aria-hidden>
          →
        </span>
      </div>
      <p className="exercise-hevy muted">
        {exercise.hevyName && exercise.hevyName !== exercise.name
          ? `Hevy: ${exercise.hevyName}`
          : '\u00a0'}
      </p>
      <div className="chips exercise-card-chips">
        <span className="chip accent">{muscleLabel(exercise.primaryMuscle)}</span>
        <span className="chip">{equipmentLabel(exercise.equipment)}</span>
        <span className="chip">{categoryLabel(exercise.category)}</span>
      </div>
    </button>
  );
}

type ExerciseDetailModalProps = {
  exercise: Exercise;
  onClose: () => void;
};

function ExerciseDetailModal({ exercise, onClose }: ExerciseDetailModalProps) {
  return (
    <div className="exercise-modal" role="presentation">
      <button
        type="button"
        className="exercise-modal-backdrop"
        aria-label="Close exercise details"
        onClick={onClose}
      />
      <div
        className="exercise-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`exercise-modal-title-${exercise.id}`}
      >
        <div className="exercise-modal-head">
          <div>
            <h3 id={`exercise-modal-title-${exercise.id}`} className="exercise-modal-title">
              {exercise.name}
            </h3>
            {exercise.hevyName && exercise.hevyName !== exercise.name ? (
              <p className="muted exercise-hevy">Hevy: {exercise.hevyName}</p>
            ) : null}
          </div>
          <button type="button" className="exercise-modal-close" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="chips">
          <span className="chip accent">{muscleLabel(exercise.primaryMuscle)}</span>
          <span className="chip">{equipmentLabel(exercise.equipment)}</span>
          <span className="chip">{categoryLabel(exercise.category)}</span>
        </div>

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
        ) : (
          <p className="muted">No extra cues logged for this movement yet.</p>
        )}
      </div>
    </div>
  );
}
