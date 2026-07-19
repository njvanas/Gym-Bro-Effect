import { useState } from 'react';

import { BroExercisesView } from './BroExercisesView';
import { BroLegendsView } from './BroLegendsView';
import { BroPersonalView } from './BroPersonalView';

type TrainingSub = 'hub' | 'legends' | 'personal' | 'exercises';

function subLabel(sub: TrainingSub): string {
  switch (sub) {
    case 'hub':
      return 'Overview';
    case 'legends':
      return 'Bro Legends';
    case 'personal':
      return 'Personal Hevy';
    case 'exercises':
      return 'Bro Exercises';
    default: {
      const _exhaustive: never = sub;
      return _exhaustive;
    }
  }
}

export function BroTrainingView() {
  const [sub, setSub] = useState<TrainingSub>('hub');

  let body;
  switch (sub) {
    case 'hub':
      body = (
        <div className="training-hub">
          <p className="muted training-hub-lede">
            Pick a path — legend methodologies with full workout breakdowns, or your personal Hevy
            folders.
          </p>
          <div className="training-hub-grid">
            <button
              type="button"
              className="training-hub-card"
              onClick={() => setSub('legends')}
            >
              <span className="training-hub-kicker">Bro Methods</span>
              <strong className="training-hub-title">Legends</strong>
              <p>
                Browse bodybuilding methodologies, open a legend, then dig into every workout with
                warm-ups and working sets spelled out.
              </p>
              <span className="training-hub-cta">Explore legends →</span>
            </button>
            <button
              type="button"
              className="training-hub-card training-hub-card--personal"
              onClick={() => setSub('personal')}
            >
              <span className="training-hub-kicker">Hevy</span>
              <strong className="training-hub-title">Personal folders</strong>
              <p>
                Your Hevy collection folders — open them in the app to save and log, separate from
                legend reference routines.
              </p>
              <span className="training-hub-cta">Open personal →</span>
            </button>
          </div>
        </div>
      );
      break;
    case 'legends':
      body = (
        <div className="stack">
          <button type="button" className="back" onClick={() => setSub('hub')}>
            ← Bro Training
          </button>
          <BroLegendsView />
        </div>
      );
      break;
    case 'personal':
      body = <BroPersonalView onBack={() => setSub('hub')} />;
      break;
    case 'exercises':
      body = <BroExercisesView />;
      break;
    default: {
      const _exhaustive: never = sub;
      return _exhaustive;
    }
  }

  const tabs: TrainingSub[] = ['hub', 'exercises'];

  return (
    <section className="stack">
      <header>
        <h2>Bro Training</h2>
        <p className="muted">Legends, personal Hevy folders, and the exercise library.</p>
      </header>
      <div className="sub-nav" role="tablist" aria-label="Bro Training sections">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={sub === item || (item === 'hub' && (sub === 'legends' || sub === 'personal'))}
            className={
              sub === item || (item === 'hub' && (sub === 'legends' || sub === 'personal'))
                ? 'nav-link active'
                : 'nav-link'
            }
            onClick={() => setSub(item)}
          >
            {subLabel(item)}
          </button>
        ))}
      </div>
      {body}
    </section>
  );
}
