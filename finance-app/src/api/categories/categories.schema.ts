//src/api/categories/categories.schema.ts

import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  userId: z.string(),
  name: z.string(),
  color: z.string().optional(),
});

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(255, "Category name is too long"),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Invalid color format")
    .optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export const categoryFilterSchema = z.object({});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CategoryFilterInput = z.infer<typeof categoryFilterSchema>;
