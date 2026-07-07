import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from './repositories/permissions.repository';
import {
  UserPermissionRecord,
  RequirePermissionMetadata,
} from './interfaces/permission.interface';
import { MANAGED_ENTITY_ARRAY } from '@repo/shared';
import type { UserPermissions, UserEntityPermission } from '@repo/shared';

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
    const permissions = await this.permissionsRepo.findByUserId(userId);
    const record = permissions.find((p) => p.entityName === meta.table);

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

  async setPermissions(
    userId: string,
    permissions: UserPermissionRecord[],
  ): Promise<void> {
    for (const perm of permissions) {
      await this.permissionsRepo.upsert({ ...perm, userId });
    }
  }

  async getUserPermissionsByUserId(userId: string): Promise<UserPermissions> {
    const records = await this.permissionsRepo.findManyByUserId(userId);
    const map: UserPermissions = {};
    for (const r of records) {
      map[r.entityName] = {
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
      username: r.username || 'Unknown',
      permissions: {
        canCreate: r.canCreate,
        canRead: r.canRead,
        canUpdate: r.canUpdate,
        canDelete: r.canDelete,
        scope: r.scope,
        permissionType: r.permissionType,
      },
      createdAt: r.createdAt || new Date(),
    }));
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
      const entity = MANAGED_ENTITY_ARRAY.find(
        (e) => e.tableName === p.tableName,
      );
      if (!entity) continue;
      await this.permissionsRepo.upsert({
        userId,
        entityId: p.tableName,
        entityName: p.tableName,
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
