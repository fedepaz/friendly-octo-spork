import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesRepository } from '../repositories/categories.repository';
import { PrismaService } from '../../../infra/prisma/prisma.service';

describe('CategoriesRepository', () => {
  let repository: CategoriesRepository;
  let prisma: {
    category: {
      findMany: jest.Mock;
      findFirst: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      category: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesRepository,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    repository = module.get<CategoriesRepository>(CategoriesRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategories', () => {
    it('should return categories for a user', async () => {
      const userId = 'user-123';
      const expected = [
        { id: '1', userId, name: 'Food' },
        { id: '2', userId, name: 'Transport' },
      ];
      prisma.category.findMany.mockResolvedValue(expected);

      const result = await repository.getCategories(userId);

      expect(result).toEqual(expected);
      expect(prisma.category.findMany).toHaveBeenCalledWith({
        where: { userId },
      });
    });

    it('should return empty array when no categories exist', async () => {
      prisma.category.findMany.mockResolvedValue([]);

      const result = await repository.getCategories('user-123');

      expect(result).toEqual([]);
    });
  });

  describe('getCategoryById', () => {
    it('should return a category by id and userId', async () => {
      const userId = 'user-123';
      const categoryId = 'cat-456';
      const expected = { id: categoryId, userId, name: 'Food' };
      prisma.category.findFirst.mockResolvedValue(expected);

      const result = await repository.getCategoryById(userId, categoryId);

      expect(result).toEqual(expected);
      expect(prisma.category.findFirst).toHaveBeenCalledWith({
        where: { id: categoryId, userId },
      });
    });

    it('should return null if category not found', async () => {
      prisma.category.findFirst.mockResolvedValue(null);

      const result = await repository.getCategoryById(
        'user-123',
        'nonexistent',
      );

      expect(result).toBeNull();
    });
  });

  describe('getCategoriesWithUsage', () => {
    it('should return categories with transaction counts', async () => {
      const userId = 'user-123';
      const expected = [
        { id: '1', userId, name: 'Food', _count: { transactions: 15 } },
        { id: '2', userId, name: 'Transport', _count: { transactions: 8 } },
      ];
      prisma.category.findMany.mockResolvedValue(expected);

      const result = await repository.getCategoriesWithUsage(userId);

      expect(result).toEqual(expected);
      expect(prisma.category.findMany).toHaveBeenCalledWith({
        where: { userId },
        include: {
          _count: { select: { transactions: true } },
        },
        orderBy: {
          transactions: { _count: 'desc' },
        },
      });
    });

    it('should return empty array when no categories with usage', async () => {
      prisma.category.findMany.mockResolvedValue([]);

      const result = await repository.getCategoriesWithUsage('user-123');

      expect(result).toEqual([]);
    });
  });
});
