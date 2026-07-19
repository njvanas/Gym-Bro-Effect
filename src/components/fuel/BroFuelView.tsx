type BroFuelViewProps = {
  onNavigateToTraining?: () => void;
};

export function BroFuelView({ onNavigateToTraining }: BroFuelViewProps) {
  return (
    <section>
      <h2>Bro Fuel</h2>
      {onNavigateToTraining ? (
        <p>
          <button type="button" className="text-link" onClick={onNavigateToTraining}>
            Browse Bro Training
          </button>
        </p>
      ) : null}
    </section>
  );
}
