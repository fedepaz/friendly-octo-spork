// src/features/createTransaction/components/steps/__tests__/stepAccount-form.spec.tsx
import { render, screen, act, waitFor } from "@testing-library/react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import type { CreateTransactionInput } from "@repo/shared";
import { StepAccountsComponent } from "../stepAccount-form";

jest.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.has = () => false;
    t.raw = () => ({});
    return t;
  },
}));

jest.mock("@/features/accounts/hooks/accountsHooks", () => ({
  useAccounts: () => ({
    data: [
      {
        id: "b1",
        name: "Banco",
        type: "BANK",
        balance: "1000",
        currency: "ARS",
      },
      {
        id: "i1",
        name: "MatrixInv",
        type: "INVESTMENT",
        balance: "500",
        currency: "ARS",
      },
    ],
  }),
}));

describe("StepAccountsComponent", () => {
  let methods: UseFormReturn<CreateTransactionInput>;

  function Wrapper({ children }: { children: React.ReactNode }) {
    methods = useForm<CreateTransactionInput>({
      defaultValues: { type: "INVESTMENT" } as Partial<CreateTransactionInput>,
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  }

  it("shows the target picker for INVESTMENT (and the source picker)", async () => {
    // #54 defect 1: the target block was gated on a hardcoded BANK probe —
    // BANK cannot be an INVESTMENT target, so the picker never rendered.
    render(<StepAccountsComponent />, { wrapper: Wrapper });
    await act(async () => {});

    // the INVESTMENT account is offered as a target
    expect(screen.getByText("MatrixInv")).toBeInTheDocument();
    // and the BANK account as the source
    expect(screen.getByText("Banco")).toBeInTheDocument();
  });
});
