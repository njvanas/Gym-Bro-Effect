import type { Recipe } from '../../schema';

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className="card stack">
      <h4>{recipe.name}</h4>
      <p className="recipe-macros">
        Approx. {recipe.calories} calories | {recipe.proteinG}g protein | {recipe.carbsG}g
        carbs | {recipe.fatG}g fat
      </p>
      <div>
        <strong>Ingredients</strong>
        <ul className="clean">
          {recipe.ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Steps</strong>
        <ul className="clean">
          {recipe.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
