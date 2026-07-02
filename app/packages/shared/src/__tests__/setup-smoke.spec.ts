import { accountSchema } from "../schemas/accounts.schema";
import { RecurrenceTypeSchema } from "../enums";
import { calculateNextDate } from "../utils/date-utils";

describe("shared package infrastructure", () => {
  it("ts-jest transforms TypeScript correctly", () => {
    expect(true).toBe(true);
  });

  it("can import shared schemas", () => {
    expect(accountSchema).toBeDefined();
  });

  it("can import shared enum schemas", () => {
    expect(RecurrenceTypeSchema).toBeDefined();
    expect(RecurrenceTypeSchema.parse("MONTHLY")).toBe("MONTHLY");
  });

  it("can import and use utility functions", () => {
    // Use a recent date so the result is in the near future
    const date = new Date("2026-06-01");
    const next = calculateNextDate(date, "MONTHLY");
    expect(next).toBeInstanceOf(Date);
    expect(next.getTime()).toBeGreaterThan(date.getTime());
  });
});
