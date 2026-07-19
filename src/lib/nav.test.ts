import { describe, expect, it } from 'vitest';

import { pillarLabel, type Pillar } from './nav';

describe('pillarLabel', () => {
  it('labels all pillars', () => {
    const pillars: Pillar[] = ['home', 'training', 'fuel', 'tools', 'who'];

    expect(pillars.map(pillarLabel)).toEqual([
      'Home',
      'Bro Training',
      'Bro Fuel',
      'Bro Tools',
      'Who is Bro?',
    ]);
  });
});
