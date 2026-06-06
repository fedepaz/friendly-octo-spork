// src/features/createTransaction/components/steps/stepRecurrence-form.tsx
"use client";

import { Label } from "@/components/ui/label";
import { CardType, CreateTransactionInput } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { InLineError } from "../inLineError";

const FREQUENCIES = ["MONTHLY", "WEEKLY", "YEARLY", "INSTALLMENT"] as const;

export function StepRecurrenceComponent() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateTransactionInput>();
  const watched = watch();

  // Toggle handler for isRecurrence
  const toggleRecurrence = (value: boolean) => {
    setValue("isRecurrence", value);
    if (!value) {
      // Clear recurrence-specific fields when toggled off
      setValue("recurrenceName", undefined);
      setValue("frequency", undefined);
      setValue("totalParts", undefined);
      setValue("isFirstPayment", false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {watched.isCardExpense && (
        <div className="border-t border-border pt-3 mt-2">
          <Label className="text-sm font-mono mb-2 block">Card Type</Label>
          <div className="grid grid-cols-2 gap-2">
            {["VISA", "MASTERCARD", "AMEX", "MAESTRO"].map((card) => (
              <button
                key={card}
                type="button"
                onClick={() => setValue("cardType", card as CardType)}
                className={`p-2 border-2 font-mono text-xs uppercase transition-all
                  ${
                    watched.cardType === card
                      ? "border-foreground bg-muted font-bold"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
              >
                {card}
              </button>
            ))}
          </div>
        </div>
      )}
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        Does this repeat?
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => toggleRecurrence(true)}
          className={`p-4 border-2 font-mono font-bold text-sm uppercase tracking-wider transition-all
            ${
              watched.isRecurrence
                ? "border-foreground bg-muted"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => toggleRecurrence(false)}
          className={`p-4 border-2 font-mono font-bold text-sm uppercase tracking-wider transition-all
            ${
              !watched.isRecurrence
                ? "border-foreground bg-muted"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
        >
          No
        </button>
      </div>

      {watched.isRecurrence && (
        <div className="flex flex-col gap-3 border-2 border-border p-3">
          {/* Recurrence Name (required) */}
          <div>
            <Label>Recurrence Name</Label>
            <input
              {...register("recurrenceName")}
              type="text"
              placeholder="e.g. Monthly Rent, Netflix Subscription..."
              className="w-full bg-background border-2 border-border px-4 py-3 text-sm font-mono focus:outline-none focus:border-foreground"
            />
            {errors.recurrenceName && (
              <InLineError message={errors.recurrenceName.message} />
            )}
          </div>

          {/* Frequency Selection */}
          <div>
            <Label>Frequency</Label>
            <div className="grid grid-cols-2 gap-2">
              {FREQUENCIES.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setValue("frequency", f);
                  }}
                  className={`p-3 border-2 font-mono text-xs uppercase tracking-wider transition-all
                    ${
                      watched.frequency === f
                        ? "border-foreground bg-muted font-bold"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
            {errors.frequency && (
              <InLineError message={errors.frequency.message} />
            )}
          </div>

          {/* Total Parts (only for INSTALLMENT) */}
          {watched.frequency && watched.frequency === "INSTALLMENT" && (
            <div>
              <Label>Total Installments</Label>
              <input
                {...register("totalParts")}
                type="number"
                max="99"
                placeholder="e.g. 9"
                className="w-full bg-background border-2 border-border px-4 py-3 text-sm font-mono focus:outline-none focus:border-foreground"
              />
              {errors.totalParts && (
                <InLineError message={errors.totalParts.message} />
              )}
            </div>
          )}

          {/* First Payment Timing (only if totalParts is set) */}
          {watched.totalParts && watched.frequency === "INSTALLMENT" && (
            <div className="border-t border-border pt-3 mt-2">
              <Label>First Payment</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setValue("isFirstPayment", true)}
                  className={`p-3 border-2 font-mono text-xs uppercase tracking-wider transition-all
                    ${
                      watched.isFirstPayment
                        ? "border-foreground bg-muted font-bold"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                >
                  Now
                </button>
                <button
                  type="button"
                  onClick={() => setValue("isFirstPayment", false)}
                  className={`p-3 border-2 font-mono text-xs uppercase tracking-wider transition-all
                    ${
                      !watched.isFirstPayment
                        ? "border-foreground bg-muted font-bold"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                >
                  Next Month
                </button>
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-2">
                {watched.isFirstPayment
                  ? "First installment charged today"
                  : `First installment charged on next month`}
              </p>
            </div>
          )}

          {/* Card Fields (automatically shown if account step detected a card) */}
        </div>
      )}
    </div>
  );
}
