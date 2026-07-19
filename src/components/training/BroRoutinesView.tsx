import { useMemo, useState } from 'react';

import {
  getExercise,
  getLegendRoutineGroups,
  hevyFolders,
} from '../../lib/db';
import { resolveSetScheme, summarizeSetScheme } from '../../lib/set-scheme';
import { ExternalLink } from '../ExternalLink';

export function BroRoutinesView() {
  const groups = useMemo(() => getLegendRoutineGroups(), []);
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id ?? '');
  const selected = groups.find((g) => g.id === selectedGroupId) ?? groups[0];

  return (
    <div className="stack">
      <section className="stack">
        <h3>Personal Hevy folders</h3>
        <div className="journey-grid">
          {hevyFolders.map((folder) => (
            <article className="card stack" key={folder.id}>
              <strong>{folder.name}</strong>
              {folder.note ? <p className="muted">{folder.note}</p> : null}
              <p className="meta-line">{folder.routinesInHevy.length} routines in Hevy</p>
              <ExternalLink href={folder.url}>Open in Hevy</ExternalLink>
            </article>
          ))}
        </div>
      </section>

      <section className="stack">
        <h3>Legend reference routines</h3>
        <div className="split">
          <div className="stack">
            {groups.map((group) => (
              <button
                key={group.id}
                type="button"
                className={group.id === selected?.id ? 'list-button active' : 'list-button'}
                onClick={() => setSelectedGroupId(group.id)}
              >
                <strong>{group.label}</strong>
                <div className="muted">
                  {group.styleId} · {group.workouts.length} workouts
                </div>
              </button>
            ))}
          </div>
          {selected ? (
            <div className="stack">
              {selected.workouts.map((workout) => (
                <article className="detail-panel stack" key={workout.id}>
                  <header>
                    <h4>{workout.name}</h4>
                    {workout.day ? <p className="muted">{workout.day}</p> : null}
                    {workout.description ? <p>{workout.description}</p> : null}
                  </header>
                  <ul className="clean">
                    {workout.exercises.map((slot) => {
                      const exercise = getExercise(slot.exerciseId);
                      if (!exercise) return null;
                      return (
                        <li key={`${workout.id}-${slot.exerciseId}-${slot.supersetGroup ?? ''}`}>
                          <strong>{exercise.name}</strong> — {slot.sets} × {slot.repRange}
                          {slot.setScheme.length > 0 ? (
                            <div className="meta-line">
                              {summarizeSetScheme(resolveSetScheme(slot).sets)}
                            </div>
                          ) : null}
                          {slot.notes ? <div className="muted">{slot.notes}</div> : null}
                        </li>
                      );
                    })}
                  </ul>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
