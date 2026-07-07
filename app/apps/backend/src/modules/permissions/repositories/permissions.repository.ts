import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import {
  UserPermissionRecord,
  PermissionScope,
  PermissionType,
} from '../interfaces/permission.interface';

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

  async findManyByUserId(userId: string): Promise<UserPermissionRecord[]> {
    const records = await this.prisma.permission.findMany({
      where: { userId },
    });
    return records.map((r) => ({
      userId: r.userId,
      entityId: r.entityId,
      entityName: r.entityName,
      canCreate: r.canCreate,
      canRead: r.canRead,
      canUpdate: r.canUpdate,
      canDelete: r.canDelete,
      scope: r.scope as PermissionScope,
      permissionType: r.permissionType as PermissionType,
    }));
  }

  async findManyByEntityId(entityId: string) {
    const records = await this.prisma.permission.findMany({
      where: { entityId },
      include: { user: { select: { name: true } } },
    });
    return records.map((r) => ({
      userId: r.userId,
      entityId: r.entityId,
      entityName: r.entityName,
      canCreate: r.canCreate,
      canRead: r.canRead,
      canUpdate: r.canUpdate,
      canDelete: r.canDelete,
      scope: r.scope as PermissionScope,
      permissionType: r.permissionType as PermissionType,
      username: r.user?.name || 'Unknown',
      createdAt: r.createdAt,
    }));
  }

  async deleteAllForUser(userId: string): Promise<void> {
    await this.prisma.permission.deleteMany({ where: { userId } });
  }
}
