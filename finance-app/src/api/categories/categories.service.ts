// src/api/categories/categories.service.ts

import { CategoriesRepository } from "../repositories/categories.repository";

export class CategoriesService {
  private categoriesRepository = new CategoriesRepository();
  async findCategories(userId: string) {
    if (!userId) {
      throw new Error("User id is required");
    }
    const categories = await this.categoriesRepository.getCategories(userId);
    if (!categories) {
      throw new Error("Categories not found");
    }
    return categories;
  }

  async findCategoryById(categoryId: number) {
    if (!categoryId) {
      throw new Error("Category id is required");
    }
    const category =
      await this.categoriesRepository.getCategoryById(categoryId);

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }
  /*
  async getCategoryStats(
    userId: string,
    categoryId: number,
    startDate?: Date,
    endDate?: Date
  ) {
    await this.getCategoryById(userId, categoryId);

    const transactions = await prisma.transaction.findMany({
      where: {
        categoryId,
        userId,
        ...(startDate && { date: { gte: startDate } }),
        ...(endDate && { date: { lte: endDate } }),
      },
    });

    const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
    const avg = transactions.length > 0 ? total / transactions.length : 0;

    return {
      total,
      average: avg,
      count: transactions.length,
      transactions,
    };
  }
    */
}
