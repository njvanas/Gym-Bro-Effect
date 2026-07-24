import { Link } from 'react-router-dom';

import { fuelHubCrumbs } from '../../lib/crumbs';
import { phases } from '../../lib/fuel-db';
import { paths } from '../../lib/routes';
import { PageChrome } from '../PageChrome';
import { TdeeCallout } from './TdeeCallout';

export function BroFuelView() {
  return (
    <section className="stack fuel-section">
      <PageChrome crumbs={fuelHubCrumbs()} />
      <header className="section-masthead">
        <p className="section-kicker">Nutrition & phases</p>
        <h2 className="section-display-title">
          Bro <span className="accent">Fuel</span>
        </h2>
        <p className="section-lede">
          Phase strategy plus the real Foods shopping reference from this journey. Personal meal
          examples per phase are coming soon.
        </p>
      </header>

      <TdeeCallout />

      <div className="journey-grid fuel-hub-grid">
        <Link className="journey-card" to={paths.fuelFoods}>
          <span>Foods</span>
          <p>Products, macros, and buy links used on this journey.</p>
          <strong>Browse foods →</strong>
        </Link>
        {phases.map((item) => (
          <Link
            key={item.id}
            className={`journey-card fuel-hub-card--${item.id}`}
            to={paths.fuelPhase(item.id)}
          >
            <span>{item.name}</span>
            <p>{item.tagline}</p>
            <strong>Open phase →</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
