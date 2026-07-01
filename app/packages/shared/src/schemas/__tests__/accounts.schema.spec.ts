import {
  CreateAccountInput,
  createAccountSchema,
  accountSchema,
  AccountDTO,
} from '../accounts.schema';

describe('Account schemas', () => {
  describe('createAccountSchema', () => {
    const validInput: CreateAccountInput = {
      name: 'Savings Account',
      type: 'BANK',
      currency: 'ARS',
      balance: '0',
    };

    it('should accept valid input', () => {
      const result = createAccountSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should accept valid input with non-zero balance', () => {
      const result = createAccountSchema.safeParse({
        ...validInput,
        balance: '1500.50',
      });
      expect(result.success).toBe(true);
    });

    it('should default balance to "0" when omitted at runtime', () => {
      // At runtime, preprocess handles undefined balance by converting to "0"
      // We bypass the TS type to test the runtime behavior
      const result = createAccountSchema.safeParse({
        name: 'Test Account',
        type: 'BANK',
        currency: 'ARS',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.balance).toBe('0');
      }
    });

    it('should default balance to "0" when empty string', () => {
      const result = createAccountSchema.safeParse({
        ...validInput,
        balance: '',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.balance).toBe('0');
      }
    });

    it('should coerce numeric balance to string', () => {
      const result = createAccountSchema.safeParse({
        ...validInput,
        balance: 100,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.balance).toBe('100');
      }
    });

    it('should reject empty name', () => {
      const result = createAccountSchema.safeParse({
        ...validInput,
        name: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject name longer than 50 chars', () => {
      const result = createAccountSchema.safeParse({
        ...validInput,
        name: 'A'.repeat(51),
      });
      expect(result.success).toBe(false);
    });

    it('should accept name at exactly 50 chars', () => {
      const result = createAccountSchema.safeParse({
        ...validInput,
        name: 'A'.repeat(50),
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid account type', () => {
      const result = createAccountSchema.safeParse({
        ...validInput,
        type: 'INVALID',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid currency', () => {
      const result = createAccountSchema.safeParse({
        ...validInput,
        currency: 'EUR',
      });
      expect(result.success).toBe(false);
    });

    it('should reject non-numeric balance string', () => {
      const result = createAccountSchema.safeParse({
        ...validInput,
        balance: 'not-a-number',
      });
      expect(result.success).toBe(false);
    });

    it('should accept all valid account types', () => {
      const types = ['BANK', 'WALLET', 'CASH', 'CARD', 'INVESTMENT'] as const;
      for (const type of types) {
        const result = createAccountSchema.safeParse({
          ...validInput,
          type,
        });
        expect(result.success).toBe(true);
      }
    });

    it('should accept all valid currencies', () => {
      const currencies = ['ARS', 'USD', 'USDT'] as const;
      for (const currency of currencies) {
        const result = createAccountSchema.safeParse({
          ...validInput,
          currency,
        });
        expect(result.success).toBe(true);
      }
    });

    it('should reject missing name', () => {
      const result = createAccountSchema.safeParse({
        type: 'BANK',
        currency: 'ARS',
        balance: '0',
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing type', () => {
      const result = createAccountSchema.safeParse({
        name: 'Test',
        currency: 'ARS',
        balance: '0',
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing currency', () => {
      const result = createAccountSchema.safeParse({
        name: 'Test',
        type: 'BANK',
        balance: '0',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('accountSchema', () => {
    const validAccount: AccountDTO = {
      id: 'abc-123',
      userId: 'user-456',
      name: 'My Account',
      type: 'BANK',
      currency: 'ARS',
      balance: '1000.00',
    };

    it('should accept valid account DTO', () => {
      const result = accountSchema.safeParse(validAccount);
      expect(result.success).toBe(true);
    });

    it('should accept account with optional transaction arrays', () => {
      const result = accountSchema.safeParse({
        ...validAccount,
        transactionsFrom: [],
        transactionsTo: [],
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing required fields', () => {
      const result = accountSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });
});
