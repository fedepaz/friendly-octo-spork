// src/features/createTransaction/components/stepAccount-form.tsx

import { Label } from "@/components/ui/label";
import { useAccounts } from "@/features/accounts/hooks/accountsHooks";
import { CreateTransactionInput } from "@repo/shared";
import { UseFormReturn } from "react-hook-form";

interface StepAccountProps {
  formCreateTransaction: UseFormReturn<CreateTransactionInput>;
}

export function StepAccountsComponent({
  formCreateTransaction,
}: StepAccountProps) {
  const watched = formCreateTransaction.watch();
  const { data: accounts = [] } = useAccounts();

  function needsSource(type: string) {
    return ["EXPENSE", "TRANSFER", "INVESTMENT", "PAYMENT"].includes(type);
  }

  function needsTarget(type: string) {
    return ["INCOME", "TRANSFER", "RETURN"].includes(type);
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        {watched.type === "TRANSFER"
          ? "From where, to where?"
          : "Which account?"}
      </h3>

      {needsSource(watched.type ?? "") && (
        <div>
          <Label>
            {watched.type === "TRANSFER" ? "From account" : "Account"}
          </Label>
          {/* TODO: accounts here ideally come from GET /accounts/for-transaction?type=EXPENSE */}
          {/* filtered & sorted by balance on the backend */}
          <div className="flex flex-col gap-2">
            {accounts.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() =>
                  formCreateTransaction.setValue("sourceAccountId", a.id)
                }
                className={`flex justify-between items-center p-3 border-2 text-left transition-all
                     ${
                       watched.sourceAccountId === a.id
                         ? "border-foreground bg-muted"
                         : "border-border hover:bg-muted"
                     }`}
              >
                <span className="font-mono font-bold text-sm">{a.name}</span>
                <span className="font-mono text-sm text-muted-foreground">
                  {/* balance shown here — backend sorts by balance > 0 first */}
                  {a.currency} {Number(a.balance).toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {needsTarget(watched.type ?? "") && (
        <div>
          <Label>
            {watched.type === "TRANSFER" ? "To account" : "Account"}
          </Label>
          <div className="flex flex-col gap-2">
            {accounts
              .filter((a) => a.id !== watched.sourceAccountId)
              .map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() =>
                    formCreateTransaction.setValue("targetAccountId", a.id)
                  }
                  className={`flex justify-between items-center p-3 border-2 text-left transition-all
                       ${
                         watched.targetAccountId === a.id
                           ? "border-foreground bg-muted"
                           : "border-border hover:bg-muted"
                       }`}
                >
                  <span className="font-mono font-bold text-sm">{a.name}</span>
                  <span className="font-mono text-sm text-muted-foreground">
                    {a.currency} {Number(a.balance).toFixed(2)}
                  </span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
