import type { Exercise, MuscleGroup, TrainingStyle } from '../schema';

export function filterStylesByQuery<
  T extends { name: string; creator: string; tags: string[] },
>(styles: T[], query: string): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return styles;
  return styles.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.creator.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)),
  );
}

export function filterExercises(
  list: Exercise[],
  query: string,
  muscle: MuscleGroup | 'all' = 'all',
): Exercise[] {
  const q = query.trim().toLowerCase();
  return list.filter((exercise) => {
    if (muscle !== 'all' && exercise.primaryMuscle !== muscle) return false;
    if (!q) return true;
    return (
      exercise.name.toLowerCase().includes(q) ||
      (exercise.hevyName?.toLowerCase().includes(q) ?? false) ||
      exercise.aliases.some((alias) => alias.toLowerCase().includes(q)) ||
      exercise.primaryMuscle.toLowerCase().includes(q) ||
      exercise.equipment.toLowerCase().includes(q)
    );
  });
}

export type { TrainingStyle };
