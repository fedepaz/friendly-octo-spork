import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginAuthDto,
  RefreshTokenDto,
  TokensDto,
  ChangePasswordDto,
  LoginAuthSchema,
  RefreshTokenSchema,
  ChangePasswordSchema,
  AuthResponseDto,
  RegisterAuthSchema,
  RegisterAuthDto,
} from '@repo/shared';

import { AuthUser } from './types/auth-user.type';
import { Public } from '../../shared/decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorators';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation-pipe';
import { RequirePermission } from '../permissions/decorators/require-permission.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(new ZodValidationPipe(LoginAuthSchema)) dto: LoginAuthDto,
  ): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body(new ZodValidationPipe(RegisterAuthSchema)) dto: RegisterAuthDto,
  ): Promise<AuthResponseDto> {
    return this.authService.register(dto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Body(new ZodValidationPipe(RefreshTokenSchema)) dto: RefreshTokenDto,
  ): Promise<TokensDto> {
    return this.authService.refreshTokens(dto.refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'user_profile', action: 'read' })
  logout() {
    return { message: 'Logged out successfully' };
  }

  @Patch('password')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'user_profile', action: 'update' })
  async changePassword(
    @Body(new ZodValidationPipe(ChangePasswordSchema)) dto: ChangePasswordDto,
    @CurrentUser() user: AuthUser,
  ) {
    await this.authService.changePassword(user.id, dto);
    return {
      success: true,
      message: 'Contraseña actualizada correctamente',
    };
  }
}
