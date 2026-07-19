import type { Recipe } from '../../schema';

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="recipe-card">
      <header className="recipe-card-head">
        <h4 className="recipe-card-title">{recipe.name}</h4>
        <div className="recipe-macro-row" aria-label="Macros">
          <span className="recipe-macro">
            <em>{recipe.calories}</em> cal
          </span>
          <span className="recipe-macro">
            <em>{recipe.proteinG}g</em> P
          </span>
          <span className="recipe-macro">
            <em>{recipe.carbsG}g</em> C
          </span>
          <span className="recipe-macro">
            <em>{recipe.fatG}g</em> F
          </span>
        </div>
      </header>

      <div className="recipe-card-section">
        <h5>Ingredients</h5>
        <ul className="clean">
          {recipe.ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-card-section">
        <h5>Steps</h5>
        <ol className="recipe-steps">
          {recipe.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </article>
  );
}
