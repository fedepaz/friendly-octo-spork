// src/features/transactions/__tests__/transactions-data-table.spec.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TransactionsDataTable } from "../components/transactions-data-table";
import { useTransactionsByMonth } from "../hooks/transactionsHooks";
import type { TransactionDTO } from "@repo/shared";

const mockUseTransactionsByMonth = useTransactionsByMonth as jest.MockedFunction<
  typeof useTransactionsByMonth
>;

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
      account: "Account",
      category: "Category",
      typeHeader: "Type",
      expense: "Expense",
      income: "Income",
      transfer: "Transfer",
      investment: "Investment",
      return: "Return",
      payment: "Payment",
    };
    return translations[key] ?? key;
  },
  useLocale: () => "en",
}));

jest.mock("../hooks/transactionsHooks", () => ({
  useTransactionsByMonth: jest.fn(),
}));

jest.mock("@/hooks/usePermission", () => ({
  usePermission: () => ({
    canRead: true,
    canCreate: false,
    canUpdate: false,
    canDelete: false,
  }),
}));

const makeTx = (
  id: string,
  type: TransactionDTO["type"],
  description: string,
  accountName: string,
  categoryName: string,
): TransactionDTO =>
  ({
    id,
    userId: "u1",
    type,
    amount: "100",
    date: new Date("2026-11-05T10:00:00.000Z"),
    description,
    isBudgetedExpense: false,
    isCardExpense: false,
    sourceAccount: { id: "a1", name: accountName, type: "BANK" },
    category: { id: "c1", name: categoryName },
    createdAt: new Date(),
    updatedAt: new Date(),
  }) as unknown as TransactionDTO;

describe("TransactionsDataTable", () => {
  beforeEach(() => {
    mockUseTransactionsByMonth.mockReturnValue({ data: [] } as never);
  });

  it("offers account, category and type filters (faceted)", async () => {
    // #57: the list only had a global search — no account/category/type
    // filters, even though DataTableFacetedFilter ships with the table.
    mockUseTransactionsByMonth.mockReturnValue({
      data: [
        makeTx("t1", "EXPENSE", "Coffee beans", "Banco Nación", "Groceries"),
        makeTx("t2", "INCOME", "Salary", "Banco Nación", "Income"),
        makeTx("t3", "EXPENSE", "Taxi ride", "Efectivo", "Transport"),
      ],
    } as never);

    render(
      <TooltipProvider>
        <TransactionsDataTable />
      </TooltipProvider>,
    );

    expect(screen.getByRole("button", { name: /Type/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Account/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Category/ })).toBeInTheDocument();

    // selecting a facet actually filters the rows
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Type/ }));
    const options = await screen.findAllByRole("option");
    const expenseOption = options.find((option) =>
      option.textContent?.includes("Expense"),
    );
    expect(expenseOption).toBeDefined();
    await user.click(expenseOption!);
    expect(screen.getByText("Coffee beans")).toBeInTheDocument();
    expect(screen.queryByText("Salary")).toBeNull();
  });

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
