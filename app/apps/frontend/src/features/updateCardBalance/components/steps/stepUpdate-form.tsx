// src/features/updateCardBalance/components/steps/stepUpdate-form.tsx
"use client";

import { Label } from "@/components/ui/label";
import { useAccounts } from "@/features/accounts/hooks/accountsHooks";
import {
  AccountDTO,
  AccountType,
  CreateTransactionInput,
  Currency,
} from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { formatCurrency } from "@/lib/utils";
import { useEffect } from "react";

import {
  canUseAccount,
  filterAccountsByCompatibility,
  getAccountDisabledReason,
} from "@/lib/account-compability-utils";
import { InLineError } from "@/features/createTransaction/components/inLineError";

export function StepUpdateComponent() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateTransactionInput>();
  const watched = watch();
  const { data: accounts = [] } = useAccounts();

  const transactionType = watched.type;
  const sourceAccountId = watched.sourceAccountId;

  // Auto-detect card expense
  useEffect(() => {
    if (sourceAccountId) {
      const account = accounts.find((a) => a.id === sourceAccountId);
      if (account?.type === "CARD") {
        setValue("isCardExpense", true);
      } else {
        setValue("isCardExpense", false);
      }
    }
  }, [sourceAccountId, accounts, setValue]);
  // ─── SMART FILTERING USING COMPATIBILITY MATRIX ─────────────────────────
  const sourceAccounts = filterAccountsByCompatibility(
    accounts,
    transactionType,
    "source",
    watched.targetAccountId, // Exclude target for transfers
  );

  const targetAccounts = filterAccountsByCompatibility(
    accounts,
    transactionType,
    "target",
    watched.sourceAccountId, // Exclude source for transfers
  );

  // ─── RENDER HELPERS ─────────────────────────────────────────────────────
  function renderAccountButton(
    account: AccountDTO,
    role: "source" | "target",
    selectedId: string | null | undefined,
    onSelect: (id: string) => void,
  ) {
    const isSelected = selectedId === account.id;
    const isDisabled = !canUseAccount(
      transactionType,
      account.type as AccountType,
      role,
    );
    const disabledReason = getAccountDisabledReason(
      transactionType,
      account.type as AccountType,
      role,
    );

    return (
      <button
        key={account.id}
        type="button"
        disabled={isDisabled}
        onClick={() => !isDisabled && onSelect(account.id)}
        className={`flex justify-between items-center p-3 border-2 text-left transition-all
          ${isSelected && !isDisabled ? "border-foreground bg-muted" : ""}
          ${!isSelected && !isDisabled ? "border-border hover:bg-muted" : ""}
          ${isDisabled ? "border-border opacity-50 cursor-not-allowed" : ""}
        `}
        title={disabledReason} // Tooltip on hover
      >
        <div className="flex flex-col">
          <span className="font-mono font-bold text-sm">
            {account.name}
            {isDisabled && (
              <span className="text-xs text-muted-foreground ml-2">⚠</span>
            )}
          </span>
          {disabledReason && isDisabled && (
            <span className="text-xs font-mono text-muted-foreground">
              {disabledReason}
            </span>
          )}
        </div>
        <span className="font-mono text-sm text-muted-foreground">
          {formatCurrency(account.balance, account.currency as Currency)}
        </span>
      </button>
    );
  }

  // ─── RENDER ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        {transactionType === "TRANSFER"
          ? "From where, to where?"
          : "Which account?"}
      </h3>

      {/* SOURCE ACCOUNT */}
      {canUseAccount(transactionType, "BANK", "source") && ( // Just check if ANY account can be source
        <div>
          <Label>
            {transactionType === "TRANSFER" ? "From account" : "Account"}
          </Label>

          {sourceAccounts.length === 0 ? (
            <p className="text-xs font-mono text-muted-foreground p-3 border-2 border-border">
              No compatible accounts available for{" "}
              {transactionType.toLowerCase()} source
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {sourceAccounts.map((account) =>
                renderAccountButton(account, "source", sourceAccountId, (id) =>
                  setValue("sourceAccountId", id),
                ),
              )}
            </div>
          )}

          <InLineError message={errors.sourceAccountId?.message as string} />
        </div>
      )}

      {/* TARGET ACCOUNT */}
      {canUseAccount(transactionType, "BANK", "target") && (
        <div>
          <Label>
            {transactionType === "TRANSFER" ? "To account" : "Account"}
          </Label>

          {targetAccounts.length === 0 ? (
            <p className="text-xs font-mono text-muted-foreground p-3 border-2 border-border">
              No compatible accounts available for{" "}
              {transactionType.toLowerCase()} target
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {targetAccounts.map((account) =>
                renderAccountButton(
                  account,
                  "target",
                  watched.targetAccountId,
                  (id) => setValue("targetAccountId", id),
                ),
              )}
            </div>
          )}

          <InLineError message={errors.targetAccountId?.message as string} />
        </div>
      )}
    </div>
  );
}
