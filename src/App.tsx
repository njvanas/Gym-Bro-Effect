import { Route, Routes } from 'react-router-dom';

import { AppShell } from './components/AppShell';
import { HomeView } from './components/HomeView';
import { NotFoundView } from './components/NotFoundView';
import { WhoIsBroView } from './components/WhoIsBroView';
import { BroFuelView } from './components/fuel/BroFuelView';
import { FuelFoodsPage } from './components/fuel/FuelFoodsPage';
import { FuelPhasePage } from './components/fuel/FuelPhasePage';
import { BroToolsView } from './components/tools/BroToolsView';
import { BroTrainingView } from './components/training/BroTrainingView';
import { paths } from './lib/routes';

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomeView />} />
        <Route path="training" element={<BroTrainingView />} />
        <Route path="fuel" element={<BroFuelView />} />
        <Route path="fuel/phases/:phaseId" element={<FuelPhasePage />} />
        <Route path="fuel/foods" element={<FuelFoodsPage />} />
        <Route path="tools" element={<BroToolsView />} />
        <Route path="who" element={<WhoIsBroView />} />
        <Route
          path="*"
          element={
            <NotFoundView parentLabel="Home" parentTo={paths.home} title="Page not found" />
          }
        />
      </Route>
    </Routes>
  );
}
