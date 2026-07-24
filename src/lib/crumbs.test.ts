import { describe, expect, it } from 'vitest';

import {
  fuelFoodsCrumbs,
  fuelPhaseCrumbs,
  trainingLegendCrumbs,
  trainingWorkoutCrumbs,
} from './crumbs';

describe('crumbs', () => {
  it('builds legend detail crumbs', () => {
    expect(trainingLegendCrumbs('Golden Era Volume', 'arnold-golden-era')).toEqual([
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
      { label: 'Bro Training', to: '/training' },
      { label: 'Legends', to: '/training/legends' },
      { label: 'Golden Era Volume', to: '/training/legends/arnold-golden-era' },
      { label: 'Competitive Split - Chest & Back' },
    ]);
  });

  it('builds fuel phase and foods crumbs', () => {
    expect(fuelPhaseCrumbs('cutting')).toEqual([
      { label: 'Bro Fuel', to: '/fuel' },
      { label: 'Cutting' },
    ]);
    expect(fuelFoodsCrumbs()).toEqual([
      { label: 'Bro Fuel', to: '/fuel' },
      { label: 'Foods' },
    ]);
  });
});
