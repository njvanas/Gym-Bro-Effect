import { useParams } from 'react-router-dom';

import { trainingPersonalWorkoutCrumbs } from '../../lib/crumbs';
import { getRoutine } from '../../lib/db';
import { paths } from '../../lib/routes';
import { NotFoundView } from '../NotFoundView';
import { PageChrome } from '../PageChrome';
import { WorkoutDetail } from './WorkoutDetail';

export function PersonalWorkoutDetailPage() {
  const { routineId = '' } = useParams();
  const routine = getRoutine(routineId);

  if (!routine || routine.collection !== 'personal') {
    const crumbs = [
      { label: 'Home', to: paths.home },
      { label: 'Bro Training', to: paths.training },
      { label: 'My Personal Hevy', to: paths.trainingPersonal },
      { label: 'Unknown workout' },
    ];
    return (
      <NotFoundView
        title="Workout not found"
        parentLabel="My Personal Hevy"
        parentTo={paths.trainingPersonal}
        crumbs={crumbs}
      />
    );
  }

  return (
    <section className="stack">
      <PageChrome crumbs={trainingPersonalWorkoutCrumbs(routine.name)} />
      <WorkoutDetail routine={routine} style={undefined} />
    </section>
  );
}
