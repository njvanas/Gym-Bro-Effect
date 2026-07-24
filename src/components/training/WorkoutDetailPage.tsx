import { useParams } from 'react-router-dom';

import { parentCrumb, trainingWorkoutCrumbs } from '../../lib/crumbs';
import { getRoutine, getStyle } from '../../lib/db';
import { paths } from '../../lib/routes';
import { BackLink } from '../BackLink';
import { Breadcrumbs } from '../Breadcrumbs';
import { NotFoundView } from '../NotFoundView';
import { WorkoutDetail } from './WorkoutDetail';

export function WorkoutDetailPage() {
  const { styleId = '', routineId = '' } = useParams();
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
        title="Workout not found"
        parentLabel="Legends"
        parentTo={paths.trainingLegends}
        crumbs={crumbs}
      />
    );
  }

  const routine = getRoutine(routineId);
  if (!routine || routine.styleId !== styleId) {
    const crumbs = [
      { label: 'Home', to: paths.home },
      { label: 'Bro Training', to: paths.training },
      { label: 'Legends', to: paths.trainingLegends },
      { label: style.name, to: paths.trainingLegend(style.id) },
      { label: 'Unknown workout' },
    ];
    return (
      <NotFoundView
        title="Workout not found"
        parentLabel={style.name}
        parentTo={paths.trainingLegend(style.id)}
        crumbs={crumbs}
      />
    );
  }

  const crumbs = trainingWorkoutCrumbs(style.name, style.id, routine.name);

  return (
    <section className="stack">
      <Breadcrumbs items={crumbs} />
      <BackLink parent={parentCrumb(crumbs)} />
      <WorkoutDetail routine={routine} style={style} />
    </section>
  );
}
