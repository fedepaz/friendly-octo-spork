import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  RegisterAuthDto,
  RegisterAuthSchema,
  UserProfileDto,
} from '@repo/shared';

import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { AuthUser } from '../auth/types/auth-user.type';
import { RequirePermission } from '../permissions/decorators/require-permission.decorator';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation-pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'users', action: 'read' })
  async getAllUsers(): Promise<UserProfileDto[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @RequirePermission({ tableName: 'users', action: 'create' })
  async createUser(
    @Body(new ZodValidationPipe(RegisterAuthSchema))
    dto: RegisterAuthDto,
  ): Promise<UserProfileDto> {
    return this.userService.createUser(dto);
  }

  @Post(':id/delete')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'users', action: 'delete' })
  async deleteUser(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ): Promise<UserProfileDto> {
    return this.userService.softDeleteUser(user.id, id);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'user_profile', action: 'read' })
  async getMe(@CurrentUser() user: AuthUser): Promise<UserProfileDto> {
    return this.userService.getProfile(user.id);
  }
}
