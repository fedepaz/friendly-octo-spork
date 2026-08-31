import { investmentsService } from '../api/investmentsService';

jest.mock('@/lib/api/client-fetch', () => ({
  clientFetch: jest.fn(),
}));

import { clientFetch } from '@/lib/api/client-fetch';

const mockClientFetch = clientFetch as jest.MockedFunction<typeof clientFetch>;

describe('investmentsService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAll', () => {
    it('should call clientFetch with correct URL and method', async () => {
      mockClientFetch.mockResolvedValue([]);

      await investmentsService.fetchAll();

      expect(mockClientFetch).toHaveBeenCalledWith('investments', {
        method: 'GET',
      });
    });

    it('should return InvestmentDTO[]', async () => {
      const mockData = [
        {
          id: 'inv-1',
          name: 'FCI',
          currency: 'ARS',
          principal: '10000.00',
          totalEarned: '1000.00',
          totalValue: '11000.00',
          transactionCount: 2,
        },
      ];
      mockClientFetch.mockResolvedValue(mockData);

      const result = await investmentsService.fetchAll();

      expect(result).toEqual(mockData);
      expect(result[0].id).toBe('inv-1');
      expect(result[0].totalValue).toBe('11000.00');
    });
  });
});
