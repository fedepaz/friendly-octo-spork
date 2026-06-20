// src/features/updateRecurrence/components/FormContainerRecurrence.tsx

import { Suspense } from "react";
import { useFormContext } from "react-hook-form";
import { WizardStepSkeleton } from "@/features/createTransaction/components/transactions-wizard-skeleton";

import { StepAccountsComponent } from "./steps/stepAccount-form";
import { StepAmountComponent } from "./steps/stepAmount-form";
import { StepBudgetComponent } from "./steps/stepBudget-form";
import { StepRecurrenceComponent } from "./steps/stepRecurrence-form";
import { StepReviewComponent } from "./steps/stepReview-form";

import {
  StepIndicator,
  WizardFooter,
  WizardModalRecurrence,
} from "./wizardModalRecurrence";
import { CreateTransactionInput } from "@repo/shared";
import {
  getNextStepId,
  getPrevStepId,
  getValidationFields,
  indexToStepId,
  STEP_CONFIGS_RECURRENCE,
  stepIdToIndex,
} from "@/lib/utils/step-transaction-routing";

interface FormContainerProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  setGlobalError: (error: string | null) => void;
  isSubmitting?: boolean;
  onClose: () => void;
}

export function FormContainerRecurrence({
  activeStep,
  setActiveStep,
  setGlobalError,
  isSubmitting,
  onClose,
}: FormContainerProps) {
  const { watch, setValue, trigger } = useFormContext<CreateTransactionInput>();
  const watched = watch();

  // Convert numeric index to StepId
  const currentStepId = indexToStepId(activeStep, STEP_CONFIGS_RECURRENCE);

  // Get visible steps for progress indicator
  const visibleStepIds = STEP_CONFIGS_RECURRENCE.filter(
    (step) => step.shouldShow?.(watched) ?? true,
  ).map((step) => step.id);

  const currentVisibleIndex = visibleStepIds.indexOf(currentStepId!);
  const totalVisibleSteps = visibleStepIds.length;

  // ─── SMART NAVIGATION ───────────────────────────────────────────────────
  const handleNext = async () => {
    // Validate current step's fields (only if visible)
    const fieldsToValidate = getValidationFields(
      currentStepId!,
      watched,
      STEP_CONFIGS_RECURRENCE,
    );
    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate); // Type cast ok for Path
      if (!isValid) {
        setGlobalError("Please fill in all required fields");
        return;
      }
    }

    if (currentStepId === "budget") {
      const nextStep = getNextStepId(
        "budget",
        watched,
        STEP_CONFIGS_RECURRENCE,
      );
      if (nextStep === "review") {
        setValue("isBudgetedExpense", false);
      }
    }

    // Navigate to next visible step
    const nextStepId = getNextStepId(
      currentStepId!,
      watched,
      STEP_CONFIGS_RECURRENCE,
    );
    if (nextStepId) {
      setActiveStep(stepIdToIndex(nextStepId, STEP_CONFIGS_RECURRENCE));
      setGlobalError(null);
    }
  };

  const handleBack = () => {
    const prevStepId = getPrevStepId(
      currentStepId!,
      watched,
      STEP_CONFIGS_RECURRENCE,
    );
    if (prevStepId) {
      setActiveStep(stepIdToIndex(prevStepId, STEP_CONFIGS_RECURRENCE));
      setGlobalError(null);
    }
  };

  const isLastStep = currentStepId === "review";

  // ─── STEP RENDERER ──────────────────────────────────────────────────────
  const renderStep = () => {
    switch (currentStepId) {
      case "amount":
        return <StepAmountComponent />;
      case "accounts":
        return <StepAccountsComponent />;

      case "recurrence":
        return <StepRecurrenceComponent />;
      case "budget":
        return <StepBudgetComponent />;
      case "review":
        return <StepReviewComponent />;
      default:
        return null;
    }
  };

  return (
    <WizardModalRecurrence
      isOpen={true}
      onClose={onClose}
      title={
        STEP_CONFIGS_RECURRENCE.find((s) => s.id === currentStepId)?.label ??
        "Terminal de Transacciones"
      }
      step={currentVisibleIndex + 1}
      totalSteps={totalVisibleSteps}
    >
      <StepIndicator current={currentVisibleIndex} total={totalVisibleSteps} />
      <div className="flex-1 overflow-y-auto px-5 py-6 animate-premium-in">
        <Suspense fallback={<WizardStepSkeleton />}>
          {renderStep()}
        </Suspense>
      </div>
      <WizardFooter
        onBack={currentVisibleIndex > 0 ? handleBack : undefined}
        onNext={!isLastStep ? handleNext : undefined}
        onConfirm={isLastStep ? () => {} : undefined}
        confirmLabel={isLastStep ? "Actualizar ✓" : undefined}
        isSubmitting={isSubmitting}
      />
    </WizardModalRecurrence>
  );
}
