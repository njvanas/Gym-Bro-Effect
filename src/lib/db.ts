import myCollectionData from '../data/my-collection.json';
import exercisesData from '../data/exercises.json';
import stylesData from '../data/styles.json';
import routinesData from '../data/routines.json';
import bodybuildersData from '../data/bodybuilders.json';
import {
  exercisesFileSchema,
  stylesFileSchema,
  routinesFileSchema,
  hevyFoldersCatalogFileSchema,
  bodybuildersFileSchema,
  type Bodybuilder,
  type Exercise,
  type HevyFoldersCatalog,
  type Routine,
  type TrainingStyle,
} from '../schema';
import { paths } from './routes';

export const hevyCatalog: HevyFoldersCatalog =
  hevyFoldersCatalogFileSchema.parse(myCollectionData);
/** @deprecated alias */
export const myCollection = hevyCatalog;

export const hevyFolders = [...hevyCatalog.hevyFolders].sort(
  (a, b) => a.displayOrder - b.displayOrder,
);
export const hevyFoldersById = new Map(
  hevyFolders.map((folder) => [folder.id, folder]),
);
export const exercises: Exercise[] = exercisesFileSchema.parse(exercisesData);
export const styles: TrainingStyle[] = stylesFileSchema
  .parse(stylesData)
  .sort((a, b) => a.displayOrder - b.displayOrder);
export const routines: Routine[] = routinesFileSchema.parse(routinesData);
export const bodybuilders: Bodybuilder[] = bodybuildersFileSchema
  .parse(bodybuildersData)
  .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

const styleOrder = new Map(styles.map((s) => [s.id, s.displayOrder]));

/** Sort key from a workout's day label (Day 1, Workout 2, Workout A, Mon & Thu, …). */
export function workoutDayOrder(day: string | undefined, sortOrder: number): number {
  if (!day) return sortOrder;

  const dayMatch = day.match(/\bday\s*(\d+)/i);
  if (dayMatch) return parseInt(dayMatch[1], 10);

  const workoutNumMatch = day.match(/\bworkout\s*(\d+)/i);
  if (workoutNumMatch) return parseInt(workoutNumMatch[1], 10);

  const workoutLetterMatch = day.match(/\bworkout\s*([a-z])\b/i);
  if (workoutLetterMatch) {
    return workoutLetterMatch[1].toUpperCase().charCodeAt(0) - 64;
  }

  const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  for (let i = 0; i < weekdays.length; i++) {
    if (day.toLowerCase().includes(weekdays[i])) return i + 1;
  }

  return sortOrder;
}

/** Compare two legend workouts within the same training routine. */
export function compareWorkouts(a: Routine, b: Routine): number {
  const dayDiff =
    workoutDayOrder(a.day, a.sortOrder) - workoutDayOrder(b.day, b.sortOrder);
  if (dayDiff !== 0) return dayDiff;
  return a.sortOrder - b.sortOrder;
}

/** Legend workouts sorted by methodology order, then day order within the routine. */
export function getSortedRoutines(list: Routine[]): Routine[] {
  return [...list].sort((a, b) => {
    const styleDiff =
      (styleOrder.get(a.styleId ?? '') ?? Number.MAX_SAFE_INTEGER) -
      (styleOrder.get(b.styleId ?? '') ?? Number.MAX_SAFE_INTEGER);
    if (styleDiff !== 0) return styleDiff;
    return compareWorkouts(a, b);
  });
}

export type LegendRoutineGroup = {
  id: string;
  styleId: string;
  label: string;
  workouts: Routine[];
};

function routineGroupKey(routine: Routine): string {
  const label = routine.labels[0] ?? 'default';
  return `${routine.styleId ?? 'unknown'}::${label}`;
}

/** Legend entries grouped into training routines (collections of workouts). */
export function getLegendRoutineGroups(list: Routine[] = legendRoutines): LegendRoutineGroup[] {
  const byKey = new Map<string, Routine[]>();

  for (const routine of list) {
    const key = routineGroupKey(routine);
    const group = byKey.get(key) ?? [];
    group.push(routine);
    byKey.set(key, group);
  }

  const groups: LegendRoutineGroup[] = [];
  for (const [id, workouts] of byKey) {
    const [styleId, label] = id.split('::');
    groups.push({
      id,
      styleId,
      label,
      workouts: [...workouts].sort(compareWorkouts),
    });
  }

  return groups.sort((a, b) => {
    const styleDiff =
      (styleOrder.get(a.styleId) ?? Number.MAX_SAFE_INTEGER) -
      (styleOrder.get(b.styleId) ?? Number.MAX_SAFE_INTEGER);
    if (styleDiff !== 0) return styleDiff;
    return a.label.localeCompare(b.label);
  });
}

export function getLegendRoutineGroupsByStyle(styleId: string): LegendRoutineGroup[] {
  return getLegendRoutineGroups(legendRoutines.filter((r) => r.styleId === styleId));
}

export const legendRoutines = getSortedRoutines(
  routines.filter((r) => r.collection === 'legend'),
);

export const personalRoutines = [...routines]
  .filter((r) => r.collection === 'personal')
  .sort(compareWorkouts);

const exercisesById = new Map(exercises.map((e) => [e.id, e]));
const stylesById = new Map(styles.map((s) => [s.id, s]));

export function getExercise(id: string): Exercise | undefined {
  return exercisesById.get(id);
}

export function getStyle(id: string): TrainingStyle | undefined {
  return stylesById.get(id);
}

export function getRoutine(id: string): Routine | undefined {
  return routines.find((r) => r.id === id);
}

const bodybuildersById = new Map(bodybuilders.map((b) => [b.id, b]));
const bodybuildersByStyleId = new Map(
  bodybuilders.map((b) => [b.styleId, b] as const),
);

export function getBodybuilder(id: string): Bodybuilder | undefined {
  return bodybuildersById.get(id);
}

export function getBodybuilderByStyle(styleId: string): Bodybuilder | undefined {
  return bodybuildersByStyleId.get(styleId);
}

export function getPersonalRoutines(): Routine[] {
  return personalRoutines;
}

export function getHevyFolder(id: string) {
  return hevyFoldersById.get(id);
}

export function getLegendRoutines(): Routine[] {
  return legendRoutines;
}

export function getRoutinesByStyle(styleId: string): Routine[] {
  return getSortedRoutines(
    legendRoutines.filter((r) => r.styleId === styleId),
  );
}

/** Every legend plan that programs a given exercise. */
export function getRoutinesForExercise(exerciseId: string): Routine[] {
  return legendRoutines.filter((r) =>
    r.exercises.some((slot) => slot.exerciseId === exerciseId),
  );
}

export type ExerciseUsage = {
  kind: 'legend' | 'personal';
  /** Stable selection key: styleId for legends, `personal` for personal. */
  key: string;
  label: string;
  styleId?: string;
  routineId?: string;
  note?: string;
  workoutPath: string;
  /** Defaults to "Open workout →". */
  ctaLabel?: string;
};

type ExerciseAppearance = {
  routine: Routine;
  slotNotes?: string;
};

function compareExerciseAppearances(a: ExerciseAppearance, b: ExerciseAppearance): number {
  const noteDiff = Number(Boolean(b.slotNotes)) - Number(Boolean(a.slotNotes));
  if (noteDiff !== 0) return noteDiff;
  const dayDiff = compareWorkouts(a.routine, b.routine);
  if (dayDiff !== 0) return dayDiff;
  return a.routine.id.localeCompare(b.routine.id);
}

function legendUsageLabel(styleId: string): string {
  const bodybuilder = bodybuildersByStyleId.get(styleId);
  if (bodybuilder) return bodybuilder.name;
  const style = stylesById.get(styleId);
  return style?.creator ?? style?.name ?? styleId;
}

function resolveUsageNote(
  exercise: Exercise,
  styleId: string | undefined,
  slotNotes: string | undefined,
): string | undefined {
  if (styleId === 'blood-and-guts' && exercise.bloodAndGutsNote) {
    return exercise.bloodAndGutsNote;
  }
  return slotNotes;
}

/**
 * One entry per bodybuilder (and Personal when applicable) that programs the exercise.
 * Notes stay optional and are only meant to be shown after a tag is selected.
 */
export function getExerciseUsages(exerciseId: string): ExerciseUsage[] {
  const exercise = exercisesById.get(exerciseId);
  if (!exercise) return [];

  const byGroup = new Map<string, ExerciseAppearance[]>();

  for (const routine of routines) {
    const matchingSlots = routine.exercises.filter((slot) => slot.exerciseId === exerciseId);
    if (matchingSlots.length === 0) continue;

    const groupKey =
      routine.collection === 'personal' ? 'personal' : (routine.styleId ?? 'unknown');
    if (groupKey === 'unknown') continue;

    const slotNotes = matchingSlots.map((slot) => slot.notes).find((note) => Boolean(note));
    const list = byGroup.get(groupKey) ?? [];
    list.push({ routine, slotNotes });
    byGroup.set(groupKey, list);
  }

  const usages: ExerciseUsage[] = [];

  for (const [groupKey, appearances] of byGroup) {
    const best = [...appearances].sort(compareExerciseAppearances)[0];
    if (!best) continue;

    if (groupKey === 'personal') {
      usages.push({
        kind: 'personal',
        key: 'personal',
        label: 'Personal',
        routineId: best.routine.id,
        note: best.slotNotes,
        workoutPath: paths.trainingPersonalWorkout(best.routine.id),
      });
      continue;
    }

    const styleId = groupKey;
    usages.push({
      kind: 'legend',
      key: styleId,
      label: legendUsageLabel(styleId),
      styleId,
      routineId: best.routine.id,
      note: resolveUsageNote(exercise, styleId, best.slotNotes),
      workoutPath: paths.trainingWorkout(styleId, best.routine.id),
    });
  }

  // Editorial Blood & Guts notes may exist even when classic BAG days use a sibling movement.
  if (
    exercise.bloodAndGutsNote &&
    !usages.some((usage) => usage.styleId === 'blood-and-guts')
  ) {
    usages.push({
      kind: 'legend',
      key: 'blood-and-guts',
      label: legendUsageLabel('blood-and-guts'),
      styleId: 'blood-and-guts',
      note: exercise.bloodAndGutsNote,
      workoutPath: paths.trainingLegend('blood-and-guts'),
      ctaLabel: 'View Blood & Guts →',
    });
  }

  return usages.sort((a, b) => {
    if (a.kind === 'personal' && b.kind !== 'personal') return -1;
    if (b.kind === 'personal' && a.kind !== 'personal') return 1;
    if (a.styleId === 'blood-and-guts' && b.styleId !== 'blood-and-guts') return -1;
    if (b.styleId === 'blood-and-guts' && a.styleId !== 'blood-and-guts') return 1;
    return a.label.localeCompare(b.label, 'en', { sensitivity: 'base' });
  });
}

/**
 * Validates cross-file references and uniqueness of ids.
 * Returns the list of problems; empty means the DB is sound.
 */
export function validateReferentialIntegrity(): string[] {
  const problems: string[] = [];

  const checkUnique = (label: string, ids: string[]) => {
    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) problems.push(`Duplicate ${label} id: "${id}"`);
      seen.add(id);
    }
  };

  checkUnique('exercise', exercises.map((e) => e.id));
  checkUnique('style', styles.map((s) => s.id));
  checkUnique('routine', routines.map((r) => r.id));
  checkUnique('bodybuilder', bodybuilders.map((b) => b.id));

  for (const bodybuilder of bodybuilders) {
    if (bodybuilder.styleId && !stylesById.has(bodybuilder.styleId)) {
      problems.push(
        `Bodybuilder "${bodybuilder.id}" references unknown style "${bodybuilder.styleId}"`,
      );
    }
  }

  for (const folder of hevyFolders) {
    if (!folder.url.endsWith(`/folder/${folder.hevyId}`)) {
      problems.push(
        `Hevy folder "${folder.id}" url does not match hevyId ${folder.hevyId}`,
      );
    }
    if (folder.routinesInHevy.length === 0) {
      problems.push(`Hevy folder "${folder.id}" has no routinesInHevy listed`);
    }
  }

  for (const routine of legendRoutines) {
    if (!routine.styleId || !stylesById.has(routine.styleId)) {
      problems.push(
        `Legend routine "${routine.id}" references unknown style "${routine.styleId ?? 'none'}"`,
      );
    }
    for (const slot of routine.exercises) {
      if (!exercisesById.has(slot.exerciseId)) {
        problems.push(
          `Routine "${routine.id}" references unknown exercise "${slot.exerciseId}"`,
        );
      }
      if (slot.setScheme.length === 0) {
        problems.push(
          `Legend routine "${routine.id}" exercise "${slot.exerciseId}" is missing a set scheme`,
        );
      }
    }
  }

  return problems;
}
