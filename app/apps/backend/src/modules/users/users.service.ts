// backend/src/modules/users/users.service.ts

import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { UserRepository } from '../../repositories/user.repository';
import { UserProfileDto } from '@repo/shared';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(userId: string): Promise<UserProfileDto[]> {
    if (!userId) throw new BadRequestException('UserId is required');
    this.logger.log(`Getting all users for userId: ${userId}`);

    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    return [
      {
        id: user.id,
        name: user.name,
        email: user.email || '',
        isActive: !user.deletedAt,
        createdAt: user.createdAt,
      },
    ];
  }

  async getProfile(userId: string): Promise<UserProfileDto> {
    if (!userId) throw new BadRequestException('UserId is required');
    this.logger.log(`Getting profile for userId: ${userId}`);
    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    if (user.email === null) throw new BadRequestException('Email is required');
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: !user.deletedAt,
      createdAt: user.createdAt,
    };
  }
}
