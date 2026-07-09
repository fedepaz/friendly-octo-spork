import { SetMetadata } from '@nestjs/common';
import { RequirePermissionMetadata } from '../interfaces/permission.interface';

export const REQUIRE_PERMISSION_KEY = 'require_permission';
export const RequirePermission = (meta: RequirePermissionMetadata) =>
  SetMetadata(REQUIRE_PERMISSION_KEY, meta);
