import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { UserPermissionRecord } from '../interfaces/permission.interface';

@Injectable()
export class PermissionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<UserPermissionRecord[]> {
    const records = await this.prisma.userPermission.findMany({
      where: { userId },
      include: { entity: true },
    });
    return records.map((r) => ({
      userId: r.userId,
      entityId: r.entityId,
      entityName: r.entity.name,
      canCreate: r.canCreate,
      canRead: r.canRead,
      canUpdate: r.canUpdate,
      canDelete: r.canDelete,
      scope: r.scope,
      permissionType: r.permissionType,
    }));
  }

  async findByUserIdWithEntity(userId: string) {
    return this.prisma.userPermission.findMany({
      where: { userId },
      include: { entity: true },
    });
  }

  async findByEntityId(entityId: string) {
    return this.prisma.userPermission.findMany({
      where: { entityId },
      include: { entity: true, user: true },
    });
  }

  async findEntityByName(name: string) {
    return this.prisma.entity.findUnique({ where: { name } });
  }

  async upsert(data: UserPermissionRecord): Promise<void> {
    await this.prisma.userPermission.upsert({
      where: {
        userId_entityId: { userId: data.userId, entityId: data.entityId },
      },
      update: {
        canCreate: data.canCreate,
        canRead: data.canRead,
        canUpdate: data.canUpdate,
        canDelete: data.canDelete,
        scope: data.scope,
        permissionType: data.permissionType,
      },
      create: {
        userId: data.userId,
        entityId: data.entityId,
        canCreate: data.canCreate,
        canRead: data.canRead,
        canUpdate: data.canUpdate,
        canDelete: data.canDelete,
        scope: data.scope,
        permissionType: data.permissionType,
      },
    });
  }

  async deleteAllForUser(userId: string): Promise<void> {
    await this.prisma.userPermission.deleteMany({ where: { userId } });
  }

  async findManyByEntityId(entityId: string) {
    return this.prisma.userPermission.findMany({
      where: { entityId },
      include: { user: { select: { name: true } }, entity: true },
    });
  }

  async findAllEntities() {
    return this.prisma.entity.findMany({
      where: { isActive: true },
      orderBy: { label: 'asc' },
    });
  }
}
