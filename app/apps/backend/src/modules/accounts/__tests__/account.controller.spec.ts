import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from '../account.controller';
import { AccountService } from '../account.service';
import type { AuthUser } from '../../auth/types/auth-user.type';
import type { CreateAccountInput } from '@repo/shared';

describe('AccountController', () => {
  let controller: AccountController;
  let service: {
    getAccounts: jest.Mock;
    getAccountById: jest.Mock;
    saveAccount: jest.Mock;
  };

  const mockUser: AuthUser = { id: 'user-123', name: 'TestUser' };

  beforeEach(async () => {
    service = {
      getAccounts: jest.fn(),
      getAccountById: jest.fn(),
      saveAccount: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [{ provide: AccountService, useValue: service }],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAccounts', () => {
    it('should return accounts for authenticated user', async () => {
      const expected = [
        {
          id: '1',
          name: 'Savings',
          balance: '0',
          type: 'BANK',
          currency: 'ARS',
        },
      ];
      service.getAccounts.mockResolvedValue(expected);

      const result = await controller.getAccounts(mockUser);

      expect(result).toEqual(expected);
      expect(service.getAccounts).toHaveBeenCalledWith('user-123');
    });

    it('should return empty array when user has no accounts', async () => {
      service.getAccounts.mockResolvedValue([]);

      const result = await controller.getAccounts(mockUser);

      expect(result).toEqual([]);
      expect(service.getAccounts).toHaveBeenCalledWith('user-123');
    });
  });

  describe('getAccountById', () => {
    it('should return account by id', async () => {
      const accountId = 'account-456';
      const expected = {
        id: accountId,
        name: 'Savings',
        balance: '0',
        type: 'BANK',
        currency: 'ARS',
      };
      service.getAccountById.mockResolvedValue(expected);

      const result = await controller.getAccountById(mockUser, accountId);

      expect(result).toEqual(expected);
      expect(service.getAccountById).toHaveBeenCalledWith(
        'user-123',
        accountId,
      );
    });

    it('should return null if account not found', async () => {
      service.getAccountById.mockResolvedValue(null);

      const result = await controller.getAccountById(mockUser, 'nonexistent');

      expect(result).toBeNull();
      expect(service.getAccountById).toHaveBeenCalledWith(
        'user-123',
        'nonexistent',
      );
    });
  });

  describe('saveAccount', () => {
    it('should create account successfully', async () => {
      const createDto: CreateAccountInput = {
        name: 'Savings',
        type: 'BANK',
        currency: 'ARS',
        balance: '0',
      };
      const expected = { id: '1', userId: 'user-123', ...createDto };
      service.saveAccount.mockResolvedValue(expected);

      const result = await controller.saveAccount(mockUser, createDto);

      expect(result).toEqual(expected);
      expect(service.saveAccount).toHaveBeenCalledWith('user-123', createDto);
    });

    it('should pass account data through to service', async () => {
      const createDto: CreateAccountInput = {
        name: 'Checking',
        type: 'WALLET',
        currency: 'USD',
        balance: '100.50',
      };
      const expected = { id: '2', userId: 'user-123', ...createDto };
      service.saveAccount.mockResolvedValue(expected);

      await controller.saveAccount(mockUser, createDto);

      expect(service.saveAccount).toHaveBeenCalledTimes(1);
      expect(service.saveAccount).toHaveBeenCalledWith('user-123', createDto);
    });
  });
});
