import { describe, expect, it } from 'vitest';
import {
  bodybuilders,
  compareWorkouts,
  exercises,
  getBodybuilder,
  getLegendRoutines,
  getLegendRoutineGroups,
  getRoutinesByStyle,
  hevyCatalog,
  hevyFolders,
  legendRoutines,
  styles,
  getExercise,
  getRoutinesForExercise,
  validateReferentialIntegrity,
  workoutDayOrder,
} from './db';

describe('training database', () => {
  it('loads and validates all data files', () => {
    expect(exercises.length).toBeGreaterThan(0);
    expect(styles.length).toBeGreaterThan(0);
    expect(legendRoutines.length).toBeGreaterThan(0);
    expect(hevyFolders.length).toBeGreaterThan(0);
  });

  it('has no referential-integrity problems', () => {
    expect(validateReferentialIntegrity()).toEqual([]);
  });

  it('includes all expected methodologies', () => {
    const ids = new Set(styles.map((s) => s.id));
    for (const id of [
      'blood-and-guts',
      'heavy-duty',
      'coleman-powerbuilding',
      'htlt',
      'heath-fst7',
      'arnold-golden-era',
      'haney-stimulate',
      'zane-aesthetics',
      'cutler-volume',
      'bannout-lion',
      'jackson-blade',
      'gaspari-annihilation',
    ]) {
      expect(ids.has(id), id).toBe(true);
    }
  });

  it('orders methodologies by displayOrder', () => {
    for (let i = 1; i < styles.length; i++) {
      expect(styles[i].displayOrder).toBeGreaterThanOrEqual(styles[i - 1].displayOrder);
    }
  });

  it('every style has tags and legend workouts are sorted within routine', () => {
    for (const style of styles) {
      expect(style.tags.length, style.id).toBeGreaterThan(0);
      const owned = getRoutinesByStyle(style.id);
      for (let i = 1; i < owned.length; i++) {
        expect(compareWorkouts(owned[i - 1], owned[i])).toBeLessThanOrEqual(0);
      }
    }
  });

  it('every legend style has at least one training routine workout', () => {
    for (const style of styles) {
      const owned = getLegendRoutines().filter((r) => r.styleId === style.id);
      expect(owned.length, style.id).toBeGreaterThan(0);
    }
  });

  it('every legend exercise has an explicit set scheme', () => {
    for (const routine of getLegendRoutines()) {
      for (const slot of routine.exercises) {
        expect(slot.setScheme.length, `${routine.id}/${slot.exerciseId}`).toBeGreaterThan(0);
      }
    }
  });

  it('lists every Hevy folder with a label and url', () => {
    expect(hevyFolders.length).toBe(10);
    for (const folder of hevyFolders) {
      expect(folder.name.length).toBeGreaterThan(0);
      expect(folder.url).toMatch(/^https:\/\/hevy\.com\/folder\/\d+$/);
      expect(folder.url.endsWith(folder.hevyId)).toBe(true);
      expect(folder.routinesInHevy.length).toBeGreaterThan(0);
    }
  });

  it('personal routines catalog has Hevy folder links', () => {
    expect(hevyCatalog.name).toMatch(/personal/i);
    expect(hevyCatalog.summary).toMatch(/Hevy/i);
    expect(hevyCatalog.id).toBe('my-routines');
  });

  it('orders Blood & Guts classic workouts by split day', () => {
    const classic = getRoutinesByStyle('blood-and-guts').map((r) => r.id);
    expect(classic).toEqual([
      'classic-chest-biceps',
      'classic-legs',
      'classic-shoulders-triceps',
      'classic-back',
    ]);
    expect(workoutDayOrder('Day 5', 99)).toBe(5);
  });

  it('groups legend workouts into training routines', () => {
    const groups = getLegendRoutineGroups();
    expect(groups.length).toBeGreaterThan(0);
    for (const group of groups) {
      expect(group.workouts.length).toBeGreaterThan(0);
    }
  });

  it('every legend workout exercise resolves to a real exercise', () => {
    for (const routine of getLegendRoutines()) {
      for (const slot of routine.exercises) {
        expect(getExercise(slot.exerciseId), slot.exerciseId).toBeDefined();
      }
    }
  });

  it('finds legend workouts that use a given exercise', () => {
    const used = getRoutinesForExercise('triceps-pushdown');
    expect(used.length).toBeGreaterThan(0);
    expect(used.every((r) => r.collection === 'legend')).toBe(true);
  });

  it('has positive set counts and non-empty rep ranges', () => {
    for (const routine of getLegendRoutines()) {
      for (const slot of routine.exercises) {
        expect(slot.sets).toBeGreaterThan(0);
        expect(slot.repRange.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('bodybuilder roster', () => {
  it('loads at least 50 bodybuilders', () => {
    expect(bodybuilders.length).toBeGreaterThanOrEqual(50);
  });

  it('has no duplicate ids and orders by displayOrder', () => {
    const ids = new Set(bodybuilders.map((b) => b.id));
    expect(ids.size).toBe(bodybuilders.length);
    for (let i = 1; i < bodybuilders.length; i++) {
      expect(bodybuilders[i].displayOrder).toBeGreaterThanOrEqual(
        bodybuilders[i - 1].displayOrder,
      );
    }
  });

  it('every bodybuilder has 2-4 principles and a non-empty why', () => {
    for (const b of bodybuilders) {
      expect(b.principles.length, b.id).toBeGreaterThanOrEqual(2);
      expect(b.principles.length, b.id).toBeLessThanOrEqual(4);
      expect(b.why.length, b.id).toBeGreaterThan(0);
    }
  });

  it('every styleId reference resolves to a real style (checked in validateReferentialIntegrity too)', () => {
    const styleIds = new Set(styles.map((s) => s.id));
    for (const b of bodybuilders) {
      if (b.styleId) expect(styleIds.has(b.styleId), b.id).toBe(true);
    }
  });

  it('every current styles.json creator has a linked Tier 1/2 roster card', () => {
    const linkedStyleIds = new Set(
      bodybuilders.filter((b) => b.styleId).map((b) => b.styleId),
    );
    for (const style of styles) {
      expect(linkedStyleIds.has(style.id), style.id).toBe(true);
    }
  });

  it('finds a bodybuilder by id', () => {
    expect(getBodybuilder('dorian-yates')?.styleId).toBe('blood-and-guts');
    expect(getBodybuilder('does-not-exist')).toBeUndefined();
  });

  it('has no referential-integrity problems for the roster', () => {
    expect(validateReferentialIntegrity()).toEqual([]);
  });
});
