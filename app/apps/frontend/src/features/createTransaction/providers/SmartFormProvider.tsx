// src/features/createTransaction/providers/SmartFormProvider.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTransactionInput, createTransactionSchema } from "@repo/shared";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormContainer } from "../components/FormContainer";
import { useCreateTransaction } from "../hooks/createMutationHooks";
import { mapServerErrorsToForm } from "@/lib/utils/form-error-mapper";
import { ApiError } from "@/lib/api/client-fetch";
import { parseApiError } from "@/lib/api/error-handler";
import { toast } from "sonner";

export function SmartFormProvider({ onClose }: { onClose: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync: createTransaction, isPending: isSubmitting } =
    useCreateTransaction();

  const methods = useForm<CreateTransactionInput>({
    mode: "onChange",
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      date: new Date(),
      isRecurrence: false,
    },
  });

  const onSubmit = async (data: CreateTransactionInput) => {
    // 🛡️ Safety Guard: Only allow submission if we are on the final Review step (Step 5)
    if (activeStep < 5) return;

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
        <FormContainer
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
