// src/api/categories/categories.schema.ts
import { z } from "zod";
import { CategoryType } from "../../generated/prisma";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  type: z.nativeEnum(CategoryType),
  color: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

export const categoryFilterSchema = z.object({
  type: z.nativeEnum(CategoryType).optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CategoryFilter = z.infer<typeof categoryFilterSchema>;