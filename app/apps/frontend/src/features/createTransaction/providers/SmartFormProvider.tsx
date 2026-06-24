// src/features/createTransaction/providers/SmartFormProvider.tsx
"use client";

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
    // 🛡️ Safety Guard: Only allow submission if we are on the final Review step (Step 5)
    if (activeStep < 5) return;

    try {
      setErrorMessage(null);
      console.log(
        "🚀 ~ file: SmartFormProvider.tsx ~ line 50 ~ onSubmit ~ data",
        data,
      );
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
        toast.error(parsed.message, {
          duration: 5000,
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)}>
        <FormContainer
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setGlobalError={setErrorMessage}
          isSubmitting={isSubmitting}
          onClose={onClose}
        />
        {/* STRUCTURAL FEEDBACK: Shown for server errors or global issues */}
        {errorMessage && (
          <div className="px-5 pb-5">
            <div
              role="alert"
              className="text-[10px] font-bold uppercase tracking-tight text-destructive border border-destructive/20 bg-destructive/5 p-3 flex items-start gap-2 shadow-etched animate-premium-in"
            >
              <div className="h-1.5 w-1.5 bg-destructive mt-1 shrink-0" />
              <div className="flex-1">
                <p className="font-black mb-0.5">Error de Operación</p>
                <p className="opacity-70 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
