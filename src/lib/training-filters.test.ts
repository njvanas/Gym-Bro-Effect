import { describe, expect, it } from 'vitest';

import { styles, exercises } from './db';
import { filterExercises, filterStylesByQuery } from './training-filters';

describe('filterStylesByQuery', () => {
  it('finds Blood & Guts when querying yates', () => {
    const matches = filterStylesByQuery(styles, 'yates');
    expect(matches.some((s) => s.id === 'blood-and-guts')).toBe(true);
  });

  it('returns all styles for empty query', () => {
    expect(filterStylesByQuery(styles, '  ').length).toBe(styles.length);
  });
});

describe('filterExercises', () => {
  it('filters by query against name', () => {
    const matches = filterExercises(exercises, 'deadlift');
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.every((e) => e.name.toLowerCase().includes('deadlift') || e.aliases.some((a) => a.toLowerCase().includes('deadlift')))).toBe(true);
  });

  it('filters by primary muscle', () => {
    const matches = filterExercises(exercises, '', 'chest');
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.every((e) => e.primaryMuscle === 'chest')).toBe(true);
  });
});
