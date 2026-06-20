// src/api/repositories/categories.repository.ts

import type { Category } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export class CategoriesRepository {
  // Get categories
  async getCategories(userId: string): Promise<Category[]> {
    return prisma.category.findMany({
      where: {
        userId,
      },
    });
  }

  // Get category by id
  async getCategoryById(userId: string, id: string): Promise<Category | null> {
    return prisma.category.findFirst({
      where: {
        id,
        userId,
      },
    });
  }
}
