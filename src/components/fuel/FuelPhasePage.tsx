import { useParams } from 'react-router-dom';

import { fuelPhaseCrumbs, parentCrumb } from '../../lib/crumbs';
import { getPhase } from '../../lib/fuel-db';
import { isPhaseId, paths } from '../../lib/routes';
import { BackLink } from '../BackLink';
import { Breadcrumbs } from '../Breadcrumbs';
import { NotFoundView } from '../NotFoundView';
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

  const crumbs = fuelPhaseCrumbs(phaseId);

  return (
    <section className="stack fuel-section">
      <Breadcrumbs items={crumbs} />
      <BackLink parent={parentCrumb(crumbs)} />
      <PhaseDetail phase={phase} foodsTo={paths.fuelFoods} />
    </section>
  );
}
