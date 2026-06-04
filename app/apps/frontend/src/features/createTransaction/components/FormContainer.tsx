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
}

export function FormContainer({
  activeStep,
  setActiveStep,
  setGlobalError,
  isSubmitting,
}: FormContainerProps) {
  const { validateCurrentStep } = useStepValidation(activeStep);

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setActiveStep(activeStep + 1);
      setGlobalError(null);
    } else {
      setGlobalError("Please fill in all required fields");
    }
  };
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      setGlobalError(null);
    }
  };

  const TOTAL_STEPS = 6;

  function layoutRender(children: React.ReactNode) {
    const isLastStep = activeStep === TOTAL_STEPS - 1;
    return (
      <>
        <StepIndicator current={activeStep} total={TOTAL_STEPS} />
        <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
        <WizardFooter
          onBack={activeStep > 0 ? handleBack : undefined}
          onNext={!isLastStep ? handleNext : undefined}
          onConfirm={isLastStep ? () => {} : undefined}
          isSubmitting={isSubmitting}
        />
      </>
    );
  }

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return layoutRender(<StepTypeComponent />);
      case 1:
        return layoutRender(<StepAmountComponent />);
      case 2:
        return layoutRender(<StepAccountsComponent />);
      case 3:
        return layoutRender(<StepCategoryComponent />);
      case 4:
        return layoutRender(<StepRecurrenceComponent />);
      case 5:
        return layoutRender(<StepReviewComponent />);
      default:
        return null;
    }
  };

  return (
    <WizardModal
      isOpen={true}
      onClose={() => setActiveStep(0)}
      title="Create Transaction"
      step={activeStep + 1}
      totalSteps={5}
    >
      {renderStep()}
    </WizardModal>
  );
}
