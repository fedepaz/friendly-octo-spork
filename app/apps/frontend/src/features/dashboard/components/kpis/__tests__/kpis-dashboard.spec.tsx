// src/features/dashboard/components/kpis/__tests__/kpis-dashboard.spec.tsx
import { render, screen } from "@testing-library/react";
import { KPIsDashboard } from "../kpis-dashboard";
import { useAccounts } from "@/features/accounts/hooks/accountsHooks";
import {
  useMonthlyIncomeExpense,
  useRecentAccounts,
} from "@/features/dashboard/hooks/dashboardHooks";
import { formatCurrency } from "@/lib/utils";

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
      };
      return translations[key] ?? key;
    };
    return t;
  },
  useLocale: () => "en",
}));

jest.mock("@/providers/wizard-form-provider", () => ({
  useWizard: () => ({ openTransaction: jest.fn(), openCard: jest.fn() }),
}));

jest.mock("@/features/accounts/hooks/accountsHooks", () => ({
  useAccounts: jest.fn(),
}));

jest.mock("@/features/dashboard/hooks/dashboardHooks", () => ({
  useRecentAccounts: jest.fn(),
  useMonthlyIncomeExpense: jest.fn(),
}));

const makeAccount = (id: string, balance: string) =>
  ({ id, name: id, type: "BANK", balance, currency: "ARS" }) as never;

describe("KPIsDashboard", () => {
  beforeEach(() => {
    (useRecentAccounts as jest.Mock).mockReturnValue({
      // only 3 of the 5 accounts — the LIMIT the recent endpoint applies
      data: [makeAccount("a1", "10"), makeAccount("a2", "20"), makeAccount("a3", "30")],
    });
    (useAccounts as jest.Mock).mockReturnValue({
      data: [
        makeAccount("a1", "10"),
        makeAccount("a2", "20"),
        makeAccount("a3", "30"),
        makeAccount("a4", "40"),
        makeAccount("a5", "50"),
      ],
    });
    (useMonthlyIncomeExpense as jest.Mock).mockReturnValue({
      data: [
        { month: "Sep", income: "1000", expenses: "400" },
        { month: "Oct", income: "2000", expenses: "500" },
      ],
    });
  });

  it("sums ALL accounts for Net Worth, not the recent-3", () => {
    // #63.1: the KPI used useRecentAccounts (LIMIT 3) so Net Worth missed
    // every account beyond the three most recently used.
    const { container } = render(<KPIsDashboard month={9} year={2026} />);

    // sum of all five accounts
    expect(container.textContent).toContain(formatCurrency(150));
    // the recent-3 sum must not be what is displayed as Net Worth
    expect(container.textContent).not.toContain(formatCurrency(60));
  });

  it("labels the delta as net flow, not as a net-worth change", () => {
    // #63.2: the delta was net-flow change displayed bare under Net Worth
    render(<KPIsDashboard month={9} year={2026} />);
    expect(screen.getByText(/net flow vs prev\. month/)).toBeInTheDocument();
  });

  it("scopes income and expenses to the selected month", () => {
    // #64: KPIs follow the selected month (October = last of the window)
    const { container } = render(<KPIsDashboard month={9} year={2026} />);

    expect(useMonthlyIncomeExpense).toHaveBeenCalledWith(6, 10, 2026);
    expect(screen.getByText("Income October")).toBeInTheDocument();
    expect(screen.getByText("Expenses October")).toBeInTheDocument();
    expect(container.textContent).toContain(formatCurrency(2000));
    expect(container.textContent).toContain(formatCurrency(500));
  });

  it("does not crash when the income/expense window is empty", () => {
    // latent bug from #64: unguarded [length - 1] threw on empty data
    (useMonthlyIncomeExpense as jest.Mock).mockReturnValue({ data: [] });
    render(<KPIsDashboard month={9} year={2026} />);
    expect(screen.getByText("Net Worth")).toBeInTheDocument();
  });
});
