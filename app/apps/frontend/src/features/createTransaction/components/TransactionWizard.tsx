// src/features/createTransaction/components/TransactionWizard.tsx

"use client";

import { useCreateTransaction } from "../hooks/createMutationHooks";
import { StepTypeComponent } from "./stepType-form";
import { StepAmountComponent } from "./stepAmount-form";
import { StepAccountsComponent } from "./stepAccount-form";
import { StepCategoryComponent } from "./stepCategory-form";
import { StepRecurrenceComponent } from "./stepRecurrence-form";
import { StepReviewComponent } from "./stepReview-form";
import { useTransactionWizard, type Step } from "../hooks/useTransactionWizard";
import {
  WizardModal,
  StepIndicator,
  WizardFooter,
  FieldError,
} from "./wizardModal";

interface TransactionWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionWizard({ isOpen, onClose }: TransactionWizardProps) {
  const { mutateAsync: createTransaction, isPending: isSubmitting } =
    useCreateTransaction();
  const wizard = useTransactionWizard(onClose);
  const { transactionForm, step, error, currentStepIndex, handleClose } =
    wizard;

  // TODO: wire to GET /transactions/suggest-category?description=...
  // const [categorySuggestion, setCategorySuggestion] = useState<{ categoryId: string; reason: string } | null>(null);

  const handleSubmit = async () => {
    const valid = await transactionForm.trigger();
    if (!valid) return;
    try {
      await createTransaction(transactionForm.getValues());
      handleClose();
    } catch {}
  };

  if (!isOpen) return null;

  const STEP_CONTENT: Record<Step, React.ReactNode> = {
    type: (
      <StepTypeComponent
        formCreateTransaction={transactionForm}
        onNext={wizard.next}
      />
    ),
    amount: <StepAmountComponent formCreateTransaction={transactionForm} />,
    accounts: <StepAccountsComponent formCreateTransaction={transactionForm} />,
    category: <StepCategoryComponent formCreateTransaction={transactionForm} />,
    recurrence: (
      <StepRecurrenceComponent formCreateTransaction={transactionForm} />
    ),
    review: (
      <StepReviewComponent
        formCreateTransaction={transactionForm}
        error={error}
      />
    ),
  };

  return (
    <WizardModal
      isOpen={isOpen}
      onClose={handleClose}
      title={wizard.stepLabel(step)}
      step={currentStepIndex + 1}
      totalSteps={wizard.totalSteps}
    >
      <StepIndicator current={currentStepIndex} total={wizard.totalSteps} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {STEP_CONTENT[step]}
        {error && <FieldError message={error} />}
      </div>

      {!wizard.isFirstStep && (
        <WizardFooter
          onBack={wizard.isFirstStep ? undefined : wizard.back}
          onNext={wizard.isLastStep ? undefined : wizard.next}
          onConfirm={wizard.isLastStep ? handleSubmit : undefined}
          isSubmitting={isSubmitting}
          confirmLabel="Confirm ✓"
        />
      )}
    </WizardModal>
  );
}
