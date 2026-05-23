// src/api/categories/categories.service.ts

import type { Prisma } from "@/generated/prisma";
import { CategoriesRepository } from "../repositories/categories.repository";
import type { CategoryDTO } from "./categories.schema";

export class CategoriesService {
  private categoriesRepository = new CategoriesRepository();

  private mapToCategoryDTO(
    category: Prisma.CategoryGetPayload<object>,
  ): CategoryDTO {
    return {
      ...category,
    };
  }
  async findCategories(userId: string): Promise<CategoryDTO[]> {
    if (!userId) {
      throw new Error("User id is required");
    }
    const categories = await this.categoriesRepository.getCategories(userId);
    if (!categories) {
      throw new Error("Categories not found");
    }
    return categories.map((category) => this.mapToCategoryDTO(category));
  }

  async findCategoryById(categoryId: string): Promise<CategoryDTO> {
    if (!categoryId) {
      throw new Error("Category id is required");
    }
    const category =
      await this.categoriesRepository.getCategoryById(categoryId);

    if (!category) {
      throw new Error("Category not found");
    }

    return this.mapToCategoryDTO(category);
  }
}
