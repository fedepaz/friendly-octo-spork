// src/api/categories/categories.service.ts

import { prisma } from "@/lib/prisma";
import type {
  CategoryFilterInput,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./categories.schema";

export class CategoriesService {
  async getCategories(userId: string, filters?: CategoryFilterInput) {
    const categories = await prisma.category.findMany({
      where: {
        userId,
        ...(filters?.type && { type: filters.type }),
      },
      orderBy: [{ type: "asc" }, { name: "asc" }],
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    return categories;
  }

  async getCategoryById(userId: string, categoryId: number) {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
      include: {
        _count: {
          select: { transactions: true },
        },
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  }

  async createCategory(userId: string, data: CreateCategoryInput) {
    const category = await prisma.category.create({
      data: {
        userId,
        name: data.name,
        type: data.type,
        color: data.color,
      },
    });

    return category;
  }
  async updateCategory(userId: string, id: number, data: UpdateCategoryInput) {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        type: data.type,
        color: data.color,
      },
    });

    return category;
  }

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
}
