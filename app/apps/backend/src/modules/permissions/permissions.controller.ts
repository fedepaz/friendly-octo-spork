import { Body, Controller, Get, Param, Patch, Req } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import type {
  UserPermissions,
  UserEntityPermission,
  Entity,
} from '@repo/shared';
import { AuthRequest } from '../auth/interfaces/authRequest.interface';
import { RequirePermission } from './decorators/require-permission.decorator';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get('me')
  @RequirePermission({ tableName: 'user_profile', action: 'read' })
  async getMyPermissions(@Req() req: AuthRequest): Promise<UserPermissions> {
    return this.permissionsService.getPermissionsMe(req.user.id);
  }

  @Get('tables')
  @RequirePermission({ tableName: 'user_permissions', action: 'read' })
  async getAllTables(): Promise<Entity[]> {
    return this.permissionsService.findAllEntities();
  }

  @Get('user/:userId')
  @RequirePermission({ tableName: 'user_permissions', action: 'read' })
  async getUserPermissions(
    @Param('userId') userId: string,
  ): Promise<UserPermissions> {
    return this.permissionsService.getUserPermissionsByUserId(userId);
  }

  @Get('entity/:entityId')
  @RequirePermission({ tableName: 'user_permissions', action: 'read' })
  async getEntityPermissions(
    @Param('entityId') entityId: string,
  ): Promise<UserEntityPermission[]> {
    return this.permissionsService.getUserPermissionsByEntityId(entityId);
  }

  @Patch('user/:userId')
  @RequirePermission({ tableName: 'user_permissions', action: 'update' })
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
