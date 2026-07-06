import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from './repositories/permissions.repository';
import {
  UserPermissionRecord,
  RequirePermissionMetadata,
} from './interfaces/permission.interface';

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
}
