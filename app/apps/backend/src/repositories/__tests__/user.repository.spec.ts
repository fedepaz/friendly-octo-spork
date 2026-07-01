import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user.repository';
import { PrismaService } from '../../infra/prisma/prisma.service';

describe('UserRepository', () => {
  let repository: UserRepository;
  let prisma: {
    user: {
      findFirst: jest.Mock;
      findMany: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, { provide: PrismaService, useValue: prisma }],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return a user by id when not soft-deleted', async () => {
      const userId = 'user-123';
      const expected = {
        id: userId,
        email: 'test@example.com',
        name: 'Test User',
      };
      prisma.user.findFirst.mockResolvedValue(expected);

      const result = await repository.getUserById(userId);

      expect(result).toEqual(expected);
      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { id: userId, deletedAt: null },
      });
    });

    it('should return null if user not found', async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      const result = await repository.getUserById('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user by email when not soft-deleted', async () => {
      const email = 'test@example.com';
      const expected = { id: 'user-123', email, name: 'Test User' };
      prisma.user.findFirst.mockResolvedValue(expected);

      const result = await repository.getUserByEmail(email);

      expect(result).toEqual(expected);
      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { email, deletedAt: null },
      });
    });

    it('should return null if user not found by email', async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      const result = await repository.getUserByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('getAllUsers', () => {
    it('should return all non-soft-deleted users', async () => {
      const expected = [
        { id: 'user-1', email: 'a@test.com', name: 'User A' },
        { id: 'user-2', email: 'b@test.com', name: 'User B' },
      ];
      prisma.user.findMany.mockResolvedValue(expected);

      const result = await repository.getAllUsers();

      expect(result).toEqual(expected);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
      });
    });

    it('should return empty array when no users exist', async () => {
      prisma.user.findMany.mockResolvedValue([]);

      const result = await repository.getAllUsers();

      expect(result).toEqual([]);
    });
  });
});
