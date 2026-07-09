// backend/src/repositories/categories.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Category } from 'generated/prisma';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async getCategories(userId: string): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: {
        userId,
      },
    });
  }

  async getCategoryById(userId: string, id: string): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async getCategoriesWithUsage(userId: string) {
    return this.prisma.category.findMany({
      where: { userId },
      include: {
        _count: { select: { transactions: true } },
      },
      orderBy: {
        transactions: { _count: 'desc' },
      },
    });
  }
}
