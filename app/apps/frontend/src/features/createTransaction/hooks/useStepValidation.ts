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
};

export function useStepValidation(activeStep: number) {
  const { trigger, getValues } = useFormContext<CreateTransactionInput>();

  const validateCurrentStep = async () => {
    let fields = stepFields[activeStep];

    // Conditional logic for Step 4 (Recurrence)
    if (activeStep === 4) {
      const isRecurrence = getValues("isRecurrence");
      if (!isRecurrence) {
        fields = ["isRecurrence"];
      }
    }

    const isValid = await trigger(fields);
    return isValid;
  };

  return { validateCurrentStep };
}
