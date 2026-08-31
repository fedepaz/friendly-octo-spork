// src/features/updateRecurrence/providers/SmartFormProviderRecurrence.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTransactionInput, createTransactionSchema } from "@repo/shared";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

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
  const sfprT = useTranslations("SmartFormProviderRecurrence");
  const epT = useTranslations("ErrorProvider");

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
        recurrenceName: recurrenceToUpdate.name, // ✅ FIXED: Required for validation
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

  // Filter errors from form field state
  const errorMessageEnd = Object.values(methods.formState.errors)
    .map((err) => err?.message)
    .filter(Boolean)
    .join(", ");

  const onInvalid = () => {
    toast.error(errorMessageEnd, {
      id: "wizard-validation-error",
    });
  };

  const onSubmit = async (data: CreateTransactionInput) => {
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
        const errorMsg = epT.has(parsed.messageKey)
          ? epT(parsed.messageKey, parsed.messageParams ?? {})
          : parsed.messageKey;
        setErrorMessage(errorMsg);
        toast.error(errorMsg, {
          duration: 5000,
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)}>
        <FormContainerRecurrence
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setGlobalError={setErrorMessage}
          isSubmitting={isSubmitting}
          onClose={onClose}
        />
        {/* STRUCTURAL FEEDBACK: Shown for server errors or global issues */}
        {errorMessage && (
          <div className="px-5 pb-5">
            <div className="text-[10px] font-bold uppercase tracking-tight text-destructive border border-destructive/20 bg-destructive/5 p-3 flex items-start gap-2 shadow-etched animate-premium-in">
              <div className="h-1.5 w-1.5 bg-destructive mt-1 shrink-0" />
              <div className="flex-1">
                <p className="font-black mb-0.5">{sfprT("operationError")}</p>
                <p className="opacity-70 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
