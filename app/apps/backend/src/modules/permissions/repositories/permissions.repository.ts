import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { UserPermissionRecord } from '../interfaces/permission.interface';

@Injectable()
export class PermissionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<UserPermissionRecord[]> {
    return this.prisma.permission.findMany({
      where: { userId },
    }) as Promise<UserPermissionRecord[]>;
  }

  async findByEntityId(entityId: string): Promise<UserPermissionRecord[]> {
    return this.prisma.permission.findMany({
      where: { entityId },
    }) as Promise<UserPermissionRecord[]>;
  }

  async upsert(data: UserPermissionRecord): Promise<void> {
    await this.prisma.permission.upsert({
      where: {
        userId_entityId: { userId: data.userId, entityId: data.entityId },
      },
      update: data,
      create: data,
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.permission.deleteMany({ where: { userId } });
  }
}
