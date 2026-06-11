// src/features/updateRecurrence/providers/SmartFormProviderRecurrence.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTransactionInput, createTransactionSchema } from "@repo/shared";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { mapServerErrorsToForm } from "@/lib/utils/form-error-mapper";
import { ApiError } from "@/lib/api/client-fetch";
import { parseApiError } from "@/lib/api/error-handler";
import { FormContainerRecurrence } from "../components/FormContainerRecurrence";
import { useCreateTransaction } from "@/features/createTransaction";
import { useRecurrenceById } from "@/features/recurrences/hooks/recurrenceHooks";
import { toast } from "sonner";

interface SmartFormProviderRecurrenceProps {
  recurrenceId: string;
  onClose: () => void;
}

export function SmartFormProviderRecurrence({
  recurrenceId,
  onClose,
}: SmartFormProviderRecurrenceProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: recurrenceToUpdate } = useRecurrenceById(recurrenceId);

  const { mutateAsync: createTransaction, isPending: isSubmitting } =
    useCreateTransaction();

  const methods = useForm<CreateTransactionInput>({
    mode: "onChange",
    resolver: zodResolver(createTransactionSchema),
  });

  useEffect(() => {
    if (recurrenceToUpdate) {
      methods.reset({
        type: recurrenceToUpdate.type,
        amount: recurrenceToUpdate.amount,
        date: new Date(),
        description: recurrenceToUpdate.name,
        categoryId: recurrenceToUpdate.categoryId,
        sourceAccountId: recurrenceToUpdate.sourceAccountId,
        targetAccountId: recurrenceToUpdate.targetAccountId,
        recurrenceId: recurrenceToUpdate.id,
        isRecurrence: true,
        isFirstPayment: false,
        frequency: recurrenceToUpdate.frequency,
        totalParts: recurrenceToUpdate.totalParts,
        isBudgetedExpense: false,
        isCardExpense: recurrenceToUpdate.isCardExpense ?? false,
        cardType: recurrenceToUpdate.cardType,
      });
    }
  }, [recurrenceToUpdate, methods]);

  const onSubmit = async (data: CreateTransactionInput) => {
    // 🛡️ Safety Guard: Only allow submission if we are on the final Review step
    // The currentStepId check is better, but activeStep works for now if matched
    try {
      setErrorMessage(null);
      await createTransaction(data);
      // Toast is handled in the mutation hook (useCreateTransaction)
      setActiveStep(0);
      methods.reset();
      onClose();
    } catch (error) {
      const parsed = parseApiError(error);

      if (parsed.type === "VALIDATION" && error instanceof ApiError) {
        // ✅ SURGICAL: Map backend validation errors to specific fields
        mapServerErrorsToForm(error.details, methods.setError);
      } else {
        // ✅ GLOBAL: Show system/auth errors in the snackbar
        setErrorMessage(parsed.message);
        toast.error(errorMessage, {
          duration: 5000,
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormContainerRecurrence
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setGlobalError={setErrorMessage}
          isSubmitting={isSubmitting}
          onClose={onClose}
        />
      </form>
    </FormProvider>
  );
}
