import { whoHubCrumbs } from '../lib/crumbs';
import { Breadcrumbs } from './Breadcrumbs';

export function WhoIsBroView() {
  return (
    <section className="stack who-section">
      <Breadcrumbs items={whoHubCrumbs()} />
      <header className="section-masthead who-masthead">
        <p className="section-kicker">Who is Bro?</p>
        <h2 className="section-display-title">
          Just your friendly neighbourhood <span className="accent">Bro</span>
        </h2>
        <p className="section-lede who-lede-soon">More about Bro coming soon.</p>
      </header>
    </section>
  );
}
