// src/features/createTransaction/components/steps/stepAccount-form.tsx
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
import { useTranslations } from "next-intl";
import { formatCurrency } from "@/lib/utils";
import { useEffect } from "react";
import { InLineError } from "@/components/ui/in-line-error";
import {
  canUseAccount,
  filterAccountsByCompatibility,
  getAccountDisabledReason,
} from "@/lib/account-compability-utils";

export function StepAccountsComponent() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateTransactionInput>();
  const watched = watch();
  const { data: accounts = [] } = useAccounts();
  const saT = useTranslations("StepAccountForm");

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
    const disabledReasonKey = getAccountDisabledReason(
      transactionType,
      account.type as AccountType,
      role,
    );
    const disabledReason = disabledReasonKey
      ? saT.has(disabledReasonKey)
        ? saT(disabledReasonKey)
        : disabledReasonKey
      : undefined;

    return (
      <button
        key={account.id}
        type="button"
        disabled={isDisabled}
        onClick={() => !isDisabled && onSelect(account.id)}
        className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 flex justify-between items-center p-3 border-2 text-left transition-all
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
          ? saT("titleTransfer")
          : saT("titleDefault")}
      </h3>

      {/* SOURCE ACCOUNT */}
      {canUseAccount(transactionType, "BANK", "source") && ( // Just check if ANY account can be source
        <div>
          <Label>
            {transactionType === "TRANSFER" ? saT("fromAccount") : saT("account")}
          </Label>

          {sourceAccounts.length === 0 ? (
            <p className="text-xs font-mono text-muted-foreground p-3 border-2 border-border">
              {saT("noCompatibleSource", { type: transactionType.toLowerCase() })}
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
            {transactionType === "TRANSFER" ? saT("toAccount") : saT("account")}
          </Label>

          {targetAccounts.length === 0 ? (
            <p className="text-xs font-mono text-muted-foreground p-3 border-2 border-border">
              {saT("noCompatibleTarget", { type: transactionType.toLowerCase() })}
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
