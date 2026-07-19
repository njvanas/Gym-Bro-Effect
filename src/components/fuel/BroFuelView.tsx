import { useState } from 'react';

import { phases } from '../../lib/fuel-db';
import { phaseLabel } from '../../lib/fuel-nav';
import type { PhaseId } from '../../schema';
import { PhaseDetail } from './PhaseDetail';

type BroFuelViewProps = {
  onNavigateToTraining?: () => void;
};

export function BroFuelView({ onNavigateToTraining }: BroFuelViewProps) {
  const [phaseId, setPhaseId] = useState<PhaseId>('maintaining');
  const phase = phases.find((p) => p.id === phaseId) ?? phases[0];

  return (
    <section className="stack">
      <header>
        <h2>Bro Fuel</h2>
        <p className="muted">
          Surplus or deficit decides whether you grow or cut. Training lives in Bro Training —
          fuel stays here.
        </p>
        {onNavigateToTraining ? (
          <button type="button" className="text-link" onClick={onNavigateToTraining}>
            Browse Bro Training
          </button>
        ) : null}
      </header>

      <div className="sub-nav" role="tablist" aria-label="Phase picker">
        {phases.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === phaseId}
            className={item.id === phaseId ? 'nav-link active' : 'nav-link'}
            onClick={() => setPhaseId(item.id)}
          >
            {phaseLabel(item.id)}
          </button>
        ))}
      </div>

      {phase ? <PhaseDetail phase={phase} /> : null}
    </section>
  );
}
