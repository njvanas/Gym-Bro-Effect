import { muscleLabel } from '../../lib/format';
import type { Routine, TrainingStyle } from '../../schema';
import { ExerciseTable } from '../ExerciseTable';
import { ExternalLink } from '../ExternalLink';
import { Avatar } from './LegendDetail';

export function WorkoutDetail({
  routine,
  style,
}: {
  routine: Routine;
  style: TrainingStyle | undefined;
}) {
  const creator = style?.creator ?? 'Unknown';

  return (
    <div className="legend-workout-detail">
      <div className="detail">
        <div className="detail-head">
          <div className="who">
            {routine.styleId ? (
              <Avatar name={creator} gradientKey={routine.styleId} size="lg" />
            ) : null}
            <div>
              <div className="k">Curated by</div>
              <div className="v">{creator}</div>
              {style ? <div className="ex-meta">{style.name}</div> : null}
            </div>
          </div>
          {routine.source ? (
            <ExternalLink href={routine.source.url}>{routine.source.name}</ExternalLink>
          ) : null}
        </div>

        <h2>{routine.name}</h2>
        {routine.day ? <div className="plan-day">{routine.day}</div> : null}

        <div className="chips" style={{ marginTop: 12 }}>
          {routine.labels.map((label) => (
            <span className="chip label-chip" key={label}>
              {label}
            </span>
          ))}
          {routine.focus.map((m) => (
            <span className="chip accent" key={m}>
              {muscleLabel(m)}
            </span>
          ))}
        </div>

        {routine.description ? (
          <p className="routine-desc">{routine.description}</p>
        ) : null}

        <ExerciseTable routine={routine} />
      </div>
    </div>
  );
}
