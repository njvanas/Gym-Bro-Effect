import type { PhaseId } from '../schema';
import { phaseLabel } from './fuel-nav';
import { pillarLabel } from './nav';
import { paths } from './routes';

export type Crumb = { label: string; to?: string };

export function trainingLegendCrumbs(styleName: string, styleId: string): Crumb[] {
  void styleId;
  return [
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
    { label: pillarLabel('training'), to: paths.training },
    { label: 'Legends', to: paths.trainingLegends },
    { label: styleName, to: paths.trainingLegend(styleId) },
    { label: workoutName },
  ];
}

export function fuelPhaseCrumbs(phaseId: PhaseId): Crumb[] {
  return [
    { label: pillarLabel('fuel'), to: paths.fuel },
    { label: phaseLabel(phaseId) },
  ];
}

export function fuelFoodsCrumbs(): Crumb[] {
  return [
    { label: pillarLabel('fuel'), to: paths.fuel },
    { label: 'Foods' },
  ];
}

export function trainingPersonalCrumbs(): Crumb[] {
  return [
    { label: pillarLabel('training'), to: paths.training },
    { label: 'My Personal Hevy' },
  ];
}

export function trainingExercisesCrumbs(): Crumb[] {
  return [
    { label: pillarLabel('training'), to: paths.training },
    { label: 'Exercises' },
  ];
}

export function trainingLegendsBrowseCrumbs(): Crumb[] {
  return [
    { label: pillarLabel('training'), to: paths.training },
    { label: 'Legends' },
  ];
}
