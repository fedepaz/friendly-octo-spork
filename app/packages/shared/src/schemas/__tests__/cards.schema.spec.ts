import {
  cardStatementSchema,
  cardCloseSchema,
  cardCloseResponseSchema,
  CardStatementDTO,
  CardCloseInputDTO,
  CardCloseResponseDTO,
} from '../cards.schema';

describe('Card schemas', () => {
  describe('cardStatementSchema', () => {
    const validStatement: CardStatementDTO = {
      recurrences: [],
      oneTimers: [],
      payments: [],
      summary: {
        totalRecurrences: '50000',
        totalOneTimers: '10000',
        totalPayments: '0',
        balance: '60000',
      },
    };

    it('should accept valid card statement', () => {
      const result = cardStatementSchema.safeParse(validStatement);
      expect(result.success).toBe(true);
    });

    it('should accept statement with empty summary strings', () => {
      const result = cardStatementSchema.safeParse({
        ...validStatement,
        summary: {
          totalRecurrences: '',
          totalOneTimers: '',
          totalPayments: '',
          balance: '',
        },
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing summary', () => {
      const result = cardStatementSchema.safeParse({
        recurrences: [],
        oneTimers: [],
        payments: [],
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing recurrences', () => {
      const result = cardStatementSchema.safeParse({
        oneTimers: [],
        payments: [],
        summary: validStatement.summary,
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing oneTimers', () => {
      const result = cardStatementSchema.safeParse({
        recurrences: [],
        payments: [],
        summary: validStatement.summary,
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing payments', () => {
      const result = cardStatementSchema.safeParse({
        recurrences: [],
        oneTimers: [],
        summary: validStatement.summary,
      });
      expect(result.success).toBe(false);
    });

    it('should reject summary with non-string fields', () => {
      const result = cardStatementSchema.safeParse({
        ...validStatement,
        summary: {
          totalRecurrences: 50000,
          totalOneTimers: 10000,
          totalPayments: 0,
          balance: 60000,
        },
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing summary field', () => {
      const result = cardStatementSchema.safeParse({
        ...validStatement,
        summary: {
          totalRecurrences: '50000',
          totalOneTimers: '10000',
        },
      });
      expect(result.success).toBe(false);
    });
  });

  describe('cardCloseSchema', () => {
    const validClose: CardCloseInputDTO = {
      cardAccountId: 'acc-card-001',
      year: 2024,
      month: 1,
      recurrencesTransactions: [],
    };

    it('should accept valid card close input', () => {
      const result = cardCloseSchema.safeParse(validClose);
      expect(result.success).toBe(true);
    });

    it('should accept card close with non-empty transactions', () => {
      const result = cardCloseSchema.safeParse({
        ...validClose,
        recurrencesTransactions: [
          {
            type: 'EXPENSE',
            amount: '1000',
            date: new Date('2024-01-15'),
            description: 'Test',
          },
        ],
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing cardAccountId', () => {
      const result = cardCloseSchema.safeParse({
        year: 2024,
        month: 1,
        recurrencesTransactions: [],
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing year', () => {
      const result = cardCloseSchema.safeParse({
        cardAccountId: 'acc-card-001',
        month: 1,
        recurrencesTransactions: [],
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing month', () => {
      const result = cardCloseSchema.safeParse({
        cardAccountId: 'acc-card-001',
        year: 2024,
        recurrencesTransactions: [],
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing recurrencesTransactions', () => {
      const result = cardCloseSchema.safeParse({
        cardAccountId: 'acc-card-001',
        year: 2024,
        month: 1,
      });
      expect(result.success).toBe(false);
    });

    it('should reject non-numeric year', () => {
      const result = cardCloseSchema.safeParse({
        ...validClose,
        year: 'not-a-number',
      });
      expect(result.success).toBe(false);
    });

    it('should reject non-numeric month', () => {
      const result = cardCloseSchema.safeParse({
        ...validClose,
        month: 'not-a-number',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('cardCloseResponseSchema', () => {
    const validResponse: CardCloseResponseDTO = {
      success: true,
      accountName: 'Visa Credit',
      closeBalance: '15000',
    };

    it('should accept valid card close response', () => {
      const result = cardCloseResponseSchema.safeParse(validResponse);
      expect(result.success).toBe(true);
    });

    it('should accept response with success false', () => {
      const result = cardCloseResponseSchema.safeParse({
        ...validResponse,
        success: false,
      });
      expect(result.success).toBe(true);
    });

    it('should accept response with optional fields omitted', () => {
      const result = cardCloseResponseSchema.safeParse({
        success: true,
      });
      expect(result.success).toBe(true);
    });

    it('should accept response with only accountName', () => {
      const result = cardCloseResponseSchema.safeParse({
        success: true,
        accountName: 'Visa Credit',
      });
      expect(result.success).toBe(true);
    });

    it('should accept response with only closeBalance', () => {
      const result = cardCloseResponseSchema.safeParse({
        success: true,
        closeBalance: '15000',
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing success field', () => {
      const result = cardCloseResponseSchema.safeParse({
        accountName: 'Visa Credit',
        closeBalance: '15000',
      });
      expect(result.success).toBe(false);
    });

    it('should reject non-boolean success', () => {
      const result = cardCloseResponseSchema.safeParse({
        success: 'yes',
        accountName: 'Visa Credit',
      });
      expect(result.success).toBe(false);
    });
  });
});
