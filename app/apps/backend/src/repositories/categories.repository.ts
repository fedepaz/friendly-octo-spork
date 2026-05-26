import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Category } from '@prisma/client';

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
}
