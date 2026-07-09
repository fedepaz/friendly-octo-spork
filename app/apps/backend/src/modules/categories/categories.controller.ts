import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { AuthUser } from '../auth/types/auth-user.type';
import { CategoryDTO } from '@repo/shared';
import { RequirePermission } from '../permissions/decorators/require-permission.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'categories', action: 'read' })
  async getCategories(@CurrentUser() user: AuthUser): Promise<CategoryDTO[]> {
    return this.categoriesService.getCategoriesWithUsage(user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'categories', action: 'read' })
  async getCategoryById(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ) {
    return this.categoriesService.getCategoryById(user.id, id);
  }
}
