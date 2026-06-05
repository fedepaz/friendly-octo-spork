// src/features/createTransaction/components/FormContainer.tsx

import { useStepValidation } from "../hooks/useStepValidation";
import { StepAccountsComponent } from "./steps/stepAccount-form";
import { StepAmountComponent } from "./steps/stepAmount-form";
import { StepCategoryComponent } from "./steps/stepCategory-form";
import { StepRecurrenceComponent } from "./steps/stepRecurrence-form";
import { StepReviewComponent } from "./steps/stepReview-form";
import { StepTypeComponent } from "./steps/stepType-form";
import { StepIndicator, WizardFooter, WizardModal } from "./wizardModal";

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

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setActiveStep(activeStep + 1);
      setGlobalError(null);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      setGlobalError(null);
    }
  };

  const TOTAL_STEPS = 6;
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
