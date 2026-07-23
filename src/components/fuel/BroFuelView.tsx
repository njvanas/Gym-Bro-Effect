import { useState } from 'react';

import { phases } from '../../lib/fuel-db';
import { phaseLabel } from '../../lib/fuel-nav';
import type { PhaseId } from '../../schema';
import { FoodsCatalog } from './FoodsCatalog';
import { PhaseDetail } from './PhaseDetail';
import { TdeeCallout } from './TdeeCallout';

type BroFuelViewProps = {
  onNavigateToTraining?: () => void;
};

type FuelScreen =
  | { kind: 'hub' }
  | { kind: 'phase'; id: PhaseId }
  | { kind: 'foods' };

export function BroFuelView({ onNavigateToTraining }: BroFuelViewProps) {
  const [screen, setScreen] = useState<FuelScreen>({ kind: 'hub' });

  if (screen.kind === 'phase') {
    const phase = phases.find((p) => p.id === screen.id) ?? null;
    if (!phase) {
      return (
        <section className="stack fuel-section">
          <button type="button" className="back" onClick={() => setScreen({ kind: 'hub' })}>
            ← Bro Fuel
          </button>
          <p>Phase not found.</p>
        </section>
      );
    }
    return (
      <section className="stack fuel-section">
        <button type="button" className="back" onClick={() => setScreen({ kind: 'hub' })}>
          ← Bro Fuel
        </button>
        <PhaseDetail phase={phase} onBrowseFoods={() => setScreen({ kind: 'foods' })} />
        {onNavigateToTraining ? (
          <button type="button" className="text-link" onClick={onNavigateToTraining}>
            Browse Bro Training →
          </button>
        ) : null}
      </section>
    );
  }

  if (screen.kind === 'foods') {
    return (
      <section className="stack fuel-section">
        <button type="button" className="back" onClick={() => setScreen({ kind: 'hub' })}>
          ← Bro Fuel
        </button>
        <FoodsCatalog />
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
          Phase strategy plus the real Foods shopping reference from this journey. Personal meal
          examples per phase are coming soon.
        </p>
        {onNavigateToTraining ? (
          <button type="button" className="text-link" onClick={onNavigateToTraining}>
            Browse Bro Training →
          </button>
        ) : null}
      </header>

      <TdeeCallout />

      <div className="training-hub-grid fuel-hub-grid">
        <button
          type="button"
          className="training-hub-card fuel-hub-card"
          onClick={() => setScreen({ kind: 'foods' })}
        >
          <span className="training-hub-kicker">Catalog</span>
          <strong className="training-hub-title">Foods</strong>
          <p>Products, macros, and buy links used on this journey.</p>
          <span className="training-hub-cta">Browse foods →</span>
        </button>
        {phases.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`training-hub-card fuel-hub-card fuel-hub-card--${item.id}`}
            onClick={() => setScreen({ kind: 'phase', id: item.id })}
          >
            <span className="training-hub-kicker">{phaseLabel(item.id)}</span>
            <strong className="training-hub-title">{item.name}</strong>
            <p>{item.tagline}</p>
            <TdeeCallout compact />
            <span className="training-hub-cta">Open phase →</span>
          </button>
        ))}
      </div>
    </section>
  );
}
