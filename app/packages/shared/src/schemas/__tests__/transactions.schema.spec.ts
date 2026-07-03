import {
  createTransactionSchema,
  transactionSchema,
  CreateTransactionInput,
  TransactionDTO,
} from '../transactions.schema';

describe('Transaction schemas', () => {
  describe('createTransactionSchema', () => {
    describe('basic field validation', () => {
      it('should accept valid expense transaction', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 500,
          date: '2024-01-15',
          description: 'Groceries',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(true);
      });

      it('should accept valid income transaction', () => {
        const result = createTransactionSchema.safeParse({
          type: 'INCOME',
          amount: 50000,
          date: '2024-01-15',
          description: 'Salary',
          targetAccountId: 'acc-1',
        });
        expect(result.success).toBe(true);
      });

      it('should accept valid transfer transaction', () => {
        const result = createTransactionSchema.safeParse({
          type: 'TRANSFER',
          amount: 10000,
          date: '2024-01-15',
          description: 'Transfer to savings',
          sourceAccountId: 'acc-1',
          targetAccountId: 'acc-2',
        });
        expect(result.success).toBe(true);
      });

      it('should accept valid investment transaction', () => {
        const result = createTransactionSchema.safeParse({
          type: 'INVESTMENT',
          amount: 20000,
          date: '2024-01-15',
          description: 'Stock purchase',
          sourceAccountId: 'acc-1',
          targetAccountId: 'acc-2',
        });
        expect(result.success).toBe(true);
      });

      it('should accept valid return transaction', () => {
        const result = createTransactionSchema.safeParse({
          type: 'RETURN',
          amount: 5000,
          date: '2024-01-15',
          description: 'Refund',
          sourceAccountId: 'acc-1',
          targetAccountId: 'acc-2',
        });
        expect(result.success).toBe(true);
      });

      it('should accept valid payment transaction', () => {
        const result = createTransactionSchema.safeParse({
          type: 'PAYMENT',
          amount: 15000,
          date: '2024-01-15',
          description: 'Credit card payment',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(true);
      });

      it('should reject invalid transaction type', () => {
        const result = createTransactionSchema.safeParse({
          type: 'INVALID',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
        });
        expect(result.success).toBe(false);
      });

      it('should reject missing transaction type', () => {
        const result = createTransactionSchema.safeParse({
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
        });
        expect(result.success).toBe(false);
      });

      it('should reject zero amount', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 0,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(false);
      });

      it('should reject negative amount', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: -100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(false);
      });

      it('should accept numeric amount (preprocessed to string)', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 500,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(true);
        if (result.success) {
          expect(typeof result.data.amount).toBe('string');
        }
      });

      it('should accept string amount', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: '500',
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(true);
      });

      it('should reject non-numeric string amount', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 'not-a-number',
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(false);
      });

      it('should reject missing description', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(false);
      });

      it('should reject empty description', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: '',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(false);
      });

      it('should reject description longer than 255 characters', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'A'.repeat(256),
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(false);
      });

      it('should accept description at exactly 255 characters', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'A'.repeat(255),
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(true);
      });

      it('should coerce date string to Date', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.date).toBeInstanceOf(Date);
        }
      });

      it('should accept Date object', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: new Date('2024-01-15'),
          description: 'Test',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(true);
      });
    });

    describe('type-dependent account validation', () => {
      it('should reject EXPENSE without sourceAccountId', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
        });
        expect(result.success).toBe(false);
      });

      it('should reject INCOME without targetAccountId', () => {
        const result = createTransactionSchema.safeParse({
          type: 'INCOME',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
        });
        expect(result.success).toBe(false);
      });

      it('should reject TRANSFER without both accounts', () => {
        const result = createTransactionSchema.safeParse({
          type: 'TRANSFER',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(false);
      });

      it('should reject INVESTMENT without both accounts', () => {
        const result = createTransactionSchema.safeParse({
          type: 'INVESTMENT',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(false);
      });

      it('should reject RETURN without both accounts', () => {
        const result = createTransactionSchema.safeParse({
          type: 'RETURN',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(false);
      });

      it('should reject PAYMENT without sourceAccountId', () => {
        const result = createTransactionSchema.safeParse({
          type: 'PAYMENT',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
        });
        expect(result.success).toBe(false);
      });
    });

    describe('optional fields', () => {
      it('should accept transaction with categoryId', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          categoryId: 'cat-1',
        });
        expect(result.success).toBe(true);
      });

      it('should accept transaction with source and metadata', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          source: 'manual',
          metadata: { note: 'test' },
        });
        expect(result.success).toBe(true);
      });

      it('should accept empty string categoryId (preprocessed to null)', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          categoryId: '',
        });
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.categoryId).toBeNull();
        }
      });
    });

    describe('boolean field defaults and preprocessing', () => {
      it('should default isBudgetedExpense to false', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
        });
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.isBudgetedExpense).toBe(false);
        }
      });

      it('should preprocess "on" string to true for isBudgetedExpense', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isBudgetedExpense: 'on',
          budgetCategory: 'FOOD_GROCERIES',
        });
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.isBudgetedExpense).toBe(true);
        }
      });

      it('should preprocess true boolean for isRecurrence', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isRecurrence: true,
          recurrenceName: 'Monthly Rent',
          frequency: 'MONTHLY',
        });
        expect(result.success).toBe(true);
      });

      it('should preprocess "on" string to true for isCardExpense', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isCardExpense: 'on',
          cardType: 'VISA',
        });
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.isCardExpense).toBe(true);
        }
      });
    });

    describe('card expense cross-field validation', () => {
      it('should reject isCardExpense without cardType', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isCardExpense: true,
        });
        expect(result.success).toBe(false);
      });

      it('should accept isCardExpense with valid cardType', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isCardExpense: true,
          cardType: 'VISA',
        });
        expect(result.success).toBe(true);
      });

      it('should reject invalid cardType', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isCardExpense: true,
          cardType: 'INVALID',
        });
        expect(result.success).toBe(false);
      });

      it('should accept all valid card types', () => {
        const cardTypes = ['VISA', 'MASTERCARD', 'AMEX', 'MAESTRO'] as const;
        for (const cardType of cardTypes) {
          const result = createTransactionSchema.safeParse({
            type: 'EXPENSE',
            amount: 100,
            date: '2024-01-15',
            description: 'Test',
            sourceAccountId: 'acc-1',
            isCardExpense: true,
            cardType,
          });
          expect(result.success).toBe(true);
        }
      });
    });

    describe('recurrence cross-field validation', () => {
      it('should require recurrenceName when isRecurrence is true', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isRecurrence: true,
          frequency: 'MONTHLY',
        });
        expect(result.success).toBe(false);
      });

      it('should require frequency when isRecurrence is true', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isRecurrence: true,
          recurrenceName: 'Rent',
        });
        expect(result.success).toBe(false);
      });

      it('should require totalParts when frequency is INSTALLMENT', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isRecurrence: true,
          recurrenceName: 'Installment Plan',
          frequency: 'INSTALLMENT',
        });
        expect(result.success).toBe(false);
      });

      it('should accept INSTALLMENT with totalParts', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isRecurrence: true,
          recurrenceName: 'Installment Plan',
          frequency: 'INSTALLMENT',
          totalParts: 12,
        });
        expect(result.success).toBe(true);
      });

      it('should accept valid MONTHLY recurrence', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isRecurrence: true,
          recurrenceName: 'Rent',
          frequency: 'MONTHLY',
        });
        expect(result.success).toBe(true);
      });

      it('should accept valid WEEKLY recurrence', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isRecurrence: true,
          recurrenceName: 'Gym',
          frequency: 'WEEKLY',
        });
        expect(result.success).toBe(true);
      });

      it('should accept valid YEARLY recurrence', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isRecurrence: true,
          recurrenceName: 'Insurance',
          frequency: 'YEARLY',
        });
        expect(result.success).toBe(true);
      });
    });

    describe('budgeted expense cross-field validation', () => {
      it('should require budgetCategory when isBudgetedExpense is true', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isBudgetedExpense: true,
        });
        expect(result.success).toBe(false);
      });

      it('should reject budgeted expense on non-EXPENSE type', () => {
        const result = createTransactionSchema.safeParse({
          type: 'INCOME',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          targetAccountId: 'acc-1',
          isBudgetedExpense: true,
          budgetCategory: 'FOOD_GROCERIES',
        });
        expect(result.success).toBe(false);
      });

      it('should accept valid budgeted expense', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isBudgetedExpense: true,
          budgetCategory: 'FOOD_GROCERIES',
        });
        expect(result.success).toBe(true);
      });

      it('should accept all valid budget categories', () => {
        const categories = [
          'DAILY_EXPENSES',
          'FOOD_GROCERIES',
          'ENTERTAINMENT',
          'TRANSPORTATION',
          'HEALTH',
          'UTILITIES',
        ] as const;
        for (const budgetCategory of categories) {
          const result = createTransactionSchema.safeParse({
            type: 'EXPENSE',
            amount: 100,
            date: '2024-01-15',
            description: 'Test',
            sourceAccountId: 'acc-1',
            isBudgetedExpense: true,
            budgetCategory,
          });
          expect(result.success).toBe(true);
        }
      });

      it('should reject invalid budget category', () => {
        const result = createTransactionSchema.safeParse({
          type: 'EXPENSE',
          amount: 100,
          date: '2024-01-15',
          description: 'Test',
          sourceAccountId: 'acc-1',
          isBudgetedExpense: true,
          budgetCategory: 'INVALID_CATEGORY',
        });
        expect(result.success).toBe(false);
      });
    });
  });

  describe('transactionSchema (DTO)', () => {
    const validTransaction: TransactionDTO = {
      id: 'txn-001',
      userId: 'user-001',
      type: 'EXPENSE',
      amount: '500.00',
      date: new Date('2024-01-15'),
      description: 'Groceries',
      categoryId: 'cat-1',
      sourceAccountId: 'acc-1',
      targetAccountId: null,
      recurrenceId: null,
      recurrenceName: null,
      recurrencePartNumber: null,
      isBudgetedExpense: false,
      budgetCategory: null,
      isCardExpense: false,
      cardType: null,
      source: null,
      metadata: null,
      createdAt: new Date('2024-01-15T10:00:00Z'),
      updatedAt: new Date('2024-01-15T10:00:00Z'),
      category: null,
      sourceAccount: null,
      targetAccount: null,
      recurrence: null,
    };

    it('should accept valid transaction DTO', () => {
      const result = transactionSchema.safeParse(validTransaction);
      expect(result.success).toBe(true);
    });

    it('should accept transaction with nested category', () => {
      const result = transactionSchema.safeParse({
        ...validTransaction,
        category: {
          id: 'cat-1',
          userId: 'user-001',
          name: 'Food',
          color: '#FF0000',
        },
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing required fields', () => {
      const result = transactionSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it('should reject invalid type in DTO', () => {
      const result = transactionSchema.safeParse({
        ...validTransaction,
        type: 'INVALID',
      });
      expect(result.success).toBe(false);
    });
  });
});
