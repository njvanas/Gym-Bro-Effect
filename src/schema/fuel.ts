import { z } from 'zod';

export const phaseIdSchema = z.enum(['maintaining', 'cutting', 'bulking']);
export type PhaseId = z.infer<typeof phaseIdSchema>;

export const foodCategorySchema = z.enum(['protein', 'carbs', 'fats', 'vegetables']);
export type FoodCategory = z.infer<typeof foodCategorySchema>;

export const phaseSchema = z.object({
  id: phaseIdSchema,
  name: z.string().min(1),
  tagline: z.string().min(1),
  overview: z.array(z.string().min(1)).min(1),
  nutritionGuidelines: z.array(z.string().min(1)).min(1),
  stapleFoods: z.array(
    z.object({
      category: foodCategorySchema,
      items: z.array(z.string().min(1)).min(1),
    }),
  ),
  dailyRoutine: z.array(
    z.object({
      time: z.string().min(1),
      label: z.string().min(1),
      detail: z.string().min(1).optional(),
    }),
  ),
});
export type Phase = z.infer<typeof phaseSchema>;

export const recipeSchema = z.object({
  id: z.string().min(1),
  phaseId: phaseIdSchema,
  name: z.string().min(1),
  calories: z.number().nonnegative(),
  proteinG: z.number().nonnegative(),
  carbsG: z.number().nonnegative(),
  fatG: z.number().nonnegative(),
  ingredients: z.array(z.string().min(1)).min(1),
  steps: z.array(z.string().min(1)).min(1),
});
export type Recipe = z.infer<typeof recipeSchema>;

export const phasesFileSchema = z.array(phaseSchema);
export const recipesFileSchema = z.array(recipeSchema);
