// src/features/createTransaction/hooks/useStepValidation.ts

import { CreateTransactionInput } from "@repo/shared";
import { Path, useFormContext } from "react-hook-form";

const stepFields: Record<number, Path<CreateTransactionInput>[]> = {
  0: ["type"],
  1: ["amount", "date"],
  2: ["sourceAccountId", "targetAccountId"],
  3: ["description", "categoryId"],
  4: [
    "isRecurrence",
    "recurrenceName",
    "frequency",
    "totalParts",
    "isFirstPayment",
    "isCardExpense",
    "cardType",
  ],
  5: ["isBudgetedExpense", "budgetCategory"],
};

export function useStepValidation(activeStep: number) {
  const { trigger } = useFormContext<CreateTransactionInput>();

  const validateCurrentStep = async () => {
    const fields = stepFields[activeStep];

    const isValid = await trigger(fields);
    return isValid;
  };

  return { validateCurrentStep };
}
