// src/features/createTransaction/components/steps/stepAccount-form.tsx
"use client";

import { Label } from "@/components/ui/label";
import { useAccounts } from "@/features/accounts/hooks/accountsHooks";
import { CreateTransactionInput, Currency, CardType } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { formatCurrency } from "@/lib/utils";
import { useEffect } from "react";
import { InLineError } from "../inLineError";

export function StepAccountsComponent() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateTransactionInput>();
  const watched = watch();
  const { data: accounts = [] } = useAccounts();
  console.log(accounts);

  const isIncome = watched.type === "INCOME";

  const sourceAccountId = watched.sourceAccountId;

  // Auto-detect card expense
  useEffect(() => {
    if (sourceAccountId) {
      const account = accounts.find((a) => a.id === sourceAccountId);
      if (account?.type === "CARD") {
        setValue("isCardExpense", true);
        // Default card type if not set
        if (!watched.cardType) {
          setValue("cardType", "VISA" as CardType);
        }
      } else {
        setValue("isCardExpense", false);
        setValue("cardType", null);
      }
    }
  }, [sourceAccountId, accounts, setValue, watched.cardType]);

  function needsSource(type: string) {
    return ["EXPENSE", "TRANSFER", "INVESTMENT", "PAYMENT"].includes(type);
  }

  function needsTarget(type: string) {
    return ["INCOME", "TRANSFER", "RETURN"].includes(type);
  }
  // Source: show all accounts, no restrictions
  // (needsSource already handles INCOME not having a source)
  const sourceAccounts = accounts;

  // Target: exclude self, exclude CARD if INCOME
  const targetAccounts = accounts.filter((a) => {
    if (a.id === watched.sourceAccountId) return false;
    if (isIncome && a.type === "CARD") return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        {watched.type === "TRANSFER"
          ? "From where, to where?"
          : `Which account the ${watched.type}?`}
      </h3>

      {needsSource(watched.type ?? "") && (
        <div>
          <Label>
            {watched.type === "TRANSFER" ? "From account" : "Account"}
          </Label>
          <div className="flex flex-col gap-2">
            {/* Income accounts filtering the accounts types "CARD" in the case of income */}
            {sourceAccounts.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setValue("sourceAccountId", a.id)}
                className={`flex justify-between items-center p-3 border-2 text-left transition-all
                     ${
                       watched.sourceAccountId === a.id
                         ? "border-foreground bg-muted"
                         : "border-border hover:bg-muted"
                     }`}
              >
                <span className="font-mono font-bold text-sm">{a.name}</span>
                <span className="font-mono font-bold text-sm">{a.type}</span>
                <span className="font-mono text-sm text-muted-foreground">
                  {formatCurrency(a.balance, a.currency as Currency)}
                </span>
              </button>
            ))}
          </div>
          {errors.sourceAccountId && (
            <InLineError message={errors.sourceAccountId.message} />
          )}
        </div>
      )}

      {needsTarget(watched.type ?? "") && (
        <div>
          <Label>
            {watched.type === "TRANSFER" ? "To account" : "Account"}
          </Label>
          <div className="flex flex-col gap-2">
            {targetAccounts.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setValue("targetAccountId", a.id)}
                className={`flex justify-between items-center p-3 border-2 text-left transition-all
                       ${
                         watched.targetAccountId === a.id
                           ? "border-foreground bg-muted"
                           : "border-border hover:bg-muted"
                       }`}
              >
                <span className="font-mono font-bold text-sm">{a.name}</span>
                <span className="font-mono text-sm text-muted-foreground">
                  {formatCurrency(a.balance, a.currency as Currency)}
                </span>
              </button>
            ))}
          </div>
          {errors.targetAccountId && (
            <InLineError message={errors.targetAccountId.message} />
          )}
        </div>
      )}
    </div>
  );
}
