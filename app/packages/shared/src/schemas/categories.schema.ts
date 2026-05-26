import { z } from "zod";

export const categorySchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  color: z.string().optional().nullable(),
});

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(50, "Category name is too long"),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color format")
    .optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type CategoryDTO = z.infer<typeof categorySchema>;
