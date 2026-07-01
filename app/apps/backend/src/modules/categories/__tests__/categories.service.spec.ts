import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CategoriesService } from '../categories.service';
import { CategoriesRepository } from '../../../repositories/categories.repository';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoriesRepo: {
    getCategories: jest.Mock;
    getCategoryById: jest.Mock;
    getCategoriesWithUsage: jest.Mock;
  };

  beforeEach(async () => {
    categoriesRepo = {
      getCategories: jest.fn(),
      getCategoryById: jest.fn(),
      getCategoriesWithUsage: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: CategoriesRepository, useValue: categoriesRepo },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategories', () => {
    it('should return categories for valid userId', async () => {
      const categories = [
        { id: 'cat-1', name: 'Food', userId: 'user-1' },
        { id: 'cat-2', name: 'Transport', userId: 'user-1' },
      ];
      categoriesRepo.getCategories.mockResolvedValue(categories);

      const result = await service.getCategories('user-1');

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('cat-1');
      expect(result[0].name).toBe('Food');
      expect(categoriesRepo.getCategories).toHaveBeenCalledWith('user-1');
    });

    it('should return empty array when no categories exist', async () => {
      categoriesRepo.getCategories.mockResolvedValue([]);

      const result = await service.getCategories('user-1');

      expect(result).toEqual([]);
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getCategories('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for null userId', async () => {
      await expect(service.getCategories(null as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getCategoryById', () => {
    it('should return category by id', async () => {
      const category = { id: 'cat-1', name: 'Food', userId: 'user-1' };
      categoriesRepo.getCategoryById.mockResolvedValue(category);

      const result = await service.getCategoryById('user-1', 'cat-1');

      expect(result).not.toBeNull();
      expect(result!.id).toBe('cat-1');
      expect(result!.name).toBe('Food');
      expect(categoriesRepo.getCategoryById).toHaveBeenCalledWith(
        'user-1',
        'cat-1',
      );
    });

    it('should return null if category not found', async () => {
      categoriesRepo.getCategoryById.mockResolvedValue(null);

      const result = await service.getCategoryById('user-1', 'nonexistent');

      expect(result).toBeNull();
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getCategoryById('', 'cat-1')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for null userId', async () => {
      await expect(
        service.getCategoryById(null as any, 'cat-1'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getCategoriesWithUsage', () => {
    it('should return categories with usage count', async () => {
      const categories = [
        {
          id: 'cat-1',
          name: 'Food',
          userId: 'user-1',
          _count: { transactions: 10 },
        },
        {
          id: 'cat-2',
          name: 'Transport',
          userId: 'user-1',
          _count: { transactions: 5 },
        },
      ];
      categoriesRepo.getCategoriesWithUsage.mockResolvedValue(categories);

      const result = await service.getCategoriesWithUsage('user-1');

      expect(result).toHaveLength(2);
      expect(categoriesRepo.getCategoriesWithUsage).toHaveBeenCalledWith(
        'user-1',
      );
    });

    it('should return empty array when no categories exist', async () => {
      categoriesRepo.getCategoriesWithUsage.mockResolvedValue([]);

      const result = await service.getCategoriesWithUsage('user-1');

      expect(result).toEqual([]);
    });

    it('should throw BadRequestException for empty userId', async () => {
      await expect(service.getCategoriesWithUsage('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for null userId', async () => {
      await expect(service.getCategoriesWithUsage(null as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
