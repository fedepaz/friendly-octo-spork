import {
  LoginAuthSchema,
  RegisterAuthSchema,
  AccessTokenSchema,
  RefreshTokenSchema,
  Tokens,
  AuthResponseSchema,
  UserProfileSchema,
  AuthUserPermissionsSchema,
  ChangePasswordSchema,
  LoginAuthDto,
  RegisterAuthDto,
} from '../auth.schema';

describe('Auth schemas', () => {
  describe('LoginAuthSchema', () => {
    const validLogin: LoginAuthDto = {
      name: 'johndoe',
      password: 'password123',
    };

    it('should accept valid login', () => {
      const result = LoginAuthSchema.safeParse(validLogin);
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = LoginAuthSchema.safeParse({
        name: '',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing name', () => {
      const result = LoginAuthSchema.safeParse({
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty password', () => {
      const result = LoginAuthSchema.safeParse({
        name: 'johndoe',
        password: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing password', () => {
      const result = LoginAuthSchema.safeParse({
        name: 'johndoe',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty object', () => {
      const result = LoginAuthSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  describe('RegisterAuthSchema', () => {
    const validRegister: RegisterAuthDto = {
      name: 'JohnDoe1',
      email: 'john@example.com',
      password: 'Password1',
    };

    it('should accept valid registration', () => {
      const result = RegisterAuthSchema.safeParse(validRegister);
      expect(result.success).toBe(true);
    });

    describe('name validation', () => {
      it('should reject name shorter than 6 characters', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          name: 'Ab1',
        });
        expect(result.success).toBe(false);
      });

      it('should accept name at exactly 6 characters', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          name: 'Abcde1',
        });
        expect(result.success).toBe(true);
      });

      it('should reject name longer than 20 characters', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          name: 'A'.repeat(19) + '1a',
        });
        expect(result.success).toBe(false);
      });

      it('should accept name at exactly 20 characters', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          name: 'A'.repeat(18) + '1a',
        });
        expect(result.success).toBe(true);
      });

      it('should reject name without uppercase', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          name: 'johndoe1',
        });
        expect(result.success).toBe(false);
      });

      it('should reject name without lowercase', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          name: 'JOHNDOE1',
        });
        expect(result.success).toBe(false);
      });

      it('should reject name without digit', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          name: 'JohnDoe',
        });
        expect(result.success).toBe(false);
      });

      it('should reject name with special characters', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          name: 'John@Doe1',
        });
        expect(result.success).toBe(false);
      });

      it('should reject missing name', () => {
        const result = RegisterAuthSchema.safeParse({
          email: validRegister.email,
          password: validRegister.password,
        });
        expect(result.success).toBe(false);
      });
    });

    describe('email validation', () => {
      it('should reject invalid email format', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          email: 'not-an-email',
        });
        expect(result.success).toBe(false);
      });

      it('should reject email without @', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          email: 'johnexample.com',
        });
        expect(result.success).toBe(false);
      });

      it('should reject email without domain', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          email: 'john@',
        });
        expect(result.success).toBe(false);
      });

      it('should reject empty email', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          email: '',
        });
        expect(result.success).toBe(false);
      });

      it('should reject missing email', () => {
        const result = RegisterAuthSchema.safeParse({
          name: validRegister.name,
          password: validRegister.password,
        });
        expect(result.success).toBe(false);
      });

      it('should accept valid email formats', () => {
        const emails = [
          'user@example.com',
          'user.name@example.com',
          'user+tag@example.com',
          'user@sub.example.com',
        ];
        for (const email of emails) {
          const result = RegisterAuthSchema.safeParse({
            ...validRegister,
            email,
          });
          expect(result.success).toBe(true);
        }
      });
    });

    describe('password validation', () => {
      it('should reject password shorter than 6 characters', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          password: 'Ab1',
        });
        expect(result.success).toBe(false);
      });

      it('should accept password at exactly 6 characters', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          password: 'Abcde1',
        });
        expect(result.success).toBe(true);
      });

      it('should reject password longer than 20 characters', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          password: 'A'.repeat(19) + '1a',
        });
        expect(result.success).toBe(false);
      });

      it('should accept password at exactly 20 characters', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          password: 'A'.repeat(18) + '1a',
        });
        expect(result.success).toBe(true);
      });

      it('should reject password without uppercase', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          password: 'password1',
        });
        expect(result.success).toBe(false);
      });

      it('should reject password without lowercase', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          password: 'PASSWORD1',
        });
        expect(result.success).toBe(false);
      });

      it('should reject password without digit', () => {
        const result = RegisterAuthSchema.safeParse({
          ...validRegister,
          password: 'Password',
        });
        expect(result.success).toBe(false);
      });
    });

    describe('name-password cross-field validation', () => {
      it('should reject when name equals password', () => {
        const result = RegisterAuthSchema.safeParse({
          name: 'JohnDoe1',
          email: 'john@example.com',
          password: 'JohnDoe1',
        });
        expect(result.success).toBe(false);
      });

      it('should accept when name differs from password', () => {
        const result = RegisterAuthSchema.safeParse({
          name: 'JohnDoe1',
          email: 'john@example.com',
          password: 'Different1',
        });
        expect(result.success).toBe(true);
      });
    });
  });

  describe('AccessTokenSchema', () => {
    it('should accept valid access token', () => {
      const result = AccessTokenSchema.safeParse({
        accessToken: 'eyJhbGciOiJIUzI1NiJ9.test',
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing accessToken', () => {
      const result = AccessTokenSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it('should reject non-string accessToken', () => {
      const result = AccessTokenSchema.safeParse({
        accessToken: 123,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('RefreshTokenSchema', () => {
    it('should accept valid refresh token', () => {
      const result = RefreshTokenSchema.safeParse({
        refreshToken: 'refresh-token-value',
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing refreshToken', () => {
      const result = RefreshTokenSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it('should reject non-string refreshToken', () => {
      const result = RefreshTokenSchema.safeParse({
        refreshToken: 123,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Tokens', () => {
    it('should accept valid token pair', () => {
      const result = Tokens.safeParse({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing accessToken', () => {
      const result = Tokens.safeParse({
        refreshToken: 'refresh-token',
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing refreshToken', () => {
      const result = Tokens.safeParse({
        accessToken: 'access-token',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty object', () => {
      const result = Tokens.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  describe('AuthResponseSchema', () => {
    const validResponse = {
      user: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'John Doe',
        email: 'john@example.com',
      },
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      isDefaultPassword: false,
    };

    it('should accept valid auth response', () => {
      const result = AuthResponseSchema.safeParse(validResponse);
      expect(result.success).toBe(true);
    });

    it('should accept response with isDefaultPassword true', () => {
      const result = AuthResponseSchema.safeParse({
        ...validResponse,
        isDefaultPassword: true,
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid UUID in user.id', () => {
      const result = AuthResponseSchema.safeParse({
        ...validResponse,
        user: {
          ...validResponse.user,
          id: 'not-a-uuid',
        },
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email in user', () => {
      const result = AuthResponseSchema.safeParse({
        ...validResponse,
        user: {
          ...validResponse.user,
          email: 'not-an-email',
        },
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing user', () => {
      const result = AuthResponseSchema.safeParse({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        isDefaultPassword: false,
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing isDefaultPassword', () => {
      const result = AuthResponseSchema.safeParse({
        user: validResponse.user,
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('UserProfileSchema', () => {
    it('should accept valid user profile', () => {
      const result = UserProfileSchema.safeParse({
        id: 'user-001',
        name: 'John Doe',
        email: 'john@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('should accept profile with optional fields', () => {
      const result = UserProfileSchema.safeParse({
        id: 'user-001',
        name: 'John Doe',
        email: 'john@example.com',
        isActive: true,
        createdAt: new Date('2024-01-01'),
      });
      expect(result.success).toBe(true);
    });

    it('should accept profile with string createdAt', () => {
      const result = UserProfileSchema.safeParse({
        id: 'user-001',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: '2024-01-01',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = UserProfileSchema.safeParse({
        id: 'user-001',
        name: 'John Doe',
        email: 'not-an-email',
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing required fields', () => {
      const result = UserProfileSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  describe('AuthUserPermissionsSchema', () => {
    it('should accept default values', () => {
      const result = AuthUserPermissionsSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.isAdmin).toBe(false);
        expect(result.data.permissions).toEqual([]);
      }
    });

    it('should accept valid permissions object', () => {
      const result = AuthUserPermissionsSchema.safeParse({
        isAdmin: true,
        permissions: ['read', 'write'],
      });
      expect(result.success).toBe(true);
    });

    it('should accept empty permissions array', () => {
      const result = AuthUserPermissionsSchema.safeParse({
        isAdmin: false,
        permissions: [],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('ChangePasswordSchema', () => {
    const validChange = {
      currentPassword: 'OldPass1',
      newPassword: 'NewPass1',
    };

    it('should accept valid password change', () => {
      const result = ChangePasswordSchema.safeParse(validChange);
      expect(result.success).toBe(true);
    });

    it('should reject when new password equals current password', () => {
      const result = ChangePasswordSchema.safeParse({
        currentPassword: 'SamePass1',
        newPassword: 'SamePass1',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty currentPassword', () => {
      const result = ChangePasswordSchema.safeParse({
        currentPassword: '',
        newPassword: 'NewPass1',
      });
      expect(result.success).toBe(false);
    });

    it('should reject weak new password (no uppercase)', () => {
      const result = ChangePasswordSchema.safeParse({
        ...validChange,
        newPassword: 'newpass1',
      });
      expect(result.success).toBe(false);
    });

    it('should reject weak new password (no lowercase)', () => {
      const result = ChangePasswordSchema.safeParse({
        ...validChange,
        newPassword: 'NEWPASS1',
      });
      expect(result.success).toBe(false);
    });

    it('should reject weak new password (no digit)', () => {
      const result = ChangePasswordSchema.safeParse({
        ...validChange,
        newPassword: 'NewPass',
      });
      expect(result.success).toBe(false);
    });

    it('should reject short new password', () => {
      const result = ChangePasswordSchema.safeParse({
        ...validChange,
        newPassword: 'Ab1',
      });
      expect(result.success).toBe(false);
    });

    it('should reject long new password', () => {
      const result = ChangePasswordSchema.safeParse({
        ...validChange,
        newPassword: 'A'.repeat(19) + '1a',
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing fields', () => {
      const result = ChangePasswordSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });
});
