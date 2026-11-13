// src/features/transactions/__tests__/transactions-data-table.spec.tsx
import { render, screen } from "@testing-library/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TransactionsDataTable } from "../components/transactions-data-table";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "Transactions",
      description: "Your transactions",
      slideOverTitle: "Transaction Detail",
      noData: "No data available",
      noDataDescription: "No information available to display",
      noResults: "No results found",
      pageLabel: "PAGE",
      ofLabel: "OF",
      rowsLabel: "Rows",
      selectedLabel: "SELECTED",
      columnsLabel: "Columns",
      searchPlaceholder: "Search...",
      nextPage: "Next page",
      prevPage: "Previous page",
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
    };
    return translations[key] ?? key;
  },
  useLocale: () => "en",
}));

jest.mock("../hooks/transactionsHooks", () => ({
  useTransactionsByMonth: jest.fn(() => ({ data: [] })),
}));

jest.mock("@/hooks/usePermission", () => ({
  usePermission: () => ({
    canRead: true,
    canCreate: false,
    canUpdate: false,
    canDelete: false,
  }),
}));

describe("TransactionsDataTable", () => {
  it("keeps the toolbar rendered when the month is empty (no early-return trap)", () => {
    // #56: the old early-return <EmptyState /> replaced the whole table,
    // hiding the MonthSelector/search so users were trapped on empty months
    render(
      <TooltipProvider>
        <TransactionsDataTable />
      </TooltipProvider>,
    );

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("No data available")).toBeInTheDocument();

    // MonthSelector trigger is present and shows the current year (date-stable)
    const currentYear = String(new Date().getFullYear());
    expect(
      screen.getByRole("button", { name: new RegExp(currentYear) }),
    ).toBeInTheDocument();
  });
});
