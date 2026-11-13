// src/features/transactions/__tests__/transactions-view-form.spec.tsx
import { render, screen } from "@testing-library/react";
import { TransactionViewForm } from "../components/transactions-view-form";
import type { TransactionDTO } from "@repo/shared";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      operationDate: "Operation Date",
      type: "Type",
      category: "Category",
      noCategory: "UNCATEGORIZED",
      amount: "Amount",
      description: "Description",
      fundFlow: "Fund Flow",
      origin: "ORIGIN:",
      destination: "DESTINATION:",
      na: "N/A",
      cardExpense: "CARD EXPENSE",
      confirmed: "CONFIRMED",
      no: "NO",
      recurrence: "RECURRENCE",
      budgeted: "BUDGETED",
      yes: "YES",
    };
    return translations[key] ?? key;
  },
  useLocale: () => "en",
}));

describe("TransactionViewForm", () => {
  const transaction = {
    id: "t1",
    userId: "u1",
    type: "EXPENSE",
    amount: "1500",
    date: new Date("2026-11-05T10:00:00.000Z"),
    description: "Electric bill for October",
    isBudgetedExpense: false,
    isCardExpense: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as unknown as TransactionDTO;

  it("shows the description in the detail view", () => {
    // #58: description is required on create and shown in the list, but
    // was missing from the detail slide-over entirely.
    render(<TransactionViewForm selectedTransaction={transaction} />);

    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Electric bill for October")).toBeInTheDocument();
  });
});
