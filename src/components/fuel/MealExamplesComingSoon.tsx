type MealExamplesComingSoonProps = {
  onBrowseFoods?: () => void;
};

export function MealExamplesComingSoon({ onBrowseFoods }: MealExamplesComingSoonProps) {
  return (
    <section className="fuel-panel stack meal-examples-soon" aria-labelledby="meal-examples-soon-title">
      <h3 id="meal-examples-soon-title" className="legend-col-title">
        My meal examples — coming soon
      </h3>
      <p className="fuel-prose">
        How these foods were stacked day-to-day in each phase — portions for cut vs bulk, when a
        shake or mass gainer helped, and the real routines — is on the way. For now, browse the
        Foods catalog for the products and macros used along the way.
      </p>
      {onBrowseFoods ? (
        <button type="button" className="text-link" onClick={onBrowseFoods}>
          Browse Foods →
        </button>
      ) : null}
    </section>
  );
}
