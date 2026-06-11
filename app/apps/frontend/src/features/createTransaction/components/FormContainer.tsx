// src/features/createTransaction/components/FormContainer.tsx

import { useFormContext } from "react-hook-form";

import { StepAccountsComponent } from "./steps/stepAccount-form";
import { StepAmountComponent } from "./steps/stepAmount-form";
import { StepBudgetComponent } from "./steps/stepBudget-form";
import { StepCategoryComponent } from "./steps/stepCategory-form";
import { StepRecurrenceComponent } from "./steps/stepRecurrence-form";
import { StepReviewComponent } from "./steps/stepReview-form";
import { StepTypeComponent } from "./steps/stepType-form";
import { StepIndicator, WizardFooter, WizardModal } from "./wizardModal";
import { CreateTransactionInput } from "@repo/shared";
import {
  getNextStepId,
  getPrevStepId,
  getValidationFields,
  indexToStepId,
  STEP_CONFIGS,
  stepIdToIndex,
} from "@/lib/utils/step-transaction-routing";

interface FormContainerProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  setGlobalError: (error: string | null) => void;
  isSubmitting?: boolean;
  onClose: () => void;
}

export function FormContainer({
  activeStep,
  setActiveStep,
  setGlobalError,
  isSubmitting,
  onClose,
}: FormContainerProps) {
  const { watch, setValue, trigger } = useFormContext<CreateTransactionInput>();
  const watched = watch();

  // Convert numeric index to StepId
  const currentStepId = indexToStepId(activeStep, STEP_CONFIGS);

  // Get visible steps for progress indicator
  const visibleStepIds = STEP_CONFIGS.filter(
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
      STEP_CONFIGS,
    );
    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate); // Type cast ok for Path
      if (!isValid) {
        setGlobalError("Please fill in all required fields");
        return;
      }
    }

    // Clear values when skipping optional steps (optional but clean)
    if (currentStepId === "category") {
      const nextStep = getNextStepId("category", watched, STEP_CONFIGS);
      if (nextStep === "review") {
        // Skipped both recurrence and budget → clear their values
        setValue("isRecurrence", false);
        setValue("isBudgetedExpense", false);
      } else if (nextStep === "budget") {
        // Skipped recurrence only
        setValue("isRecurrence", false);
      }
    }

    if (currentStepId === "budget") {
      const nextStep = getNextStepId("budget", watched, STEP_CONFIGS);
      if (nextStep === "review") {
        setValue("isBudgetedExpense", false);
      }
    }

    // Navigate to next visible step
    const nextStepId = getNextStepId(currentStepId!, watched, STEP_CONFIGS);
    if (nextStepId) {
      setActiveStep(stepIdToIndex(nextStepId, STEP_CONFIGS));
      setGlobalError(null);
    }
  };

  const handleBack = () => {
    const prevStepId = getPrevStepId(currentStepId!, watched, STEP_CONFIGS);
    if (prevStepId) {
      setActiveStep(stepIdToIndex(prevStepId, STEP_CONFIGS));
      setGlobalError(null);
    }
  };

  const isLastStep = currentStepId === "review";

  // ─── STEP RENDERER ──────────────────────────────────────────────────────
  const renderStep = () => {
    switch (currentStepId) {
      case "type":
        return <StepTypeComponent />;
      case "amount":
        return <StepAmountComponent />;
      case "accounts":
        return <StepAccountsComponent />;
      case "category":
        return <StepCategoryComponent />;
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
    <WizardModal
      isOpen={true}
      onClose={onClose}
      title={
        STEP_CONFIGS.find((s) => s.id === currentStepId)?.label ??
        "Terminal de Transacciones"
      }
      step={currentVisibleIndex + 1}
      totalSteps={totalVisibleSteps}
    >
      <StepIndicator current={currentVisibleIndex} total={totalVisibleSteps} />
      <div className="flex-1 overflow-y-auto px-5 py-6 animate-premium-in">
        {renderStep()}
      </div>
      <WizardFooter
        onBack={currentVisibleIndex > 0 ? handleBack : undefined}
        onNext={!isLastStep ? handleNext : undefined}
        onConfirm={isLastStep ? () => {} : undefined}
        confirmLabel={isLastStep ? "Grabar ✓" : undefined}
        isSubmitting={isSubmitting}
      />
    </WizardModal>
  );
}
