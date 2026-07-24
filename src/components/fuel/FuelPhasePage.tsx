import { Link, useParams } from 'react-router-dom';

import { fuelPhaseCrumbs } from '../../lib/crumbs';
import { getPhase } from '../../lib/fuel-db';
import { isPhaseId, paths } from '../../lib/routes';
import { Breadcrumbs } from '../Breadcrumbs';
import { NotFoundView } from '../NotFoundView';
import { PhaseDetail } from './PhaseDetail';

export function FuelPhasePage() {
  const { phaseId = '' } = useParams();

  if (!isPhaseId(phaseId)) {
    return (
      <NotFoundView
        title="Phase not found"
        parentLabel="Bro Fuel"
        parentTo={paths.fuel}
        crumbs={[{ label: 'Bro Fuel', to: paths.fuel }, { label: 'Unknown phase' }]}
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
      <Breadcrumbs items={fuelPhaseCrumbs(phaseId)} />
      <Link className="back" to={paths.fuel}>
        ← Bro Fuel
      </Link>
      <PhaseDetail phase={phase} foodsTo={paths.fuelFoods} />
      <Link className="text-link" to={paths.training}>
        Browse Bro Training →
      </Link>
    </section>
  );
}
