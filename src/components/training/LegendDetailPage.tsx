import { useParams } from 'react-router-dom';

import { trainingLegendCrumbs } from '../../lib/crumbs';
import { getStyle } from '../../lib/db';
import { paths } from '../../lib/routes';
import { Breadcrumbs } from '../Breadcrumbs';
import { NotFoundView } from '../NotFoundView';
import { LegendDetail } from './LegendDetail';

export function LegendDetailPage() {
  const { styleId = '' } = useParams();
  const style = getStyle(styleId);
  if (!style) {
    return (
      <NotFoundView
        title="Legend not found"
        parentLabel="Legends"
        parentTo={paths.trainingLegends}
        crumbs={[
          { label: 'Bro Training', to: paths.training },
          { label: 'Legends', to: paths.trainingLegends },
          { label: 'Unknown' },
        ]}
      />
    );
  }

  return (
    <section className="stack">
      <Breadcrumbs items={trainingLegendCrumbs(style.name, style.id)} />
      <LegendDetail
        style={style}
        backTo={paths.trainingLegends}
        workoutTo={(routineId) => paths.trainingWorkout(style.id, routineId)}
      />
    </section>
  );
}
