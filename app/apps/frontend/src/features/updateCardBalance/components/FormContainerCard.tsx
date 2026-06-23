// src/features/updateCardBalance/components/FormContainer.tsx

import { Suspense } from "react";
import { useFormContext } from "react-hook-form";

import { StepUpdateComponent } from "./steps/stepUpdate-form";
import { StepReviewComponent } from "./steps/stepReview-form";

import {
  StepIndicator,
  WizardFooter,
  WizardModal,
} from "@/components/ui/wizard-modal";
import { CardCloseInputDTO, CardCloseResponseDTO } from "@repo/shared";
import {
  getCardNextStepId,
  getCardPrevStepId,
  getCardValidationFields,
  indexCardToStepId,
  STEP_CONFIGS_CARD_CLOSE,
  stepIdCardToIndex,
} from "@/lib/utils/step-transaction-routing";
import { WizardStepSkeleton } from "@/components/ui/wizard-step-skeleton";
import { StepConfirmComponent } from "./steps/stepConfirm-form";
import { StepAccountsComponent } from "./steps/stepAccount-form";

interface FormContainerProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  setGlobalError: (error: string | null) => void;
  isSubmitting?: boolean;
  onClose: () => void;
  closeResponse: CardCloseResponseDTO | null;
}

export function FormContainerCard({
  activeStep,
  setActiveStep,
  setGlobalError,
  isSubmitting,
  onClose,
  closeResponse,
}: FormContainerProps) {
  const { watch, trigger } = useFormContext<CardCloseInputDTO>();
  const watched = watch();

  // Convert numeric index to StepId
  const currentStepId = indexCardToStepId(activeStep, STEP_CONFIGS_CARD_CLOSE);

  // Get visible steps for progress indicator
  const visibleStepIds = STEP_CONFIGS_CARD_CLOSE.filter(
    (step) => step.shouldShow?.(watched) ?? true,
  ).map((step) => step.id);

  const currentVisibleIndex = visibleStepIds.indexOf(currentStepId!);
  const totalVisibleSteps = visibleStepIds.length;

  // ─── SMART NAVIGATION ───────────────────────────────────────────────────
  const handleNext = async () => {
    // Validate current step's fields (only if visible)
    const fieldsToValidate = getCardValidationFields(
      currentStepId!,
      watched,
      STEP_CONFIGS_CARD_CLOSE,
    );
    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate); // Type cast ok for Path
      if (!isValid) {
        setGlobalError("Please fill in all required fields");
        return;
      }
    }

    // Navigate to next visible step
    const nextStepId = getCardNextStepId(
      currentStepId!,
      watched,
      STEP_CONFIGS_CARD_CLOSE,
    );
    if (nextStepId) {
      setActiveStep(stepIdCardToIndex(nextStepId, STEP_CONFIGS_CARD_CLOSE));
      setGlobalError(null);
    }
  };

  const handleBack = () => {
    const prevStepId = getCardPrevStepId(
      currentStepId!,
      watched,
      STEP_CONFIGS_CARD_CLOSE,
    );
    if (prevStepId) {
      setActiveStep(stepIdCardToIndex(prevStepId, STEP_CONFIGS_CARD_CLOSE));
      setGlobalError(null);
    }
  };

  const isConfirmStep = currentStepId === "confirm";
  const isReviewStep = currentStepId === "review";

  // ─── STEP RENDERER ──────────────────────────────────────────────────────
  const renderStep = () => {
    switch (currentStepId) {
      case "accounts":
        return <StepAccountsComponent />;
      case "update":
        return <StepUpdateComponent />;
      case "confirm":
        return <StepConfirmComponent />;
      case "review":
        return <StepReviewComponent closeResponse={closeResponse} />;
      default:
        return null;
    }
  };

  return (
    <WizardModal
      isOpen={true}
      onClose={onClose}
      title={
        STEP_CONFIGS_CARD_CLOSE.find((s) => s.id === currentStepId)?.label ??
        "Terminal de Transacciones"
      }
      step={currentVisibleIndex + 1}
      totalSteps={totalVisibleSteps}
    >
      <StepIndicator current={currentVisibleIndex} total={totalVisibleSteps} />
      <div className="flex-1 overflow-y-auto px-5 py-6 animate-premium-in">
        <Suspense fallback={<WizardStepSkeleton />}>{renderStep()}</Suspense>
      </div>
      {isReviewStep ? (
        <WizardFooter
          onConfirm={onClose}
          confirmLabel="Cerrar"
          showBackButton={false}
          isSubmitting={isSubmitting}
        />
      ) : (
        <WizardFooter
          onBack={currentVisibleIndex > 0 ? handleBack : undefined}
          onNext={!isConfirmStep && !isReviewStep ? handleNext : undefined}
          onConfirm={
            isConfirmStep
              ? () => {} // type="submit" triggers form submit
              : isReviewStep
                ? onClose
                : undefined
          }
          confirmLabel={
            isConfirmStep
              ? "Confirmar cierre"
              : isReviewStep
                ? "Cerrar"
                : undefined
          }
          isSubmitting={isSubmitting}
        />
      )}
    </WizardModal>
  );
}
