import type { Pillar } from '../lib/nav';

type HomeViewProps = {
  onNavigate: (pillar: Pillar) => void;
};

const paths: Array<{ pillar: Exclude<Pillar, 'home'>; title: string; copy: string }> = [
  { pillar: 'training', title: 'Bro Training', copy: 'Build focused workouts that move you forward.' },
  { pillar: 'fuel', title: 'Bro Fuel', copy: 'Fuel your goals with practical nutrition.' },
  { pillar: 'tools', title: 'Bro Tools', copy: 'Use simple tools to track and improve.' },
];

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <section className="home-view">
      <div className="hero">
        <p className="eyebrow">Train smarter. Fuel better. Keep moving.</p>
        <h1>Gym Bro Effect</h1>
        <p className="hero-copy">Everything you need to turn consistent effort into lasting progress.</p>
      </div>
      <div className="journey-grid">
        {paths.map(({ pillar, title, copy }) => (
          <button className="journey-card" type="button" onClick={() => onNavigate(pillar)} key={pillar}>
            <span>{title}</span>
            <p>{copy}</p>
            <strong>Explore →</strong>
          </button>
        ))}
      </div>
    </section>
  );
}
