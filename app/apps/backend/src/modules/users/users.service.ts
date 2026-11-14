// backend/src/modules/users/users.service.ts

import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from './repositories/user.repository';
import { PermissionsService } from '../permissions/permissions.service';
import { RegisterAuthDto, UserProfileDto } from '@repo/shared';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  // matches AuthService.BCRYPT_ROUNDS so hashes stay interchangeable
  private readonly BCRYPT_ROUNDS = 12;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly permissionsService: PermissionsService,
  ) {}

  private toProfile(user: User): UserProfileDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email || '',
      isActive: !user.deletedAt,
      createdAt: user.createdAt,
    };
  }

  async getAllUsers(): Promise<UserProfileDto[]> {
    this.logger.log('Getting all users');
    const users = await this.userRepository.getAllUsers();
    return users.map((user) => this.toProfile(user));
  }

  async createUser(dto: RegisterAuthDto): Promise<UserProfileDto> {
    const [nameExists, emailExists] = await Promise.all([
      this.userRepository.findByName(dto.name),
      this.userRepository.getUserByEmail(dto.email),
    ]);
    if (nameExists || emailExists) {
      throw new BadRequestException({
        code: 'AUTH_USER_ALREADY_EXISTS',
        message: 'User already exists',
      });
    }

    const passwordHash = await bcrypt.hash(dto.password, this.BCRYPT_ROUNDS);
    const user = await this.userRepository.createUser(
      dto.name,
      dto.email,
      passwordHash,
    );
    // same default grants as public registration
    await this.permissionsService.grantDefaultPermissions(user.id);
    this.logger.log(`Created user ${user.name} (${user.id})`);
    return this.toProfile(user);
  }

  async softDeleteUser(
    actorId: string,
    targetId: string,
  ): Promise<UserProfileDto> {
    if (actorId === targetId) {
      throw new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'You cannot delete your own account',
      });
    }
    const target = await this.userRepository.getUserById(targetId);
    if (!target) throw new NotFoundException('User not found');

    const deleted = await this.userRepository.softDelete(targetId, actorId);
    this.logger.log(`Soft-deleted user ${target.name} (${targetId})`);
    return this.toProfile(deleted);
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
