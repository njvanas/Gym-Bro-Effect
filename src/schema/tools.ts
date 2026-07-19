import { z } from 'zod';

export const toolTierSchema = z.enum(['essential', 'advised', 'want', 'alternative']);
export type ToolTier = z.infer<typeof toolTierSchema>;

export const toolCategorySchema = z.enum([
  'body-composition',
  'nutrition',
  'training',
  'recovery',
]);
export type ToolCategory = z.infer<typeof toolCategorySchema>;

export const toolSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  tier: toolTierSchema,
  category: toolCategorySchema,
  tracks: z.string().min(1),
  necessity: z.string().min(1),
  advice: z.string().min(1),
  purchaseReason: z.string().min(1),
  url: z.string().url().optional(),
});
export type Tool = z.infer<typeof toolSchema>;

export const toolsFileSchema = z.array(toolSchema);
