// src/lib/account-compability-utils.ts
//
// The compatibility matrix lives in @repo/shared (single source of truth,
// also used by the backend transaction validation). Re-exported here so
// feature imports keep their local path.

export {
  ACCOUNT_COMPATIBILITY,
  canUseAccount,
  canUseAnyAccount,
  filterAccountsByCompatibility,
  getAccountDisabledReason,
} from "@repo/shared";
export type { AccountRole, AccountCompatibility } from "@repo/shared";
