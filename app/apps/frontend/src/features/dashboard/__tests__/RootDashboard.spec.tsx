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

describe("RootDashboard mobile single-scroll layout", () => {
  it("does not clip the dashboard shell below lg (page main is the scroller)", () => {
    const { container } = render(<RootDashboard />);
    const root = container.firstElementChild as HTMLElement;
    // no bare overflow-hidden/flex-1/min-h-0 — those exist only at lg:
    expect(root.className).not.toMatch(/(?:^| )overflow-hidden(?: |$)/);
    expect(root.className).not.toMatch(/(?:^| )flex-1(?: |$)/);
    expect(root.className).toContain("lg:overflow-hidden");
    expect(root.className).toContain("lg:flex-1");
    expect(root.className).toContain("lg:min-h-0");
  });

  it("orders charts before KPIs on mobile so the action buttons end the page", () => {
    render(<RootDashboard />);
    const chartsRoot = document.querySelector(".order-2");
    const kpisRoot = document.querySelector(".order-3");
    expect(chartsRoot).not.toBeNull();
    expect(kpisRoot).not.toBeNull();
    // reset at lg so desktop keeps DOM order (KPIs before charts)
    expect(chartsRoot?.className).toContain("lg:order-none");
    expect(kpisRoot?.className).toContain("lg:order-none");
  });
});
