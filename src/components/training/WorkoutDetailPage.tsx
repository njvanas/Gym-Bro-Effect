import { useParams } from 'react-router-dom';

import { trainingWorkoutCrumbs } from '../../lib/crumbs';
import { getRoutine, getStyle } from '../../lib/db';
import { paths } from '../../lib/routes';
import { Breadcrumbs } from '../Breadcrumbs';
import { NotFoundView } from '../NotFoundView';
import { WorkoutDetail } from './WorkoutDetail';

export function WorkoutDetailPage() {
  const { styleId = '', routineId = '' } = useParams();
  const style = getStyle(styleId);

  if (!style) {
    return (
      <NotFoundView
        title="Workout not found"
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

  const routine = getRoutine(routineId);
  if (!routine || routine.styleId !== styleId) {
    return (
      <NotFoundView
        title="Workout not found"
        parentLabel={style.name}
        parentTo={paths.trainingLegend(style.id)}
        crumbs={[
          { label: 'Bro Training', to: paths.training },
          { label: 'Legends', to: paths.trainingLegends },
          { label: style.name, to: paths.trainingLegend(style.id) },
          { label: 'Unknown workout' },
        ]}
      />
    );
  }

  return (
    <section className="stack">
      <Breadcrumbs items={trainingWorkoutCrumbs(style.name, style.id, routine.name)} />
      <WorkoutDetail routine={routine} style={style} backTo={paths.trainingLegend(style.id)} />
    </section>
  );
}
