import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { MANAGED_ENTITY_ARRAY } from '@repo/shared';
import type {
  UserPermissions,
  UserEntityPermission,
  Entity,
} from '@repo/shared';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get('tables')
  getAllTables(): Entity[] {
    return MANAGED_ENTITY_ARRAY.map((e, i) => ({
      id: String(i + 1),
      name: e.tableName,
      label: e.label,
      permissionType: e.permissionType,
    }));
  }

  @Get('user/:userId')
  async getUserPermissions(
    @Param('userId') userId: string,
  ): Promise<UserPermissions> {
    return this.permissionsService.getUserPermissionsByUserId(userId);
  }

  @Get('entity/:entityId')
  async getEntityPermissions(
    @Param('entityId') entityId: string,
  ): Promise<UserEntityPermission[]> {
    return this.permissionsService.getUserPermissionsByEntityId(entityId);
  }

  @Patch('user/:userId')
  async setUserPermissions(
    @Param('userId') userId: string,
    @Body('permissions')
    permissions: Array<{
      tableName: string;
      canCreate: boolean;
      canRead: boolean;
      canUpdate: boolean;
      canDelete: boolean;
      scope: 'NONE' | 'OWN' | 'ALL';
      permissionType: 'CRUD' | 'PROCESS' | 'READ_ONLY';
    }>,
  ): Promise<{ success: boolean }> {
    await this.permissionsService.setPermissionsForUser(userId, permissions);
    return { success: true };
  }
}
