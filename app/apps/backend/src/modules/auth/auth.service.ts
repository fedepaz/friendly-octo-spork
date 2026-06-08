// src/modules/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserAuthRepository } from './repositories/userAuth.repository';

import { ConfigService } from '@nestjs/config';
import {
  JwtPayload,
  JwtRefreshPayload,
} from './interfaces/jwt-payload.interface';
import {
  AuthResponseDto,
  ChangePasswordDto,
  LoginAuthDto,
  RegisterAuthDto,
  TokensDto,
} from '@repo/shared';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly BCRYPT_ROUNDS = 12;

  constructor(
    private readonly userAuthRepo: UserAuthRepository,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}
  async validateUser(id: string) {
    return this.userAuthRepo.findById(id);
  }

  async login(dto: LoginAuthDto): Promise<AuthResponseDto> {
    // validate username
    const user = await this.userAuthRepo.findByName(dto.name as string);

    if (!user) {
      throw new UnauthorizedException({
        code: 'AUTH_INVALID_CREDENTIALS',
        message: 'Invalid credentials - name',
      });
    }

    // validate password
    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        code: 'AUTH_INVALID_CREDENTIALS',
        message: 'Invalid credentials - password',
      });
    }

    // check if user is active
    if (user.deletedAt) {
      throw new UnauthorizedException({
        code: 'FORBIDDEN',
        message: 'User is inactive',
      });
    }

    // generate tokens
    const tokens = await this.generateTokens({
      sub: user.id,
      name: user.name,
    });

    const isDefaultPassword =
      dto.password === this.config.get('config.defaultPassword');

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email as string,
      },
      ...tokens,
      isDefaultPassword,
    };
  }

  async refreshTokens(refreshToken: string): Promise<TokensDto> {
    try {
      const payload = this.jwtService.verify<JwtRefreshPayload>(refreshToken, {
        secret: this.config.getOrThrow<string>('config.jwt.refreshSecret'),
      });

      // check if user exists
      const user = await this.userAuthRepo.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException({
          code: 'UNAUTHORIZED',
          message: 'User not found',
        });
      }

      // generate tokens
      return this.generateTokens({
        sub: user.id,
        name: user.name,
      });
    } catch (error) {
      this.logger.error('Error refreshing tokens:', error);
      throw new UnauthorizedException({
        code: 'AUTH_SESSION_INVALID',
        message: 'Invalid credentials',
      });
    }
  }

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<void> {
    // Validate user
    const user = await this.userAuthRepo.findById(userId);
    if (!user) {
      throw new NotFoundException({
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(
      dto.currentPassword,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new BadRequestException({
        code: 'AUTH_INVALID_CREDENTIALS',
        message: 'Invalid credentials',
      });
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(
      dto.newPassword,
      this.BCRYPT_ROUNDS,
    );

    // Check if current password is different from new password
    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'New cannot be the same as the current',
      });
    }

    // Update password
    await this.userAuthRepo.updatePassword(userId, newPasswordHash);
  }

  // Helper to generate tokens using the injected JwtService
  private async generateTokens(payload: JwtPayload): Promise<TokensDto> {
    // Cast to Record<string, any> to satisfy JwtService typing
    const accessTokenPayload: Record<string, any> = {
      sub: payload.sub,
      name: payload.name,
    };

    const refreshTokenPayload: Record<string, any> = {
      sub: payload.sub,
    };

    const accessTokenSecret =
      this.config.getOrThrow<string>('config.jwt.secret');
    const accessTokenExpiresIn = this.config.get<number>(
      'config.jwt.expiresIn',
    );
    const refreshTokenSecret = this.config.getOrThrow<string>(
      'config.jwt.refreshSecret',
    );
    const refreshTokenExpiresIn = this.config.get<number>(
      'config.jwt.refreshExpiresIn',
    );

    const nodeEnv = this.config.getOrThrow<string>('config.environment');
    const isProd = nodeEnv === 'production';

    if (!isProd) {
      this.logger.debug(
        `🔑 ISSUING TOKENS | Sub: ${payload.sub} | Username: ${payload.name}`,
      );
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessTokenPayload, {
        secret: accessTokenSecret,
        expiresIn: accessTokenExpiresIn,
      }),
      this.jwtService.signAsync(refreshTokenPayload, {
        secret: refreshTokenSecret,
        expiresIn: refreshTokenExpiresIn,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async register(dto: RegisterAuthDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const userExists = await this.userAuthRepo.findByName(dto.name);
    const emailExists = await this.userAuthRepo.findByEmail(dto.email);

    if (userExists || emailExists) {
      throw new BadRequestException({
        code: 'AUTH_USER_ALREADY_EXISTS',
        message: 'User already exists',
      });
    }

    // Create password hash
    const passwordHash = await bcrypt.hash(dto.password, this.BCRYPT_ROUNDS);

    const user = await this.userAuthRepo.createUser(
      dto.name,
      dto.email,
      passwordHash,
    );

    // generate tokens
    const tokens = await this.generateTokens({
      sub: user.id,
      name: user.name,
    });

    const isDefaultPassword =
      dto.password === this.config.get('config.defaultPassword');

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email as string,
      },
      ...tokens,
      isDefaultPassword,
    };
  }
}
