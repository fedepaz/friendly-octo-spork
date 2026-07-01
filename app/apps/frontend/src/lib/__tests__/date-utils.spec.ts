import {
  getISOWeek,
  getTotalWeeks,
  formatSpanishDate,
  formatShortDate,
  getLocalDateStr,
  getCurrentMonth,
  getCurrentYear,
  getCurrentMonthYear,
} from '../date-utils';

describe('Frontend date utilities', () => {
  describe('getISOWeek', () => {
    it('should return week 1 for Jan 1, 2024 (Monday)', () => {
      const date = new Date(2024, 0, 1); // Jan 1, 2024
      expect(getISOWeek(date)).toBe(1);
    });

    it('should return correct week for a mid-year date', () => {
      // July 1, 2024 is in week 27
      const date = new Date(2024, 6, 1);
      const week = getISOWeek(date);
      expect(week).toBe(27);
    });

    it('should return week 1 for Dec 31, 2024 (falls into next year week 1)', () => {
      // Dec 31, 2024 is a Tuesday; per this implementation it falls into week 1 of 2025
      const date = new Date(2024, 11, 31);
      expect(getISOWeek(date)).toBe(1);
    });

    it('should return week 1 for Jan 1, 2018 (Monday)', () => {
      const date = new Date(2018, 0, 1);
      expect(getISOWeek(date)).toBe(1);
    });

    it('should return week 1 for Jan 7, 2024 (Sunday)', () => {
      // Jan 7, 2024 is a Sunday
      const date = new Date(2024, 0, 7);
      expect(getISOWeek(date)).toBe(1);
    });

    it('should return consistent results for sequential days', () => {
      // Jan 1, 2024 (Mon) → week 1, Jan 2 (Tue) → week 1, Jan 8 (Mon) → week 2
      expect(getISOWeek(new Date(2024, 0, 1))).toBe(1);
      expect(getISOWeek(new Date(2024, 0, 2))).toBe(1);
      expect(getISOWeek(new Date(2024, 0, 8))).toBe(2);
    });
  });

  describe('getTotalWeeks', () => {
    it('should return 52 for 2024', () => {
      expect(getTotalWeeks(2024)).toBe(52);
    });

    it('should return 52 or 53 for various years', () => {
      const weeks2023 = getTotalWeeks(2023);
      expect(weeks2023).toBeGreaterThanOrEqual(52);
      expect(weeks2023).toBeLessThanOrEqual(53);

      const weeks2025 = getTotalWeeks(2025);
      expect(weeks2025).toBeGreaterThanOrEqual(52);
      expect(weeks2025).toBeLessThanOrEqual(53);
    });

    it('should return 53 for 2020 (leap year ending on Thursday)', () => {
      expect(getTotalWeeks(2020)).toBe(53);
    });

    it('should return 53 for 2025', () => {
      expect(getTotalWeeks(2025)).toBe(53);
    });
  });

  describe('formatSpanishDate', () => {
    it('should format date in es-AR locale by default', () => {
      const date = new Date(2024, 0, 15); // Jan 15, 2024
      const result = formatSpanishDate(date);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should include the year in the result', () => {
      const date = new Date(2024, 0, 15);
      const result = formatSpanishDate(date);
      expect(result).toContain('2024');
    });

    it('should include the day in the result', () => {
      const date = new Date(2024, 0, 15);
      const result = formatSpanishDate(date);
      expect(result).toContain('15');
    });

    it('should use es-AR locale for month names', () => {
      const date = new Date(2024, 0, 15);
      const result = formatSpanishDate(date);
      // January in Spanish is "enero"
      expect(result.toLowerCase()).toContain('enero');
    });

    it('should accept a custom locale', () => {
      const date = new Date(2024, 0, 15);
      const result = formatSpanishDate(date, 'en-US');
      expect(result).toContain('January');
    });

    it('should format a different month correctly', () => {
      const date = new Date(2024, 5, 15); // June 15, 2024
      const result = formatSpanishDate(date);
      expect(result.toLowerCase()).toContain('junio');
    });
  });

  describe('formatShortDate', () => {
    it('should format a Date object as DD/MM/YY', () => {
      const date = new Date(2024, 0, 15); // Jan 15, 2024
      const result = formatShortDate(date);
      expect(result).toBe('15/01/24');
    });

    it('should format a YYYY-MM-DD string as DD/MM/YY', () => {
      const result = formatShortDate('2024-03-20');
      expect(result).toBe('20/03/24');
    });

    it('should return "-" for null input', () => {
      expect(formatShortDate(null)).toBe('-');
    });

    it('should return "-" for undefined input', () => {
      expect(formatShortDate(undefined)).toBe('-');
    });

    it('should return "-" for empty string', () => {
      expect(formatShortDate('')).toBe('-');
    });

    it('should return "-" for invalid date strings', () => {
      expect(formatShortDate('not-a-date')).toBe('-');
    });

    it('should handle end of year dates', () => {
      const date = new Date(2024, 11, 31); // Dec 31, 2024
      const result = formatShortDate(date);
      expect(result).toBe('31/12/24');
    });

    it('should pad single-digit days and months', () => {
      const date = new Date(2024, 0, 5); // Jan 5, 2024
      const result = formatShortDate(date);
      expect(result).toBe('05/01/24');
    });

    it('should handle ISO date string with different months', () => {
      const result = formatShortDate('2024-12-01');
      expect(result).toBe('01/12/24');
    });

    it('should handle non-YYYY-MM-DD date strings via Date constructor', () => {
      const result = formatShortDate('March 10, 2024');
      expect(result).toBe('10/03/24');
    });
  });

  describe('getLocalDateStr', () => {
    it('should format date as YYYY-MM-DD', () => {
      const date = new Date(2024, 0, 15); // Jan 15, 2024
      const result = getLocalDateStr(date);
      expect(result).toBe('2024-01-15');
    });

    it('should pad single-digit months and days', () => {
      const date = new Date(2024, 2, 5); // Mar 5, 2024
      const result = getLocalDateStr(date);
      expect(result).toBe('2024-03-05');
    });

    it('should handle end of year', () => {
      const date = new Date(2024, 11, 31);
      const result = getLocalDateStr(date);
      expect(result).toBe('2024-12-31');
    });

    it('should handle Jan 1', () => {
      const date = new Date(2025, 0, 1);
      const result = getLocalDateStr(date);
      expect(result).toBe('2025-01-01');
    });
  });

  describe('getCurrentMonth', () => {
    it('should return a value between 1 and 12', () => {
      const month = getCurrentMonth();
      expect(month).toBeGreaterThanOrEqual(1);
      expect(month).toBeLessThanOrEqual(12);
    });

    it('should return the current month (1-indexed)', () => {
      const month = getCurrentMonth();
      const now = new Date();
      expect(month).toBe(now.getMonth() + 1);
    });
  });

  describe('getCurrentYear', () => {
    it('should return the current year', () => {
      const year = getCurrentYear();
      const now = new Date();
      expect(year).toBe(now.getFullYear());
    });

    it('should return a 4-digit year', () => {
      const year = getCurrentYear();
      expect(year).toBeGreaterThanOrEqual(2000);
      expect(year).toBeLessThanOrEqual(2100);
    });
  });

  describe('getCurrentMonthYear', () => {
    it('should return an object with month and year', () => {
      const result = getCurrentMonthYear();
      expect(result).toHaveProperty('month');
      expect(result).toHaveProperty('year');
    });

    it('should return 1-indexed month', () => {
      const { month } = getCurrentMonthYear();
      expect(month).toBeGreaterThanOrEqual(1);
      expect(month).toBeLessThanOrEqual(12);
      const now = new Date();
      expect(month).toBe(now.getMonth() + 1);
    });

    it('should return current year', () => {
      const { year } = getCurrentMonthYear();
      expect(year).toBe(new Date().getFullYear());
    });

    it('should be consistent with getCurrentMonth and getCurrentYear', () => {
      const { month, year } = getCurrentMonthYear();
      expect(month).toBe(getCurrentMonth());
      expect(year).toBe(getCurrentYear());
    });
  });
});
