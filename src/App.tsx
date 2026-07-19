import { useState } from 'react';

import { AppShell } from './components/AppShell';
import { HomeView } from './components/HomeView';
import { WhoIsBroView } from './components/WhoIsBroView';
import { BroFuelView } from './components/fuel/BroFuelView';
import { BroToolsView } from './components/tools/BroToolsView';
import { BroTrainingView } from './components/training/BroTrainingView';
import type { Pillar } from './lib/nav';

export function App() {
  const [pillar, setPillar] = useState<Pillar>('home');

  let content;
  switch (pillar) {
    case 'home':
      content = <HomeView onNavigate={setPillar} />;
      break;
    case 'training':
      content = <BroTrainingView />;
      break;
    case 'fuel':
      content = <BroFuelView onNavigateToTraining={() => setPillar('training')} />;
      break;
    case 'tools':
      content = <BroToolsView />;
      break;
    case 'who':
      content = <WhoIsBroView />;
      break;
    default: {
      const _exhaustive: never = pillar;
      return _exhaustive;
    }
  }

  return (
    <AppShell pillar={pillar} onNavigate={setPillar}>
      {content}
    </AppShell>
  );
}
