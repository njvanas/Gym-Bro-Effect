import phasesData from '../data/phases.json';
import recipesData from '../data/recipes.json';
import {
  phasesFileSchema,
  recipesFileSchema,
  type Phase,
  type PhaseId,
  type Recipe,
} from '../schema';

export const phases: Phase[] = phasesFileSchema.parse(phasesData);
export const recipes: Recipe[] = recipesFileSchema.parse(recipesData);

const phasesById = new Map(phases.map((phase) => [phase.id, phase]));

export function getPhase(id: PhaseId): Phase | undefined {
  return phasesById.get(id);
}

export function getRecipesForPhase(id: PhaseId): Recipe[] {
  return recipes.filter((recipe) => recipe.phaseId === id);
}

export function validateFuelIntegrity(): string[] {
  const problems: string[] = [];
  if (phases.length !== 3) {
    problems.push(`Expected exactly 3 phases, found ${phases.length}`);
  }
  const ids = new Set(phases.map((p) => p.id));
  for (const required of ['maintaining', 'cutting', 'bulking'] as const) {
    if (!ids.has(required)) problems.push(`Missing phase: ${required}`);
  }
  for (const recipe of recipes) {
    if (!phasesById.has(recipe.phaseId)) {
      problems.push(`Recipe "${recipe.id}" references unknown phase "${recipe.phaseId}"`);
    }
  }
  for (const phase of phases) {
    if (getRecipesForPhase(phase.id).length < 1) {
      problems.push(`Phase "${phase.id}" has no recipes`);
    }
  }
  return problems;
}
