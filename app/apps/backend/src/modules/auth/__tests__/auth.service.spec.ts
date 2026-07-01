import { Test, TestingModule } from '@nestjs/testing';
import {
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserAuthRepository } from '../repositories/userAuth.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// Mock bcrypt at module level
jest.mock('bcrypt');
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userAuthRepo: {
    findByName: jest.Mock;
    findByEmail: jest.Mock;
    findById: jest.Mock;
    createUser: jest.Mock;
    updatePassword: jest.Mock;
  };
  let jwtService: {
    sign: jest.Mock;
    signAsync: jest.Mock;
    verify: jest.Mock;
  };
  let configService: {
    get: jest.Mock;
    getOrThrow: jest.Mock;
  };

  beforeEach(async () => {
    userAuthRepo = {
      findByName: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      createUser: jest.fn(),
      updatePassword: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mock-token'),
      signAsync: jest.fn().mockResolvedValue('mock-token'),
      verify: jest.fn(),
    };

    configService = {
      get: jest.fn().mockReturnValue('test-value'),
      getOrThrow: jest.fn().mockImplementation((key: string) => {
        const values: Record<string, string> = {
          'config.jwt.secret': 'access-secret',
          'config.jwt.refreshSecret': 'refresh-secret',
          'config.environment': 'development',
        };
        return values[key] || 'test-value';
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserAuthRepository, useValue: userAuthRepo },
        { provide: JwtService, useValue: jwtService },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return tokens for valid credentials', async () => {
      const loginDto = { name: 'TestUser', password: 'Password123' };
      const user = {
        id: 'user-1',
        name: 'TestUser',
        email: 'test@example.com',
        passwordHash: 'hashed-password',
        deletedAt: null,
      };

      userAuthRepo.findByName.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      configService.get.mockImplementation((key: string) => {
        const values: Record<string, string> = {
          'config.defaultPassword': 'default123',
        };
        return values[key];
      });

      const result = await service.login(loginDto);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result).toHaveProperty('isDefaultPassword');
      expect(result.user.id).toBe('user-1');
      expect(result.user.name).toBe('TestUser');
      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
    });

    it('should throw UnauthorizedException for invalid name', async () => {
      userAuthRepo.findByName.mockResolvedValue(null);

      await expect(
        service.login({ name: 'WrongName', password: 'Password123' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      const user = {
        id: 'user-1',
        name: 'TestUser',
        email: 'test@example.com',
        passwordHash: 'hashed-password',
        deletedAt: null,
      };
      userAuthRepo.findByName.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login({ name: 'TestUser', password: 'WrongPassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for deleted user', async () => {
      const user = {
        id: 'user-1',
        name: 'TestUser',
        email: 'test@example.com',
        passwordHash: 'hashed-password',
        deletedAt: new Date(),
      };
      userAuthRepo.findByName.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await expect(
        service.login({ name: 'TestUser', password: 'Password123' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should detect default password', async () => {
      const loginDto = { name: 'TestUser', password: 'Default123' };
      const user = {
        id: 'user-1',
        name: 'TestUser',
        email: 'test@example.com',
        passwordHash: 'hashed-default',
        deletedAt: null,
      };
      userAuthRepo.findByName.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock)
        .mockResolvedValueOnce(true) // password check
        .mockResolvedValueOnce(true); // default password check
      configService.get.mockImplementation((key: string) => {
        const values: Record<string, string> = {
          'config.defaultPassword': 'Default123',
        };
        return values[key];
      });

      const result = await service.login(loginDto);

      expect(result.isDefaultPassword).toBe(true);
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto = {
        name: 'NewUser',
        email: 'new@example.com',
        password: 'Password123',
      };
      const createdUser = {
        id: 'user-2',
        name: 'NewUser',
        email: 'new@example.com',
        passwordHash: 'hashed-password',
      };

      userAuthRepo.findByName.mockResolvedValue(null);
      userAuthRepo.findByEmail.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      userAuthRepo.createUser.mockResolvedValue(createdUser);

      const result = await service.register(registerDto);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user.id).toBe('user-2');
      expect(result.user.name).toBe('NewUser');
      expect(userAuthRepo.createUser).toHaveBeenCalledWith(
        'NewUser',
        'new@example.com',
        'hashed-password',
      );
    });

    it('should throw BadRequestException if username already exists', async () => {
      userAuthRepo.findByName.mockResolvedValue({ id: 'existing-user' });

      await expect(
        service.register({
          name: 'ExistingUser',
          email: 'new@example.com',
          password: 'Password123',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if email already exists', async () => {
      userAuthRepo.findByName.mockResolvedValue(null);
      userAuthRepo.findByEmail.mockResolvedValue({ id: 'existing-user' });

      await expect(
        service.register({
          name: 'NewUser',
          email: 'existing@example.com',
          password: 'Password123',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('refreshTokens', () => {
    it('should return new tokens for valid refresh token', async () => {
      const user = {
        id: 'user-1',
        name: 'TestUser',
        email: 'test@example.com',
      };
      jwtService.verify.mockReturnValue({ sub: 'user-1' });
      userAuthRepo.findById.mockResolvedValue(user);

      const result = await service.refreshTokens('valid-refresh-token');

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(jwtService.verify).toHaveBeenCalledWith('valid-refresh-token', {
        secret: 'refresh-secret',
      });
      expect(userAuthRepo.findById).toHaveBeenCalledWith('user-1');
    });

    it('should throw UnauthorizedException for invalid refresh token', async () => {
      jwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.refreshTokens('invalid-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if user not found', async () => {
      jwtService.verify.mockReturnValue({ sub: 'nonexistent-user' });
      userAuthRepo.findById.mockResolvedValue(null);

      await expect(service.refreshTokens('valid-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const user = {
        id: 'user-1',
        name: 'TestUser',
        passwordHash: 'old-hash',
      };
      userAuthRepo.findById.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock)
        .mockResolvedValueOnce(true) // current password valid
        .mockResolvedValueOnce(false); // different from new
      (bcrypt.hash as jest.Mock).mockResolvedValue('new-hash');

      await service.changePassword('user-1', {
        currentPassword: 'OldPassword1',
        newPassword: 'NewPassword1',
      });

      expect(userAuthRepo.updatePassword).toHaveBeenCalledWith(
        'user-1',
        'new-hash',
      );
    });

    it('should throw NotFoundException if user not found', async () => {
      userAuthRepo.findById.mockResolvedValue(null);

      await expect(
        service.changePassword('nonexistent', {
          currentPassword: 'OldPassword1',
          newPassword: 'NewPassword1',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for invalid current password', async () => {
      const user = {
        id: 'user-1',
        name: 'TestUser',
        passwordHash: 'old-hash',
      };
      userAuthRepo.findById.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.changePassword('user-1', {
          currentPassword: 'WrongPassword1',
          newPassword: 'NewPassword1',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if new password same as current', async () => {
      const user = {
        id: 'user-1',
        name: 'TestUser',
        passwordHash: 'old-hash',
      };
      userAuthRepo.findById.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await expect(
        service.changePassword('user-1', {
          currentPassword: 'SamePassword1',
          newPassword: 'SamePassword1',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('validateUser', () => {
    it('should return user by id', async () => {
      const user = { id: 'user-1', name: 'TestUser' };
      userAuthRepo.findById.mockResolvedValue(user);

      const result = await service.validateUser('user-1');

      expect(result).toEqual(user);
      expect(userAuthRepo.findById).toHaveBeenCalledWith('user-1');
    });

    it('should return null for nonexistent user', async () => {
      userAuthRepo.findById.mockResolvedValue(null);

      const result = await service.validateUser('nonexistent');

      expect(result).toBeNull();
    });
  });
});
