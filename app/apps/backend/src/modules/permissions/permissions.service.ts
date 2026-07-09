import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from './repositories/permissions.repository';
import {
  UserPermissionRecord,
  RequirePermissionMetadata,
} from './interfaces/permission.interface';
import type {
  UserPermissions,
  UserEntityPermission,
  Entity,
} from '@repo/shared';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepo: PermissionsRepository) {}

  async getUserPermissions(userId: string): Promise<UserPermissionRecord[]> {
    return this.permissionsRepo.findByUserId(userId);
  }

  async canPerform(
    userId: string,
    meta: RequirePermissionMetadata,
  ): Promise<boolean> {
    const records = await this.permissionsRepo.findByUserIdWithEntity(userId);
    const record = records.find((r) => r.entity.name === meta.tableName);

    if (!record) return false;

    if (record.permissionType === 'READ_ONLY' && meta.action !== 'read') {
      return false;
    }

    if (record.scope === 'NONE') return false;

    switch (meta.action) {
      case 'create':
        return record.canCreate;
      case 'read':
        return record.canRead;
      case 'update':
        return record.canUpdate;
      case 'delete':
        return record.canDelete;
      default:
        return false;
    }
  }

  async getPermissionsMe(userId: string): Promise<UserPermissions> {
    const records = await this.permissionsRepo.findByUserIdWithEntity(userId);
    const map: UserPermissions = {};
    for (const r of records) {
      map[r.entity.name] = {
        canCreate: r.canCreate,
        canRead: r.canRead,
        canUpdate: r.canUpdate,
        canDelete: r.canDelete,
        scope: r.scope,
        permissionType: r.permissionType,
      };
    }
    return map;
  }

  async getUserPermissionsByUserId(userId: string): Promise<UserPermissions> {
    const records = await this.permissionsRepo.findByUserIdWithEntity(userId);
    const map: UserPermissions = {};
    for (const r of records) {
      map[r.entity.name] = {
        canCreate: r.canCreate,
        canRead: r.canRead,
        canUpdate: r.canUpdate,
        canDelete: r.canDelete,
        scope: r.scope,
        permissionType: r.permissionType,
      };
    }
    return map;
  }

  async getUserPermissionsByEntityId(
    entityId: string,
  ): Promise<UserEntityPermission[]> {
    const records = await this.permissionsRepo.findManyByEntityId(entityId);
    return records.map((r) => ({
      userId: r.userId,
      username: r.user?.name || 'Unknown',
      firstName: undefined,
      lastName: undefined,
      permissions: {
        canCreate: r.canCreate,
        canRead: r.canRead,
        canUpdate: r.canUpdate,
        canDelete: r.canDelete,
        scope: r.scope,
        permissionType: r.permissionType,
      },
      createdAt: r.createdAt,
    }));
  }

  async findAllEntities(): Promise<Entity[]> {
    return this.permissionsRepo.findAllEntities();
  }

  async setPermissionsForUser(
    userId: string,
    permissions: Array<{
      tableName: string;
      canCreate: boolean;
      canRead: boolean;
      canUpdate: boolean;
      canDelete: boolean;
      scope: 'NONE' | 'OWN' | 'ALL';
      permissionType: 'CRUD' | 'PROCESS' | 'READ_ONLY';
    }>,
  ): Promise<void> {
    await this.permissionsRepo.deleteAllForUser(userId);
    for (const p of permissions) {
      const entity = await this.permissionsRepo.findEntityByName(p.tableName);
      if (!entity) continue;
      await this.permissionsRepo.upsert({
        userId,
        entityId: entity.id,
        entityName: entity.name,
        canCreate: p.canCreate,
        canRead: p.canRead,
        canUpdate: p.canUpdate,
        canDelete: p.canDelete,
        scope: p.scope,
        permissionType: p.permissionType,
      });
    }
  }
}
