import { Link } from 'react-router-dom';

import { trainingPersonalCrumbs } from '../../lib/crumbs';
import { getPersonalRoutines, hevyFolders, myCollection } from '../../lib/db';
import { paths } from '../../lib/routes';
import { ExternalLink } from '../ExternalLink';
import { PageChrome } from '../PageChrome';

export function BroPersonalView() {
  const personalWorkouts = getPersonalRoutines();

  return (
    <div className="collection-layout stack">
      <PageChrome crumbs={trainingPersonalCrumbs()} />

      <header className="section-masthead">
        <p className="section-kicker">Bro Training</p>
        <h2 className="section-display-title">
          Bro <span className="accent">Personal</span>
        </h2>
        <p className="section-lede">
          {myCollection.summary} In-app days below mirror the Bulk like Dorian folder; Hevy folder
          cards still open the live app so you can save and log.
        </p>
      </header>

      {personalWorkouts.length > 0 ? (
        <section className="personal-workouts stack">
          <h3 className="legend-col-title">In-app workouts</h3>
          <div className="folder-grid">
            {personalWorkouts.map((routine) => (
              <Link
                key={routine.id}
                className="folder-card"
                to={paths.trainingPersonalWorkout(routine.id)}
              >
                <div className="folder-card-head">
                  <span className="folder-label">{routine.name}</span>
                  {routine.day ? <span className="folder-count">{routine.day}</span> : null}
                </div>
                {routine.description ? (
                  <p className="muted folder-note">{routine.description}</p>
                ) : null}
                <span className="folder-open">Open workout →</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="hevy-folders personal-folders">
        <h3 className="legend-col-title">Hevy folders</h3>
        <div className="folder-grid">
          {hevyFolders.map((folder) => (
            <ExternalLink key={folder.id} className="folder-card" href={folder.url}>
              <div className="folder-card-head">
                <span className="folder-label">{folder.name}</span>
                <span className="folder-count">
                  {folder.routinesInHevy.length} routine
                  {folder.routinesInHevy.length === 1 ? '' : 's'}
                </span>
              </div>
              {folder.note ? <p className="muted folder-note">{folder.note}</p> : null}
              <span className="folder-open">Open in Hevy →</span>
            </ExternalLink>
          ))}
        </div>
      </section>
    </div>
  );
}
