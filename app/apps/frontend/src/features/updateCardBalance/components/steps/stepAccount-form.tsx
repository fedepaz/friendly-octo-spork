// src/features/updateCardBalance/components/steps/stepAccount-form.tsx
"use client";

import { Label } from "@/components/ui/label";
import { useAccounts } from "@/features/accounts/hooks/accountsHooks";
import { CardCloseInputDTO, Currency } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { formatCurrency } from "@/lib/utils";

import { InLineError } from "@/features/createTransaction/components/inLineError";

export function StepAccountsComponent() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CardCloseInputDTO>();
  const watched = watch();
  const { data: accounts = [] } = useAccounts();

  const cardAccountId = watched.cardAccountId;
  const cardAccounts = accounts.filter((a) => a.type === "CARD");

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        Seleccionar tarjeta
      </h3>

      <div>
        <Label>Tarjeta</Label>

        {cardAccounts.length === 0 ? (
          <p className="text-xs font-mono text-muted-foreground p-3 border-2 border-border">
            No hay tarjetas disponibles
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {cardAccounts.map((account) => {
              const isSelected = cardAccountId === account.id;
              return (
                <button
                  key={account.id}
                  type="button"
                  onClick={() => setValue("cardAccountId", account.id)}
                  className={`flex justify-between items-center p-3 border-2 text-left transition-all
                    ${isSelected ? "border-foreground bg-muted" : "border-border hover:bg-muted"}
                  `}
                >
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-sm">
                      {account.name}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground uppercase">
                      {account.type}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-muted-foreground">
                    {formatCurrency(account.balance, account.currency as Currency)}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <InLineError message={errors.cardAccountId?.message as string} />
    </div>
  );
}
