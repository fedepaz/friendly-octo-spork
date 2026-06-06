// backend/src/modules/categories/categories.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CategoriesRepository } from '../../repositories/categories.repository';
import { CategoryDTO } from '@repo/shared';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async getCategories(userId: string): Promise<CategoryDTO[]> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting categories for user ${userId}`);
    return this.categoriesRepo.getCategories(userId);
  }

  async getCategoryById(
    userId: string,
    id: string,
  ): Promise<CategoryDTO | null> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting category ${id} for user ${userId}`);
    return this.categoriesRepo.getCategoryById(userId, id);
  }

  async getCategoriesWithUsage(userId: string) {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting categories with usage for user ${userId}`);
    return this.categoriesRepo.getCategoriesWithUsage(userId);
  }
}
