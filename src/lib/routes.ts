import type { PhaseId } from '../schema';
import type { Pillar } from './nav';

const PHASE_IDS: readonly PhaseId[] = [
  'maintaining',
  'cutting',
  'bulking',
  'recomposition',
];

export function isPhaseId(value: string): value is PhaseId {
  return (PHASE_IDS as readonly string[]).includes(value);
}

export const paths = {
  home: '/',
  training: '/training',
  trainingLegends: '/training/legends',
  trainingLegend: (styleId: string) => `/training/legends/${styleId}`,
  trainingWorkout: (styleId: string, routineId: string) =>
    `/training/legends/${styleId}/workout/${routineId}`,
  trainingPersonal: '/training/personal',
  trainingPersonalWorkout: (routineId: string) =>
    `/training/personal/workout/${routineId}`,
  trainingExercises: '/training/exercises',
  fuel: '/fuel',
  fuelPhase: (phaseId: PhaseId) => `/fuel/phases/${phaseId}`,
  fuelFoods: '/fuel/foods',
  tools: '/tools',
  who: '/who',
} as const;

/** `pathname` is React Router's location.pathname (no Vite basename). */
export function pillarFromPathname(pathname: string): Pillar {
  if (pathname === '/' || pathname === '') return 'home';
  if (pathname === '/who' || pathname.startsWith('/who/')) return 'who';
  if (pathname === '/tools' || pathname.startsWith('/tools/')) return 'tools';
  if (pathname === '/fuel' || pathname.startsWith('/fuel/')) return 'fuel';
  if (pathname === '/training' || pathname.startsWith('/training/')) {
    return 'training';
  }
  return 'home';
}
