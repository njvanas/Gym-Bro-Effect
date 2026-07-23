import type { Phase } from '../../schema';
import { TdeeAccordion } from './TdeeCallout';

type PhaseDetailProps = {
  phase: Phase;
};

function foodCategoryLabel(category: Phase['stapleFoods'][number]['category']): string {
  switch (category) {
    case 'protein':
      return 'Protein';
    case 'carbs':
      return 'Carbs';
    case 'fats':
      return 'Fats';
    case 'vegetables':
      return 'Vegetables';
    default: {
      const _exhaustive: never = category;
      return _exhaustive;
    }
  }
}

function foodCategoryEmoji(category: Phase['stapleFoods'][number]['category']): string {
  switch (category) {
    case 'protein':
      return '🥩';
    case 'carbs':
      return '🍚';
    case 'fats':
      return '🥑';
    case 'vegetables':
      return '🥦';
    default: {
      const _exhaustive: never = category;
      return _exhaustive;
    }
  }
}

export function PhaseDetail({ phase }: PhaseDetailProps) {
  return (
    <div className="stack phase-detail">
      <header className={`phase-hero phase-hero--${phase.id}`}>
        <p className="legend-eyebrow">Bro Fuel</p>
        <h2 className="legend-detail-title">{phase.name}</h2>
        <p className="phase-hero-tagline">{phase.tagline}</p>
        <div className="chips">
          <span className="chip">{phase.stapleFoods.length} food groups</span>
          <span className="chip">{phase.dailyRoutine.length} daily blocks</span>
        </div>
      </header>

      <nav className="legend-jump" aria-label="On this phase">
        <a href={`#${phase.id}-tdee`}>TDEE</a>
        <a href={`#${phase.id}-overview`}>Overview</a>
        <a href={`#${phase.id}-nutrition`}>Nutrition</a>
        <a href={`#${phase.id}-foods`}>Foods</a>
        <a href={`#${phase.id}-routine`}>Daily routine</a>
      </nav>

      <TdeeAccordion phaseId={phase.id} />

      <section className="fuel-panel stack" id={`${phase.id}-overview`}>
        <h3 className="legend-col-title">Overview</h3>
        {phase.overview.map((paragraph) => (
          <p key={paragraph} className="fuel-prose">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="fuel-panel stack" id={`${phase.id}-nutrition`}>
        <h3 className="legend-col-title">Nutrition guidelines</h3>
        <ul className="principle-list">
          {phase.nutritionGuidelines.map((item, index) => (
            <li key={item}>
              <span className="principle-num" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="principle-text">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="stack" id={`${phase.id}-foods`}>
        <h3 className="legend-col-title">Staple foods</h3>
        <div className="food-grid">
          {phase.stapleFoods.map((group) => (
            <article className="food-card" key={group.category}>
              <div className="food-card-head">
                <span className="food-card-emoji" aria-hidden>
                  {foodCategoryEmoji(group.category)}
                </span>
                <strong>{foodCategoryLabel(group.category)}</strong>
              </div>
              <ul className="clean">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="fuel-panel stack" id={`${phase.id}-routine`}>
        <h3 className="legend-col-title">Daily routine</h3>
        <ol className="daily-timeline">
          {phase.dailyRoutine.map((block) => (
            <li key={`${block.time}-${block.label}`}>
              <span className="daily-time">{block.time}</span>
              <div className="daily-body">
                <strong>{block.label}</strong>
                {block.detail ? <p className="muted">{block.detail}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
