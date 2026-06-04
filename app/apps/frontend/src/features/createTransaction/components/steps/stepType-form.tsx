// src/features/createTransaction/components/steps/stepType-form.tsx
"use client";

import { CreateTransactionInput, TransactionType } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { FieldError } from "../wizardModal";

const TRANSACTION_TYPES = [
  {
    value: "EXPENSE",
    label: "Expense",
    hint: "Money going out",
    color: "border-destructive text-destructive",
  },
  {
    value: "INCOME",
    label: "Income",
    hint: "Money coming in",
    color: "border-secondary   text-secondary",
  },
  {
    value: "TRANSFER",
    label: "Transfer",
    hint: "Move between accounts",
    color: "border-accent      text-accent",
  },
  {
    value: "INVESTMENT",
    label: "Investment",
    hint: "Put money to work",
    color: "border-primary     text-primary",
  },
  {
    value: "RETURN",
    label: "Return",
    hint: "Investment coming back",
    color: "border-secondary/70 text-secondary/70",
  },
  {
    value: "PAYMENT",
    label: "Payment",
    hint: "Card / loan payment",
    color: "border-primary/70   text-primary/70",
  },
] as const;

export function StepTypeComponent() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateTransactionInput>();
  const watchedType = watch("type");

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        What type of transaction?
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
            className={`flex flex-col gap-1 p-4 border-2 text-left transition-all hover:bg-muted
              ${watchedType === value ? `${color} bg-muted` : "border-border text-muted-foreground"}
            `}
          >
            <span className="font-mono font-bold text-sm uppercase tracking-wider">
              {label}
            </span>
            <span className="font-mono text-xs opacity-70">{hint}</span>
          </button>
        ))}
        <FieldError message={errors.date?.message} />
      </div>
    </div>
  );
}
