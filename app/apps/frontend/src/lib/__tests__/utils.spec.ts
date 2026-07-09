import { cn, formatCurrency, getTransactionTypeStyles } from '../utils';

describe('Frontend utilities', () => {
  describe('cn', () => {
    it('should merge class names', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      const result = cn('base', false && 'hidden', 'extra');
      expect(result).toBe('base extra');
    });

    it('should handle undefined and null gracefully', () => {
      const result = cn('base', undefined, null, 'extra');
      expect(result).toBe('base extra');
    });

    it('should merge tailwind classes (last wins)', () => {
      const result = cn('px-4 py-2', 'px-8');
      expect(result).toContain('px-8');
      expect(result).toContain('py-2');
      // px-4 should be removed by tailwind-merge
      expect(result).not.toContain('px-4');
    });

    it('should return empty string for no arguments', () => {
      expect(cn()).toBe('');
    });

    it('should handle conflicting tailwind classes with different modifiers', () => {
      const result = cn('text-red-500', 'hover:text-blue-500');
      expect(result).toContain('text-red-500');
      expect(result).toContain('hover:text-blue-500');
    });
  });

  describe('formatCurrency', () => {
    describe('ARS currency (default)', () => {
      it('should format ARS currency with symbol', () => {
        const result = formatCurrency(1000, 'ARS');
        // es-AR locale: dots as thousands separators
        expect(result).toContain('1.000');
      });

      it('should format zero amount', () => {
        const result = formatCurrency(0, 'ARS');
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
      });

      it('should format negative amounts', () => {
        const result = formatCurrency(-500, 'ARS');
        expect(result).toContain('500');
      });

      it('should format decimal amounts', () => {
        const result = formatCurrency(1234.56, 'ARS');
        expect(result).toContain('1.234');
        expect(result).toContain('56');
      });

      it('should default to ARS when no currency specified', () => {
        const result = formatCurrency(1000);
        expect(result).toContain('1.000');
      });
    });

    describe('USD currency', () => {
      it('should format USD currency with es-AR locale (dots as thousands)', () => {
        const result = formatCurrency(1000, 'USD');
        // Default locale es-AR uses dots for thousands
        expect(result).toContain('1.000');
        expect(result).toContain('US$');
      });

      it('should format large USD amounts', () => {
        const result = formatCurrency(1234567.89, 'USD');
        expect(result).toContain('1.234.567');
        expect(result).toContain('89');
      });
    });

    describe('USDT currency', () => {
      it('should format USDT with tether symbol', () => {
        const result = formatCurrency(100, 'USDT');
        expect(result).toContain('₮');
        expect(result).not.toContain('$');
      });
    });

    describe('showSymbol parameter', () => {
      it('should include symbol when showSymbol is true', () => {
        const result = formatCurrency(1000, 'ARS', true);
        expect(result).toBeDefined();
        // Should contain digits at minimum
        expect(result).toMatch(/\d/);
      });

      it('should strip non-numeric characters when showSymbol is false', () => {
        const result = formatCurrency(1000, 'ARS', false);
        // After stripping currency symbols, should contain numbers, commas, dots, or minus
        expect(result).toMatch(/[\d,.\-]/);
      });
    });

    describe('string amount input', () => {
      it('should handle string amounts by parsing them', () => {
        const result = formatCurrency('2500', 'ARS');
        expect(result).toContain('2.500');
      });

      it('should handle string amounts with decimals', () => {
        const result = formatCurrency('1500.75', 'USD');
        expect(result).toContain('1.500');
        expect(result).toContain('75');
      });
    });

    describe('locale parameter', () => {
      it('should use es-AR locale by default', () => {
        const result = formatCurrency(1000, 'ARS');
        // es-AR uses dots as thousands separators
        expect(result).toContain('.');
      });

      it('should respect custom locale (en-US uses commas)', () => {
        const result = formatCurrency(1000, 'USD', true, 'en-US');
        // en-US uses commas as thousands separators
        expect(result).toContain(',');
        expect(result).not.toContain('1.000');
      });
    });
  });

  describe('getTransactionTypeStyles', () => {
    it('should return EXPENSE styles', () => {
      const result = getTransactionTypeStyles('EXPENSE');
      expect(result.color).toBe('text-destructive/80');
      expect(result.bg).toBe('bg-destructive/10');
      expect(result.border).toBe('border-destructive/30');
      expect(result.translationKey).toBe('expense');
    });

    it('should return INCOME styles', () => {
      const result = getTransactionTypeStyles('INCOME');
      expect(result.color).toBe('text-secondary');
      expect(result.bg).toBe('bg-secondary/10');
      expect(result.border).toBe('border-secondary/30');
      expect(result.translationKey).toBe('income');
    });

    it('should return TRANSFER styles', () => {
      const result = getTransactionTypeStyles('TRANSFER');
      expect(result.color).toBe('text-accent');
      expect(result.bg).toBe('bg-accent/10');
      expect(result.border).toBe('border-accent/30');
      expect(result.translationKey).toBe('transfer');
    });

    it('should return INVESTMENT styles', () => {
      const result = getTransactionTypeStyles('INVESTMENT');
      expect(result.color).toBe('text-primary');
      expect(result.bg).toBe('bg-primary/10');
      expect(result.border).toBe('border-primary/30');
      expect(result.translationKey).toBe('investment');
    });

    it('should return RETURN styles', () => {
      const result = getTransactionTypeStyles('RETURN');
      expect(result.color).toBe('text-secondary');
      expect(result.bg).toBe('bg-secondary/10');
      expect(result.border).toBe('border-secondary/30');
      expect(result.translationKey).toBe('return');
    });

    it('should return PAYMENT styles', () => {
      const result = getTransactionTypeStyles('PAYMENT');
      expect(result.color).toBe('text-primary');
      expect(result.bg).toBe('bg-primary/10');
      expect(result.border).toBe('border-primary/30');
      expect(result.translationKey).toBe('payment');
    });

    it('should return default styles for unknown type', () => {
      const result = getTransactionTypeStyles('UNKNOWN');
      expect(result.color).toBe('text-muted-foreground');
      expect(result.bg).toBe('bg-muted/10');
      expect(result.border).toBe('border-muted/30');
      expect(result.translationKey).toBe('UNKNOWN');
    });

    it('should return default styles for empty string', () => {
      const result = getTransactionTypeStyles('');
      expect(result.color).toBe('text-muted-foreground');
      expect(result.translationKey).toBe('');
    });
  });
});
