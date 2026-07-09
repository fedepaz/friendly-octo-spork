import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../../shared/decorators/public.decorator';
import { REQUIRE_PERMISSION_KEY } from '../decorators/require-permission.decorator';
import { PermissionsService } from '../permissions.service';
import { RequirePermissionMetadata } from '../interfaces/permission.interface';
import { AuthRequest } from '../../auth/interfaces/authRequest.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionsService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const permissionMeta =
      this.reflector.getAllAndOverride<RequirePermissionMetadata>(
        REQUIRE_PERMISSION_KEY,
        [context.getHandler(), context.getClass()],
      );

    // Deny-by-default: routes without @RequirePermission() are denied
    if (!permissionMeta) {
      throw new ForbiddenException(
        'Access denied: no permission configured for this route',
      );
    }

    const request = context.switchToHttp().getRequest<AuthRequest>();
    const { user } = request;

    if (!user?.id) {
      throw new ForbiddenException('Authentication required');
    }

    const allowed = await this.permissionsService.canPerform(
      user.id,
      permissionMeta,
    );

    if (!allowed) {
      throw new ForbiddenException(
        `Insufficient permissions: ${permissionMeta.action} on ${permissionMeta.tableName}`,
      );
    }

    return true;
  }
}
