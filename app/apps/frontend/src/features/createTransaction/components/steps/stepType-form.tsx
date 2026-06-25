// src/features/createTransaction/components/steps/stepType-form.tsx
"use client";

import { CreateTransactionInput, TransactionType } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { InLineError } from "@/components/ui/in-line-error";

export function StepTypeComponent() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateTransactionInput>();
  const watchedType = watch("type");
  const stT = useTranslations("StepTypeForm");

  const TRANSACTION_TYPES = [
    {
      value: "EXPENSE",
      label: stT("expense"),
      hint: stT("expenseHint"),
      color: "border-destructive text-destructive",
    },
    {
      value: "INCOME",
      label: stT("income"),
      hint: stT("incomeHint"),
      color: "border-secondary   text-secondary",
    },
    {
      value: "TRANSFER",
      label: stT("transfer"),
      hint: stT("transferHint"),
      color: "border-accent      text-accent",
    },
    {
      value: "INVESTMENT",
      label: stT("investment"),
      hint: stT("investmentHint"),
      color: "border-primary     text-primary",
    },
    {
      value: "RETURN",
      label: stT("return"),
      hint: stT("returnHint"),
      color: "border-secondary/70 text-secondary/70",
    },
    {
      value: "PAYMENT",
      label: stT("payment"),
      hint: stT("paymentHint"),
      color: "border-primary/70   text-primary/70",
    },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        {stT("title")}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {TRANSACTION_TYPES.map(({ value, label, hint, color }) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setValue("type", value as TransactionType);
              // reset account fields when type changes
              setValue("sourceAccountId", null);
              setValue("targetAccountId", null);
            }}
            className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 flex flex-col gap-1 p-4 border-2 text-left transition-all hover:bg-muted
              ${watchedType === value ? `${color} bg-muted` : "border-border text-muted-foreground"}
            `}
          >
            <span className="font-mono font-bold text-sm uppercase tracking-wider">
              {label}
            </span>
            <span className="font-mono text-xs opacity-70">{hint}</span>
          </button>
        ))}
        {errors.type && <InLineError message={errors.type.message} />}
      </div>
    </div>
  );
}
