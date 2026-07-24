import { useParams } from 'react-router-dom';

import { fuelPhaseCrumbs } from '../../lib/crumbs';
import { getPhase } from '../../lib/fuel-db';
import { isPhaseId, paths } from '../../lib/routes';
import { NotFoundView } from '../NotFoundView';
import { PageChrome } from '../PageChrome';
import { PhaseDetail } from './PhaseDetail';

export function FuelPhasePage() {
  const { phaseId = '' } = useParams();

  if (!isPhaseId(phaseId)) {
    const crumbs = [
      { label: 'Home', to: paths.home },
      { label: 'Bro Fuel', to: paths.fuel },
      { label: 'Unknown phase' },
    ];
    return (
      <NotFoundView
        title="Phase not found"
        parentLabel="Bro Fuel"
        parentTo={paths.fuel}
        crumbs={crumbs}
      />
    );
  }

  const phase = getPhase(phaseId);
  if (!phase) {
    return (
      <NotFoundView
        title="Phase not found"
        parentLabel="Bro Fuel"
        parentTo={paths.fuel}
        crumbs={fuelPhaseCrumbs(phaseId)}
      />
    );
  }

  return (
    <section className="stack fuel-section">
      <PageChrome crumbs={fuelPhaseCrumbs(phaseId)} />
      <PhaseDetail phase={phase} foodsTo={paths.fuelFoods} />
    </section>
  );
}
