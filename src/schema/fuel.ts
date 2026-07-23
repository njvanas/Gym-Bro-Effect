import { z } from 'zod';

export const phaseIdSchema = z.enum([
  'maintaining',
  'cutting',
  'bulking',
  'recomposition',
]);
export type PhaseId = z.infer<typeof phaseIdSchema>;

export const productCategorySchema = z.enum([
  'protein',
  'carbs',
  'ready-meals',
  'dairy-snacks',
  'drinks',
  'supplements',
  'pantry',
]);
export type ProductCategory = z.infer<typeof productCategorySchema>;

export const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().min(1).optional(),
  category: productCategorySchema,
  servingLabel: z.string().min(1),
  calories: z.number().nonnegative(),
  proteinG: z.number().nonnegative(),
  carbsG: z.number().nonnegative(),
  fatG: z.number().nonnegative(),
  url: z.string().url().optional(),
  imageSrc: z.string().min(1).optional(),
  notes: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).optional(),
});
export type Product = z.infer<typeof productSchema>;

export const productsFileSchema = z.array(productSchema);

export const phaseSchema = z.object({
  id: phaseIdSchema,
  name: z.string().min(1),
  tagline: z.string().min(1),
  overview: z.array(z.string().min(1)).min(1),
  nutritionGuidelines: z.array(z.string().min(1)).min(1),
  featuredProductIds: z.array(z.string().min(1)).min(1),
  dailyRoutine: z.array(
    z.object({
      time: z.string().min(1),
      label: z.string().min(1),
      detail: z.string().min(1).optional(),
    }),
  ),
});
export type Phase = z.infer<typeof phaseSchema>;

export const phasesFileSchema = z.array(phaseSchema);
