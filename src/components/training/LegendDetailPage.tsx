import { useParams } from 'react-router-dom';

import { parentCrumb, trainingLegendCrumbs } from '../../lib/crumbs';
import { getStyle } from '../../lib/db';
import { paths } from '../../lib/routes';
import { BackLink } from '../BackLink';
import { Breadcrumbs } from '../Breadcrumbs';
import { NotFoundView } from '../NotFoundView';
import { LegendDetail } from './LegendDetail';

export function LegendDetailPage() {
  const { styleId = '' } = useParams();
  const style = getStyle(styleId);
  if (!style) {
    const crumbs = [
      { label: 'Home', to: paths.home },
      { label: 'Bro Training', to: paths.training },
      { label: 'Legends', to: paths.trainingLegends },
      { label: 'Unknown' },
    ];
    return (
      <NotFoundView
        title="Legend not found"
        parentLabel="Legends"
        parentTo={paths.trainingLegends}
        crumbs={crumbs}
      />
    );
  }

  const crumbs = trainingLegendCrumbs(style.name, style.id);

  return (
    <section className="stack">
      <Breadcrumbs items={crumbs} />
      <BackLink parent={parentCrumb(crumbs)} />
      <LegendDetail
        style={style}
        workoutTo={(routineId) => paths.trainingWorkout(style.id, routineId)}
      />
    </section>
  );
}
