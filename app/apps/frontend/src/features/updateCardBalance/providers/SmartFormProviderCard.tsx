// src/features/updateCardBalance/providers/SmartFormProviderCard.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import { CardCloseInputDTO, cardCloseSchema } from "@repo/shared";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { mapServerErrorsToForm } from "@/lib/utils/form-error-mapper";
import { ApiError } from "@/lib/api/client-fetch";
import { parseApiError } from "@/lib/api/error-handler";
import { toast } from "sonner";

import { FormContainerCard } from "../components/FormContainerCard";
import { useUpdateCardBalance } from "../hooks/updateCardMutationHooks";
import { getCurrentMonthYear } from "@/lib/date-utils";

export function SmartFormProviderCard({ onClose }: { onClose: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { month, year } = getCurrentMonthYear();

  const { mutateAsync: closeCard, isPending: isSubmitting } =
    useUpdateCardBalance();

  const methods = useForm<CardCloseInputDTO>({
    mode: "onChange",
    resolver: zodResolver(cardCloseSchema),
    defaultValues: {
      year: year,
      month: month + 1,
      recurencesTransactions: [],
    },
  });

  const errorMessageEnd = Object.values(methods.formState.errors)
    .map((err) => err?.message)
    .filter(Boolean)
    .join(", ");

  const onInvalid = () => {
    toast.error(errorMessageEnd, {
      id: "wizard-validation-error",
    });
  };

  const onSubmit = async (data: CardCloseInputDTO) => {
    // Only submit on the confirm step (index 2)
    if (activeStep < 2) return;

    try {
      setErrorMessage(null);
      await closeCard(data);
      // Advance to review step (index 3)
      setActiveStep(3);
    } catch (error) {
      const parsed = parseApiError(error);

      if (parsed.type === "VALIDATION" && error instanceof ApiError) {
        mapServerErrorsToForm(error.details, methods.setError);
      } else {
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
        <FormContainerCard
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setGlobalError={setErrorMessage}
          isSubmitting={isSubmitting}
          onClose={onClose}
        />
        {errorMessage && (
          <div className="px-5 pb-5">
            <div className="text-[10px] font-bold uppercase tracking-tight text-destructive border border-destructive/20 bg-destructive/5 p-3 flex items-start gap-2 shadow-etched animate-premium-in">
              <div className="h-1.5 w-1.5 bg-destructive mt-1 shrink-0" />
              <div className="flex-1">
                <p className="font-black mb-0.5">Error de Operacion</p>
                <p className="opacity-70 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
