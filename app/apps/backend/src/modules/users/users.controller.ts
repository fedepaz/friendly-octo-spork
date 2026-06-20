// backend/src/modules/users/users.controller.ts

import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProfileDto } from '@repo/shared';

import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { AuthUser } from '../auth/types/auth-user.type';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(@CurrentUser() user: AuthUser): Promise<UserProfileDto[]> {
    return this.userService.getAllUsers(user.id);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getMe(@CurrentUser() user: AuthUser): Promise<UserProfileDto> {
    return this.userService.getProfile(user.id);
  }
}
