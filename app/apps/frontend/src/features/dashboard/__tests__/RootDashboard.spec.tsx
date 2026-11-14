// src/features/dashboard/__tests__/RootDashboard.spec.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RootDashboard } from "../components/RootDashboard";
import {
  useBudgetSummary,
  useMonthlyIncomeExpense,
  useRecentAccounts,
  useRecurrencesToPay,
} from "../hooks/dashboardHooks";
import { useAccounts } from "@/features/accounts/hooks/accountsHooks";

jest.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string, params?: { month?: string }) => {
      if (key === "incomeTitle") return `Income ${params?.month ?? ""}`;
      if (key === "expensesTitle") return `Expenses ${params?.month ?? ""}`;
      const translations: Record<string, string> = {
        netWorth: "Net Worth",
        vsPrevMonth: "vs prev. month",
        netFlowVsPrev: "net flow vs prev. month",
        newTransaction: "New Transaction",
        cardClosing: "Card Closing",
        january: "January",
        february: "February",
        march: "March",
        april: "April",
        may: "May",
        june: "June",
        july: "July",
        august: "August",
        september: "September",
        october: "October",
        november: "November",
        december: "December",
        monthlyPeriod: "Monthly Period",
        prevYear: "Previous year",
        nextYear: "Next year",
        title: "Account Overview",
        description: "Comparison of income and operating expenses",
        real: "Real",
        pending: "Pending",
        budget: "Budget",
        category_dailyExpenses: "Daily Expenses",
      };
      return translations[key] ?? key;
    };
    return t;
  },
  useLocale: () => "en",
}));

jest.mock("@/providers/wizard-form-provider", () => ({
  useWizard: () => ({
    openTransaction: jest.fn(),
    openCard: jest.fn(),
    openRecurrence: jest.fn(),
  }),
}));

jest.mock("@/features/accounts/hooks/accountsHooks", () => ({
  useAccounts: jest.fn(() => ({ data: [] })),
}));

jest.mock("../hooks/dashboardHooks", () => ({
  useRecentAccounts: jest.fn(() => ({ data: [] })),
  useMonthlyIncomeExpense: jest.fn(() => ({
    data: [
      { month: "May", income: "0", expenses: "0" },
      { month: "Jun", income: "0", expenses: "0" },
      { month: "Jul", income: "0", expenses: "0" },
      { month: "Aug", income: "0", expenses: "0" },
      { month: "Sep", income: "0", expenses: "0" },
      { month: "Oct", income: "0", expenses: "0" },
    ],
  })),
  useBudgetSummary: jest.fn(() => ({ data: [] })),
  useRecurrencesToPay: jest.fn(() => ({ data: [] })),
}));

describe("RootDashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a month selector (current month by default)", () => {
    // #64: the dashboard had no month navigation at all
    render(<RootDashboard />);
    const currentYear = String(new Date().getFullYear());
    expect(
      screen.getByRole("button", { name: new RegExp(currentYear) }),
    ).toBeInTheDocument();
  });

  it("re-queries income/expense when the year stepper is used", async () => {
    // #64 wiring: selected period flows into the widgets' data hook
    render(<RootDashboard />);
    const currentYear = new Date().getFullYear();

    await userYearStep("Next year");

    await waitFor(() => {
      expect(useMonthlyIncomeExpense).toHaveBeenCalledWith(
        6,
        expect.any(Number),
        currentYear + 1,
      );
    });
  });

  it("shows the selected month in the KPI titles after navigation", async () => {
    render(<RootDashboard />);

    // open the month dropdown and pick September
    const user = userEvent.setup();
    const currentYear = String(new Date().getFullYear());
    const trigger = screen.getByRole("button", {
      name: new RegExp(currentYear),
    });
    await user.click(trigger);
    const september = await screen.findByText("September");
    await user.click(september);

    await waitFor(() => {
      expect(screen.getByText("Income September")).toBeInTheDocument();
    });
  });

  async function userYearStep(label: "Next year" | "Previous year") {
    fireEvent.click(screen.getByLabelText(label));
  }
});
