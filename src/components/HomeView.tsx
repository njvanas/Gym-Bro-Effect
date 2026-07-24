import { Link } from 'react-router-dom';

import type { Pillar } from '../lib/nav';
import { paths as routePaths } from '../lib/routes';

const journeys: Array<{
  pillar: Exclude<Pillar, 'home'>;
  to: string;
  title: string;
  copy: string;
}> = [
  {
    pillar: 'training',
    to: routePaths.training,
    title: 'Bro Training',
    copy: 'Build focused workouts that move you forward.',
  },
  {
    pillar: 'fuel',
    to: routePaths.fuel,
    title: 'Bro Fuel',
    copy: 'Fuel your goals with practical nutrition.',
  },
  {
    pillar: 'tools',
    to: routePaths.tools,
    title: 'Bro Tools',
    copy: 'Use simple tools to track and improve.',
  },
  {
    pillar: 'who',
    to: routePaths.who,
    title: 'Who is Bro?',
    copy: 'Just your friendly neighbourhood Bro.',
  },
];

export function HomeView() {
  return (
    <section className="home-view">
      <div className="hero">
        <p className="eyebrow">Train smarter. Fuel better. Keep moving.</p>
        <h1>Gym Bro Effect</h1>
        <p className="hero-copy">Everything you need to turn consistent effort into lasting progress.</p>
      </div>
      <div className="journey-grid">
        {journeys.map(({ pillar, to, title, copy }) => (
          <Link className="journey-card" to={to} key={pillar}>
            <span>{title}</span>
            <p>{copy}</p>
            <strong>Explore →</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
