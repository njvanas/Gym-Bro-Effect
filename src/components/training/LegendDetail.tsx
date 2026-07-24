import { Link } from 'react-router-dom';

import {
  getLegendRoutineGroupsByStyle,
  getRoutinesByStyle,
  type LegendRoutineGroup,
} from '../../lib/db';
import { intensityTechniqueLabel, muscleLabel } from '../../lib/format';
import { curatorGradient, curatorInitials } from '../../lib/curator';
import type { Routine, TrainingStyle } from '../../schema';
import { AccordionItem } from '../Accordion';
import { ExternalLink } from '../ExternalLink';

export function Avatar({
  name,
  gradientKey,
  size = '',
}: {
  name: string;
  gradientKey: string;
  size?: 'sm' | 'lg' | 'xl' | '';
}) {
  return (
    <span
      className={`avatar${size ? ` ${size}` : ''}`}
      style={{ background: curatorGradient(gradientKey) }}
      aria-hidden
    >
      {curatorInitials(name)}
    </span>
  );
}

function totalSets(routine: Routine): number {
  return routine.exercises.reduce((sum, slot) => sum + slot.sets, 0);
}

function WorkoutCard({ routine, to }: { routine: Routine; to: string }) {
  return (
    <Link to={to} className="legend-workout-card">
      <div className="legend-workout-card-top">
        {routine.day ? <span className="legend-day-badge">{routine.day}</span> : null}
        <span className="legend-workout-arrow" aria-hidden>
          →
        </span>
      </div>
      <h4 className="legend-workout-title">{routine.name}</h4>
      <div className="chips">
        {routine.focus.slice(0, 3).map((m) => (
          <span className="chip" key={m}>
            {muscleLabel(m)}
          </span>
        ))}
      </div>
      <div className="legend-workout-foot">
        {routine.exercises.length} exercises · {totalSets(routine)} sets
      </div>
    </Link>
  );
}

function RoutineGroupBlock({
  group,
  style,
  workoutTo,
}: {
  group: LegendRoutineGroup;
  style: TrainingStyle;
  workoutTo: (routineId: string) => string;
}) {
  return (
    <section className="legend-routine-block" aria-labelledby={`group-${group.id}`}>
      <div className="legend-routine-block-head" id={`group-${group.id}`}>
        <h3>{group.label}</h3>
        <p className="sub">
          {style.creator} · {group.workouts.length}{' '}
          {group.workouts.length === 1 ? 'workout' : 'workouts'}
        </p>
      </div>
      <div className="legend-workout-grid">
        {group.workouts.map((workout) => (
          <WorkoutCard key={workout.id} routine={workout} to={workoutTo(workout.id)} />
        ))}
      </div>
    </section>
  );
}

function MethodologyPanel({ style }: { style: TrainingStyle }) {
  return (
    <div className="legend-method">
      <p className="legend-summary">{style.summary}</p>

      <div className="legend-stat-row">
        <div className="legend-stat">
          <span className="legend-stat-label">Training days</span>
          <span className="legend-stat-value">
            {style.guidelines.trainingDaysPerWeek}
          </span>
        </div>
        <div className="legend-stat">
          <span className="legend-stat-label">Muscle frequency</span>
          <span className="legend-stat-value">
            {style.guidelines.frequencyPerMuscle}
          </span>
        </div>
      </div>

      <div className="accordion legend-accordion">
        <AccordionItem
          title="Core principles"
          summary={`${style.principles.length}`}
          anchorId={`${style.id}-principles`}
        >
          <ol className="principle-list">
            {style.principles.map((p, i) => (
              <li key={i}>
                <span className="principle-num" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="principle-text">{p}</span>
              </li>
            ))}
          </ol>
        </AccordionItem>

        <AccordionItem
          title="Training guidelines"
          summary="Warm-ups · sets · reps"
          anchorId={`${style.id}-guidelines`}
        >
          <div className="legend-guide-grid">
            <div className="legend-guide">
              <h4>Warm-ups</h4>
              <p className="sub">{style.guidelines.warmupProtocol}</p>
            </div>
            <div className="legend-guide">
              <h4>Working sets</h4>
              <p className="sub">{style.guidelines.workingSetProtocol}</p>
            </div>
            <div className="legend-guide">
              <h4>Rep ranges</h4>
              <div className="chips">
                {style.guidelines.repRanges.map((r, i) => (
                  <span className="chip" key={i}>
                    {r.target}: {r.range}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AccordionItem>

        {style.intensityTechniques.length > 0 ? (
          <AccordionItem
            title="Intensity techniques"
            summary={String(style.intensityTechniques.length)}
            anchorId={`${style.id}-intensity`}
          >
            <div className="chips">
              {style.intensityTechniques.map((t) => (
                <span className="chip accent" key={t}>
                  {intensityTechniqueLabel(t)}
                </span>
              ))}
            </div>
          </AccordionItem>
        ) : null}

        <AccordionItem
          title="Weekly split"
          summary={`${style.splitOverview.length} days`}
          defaultOpen
          anchorId={`${style.id}-split`}
        >
          <div className="split-grid">
            {style.splitOverview.map((day) => (
              <div className="split-day" key={`${day.day}-${day.focus}`}>
                <span className="split-day-label">{day.day}</span>
                <span className="split-day-focus">{day.focus}</span>
              </div>
            ))}
          </div>
        </AccordionItem>

        {style.sources.length > 0 ? (
          <AccordionItem
            title="Sources"
            summary={`${style.sources.length}`}
            anchorId={`${style.id}-sources`}
          >
            <ul className="principles source-list">
              {style.sources.map((s) => (
                <li key={s.url}>
                  <ExternalLink href={s.url}>{s.title}</ExternalLink>
                </li>
              ))}
            </ul>
          </AccordionItem>
        ) : null}
      </div>
    </div>
  );
}

export function LegendDetail({
  style,
  backTo,
  workoutTo,
}: {
  style: TrainingStyle;
  backTo: string;
  workoutTo: (routineId: string) => string;
}) {
  const groups = getLegendRoutineGroupsByStyle(style.id);
  const workoutCount = getRoutinesByStyle(style.id).length;

  return (
    <div className="legend-detail" key={style.id}>
      <Link className="back" to={backTo}>
        ← All bodybuilders
      </Link>

      <header className="legend-detail-hero">
        <Avatar name={style.creator} gradientKey={style.id} size="xl" />
        <div className="legend-detail-hero-copy">
          <p className="legend-eyebrow">{style.creator}</p>
          <h2 className="legend-detail-title">{style.name}</h2>
          <div className="chips">
            {style.tags.map((tag) => (
              <span className="chip accent" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <p className="legend-detail-meta">
            {groups.length} training routine{groups.length === 1 ? '' : 's'} ·{' '}
            {workoutCount} workout{workoutCount === 1 ? '' : 's'}
          </p>
        </div>
      </header>

      <nav className="legend-jump" aria-label="On this page">
        <a href={`#${style.id}-method`}>Methodology</a>
        <a href={`#${style.id}-workouts`}>Workouts</a>
      </nav>

      <div className="legend-detail-layout">
        <section
          className="legend-detail-col"
          id={`${style.id}-method`}
          aria-labelledby={`${style.id}-method-heading`}
        >
          <h3 className="legend-col-title" id={`${style.id}-method-heading`}>
            Methodology
          </h3>
          <MethodologyPanel style={style} />
        </section>

        <section
          className="legend-detail-col"
          id={`${style.id}-workouts`}
          aria-labelledby={`${style.id}-workouts-heading`}
        >
          <h3 className="legend-col-title" id={`${style.id}-workouts-heading`}>
            Training routines
          </h3>
          {groups.length === 0 ? (
            <div className="empty">
              No verified workouts for this athlete yet — primary sources have not
              attested a specific routine we can list without inventing exercises.
            </div>
          ) : (
            <div className="legend-routines">
              {groups.map((group) => (
                <RoutineGroupBlock
                  key={group.id}
                  group={group}
                  style={style}
                  workoutTo={workoutTo}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
