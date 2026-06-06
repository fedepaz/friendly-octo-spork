// src/features/createTransaction/components/FormContainer.tsx

import { useFormContext } from "react-hook-form";
import { useStepValidation } from "../hooks/useStepValidation";
import { StepAccountsComponent } from "./steps/stepAccount-form";
import { StepAmountComponent } from "./steps/stepAmount-form";
import { StepBudgetComponent } from "./steps/stepBudget-form";
import { StepCategoryComponent } from "./steps/stepCategory-form";
import { StepRecurrenceComponent } from "./steps/stepRecurrence-form";
import { StepReviewComponent } from "./steps/stepReview-form";
import { StepTypeComponent } from "./steps/stepType-form";
import { StepIndicator, WizardFooter, WizardModal } from "./wizardModal";
import { CreateTransactionInput } from "@repo/shared";

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
  const { validateCurrentStep } = useStepValidation(activeStep);
  const { watch, setValue } = useFormContext<CreateTransactionInput>();
  const isBudgetedExpense = watch("type") === "EXPENSE";
  const recurrenceTransationsTypesArray = [
    "EXPENSE",
    "INCOME",
    "PAYMENT",
    "RETURN",
    "INVESTMENT",
  ];
  const isRecurrenceTransactionType = recurrenceTransationsTypesArray.includes(
    watch("type"),
  );

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      if (
        activeStep === 3 &&
        !isBudgetedExpense &&
        !isRecurrenceTransactionType
      ) {
        // If type is not a recurrence transaction, skip recurrence step and clear values
        setValue("isRecurrence", false);
        setValue("frequency", null);
        setValue("totalParts", null);
        setActiveStep(activeStep + 3);
        setGlobalError(null);
        return;
      } else if (activeStep === 3 && !isRecurrenceTransactionType) {
        // If type is not an expense, skip on the back budget step
        setActiveStep(activeStep - 2);
        setGlobalError(null);
        return;
      }

      if (activeStep === 4 && !isBudgetedExpense) {
        // If type is not an expense, skip budget step and clear values
        setValue("isBudgetedExpense", false);
        setValue("budgetCategory", null);
        setActiveStep(activeStep + 2);
        setGlobalError(null);
        return;
      }
      setActiveStep(activeStep + 1);
      setGlobalError(null);
    }
  };

  const handleBack = () => {
    if (activeStep === 6 && !isBudgetedExpense) {
      // If type is not an expense, skip on the back budget step
      setActiveStep(activeStep - 2);
      setGlobalError(null);
      return;
    }
  };
  const TOTAL_STEPS = 7;
  const isLastStep = activeStep === TOTAL_STEPS - 1;

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <StepTypeComponent />;
      case 1:
        return <StepAmountComponent />;
      case 2:
        return <StepAccountsComponent />;
      case 3:
        return <StepCategoryComponent />;
      case 4:
        return <StepRecurrenceComponent />;
      case 5:
        return <StepBudgetComponent />;
      case 6:
        return <StepReviewComponent />;
      default:
        return null;
    }
  };

  return (
    <WizardModal
      isOpen={true}
      onClose={onClose}
      title="Create Transaction"
      step={activeStep + 1}
      totalSteps={TOTAL_STEPS}
    >
      <StepIndicator current={activeStep} total={TOTAL_STEPS} />
      <div className="flex-1 overflow-y-auto px-4 py-4">{renderStep()}</div>
      <WizardFooter
        onBack={activeStep > 0 ? handleBack : undefined}
        onNext={!isLastStep ? handleNext : undefined}
        onConfirm={isLastStep ? () => {} : undefined}
        isSubmitting={isSubmitting}
      />
    </WizardModal>
  );
}
