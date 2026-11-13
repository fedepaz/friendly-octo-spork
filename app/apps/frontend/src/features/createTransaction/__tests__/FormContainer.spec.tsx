// src/features/createTransaction/__tests__/FormContainer.spec.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import type { CreateTransactionInput } from "@repo/shared";
import { FormContainer } from "../components/FormContainer";

jest.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.has = () => false;
    t.raw = () => ({});
    return t;
  },
}));

// The step components are irrelevant here — we drive handleNext directly.
jest.mock("../components/steps/stepType-form", () => ({
  StepTypeComponent: () => null,
}));
jest.mock("../components/steps/stepAmount-form", () => ({
  StepAmountComponent: () => null,
}));
jest.mock("../components/steps/stepAccount-form", () => ({
  StepAccountsComponent: () => null,
}));
jest.mock("../components/steps/stepCategory-form", () => ({
  StepCategoryComponent: () => null,
}));
jest.mock("../components/steps/stepRecurrence-form", () => ({
  StepRecurrenceComponent: () => null,
}));
jest.mock("../components/steps/stepBudget-form", () => ({
  StepBudgetComponent: () => null,
}));
jest.mock("../components/steps/stepReview-form", () => ({
  StepReviewComponent: () => null,
}));
jest.mock("@/components/ui/wizard-modal", () => ({
  WizardModal: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  StepIndicator: () => null,
  WizardFooter: ({ onNext }: { onNext?: () => void }) => (
    <div>{onNext && <button onClick={onNext}>next</button>}</div>
  ),
}));

describe("FormContainer", () => {
  it("blocks advancing past the accounts step when the target is missing", async () => {
    // #54 defect 2: zod's superRefine only runs once the BASE schema parses,
    // but at the accounts step `description` (required, filled in a LATER
    // step) is still empty — so trigger() saw no target error and the
    // wizard advanced without one.
    const defaultValues: Partial<CreateTransactionInput> = {
      type: "INVESTMENT",
      amount: "100",
      date: new Date(),
      description: "", // not filled yet — the later category step owns it
      sourceAccountId: "b1", // source selected, target missing
      isRecurrence: false,
    };

    let methods: ReturnType<typeof useForm<CreateTransactionInput>>;
    function Wrapper({ children }: { children: React.ReactNode }) {
      methods = useForm<CreateTransactionInput>({ defaultValues });
      return <FormProvider {...methods}>{children}</FormProvider>;
    }

    const setActiveStep = jest.fn();
    const setGlobalError = jest.fn();
    render(
      <Wrapper>
        <FormContainer
          activeStep={2} // STEP_CONFIGS index of "accounts"
          setActiveStep={setActiveStep}
          setGlobalError={setGlobalError}
          onClose={jest.fn()}
        />
      </Wrapper>,
    );

    fireEvent.click(screen.getByText("next"));

    await waitFor(() => expect(setGlobalError).toHaveBeenCalled());
    expect(setGlobalError).toHaveBeenCalledWith(
      expect.stringContaining("target account"),
    );
    expect(setActiveStep).not.toHaveBeenCalled();
  });

  it("keeps the budget selection when moving from budget to review", async () => {
    // #53: handleNext unconditionally reset isBudgetedExpense=false on the
    // budget→review transition, wiping a visited step's choice.
    const defaultValues: Partial<CreateTransactionInput> = {
      type: "EXPENSE",
      amount: "100",
      date: new Date(),
      description: "test",
      categoryId: "c1",
      sourceAccountId: "b1",
      isRecurrence: false,
      isBudgetedExpense: true,
      budgetCategory: "DAILY_EXPENSES",
    };

    let methods: ReturnType<typeof useForm<CreateTransactionInput>>;
    function Wrapper({ children }: { children: React.ReactNode }) {
      methods = useForm<CreateTransactionInput>({ defaultValues });
      return <FormProvider {...methods}>{children}</FormProvider>;
    }

    const setActiveStep = jest.fn();
    render(
      <Wrapper>
        <FormContainer
          activeStep={5} // STEP_CONFIGS index of "budget"
          setActiveStep={setActiveStep}
          setGlobalError={jest.fn()}
          onClose={jest.fn()}
        />
      </Wrapper>,
    );

    fireEvent.click(screen.getByText("next"));

    await waitFor(() => expect(setActiveStep).toHaveBeenCalled());
    expect(methods!.getValues("isBudgetedExpense")).toBe(true);
    expect(methods!.getValues("budgetCategory")).toBe("DAILY_EXPENSES");
  });
});
