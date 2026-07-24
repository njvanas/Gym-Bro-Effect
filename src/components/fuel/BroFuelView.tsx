import { Link } from 'react-router-dom';

import { fuelHubCrumbs } from '../../lib/crumbs';
import { phases } from '../../lib/fuel-db';
import { phaseLabel } from '../../lib/fuel-nav';
import { paths } from '../../lib/routes';
import { PageChrome } from '../PageChrome';
import { TdeeCallout } from './TdeeCallout';

export function BroFuelView() {
  return (
    <section className="stack fuel-section">
      <PageChrome crumbs={fuelHubCrumbs()} showBack={false} />
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

      <div className="training-hub-grid fuel-hub-grid">
        <Link className="training-hub-card fuel-hub-card" to={paths.fuelFoods}>
          <span className="training-hub-kicker">Catalog</span>
          <strong className="training-hub-title">Foods</strong>
          <p>Products, macros, and buy links used on this journey.</p>
          <span className="training-hub-cta">Browse foods →</span>
        </Link>
        {phases.map((item) => (
          <Link
            key={item.id}
            className={`training-hub-card fuel-hub-card fuel-hub-card--${item.id}`}
            to={paths.fuelPhase(item.id)}
          >
            <span className="training-hub-kicker">{phaseLabel(item.id)}</span>
            <strong className="training-hub-title">{item.name}</strong>
            <p>{item.tagline}</p>
            <TdeeCallout compact />
            <span className="training-hub-cta">Open phase →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
