// src/auth/user/userAuth.repository.ts

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../../../generated/prisma/client';
import { PrismaService } from '../../../infra/prisma/prisma.service';

@Injectable()
export class UserAuthRepository {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async createUser(
    name: string,
    email: string,
    passwordHash: string,
  ): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async updatePassword(userId: string, newPasswordHash: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          passwordHash: newPasswordHash,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Error updating password:', error);
      throw new InternalServerErrorException('Error updating password');
    }
  }
}
