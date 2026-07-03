import {
  createRecurrenceSchema,
  recurrenceSchema,
  updateRecurrenceSchema,
  recurrenceFilterSchema,
  RecurrenceDTO,
} from '../recurrences.schema';

describe('Recurrence schemas', () => {
  describe('createRecurrenceSchema', () => {
    it('should accept valid monthly recurrence', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Rent',
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(true);
    });

    it('should accept valid weekly recurrence', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Gym',
        type: 'EXPENSE',
        amount: 5000,
        frequency: 'WEEKLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(true);
    });

    it('should accept valid yearly recurrence', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Insurance',
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'YEARLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(true);
    });

    it('should accept valid installment recurrence', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Installment Plan',
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'INSTALLMENT',
        totalParts: 12,
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all valid transaction types', () => {
      const types = ['INCOME', 'EXPENSE', 'TRANSFER', 'INVESTMENT', 'RETURN', 'PAYMENT'] as const;
      for (const type of types) {
        const result = createRecurrenceSchema.safeParse({
          name: 'Test',
          type,
          amount: 50000,
          frequency: 'MONTHLY',
          startDate: '2024-01-01',
        });
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid transaction type', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Test',
        type: 'INVALID',
        amount: 50000,
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(false);
    });

    it('should accept all valid frequencies', () => {
      const frequencies = ['MONTHLY', 'WEEKLY', 'YEARLY', 'INSTALLMENT'] as const;
      for (const frequency of frequencies) {
        const result = createRecurrenceSchema.safeParse({
          name: 'Test',
          type: 'EXPENSE',
          amount: 50000,
          frequency,
          startDate: '2024-01-01',
        });
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid frequency', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Test',
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'DAILY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty name', () => {
      const result = createRecurrenceSchema.safeParse({
        name: '',
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing name', () => {
      const result = createRecurrenceSchema.safeParse({
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(false);
    });

    it('should reject name longer than 255 characters', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'A'.repeat(256),
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(false);
    });

    it('should accept name at exactly 255 characters', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'A'.repeat(255),
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(true);
    });

    it('should reject zero amount', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Test',
        type: 'EXPENSE',
        amount: 0,
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(false);
    });

    it('should reject negative amount', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Test',
        type: 'EXPENSE',
        amount: -100,
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(false);
    });

    it('should accept string amount (preprocessed to string)', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Test',
        type: 'EXPENSE',
        amount: '50000',
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(true);
    });

    it('should reject non-numeric string amount', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Test',
        type: 'EXPENSE',
        amount: 'not-a-number',
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(false);
    });

    it('should coerce string startDate to Date', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Test',
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'MONTHLY',
        startDate: '2024-01-15',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.startDate).toBeInstanceOf(Date);
      }
    });

    it('should accept Date object as startDate', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Test',
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'MONTHLY',
        startDate: new Date('2024-01-15'),
      });
      expect(result.success).toBe(true);
    });

    it('should default active to true', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Test',
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.active).toBe(true);
      }
    });

    it('should accept explicit active: false', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Test',
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
        active: false,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.active).toBe(false);
      }
    });

    it('should default totalParts to 1', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Test',
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.totalParts).toBe(1);
      }
    });

    it('should accept optional fields', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Test',
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
        categoryId: 'cat-1',
        sourceAccountId: 'acc-1',
        targetAccountId: 'acc-2',
        isCardExpense: true,
        cardType: 'VISA',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid cardType', () => {
      const result = createRecurrenceSchema.safeParse({
        name: 'Test',
        type: 'EXPENSE',
        amount: 50000,
        frequency: 'MONTHLY',
        startDate: '2024-01-01',
        cardType: 'INVALID',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('updateRecurrenceSchema', () => {
    it('should accept partial update (name only)', () => {
      const result = updateRecurrenceSchema.safeParse({
        name: 'Updated Name',
      });
      expect(result.success).toBe(true);
    });

    it('should accept empty object (all fields optional)', () => {
      const result = updateRecurrenceSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should accept partial update with amount', () => {
      const result = updateRecurrenceSchema.safeParse({
        amount: 60000,
      });
      expect(result.success).toBe(true);
    });

    it('should validate types when fields are provided', () => {
      const result = updateRecurrenceSchema.safeParse({
        type: 'INVALID',
      });
      expect(result.success).toBe(false);
    });

    it('should validate frequency when provided', () => {
      const result = updateRecurrenceSchema.safeParse({
        frequency: 'DAILY',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('recurrenceFilterSchema', () => {
    it('should accept valid filter with frequency', () => {
      const result = recurrenceFilterSchema.safeParse({
        frequency: 'MONTHLY',
      });
      expect(result.success).toBe(true);
    });

    it('should accept valid filter with active', () => {
      const result = recurrenceFilterSchema.safeParse({
        active: true,
      });
      expect(result.success).toBe(true);
    });

    it('should default active to true', () => {
      const result = recurrenceFilterSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.active).toBe(true);
      }
    });

    it('should accept empty object', () => {
      const result = recurrenceFilterSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should reject invalid frequency', () => {
      const result = recurrenceFilterSchema.safeParse({
        frequency: 'DAILY',
      });
      expect(result.success).toBe(false);
    });

    it('should accept all valid frequencies', () => {
      const frequencies = ['MONTHLY', 'WEEKLY', 'YEARLY', 'INSTALLMENT'] as const;
      for (const frequency of frequencies) {
        const result = recurrenceFilterSchema.safeParse({ frequency });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('recurrenceSchema (DTO)', () => {
    const validRecurrence: RecurrenceDTO = {
      id: 'rec-001',
      userId: 'user-001',
      name: 'Rent',
      type: 'EXPENSE',
      amount: '50000.00',
      frequency: 'MONTHLY',
      totalParts: null,
      currentPart: null,
      startDate: new Date('2024-01-01'),
      nextDate: new Date('2024-02-01'),
      endDate: null,
      active: true,
      categoryId: 'cat-1',
      sourceAccountId: 'acc-1',
      targetAccountId: null,
      isCardExpense: null,
      cardType: null,
      metadata: null,
      category: null,
      sourceAccount: null,
      targetAccount: null,
    };

    it('should accept valid recurrence DTO', () => {
      const result = recurrenceSchema.safeParse(validRecurrence);
      expect(result.success).toBe(true);
    });

    it('should accept recurrence with null optional fields', () => {
      const result = recurrenceSchema.safeParse({
        ...validRecurrence,
        totalParts: null,
        currentPart: null,
        nextDate: null,
        endDate: null,
        categoryId: null,
        sourceAccountId: null,
        targetAccountId: null,
        isCardExpense: null,
        cardType: null,
        metadata: null,
      });
      expect(result.success).toBe(true);
    });

    it('should accept recurrence with nested category', () => {
      const result = recurrenceSchema.safeParse({
        ...validRecurrence,
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
      const result = recurrenceSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it('should reject invalid type', () => {
      const result = recurrenceSchema.safeParse({
        ...validRecurrence,
        type: 'INVALID',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid frequency', () => {
      const result = recurrenceSchema.safeParse({
        ...validRecurrence,
        frequency: 'DAILY',
      });
      expect(result.success).toBe(false);
    });
  });
});
