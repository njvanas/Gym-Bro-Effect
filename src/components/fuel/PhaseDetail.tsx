import { getRecipesForPhase } from '../../lib/fuel-db';
import type { Phase } from '../../schema';
import { RecipeCard } from './RecipeCard';

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

export function PhaseDetail({ phase }: PhaseDetailProps) {
  const recipes = getRecipesForPhase(phase.id);

  return (
    <div className="stack">
      <header className="panel stack">
        <h3>{phase.name}</h3>
        <p className="muted">{phase.tagline}</p>
      </header>

      <section className="panel stack">
        <h4>Overview</h4>
        {phase.overview.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="panel stack">
        <h4>Nutrition guidelines</h4>
        <ul className="clean">
          {phase.nutritionGuidelines.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="panel stack">
        <h4>Staple foods</h4>
        <div className="journey-grid">
          {phase.stapleFoods.map((group) => (
            <div className="card" key={group.category}>
              <strong>{foodCategoryLabel(group.category)}</strong>
              <ul className="clean">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="stack">
        <h4>Recipes</h4>
        <div className="journey-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="panel stack">
        <h4>Daily routine</h4>
        <ul className="clean">
          {phase.dailyRoutine.map((block) => (
            <li key={`${block.time}-${block.label}`}>
              <strong>{block.time}</strong> — {block.label}
              {block.detail ? <div className="muted">{block.detail}</div> : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
