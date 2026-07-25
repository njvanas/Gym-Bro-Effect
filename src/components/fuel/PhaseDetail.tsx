import { Link } from 'react-router-dom';

import { getFeaturedProducts } from '../../lib/fuel-db';
import type { Phase } from '../../schema';
import { MealExamplesComingSoon } from './MealExamplesComingSoon';
import { ProductCard } from './ProductCard';
import { TdeeAccordion } from './TdeeCallout';

type PhaseDetailProps = {
  phase: Phase;
  foodsTo: string;
};

export function PhaseDetail({ phase, foodsTo }: PhaseDetailProps) {
  const featured = getFeaturedProducts(phase.id);

  return (
    <div className="stack phase-detail">
      <header className="section-masthead phase-masthead">
        <p className="section-kicker">Bro Fuel</p>
        <h2 className="section-display-title">
          <span className="accent">{phase.name}</span>
        </h2>
        <p className="section-lede">{phase.tagline}</p>
        <div className="chips">
          <span className="chip accent">{featured.length} featured foods</span>
          <span className="chip">{phase.dailyRoutine.length} daily blocks</span>
          <span className="chip">Meal examples soon</span>
        </div>
      </header>

      <nav className="legend-jump" aria-label="On this phase">
        <a href={`#${phase.id}-tdee`}>TDEE</a>
        <a href={`#${phase.id}-overview`}>Overview</a>
        <a href={`#${phase.id}-nutrition`}>Nutrition</a>
        <a href={`#${phase.id}-foods`}>Foods</a>
        <a href={`#${phase.id}-meals`}>Meal examples</a>
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
        <h3 className="legend-col-title">Featured foods</h3>
        <p className="fuel-prose">
          A slice of the Foods catalog that mattered in this phase. Full shopping reference lives
          under Bro Foods.
        </p>
        <div className="product-grid product-grid--compact">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
        <Link className="text-link" to={foodsTo}>
          Browse all Foods →
        </Link>
      </section>

      <div id={`${phase.id}-meals`}>
        <MealExamplesComingSoon foodsTo={foodsTo} />
      </div>

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
