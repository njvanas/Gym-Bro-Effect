import { useState } from 'react';

import { phases } from '../../lib/fuel-db';
import { phaseLabel } from '../../lib/fuel-nav';
import type { PhaseId } from '../../schema';
import { PhaseDetail } from './PhaseDetail';

type BroFuelViewProps = {
  onNavigateToTraining?: () => void;
};

export function BroFuelView({ onNavigateToTraining }: BroFuelViewProps) {
  const [phaseId, setPhaseId] = useState<PhaseId | null>(null);
  const phase = phaseId ? (phases.find((p) => p.id === phaseId) ?? null) : null;

  if (phase) {
    return (
      <section className="stack fuel-section">
        <button type="button" className="back" onClick={() => setPhaseId(null)}>
          ← Bro Fuel
        </button>
        <PhaseDetail phase={phase} />
        {onNavigateToTraining ? (
          <button type="button" className="text-link" onClick={onNavigateToTraining}>
            Browse Bro Training →
          </button>
        ) : null}
      </section>
    );
  }

  return (
    <section className="stack fuel-section">
      <header className="section-masthead">
        <p className="section-kicker">Nutrition & phases</p>
        <h2 className="section-display-title">
          Bro <span className="accent">Fuel</span>
        </h2>
        <p className="section-lede">
          Surplus or deficit decides whether you grow or cut. Pick a phase — training stays in Bro
          Training.
        </p>
        {onNavigateToTraining ? (
          <button type="button" className="text-link" onClick={onNavigateToTraining}>
            Browse Bro Training →
          </button>
        ) : null}
      </header>

      <div className="training-hub-grid fuel-hub-grid">
        {phases.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`training-hub-card fuel-hub-card fuel-hub-card--${item.id}`}
            onClick={() => setPhaseId(item.id)}
          >
            <span className="training-hub-kicker">{phaseLabel(item.id)}</span>
            <strong className="training-hub-title">{item.name}</strong>
            <p>{item.tagline}</p>
            <span className="training-hub-cta">Open phase →</span>
          </button>
        ))}
      </div>
    </section>
  );
}
