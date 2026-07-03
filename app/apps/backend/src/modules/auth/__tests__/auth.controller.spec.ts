import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import type { AuthUser } from '../types/auth-user.type';

describe('AuthController', () => {
  let controller: AuthController;
  let service: {
    login: jest.Mock;
    register: jest.Mock;
    refreshTokens: jest.Mock;
    changePassword: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      login: jest.fn(),
      register: jest.fn(),
      refreshTokens: jest.fn(),
      changePassword: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: service }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return auth response for valid credentials', async () => {
      const loginDto = { name: 'TestUser', password: 'Password123' };
      const expected = {
        user: { id: 'user-1', name: 'TestUser', email: 'test@example.com' },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        isDefaultPassword: false,
      };
      service.login.mockResolvedValue(expected);

      const result = await controller.login(loginDto);

      expect(result).toEqual(expected);
      expect(service.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('register', () => {
    it('should register new user successfully', async () => {
      const registerDto = {
        name: 'NewUser1',
        email: 'new@example.com',
        password: 'Password123',
      };
      const expected = {
        user: { id: 'user-2', name: 'NewUser1', email: 'new@example.com' },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        isDefaultPassword: false,
      };
      service.register.mockResolvedValue(expected);

      const result = await controller.register(registerDto);

      expect(result).toEqual(expected);
      expect(service.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('refresh', () => {
    it('should return new tokens for valid refresh token', async () => {
      const refreshDto = { refreshToken: 'valid-refresh-token' };
      const expected = {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      };
      service.refreshTokens.mockResolvedValue(expected);

      const result = await controller.refresh(refreshDto);

      expect(result).toEqual(expected);
      expect(service.refreshTokens).toHaveBeenCalledWith('valid-refresh-token');
    });
  });

  describe('logout', () => {
    it('should return success message', () => {
      const result = controller.logout();

      expect(result).toEqual({ message: 'Logged out successfully' });
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const mockUser: AuthUser = { id: 'user-1', name: 'TestUser' };
      const changePasswordDto = {
        currentPassword: 'OldPassword1',
        newPassword: 'NewPassword1',
      };
      service.changePassword.mockResolvedValue(undefined);

      const result = await controller.changePassword(
        changePasswordDto,
        mockUser,
      );

      expect(result).toEqual({
        success: true,
        message: 'Contraseña actualizada correctamente',
      });
      expect(service.changePassword).toHaveBeenCalledWith(
        'user-1',
        changePasswordDto,
      );
    });

    it('should pass userId and dto to service', async () => {
      const mockUser: AuthUser = { id: 'user-42', name: 'AnotherUser' };
      const changePasswordDto = {
        currentPassword: 'CurrentPass1',
        newPassword: 'NewPass123',
      };
      service.changePassword.mockResolvedValue(undefined);

      await controller.changePassword(changePasswordDto, mockUser);

      expect(service.changePassword).toHaveBeenCalledWith(
        'user-42',
        changePasswordDto,
      );
    });
  });
});
