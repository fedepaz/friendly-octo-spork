// src/lib/__tests__/account-compability-utils.spec.ts
import {
  ACCOUNT_COMPATIBILITY,
  canUseAnyAccount,
} from "../account-compability-utils";

describe("canUseAnyAccount", () => {
  // #54 defect 1: the wizard used to probe a single hardcoded account type
  // (BANK) to decide whether to render the source/target pickers, which
  // hid the target picker for INVESTMENT (and source for RETURN, target
  // for PAYMENT) even though the matrix supports those roles.

  it("reports roles that at least one account type supports", () => {
    expect(canUseAnyAccount("INVESTMENT", "source")).toBe(true);
    expect(canUseAnyAccount("INVESTMENT", "target")).toBe(true);
    expect(canUseAnyAccount("RETURN", "source")).toBe(true);
    expect(canUseAnyAccount("RETURN", "target")).toBe(true);
    expect(canUseAnyAccount("PAYMENT", "target")).toBe(true);
    expect(canUseAnyAccount("TRANSFER", "source")).toBe(true);
    expect(canUseAnyAccount("TRANSFER", "target")).toBe(true);
  });

  it("reports false when no account type supports the role", () => {
    expect(canUseAnyAccount("INCOME", "source")).toBe(false);
    expect(canUseAnyAccount("EXPENSE", "target")).toBe(false);
  });

  it("agrees with the matrix for every transaction type and role", () => {
    for (const type of Object.keys(ACCOUNT_COMPATIBILITY) as Array<
      keyof typeof ACCOUNT_COMPATIBILITY
    >) {
      const rows = Object.values(ACCOUNT_COMPATIBILITY[type]);
      expect(canUseAnyAccount(type, "source")).toBe(
        rows.some((r) => r.canBeSource),
      );
      expect(canUseAnyAccount(type, "target")).toBe(
        rows.some((r) => r.canBeTarget),
      );
    }
  });

  it("returns false for unknown transaction types", () => {
    // @ts-expect-error deliberately invalid input
    expect(canUseAnyAccount("NOT_A_TYPE", "source")).toBe(false);
  });
});
