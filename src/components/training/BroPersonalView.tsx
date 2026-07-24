import { parentCrumb, trainingPersonalCrumbs } from '../../lib/crumbs';
import { hevyFolders, myCollection } from '../../lib/db';
import { BackLink } from '../BackLink';
import { Breadcrumbs } from '../Breadcrumbs';
import { ExternalLink } from '../ExternalLink';

export function BroPersonalView() {
  const crumbs = trainingPersonalCrumbs();

  return (
    <div className="collection-layout stack">
      <Breadcrumbs items={crumbs} />
      <BackLink parent={parentCrumb(crumbs)} />

      <section className="collection-intro personal-intro">
        <div className="personal-badge">My Personal collection</div>
        <h2 className="section-heading">{myCollection.name}</h2>
        <p className="muted">{myCollection.summary}</p>
        <p className="muted">
          These are My Personal Hevy folders — not legend reference routines. Open a folder in Hevy to
          save it and start logging.
        </p>
      </section>

      <section className="hevy-folders personal-folders">
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
