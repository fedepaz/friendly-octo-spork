import { calculateNextDate } from '../date-utils';

describe('Date utilities', () => {
  describe('calculateNextDate', () => {
    // --- MONTHLY ---
    describe('MONTHLY frequency', () => {
      it('should advance by one month from a future date', () => {
        // Use local date constructor to avoid timezone issues
        const date = new Date(2027, 2, 15); // March 15, 2027 local
        const result = calculateNextDate(date, 'MONTHLY');
        expect(result).toBeInstanceOf(Date);
        expect(result.getFullYear()).toBe(2027);
        expect(result.getMonth()).toBe(3); // April (0-indexed)
        expect(result.getDate()).toBe(15);
      });

      it('should advance past the current date when input is in the past', () => {
        const past = new Date(2020, 0, 15); // Jan 15, 2020 local
        const result = calculateNextDate(past, 'MONTHLY');
        expect(result.getTime()).toBeGreaterThan(Date.now());
        expect(result.getDate()).toBe(15);
      });
    });

    // --- WEEKLY ---
    describe('WEEKLY frequency', () => {
      it('should advance by 7 days from a future date', () => {
        const date = new Date(2027, 5, 1); // June 1, 2027 local
        const result = calculateNextDate(date, 'WEEKLY');
        expect(result).toBeInstanceOf(Date);
        expect(result.getFullYear()).toBe(2027);
        expect(result.getMonth()).toBe(5); // June
        expect(result.getDate()).toBe(8);
      });

      it('should advance past the current date when input is in the past', () => {
        const past = new Date(2020, 0, 1); // Jan 1, 2020 local
        const result = calculateNextDate(past, 'WEEKLY');
        expect(result.getTime()).toBeGreaterThan(Date.now());
      });
    });

    // --- YEARLY ---
    describe('YEARLY frequency', () => {
      it('should advance by one year from a future date', () => {
        const date = new Date(2027, 8, 10); // Sept 10, 2027 local
        const result = calculateNextDate(date, 'YEARLY');
        expect(result).toBeInstanceOf(Date);
        expect(result.getFullYear()).toBe(2028);
        expect(result.getMonth()).toBe(8); // September
        expect(result.getDate()).toBe(10);
      });

      it('should advance past the current date when input is in the past', () => {
        const past = new Date(2015, 5, 15); // June 15, 2015 local
        const result = calculateNextDate(past, 'YEARLY');
        expect(result.getTime()).toBeGreaterThan(Date.now());
      });
    });

    // --- INSTALLMENT ---
    describe('INSTALLMENT frequency', () => {
      it('should advance by one month (same as MONTHLY)', () => {
        const date = new Date(2027, 3, 20); // April 20, 2027 local
        const result = calculateNextDate(date, 'INSTALLMENT');
        expect(result).toBeInstanceOf(Date);
        expect(result.getFullYear()).toBe(2027);
        expect(result.getMonth()).toBe(4); // May
        expect(result.getDate()).toBe(20);
      });

      it('should advance past the current date when input is in the past', () => {
        const past = new Date(2019, 11, 1); // Dec 1, 2019 local
        const result = calculateNextDate(past, 'INSTALLMENT');
        expect(result.getTime()).toBeGreaterThan(Date.now());
      });
    });

    // --- Default / unknown frequency ---
    describe('default case (unknown frequency)', () => {
      it('should advance by one month for an unrecognized frequency', () => {
        const date = new Date(2027, 4, 10); // May 10, 2027 local
        // @ts-expect-error -- testing default branch with invalid frequency
        const result = calculateNextDate(date, 'DAILY');
        expect(result).toBeInstanceOf(Date);
        expect(result.getMonth()).toBe(5); // June
        expect(result.getDate()).toBe(10);
      });
    });

    // --- Edge cases ---
    describe('edge cases', () => {
      it('should handle end-of-month dates for MONTHLY', () => {
        const jan31 = new Date(2027, 0, 31); // Jan 31, 2027 local
        const result = calculateNextDate(jan31, 'MONTHLY');
        // Feb has fewer days; JS will roll over (Feb 31 => March 3)
        expect(result).toBeInstanceOf(Date);
        expect(result.getTime()).toBeGreaterThan(jan31.getTime());
      });

      it('should normalize hours to 12:00:00.000', () => {
        // Use local constructor: July 1, 2027 at 8:00 local
        const date = new Date(2027, 6, 1, 8, 0, 0, 0);
        const result = calculateNextDate(date, 'MONTHLY');
        expect(result.getHours()).toBe(12);
        expect(result.getMinutes()).toBe(0);
        expect(result.getSeconds()).toBe(0);
        expect(result.getMilliseconds()).toBe(0);
      });

      it('should handle WEEKLY crossing a month boundary', () => {
        const date = new Date(2027, 5, 28); // June 28, 2027 local
        const result = calculateNextDate(date, 'WEEKLY');
        // Should land in July
        expect(result.getMonth()).toBe(6); // July
        expect(result.getDate()).toBe(5);
      });

      it('should handle YEARLY across a non-leap year', () => {
        const date = new Date(2027, 1, 28); // Feb 28, 2027 local
        const result = calculateNextDate(date, 'YEARLY');
        expect(result.getFullYear()).toBe(2028);
        expect(result.getMonth()).toBe(1); // February
        expect(result.getDate()).toBe(28);
      });
    });
  });
});
