import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { User } from 'generated/prisma';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { id: userId, deletedAt: null },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { email, deletedAt: null },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { deletedAt: null },
    });
  }
}
