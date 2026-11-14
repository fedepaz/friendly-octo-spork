// src/features/updateCardBalance/providers/SmartFormProviderCard.tsx

import { zodResolver } from "@hookform/resolvers/zod";
import { CardCloseInputDTO, CardCloseResponseDTO, cardCloseSchema } from "@repo/shared";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { FieldErrors } from "react-hook-form";

import { mapServerErrorsToForm } from "@/lib/utils/form-error-mapper";
import { ApiError } from "@/lib/api/client-fetch";
import { parseApiError } from "@/lib/api/error-handler";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { FormContainerCard } from "../components/FormContainerCard";
import { useUpdateCardBalance } from "../hooks/updateCardMutationHooks";
import { getCurrentMonthYear, getNextMonthYear } from "@/lib/date-utils";

export function SmartFormProviderCard({ onClose }: { onClose: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [closeResponse, setCloseResponse] = useState<CardCloseResponseDTO | null>(null);
  const { month, year } = getCurrentMonthYear();
  const next = getNextMonthYear(month, year);
  const epT = useTranslations("ErrorProvider");
  const sfpT = useTranslations("SmartFormProvider");

  const { mutateAsync: closeCard, isPending: isSubmitting } =
    useUpdateCardBalance();

  const methods = useForm<CardCloseInputDTO>({
    mode: "onChange",
    resolver: zodResolver(cardCloseSchema),
    defaultValues: {
      year: next.year,
      month: next.month,
      recurrencesTransactions: [],
    },
  });

  // Same fix as the create-transaction wizard: toast the errors PASSED to
  // onInvalid — the old code read a stale string from the last render, so a
  // failed Save looked like a silent no-op.
  const onInvalid = (errors: FieldErrors<CardCloseInputDTO>) => {
    const message = Object.values(errors)
      .map((err) => err?.message)
      .filter(Boolean)
      .join(", ");
    toast.error(message || epT("validationError"), {
      id: "wizard-validation-error",
    });
  };

  const onSubmit = async (data: CardCloseInputDTO) => {
    // Only submit on the confirm step (index 2)
    if (activeStep < 2) return;

    try {
      setErrorMessage(null);
      const response = await closeCard(data);
      setCloseResponse(response);
      // Advance to review step (index 3)
      setActiveStep(3);
    } catch (error) {
      const parsed = parseApiError(error);

      if (parsed.type === "VALIDATION" && error instanceof ApiError) {
        mapServerErrorsToForm(error.details, methods.setError);
      } else {
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
        <FormContainerCard
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setGlobalError={setErrorMessage}
          isSubmitting={isSubmitting}
          onClose={onClose}
          closeResponse={closeResponse}
        />
        {errorMessage && (
          <div className="px-5 pb-5">
            <div className="text-xs font-black uppercase tracking-widest text-destructive border border-destructive/20 bg-destructive/5 p-3 flex items-start gap-2 shadow-etched animate-premium-in">
              <div className="h-1.5 w-1.5 bg-destructive mt-1 shrink-0" />
              <div className="flex-1">
                <p className="font-black mb-0.5">{sfpT("operationError")}</p>
                <p className="opacity-70 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
