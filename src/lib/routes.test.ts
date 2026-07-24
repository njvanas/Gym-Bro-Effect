import { describe, expect, it } from 'vitest';

import { isPhaseId, paths, pillarFromPathname } from './routes';

describe('paths', () => {
  it('builds deep training and fuel URLs', () => {
    expect(paths.home).toBe('/');
    expect(paths.trainingLegend('arnold-golden-era')).toBe(
      '/training/legends/arnold-golden-era',
    );
    expect(paths.trainingWorkout('arnold-golden-era', 'arnold-chest-back')).toBe(
      '/training/legends/arnold-golden-era/workout/arnold-chest-back',
    );
    expect(paths.trainingPersonalWorkout('hevy-back')).toBe(
      '/training/personal/workout/hevy-back',
    );
    expect(paths.fuelPhase('cutting')).toBe('/fuel/phases/cutting');
  });
});

describe('pillarFromPathname', () => {
  it('maps pathname prefixes to pillars', () => {
    expect(pillarFromPathname('/')).toBe('home');
    expect(pillarFromPathname('/training/legends/arnold-golden-era')).toBe(
      'training',
    );
    expect(pillarFromPathname('/fuel/foods')).toBe('fuel');
    expect(pillarFromPathname('/tools')).toBe('tools');
    expect(pillarFromPathname('/who')).toBe('who');
    expect(pillarFromPathname('/nope')).toBe('home');
  });
});

describe('isPhaseId', () => {
  it('accepts known phase ids only', () => {
    expect(isPhaseId('bulking')).toBe(true);
    expect(isPhaseId('nope')).toBe(false);
  });
});
