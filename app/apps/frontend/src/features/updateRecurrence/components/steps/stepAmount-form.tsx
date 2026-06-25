// src/features/createTransaction/components/steps/stepAmount-form.tsx
"use client";

import { Label } from "@/components/ui/label";

import { CreateTransactionInput } from "@repo/shared";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { InLineError } from "@/components/ui/in-line-error";

export function StepAmountComponent() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateTransactionInput>();
  const sramT = useTranslations("StepRecAmountForm");

  useEffect(() => {
    const today = new Date();

    setValue("date", today);
  }, [setValue]);

  const amountWatch = watch("amount");

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-foreground">
        {sramT("title")}
      </h3>
      <div>
        <Label>{sramT("amountLabel")}</Label>
        <input
          {...register("amount")}
          type="text"
          inputMode="decimal"
          placeholder={sramT("amountPlaceholder")}
          value={amountWatch}
          autoFocus
          className="w-full bg-background border-2 border-border px-4 py-3 text-2xl font-mono text-right focus:outline-none focus:border-foreground transition-colors"
        />
        {errors.amount && <InLineError message={errors.amount.message} />}
      </div>
    </div>
  );
}
