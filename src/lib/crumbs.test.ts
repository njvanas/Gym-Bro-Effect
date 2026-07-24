import { describe, expect, it } from 'vitest';

import {
  fuelFoodsCrumbs,
  fuelPhaseCrumbs,
  parentCrumb,
  toolsHubCrumbs,
  trainingExercisesCrumbs,
  trainingHubCrumbs,
  trainingLegendCrumbs,
  trainingWorkoutCrumbs,
} from './crumbs';

describe('crumbs', () => {
  it('builds legend detail crumbs', () => {
    expect(trainingLegendCrumbs('Golden Era Volume', 'arnold-golden-era')).toEqual([
      { label: 'Home', to: '/' },
      { label: 'Bro Training', to: '/training' },
      { label: 'Legends', to: '/training/legends' },
      { label: 'Golden Era Volume' },
    ]);
  });

  it('builds workout crumbs', () => {
    expect(
      trainingWorkoutCrumbs(
        'Golden Era Volume',
        'arnold-golden-era',
        'Competitive Split - Chest & Back',
      ),
    ).toEqual([
      { label: 'Home', to: '/' },
      { label: 'Bro Training', to: '/training' },
      { label: 'Legends', to: '/training/legends' },
      { label: 'Golden Era Volume', to: '/training/legends/arnold-golden-era' },
      { label: 'Competitive Split - Chest & Back' },
    ]);
  });

  it('builds fuel phase and foods crumbs', () => {
    expect(fuelPhaseCrumbs('cutting')).toEqual([
      { label: 'Home', to: '/' },
      { label: 'Bro Fuel', to: '/fuel' },
      { label: 'Cutting' },
    ]);
    expect(fuelFoodsCrumbs()).toEqual([
      { label: 'Home', to: '/' },
      { label: 'Bro Fuel', to: '/fuel' },
      { label: 'Foods' },
    ]);
  });

  it('builds exercises crumbs', () => {
    expect(trainingExercisesCrumbs()).toEqual([
      { label: 'Home', to: '/' },
      { label: 'Bro Training', to: '/training' },
      { label: 'Bro Exercises' },
    ]);
  });

  it('builds hub crumbs', () => {
    expect(trainingHubCrumbs()).toEqual([
      { label: 'Home', to: '/' },
      { label: 'Bro Training' },
    ]);
    expect(toolsHubCrumbs()).toEqual([{ label: 'Home', to: '/' }, { label: 'Bro Tools' }]);
  });

  it('resolves hierarchy parent crumb', () => {
    expect(parentCrumb(trainingLegendCrumbs('Golden Era Volume', 'arnold-golden-era'))).toEqual({
      label: 'Legends',
      to: '/training/legends',
    });
    expect(parentCrumb(fuelFoodsCrumbs())).toEqual({ label: 'Bro Fuel', to: '/fuel' });
    expect(parentCrumb(trainingHubCrumbs())).toEqual({ label: 'Home', to: '/' });
  });
});
