import type { PhaseId } from '../schema';
import { phaseLabel } from './fuel-nav';
import { pillarLabel } from './nav';
import { paths } from './routes';

export type Crumb = { label: string; to?: string };

const homeCrumb: Crumb = { label: 'Home', to: paths.home };

export function trainingHubCrumbs(): Crumb[] {
  return [homeCrumb, { label: pillarLabel('training') }];
}

export function fuelHubCrumbs(): Crumb[] {
  return [homeCrumb, { label: pillarLabel('fuel') }];
}

export function toolsHubCrumbs(): Crumb[] {
  return [homeCrumb, { label: pillarLabel('tools') }];
}

export function whoHubCrumbs(): Crumb[] {
  return [homeCrumb, { label: pillarLabel('who') }];
}

export function trainingLegendCrumbs(styleName: string, styleId: string): Crumb[] {
  void styleId;
  return [
    homeCrumb,
    { label: pillarLabel('training'), to: paths.training },
    { label: 'Legends', to: paths.trainingLegends },
    { label: styleName },
  ];
}

export function trainingWorkoutCrumbs(
  styleName: string,
  styleId: string,
  workoutName: string,
): Crumb[] {
  return [
    homeCrumb,
    { label: pillarLabel('training'), to: paths.training },
    { label: 'Legends', to: paths.trainingLegends },
    { label: styleName, to: paths.trainingLegend(styleId) },
    { label: workoutName },
  ];
}

export function fuelPhaseCrumbs(phaseId: PhaseId): Crumb[] {
  return [
    homeCrumb,
    { label: pillarLabel('fuel'), to: paths.fuel },
    { label: phaseLabel(phaseId) },
  ];
}

export function fuelFoodsCrumbs(): Crumb[] {
  return [homeCrumb, { label: pillarLabel('fuel'), to: paths.fuel }, { label: 'Foods' }];
}

export function trainingPersonalCrumbs(): Crumb[] {
  return [
    homeCrumb,
    { label: pillarLabel('training'), to: paths.training },
    { label: 'My Personal Hevy' },
  ];
}

export function trainingPersonalWorkoutCrumbs(workoutName: string): Crumb[] {
  return [
    homeCrumb,
    { label: pillarLabel('training'), to: paths.training },
    { label: 'My Personal Hevy', to: paths.trainingPersonal },
    { label: workoutName },
  ];
}

export function trainingExercisesCrumbs(): Crumb[] {
  return [
    homeCrumb,
    { label: pillarLabel('training'), to: paths.training },
    { label: 'Bro Exercises' },
  ];
}

export function trainingLegendsBrowseCrumbs(): Crumb[] {
  return [
    homeCrumb,
    { label: pillarLabel('training'), to: paths.training },
    { label: 'Legends' },
  ];
}

/** Hierarchy parent for back buttons: second-to-last crumb that has a `to`. */
export function parentCrumb(items: Crumb[]): Crumb | null {
  if (items.length < 2) return null;
  for (let i = items.length - 2; i >= 0; i -= 1) {
    const crumb = items[i];
    if (crumb?.to) return crumb;
  }
  return null;
}
