// src/api/categories/categories.service.ts
import { prisma } from "../../lib/prisma";
import type { CreateCategoryInput, UpdateCategoryInput } from "./categories.schema";

export class CategoriesService {
  async getCategories(userId: string) {
    return await prisma.category.findMany({
      where: { userId },
      orderBy: { name: "asc" },
    });
  }

  async getCategoryById(userId: string, id: number) {
    return await prisma.category.findFirst({
      where: { id, userId },
    });
  }

  async createCategory(userId: string, data: CreateCategoryInput) {
    return await prisma.category.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async updateCategory(userId: string, id: number, data: UpdateCategoryInput) {
    return await prisma.category.update({
      where: { id, userId },
      data,
    });
  }

  async deleteCategory(userId: string, id: number) {
    return await prisma.category.delete({
      where: { id, userId },
    });
  }
}