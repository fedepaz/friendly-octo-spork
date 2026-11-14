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

  /**
   * Grant the default self-registration permission set to a user.
   * Shared by public registration and admin user creation so the two
   * can never drift apart.
   */
  async grantDefaultPermissions(userId: string): Promise<void> {
    const entities = await this.findAllEntities();
    const readOnlyEntities = [
      'categories',
      'dashboard',
      'audit_logs',
      'users',
      'user_permissions',
    ];
    const defaultPermissions = entities.map((entity) => ({
      tableName: entity.name,
      canCreate: !readOnlyEntities.includes(entity.name),
      canRead: true,
      canUpdate: !readOnlyEntities.includes(entity.name),
      canDelete: false,
      scope: 'OWN' as const,
      permissionType: entity.permissionType,
    }));
    await this.setPermissionsForUser(userId, defaultPermissions);
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
    // Merge semantics: upsert only the submitted rows. Deleting everything
    // first would wipe permissions the caller never sent (the UI saves only
    // the toggled entities), locking the user out of everything else.
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
