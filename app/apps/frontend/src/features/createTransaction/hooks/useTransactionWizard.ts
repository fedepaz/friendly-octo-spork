// src/features/createTransaction/hooks/useTransactionWizard.ts

import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTransactionInput, createTransactionSchema } from "@repo/shared";
import { useState } from "react";
import { useForm } from "react-hook-form";

// ─── Types ───────────────────────────────────────────────────────────────────

export type Step =
  | "type"
  | "amount"
  | "accounts"
  | "category"
  | "recurrence"
  | "review";

const STEPS: Step[] = [
  "type",
  "amount",
  "accounts",
  "category",
  "recurrence",
  "review",
];

export function useTransactionWizard(onClose: () => void) {
  const [step, setStep] = useState<Step>("type");
  const [error, setError] = useState<string | null>(null);

  const transactionForm = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      date: new Date(),
      isRecurrence: false,
    },
  });

  const currentStepIndex = STEPS.indexOf(step);

  function next() {
    const nextStep = STEPS[currentStepIndex + 1];
    if (nextStep) setStep(nextStep);
  }

  function back() {
    const prevStep = STEPS[currentStepIndex - 1];
    if (prevStep) setStep(prevStep);
  }

  function reset() {
    transactionForm.reset();
    setStep("type");
    setError(null);
  }

  function handleClose() {
    reset();
    onClose();
  }

  return {
    step,
    setStep,
    error,
    setError,
    transactionForm,
    currentStepIndex,
    totalSteps: STEPS.length,
    stepLabel: (s: Step) =>
      ({
        type: "Type",
        amount: "Amount",
        accounts: "Account",
        category: "Category",
        recurrence: "Recurrence",
        review: "Review",
      })[s],
    next,
    back,
    reset,
    handleClose,
    isLastStep: step === "review",
    isFirstStep: step === "type",
  };
}
