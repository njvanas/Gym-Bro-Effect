import { useState } from 'react';

import { BroExercisesView } from './BroExercisesView';
import { BroMethodsView } from './BroMethodsView';
import { BroRoutinesView } from './BroRoutinesView';

type TrainingSub = 'methods' | 'routines' | 'exercises';

function subLabel(sub: TrainingSub): string {
  switch (sub) {
    case 'methods':
      return 'Bro Methods';
    case 'routines':
      return 'Bro Routines';
    case 'exercises':
      return 'Bro Exercises';
    default: {
      const _exhaustive: never = sub;
      return _exhaustive;
    }
  }
}

export function BroTrainingView() {
  const [sub, setSub] = useState<TrainingSub>('methods');

  let body;
  switch (sub) {
    case 'methods':
      body = <BroMethodsView />;
      break;
    case 'routines':
      body = <BroRoutinesView />;
      break;
    case 'exercises':
      body = <BroExercisesView />;
      break;
    default: {
      const _exhaustive: never = sub;
      return _exhaustive;
    }
  }

  return (
    <section className="stack">
      <header>
        <h2>Bro Training</h2>
        <p className="muted">Methods, routines, and the exercise library — separate from Bro Fuel.</p>
      </header>
      <div className="sub-nav" role="tablist" aria-label="Bro Training sections">
        {(['methods', 'routines', 'exercises'] as const).map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={item === sub}
            className={item === sub ? 'nav-link active' : 'nav-link'}
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
