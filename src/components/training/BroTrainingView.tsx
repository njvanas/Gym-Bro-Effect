import { Link } from 'react-router-dom';

import { paths } from '../../lib/routes';
import { TrainingSectionNav } from './TrainingSectionNav';

export function BroTrainingView() {
  return (
    <section className="stack">
      <header>
        <h2>Bro Training</h2>
        <p className="muted">Legends, My Personal Hevy folders, and the exercise library.</p>
      </header>
      <TrainingSectionNav />
      <div className="training-hub">
        <p className="muted training-hub-lede">
          Pick a path — the bodybuilder roster with full workout breakdowns where we have them, or
          My Personal Hevy folders.
        </p>
        <div className="training-hub-grid">
          <Link className="training-hub-card" to={paths.trainingLegends}>
            <span className="training-hub-kicker">Bro Methods</span>
            <strong className="training-hub-title">Legends</strong>
            <p>
              Top 50 bodybuilders A–Z — athletes with verified training material, same detail layout
              for every name.
            </p>
            <span className="training-hub-cta">Browse bodybuilders →</span>
          </Link>
          <Link
            className="training-hub-card training-hub-card--personal"
            to={paths.trainingPersonal}
          >
            <span className="training-hub-kicker">Hevy</span>
            <strong className="training-hub-title">My Personal folders</strong>
            <p>
              My Personal Hevy collection folders — open them in the app to save and log, separate
              from legend reference routines.
            </p>
            <span className="training-hub-cta">Open My Personal →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
