import { Link } from 'react-router-dom';

import { trainingHubCrumbs } from '../../lib/crumbs';
import { paths } from '../../lib/routes';
import { PageChrome } from '../PageChrome';

export function BroTrainingView() {
  return (
    <section className="stack">
      <PageChrome crumbs={trainingHubCrumbs()} />
      <header>
        <h2>Bro Training</h2>
        <p className="muted">Legends, My Personal Hevy folders, and the exercise library.</p>
      </header>
      <div className="journey-grid training-hub-grid">
        <Link className="journey-card" to={paths.trainingLegends}>
          <span>Legends</span>
          <p>
            Top 50 bodybuilders A–Z — athletes with verified training material, same detail layout
            for every name.
          </p>
          <strong>Browse bodybuilders →</strong>
        </Link>
        <Link className="journey-card journey-card--accent" to={paths.trainingPersonal}>
          <span>My Personal folders</span>
          <p>
            My Personal Hevy collection folders — open them in the app to save and log, separate from
            legend reference routines.
          </p>
          <strong>Open My Personal →</strong>
        </Link>
        <Link className="journey-card" to={paths.trainingExercises}>
          <span>Bro Exercises</span>
          <p>
            Search the exercise library, filter by muscle, and open cards for cues — shared across
            legends and personal training.
          </p>
          <strong>Browse exercises →</strong>
        </Link>
      </div>
    </section>
  );
}
