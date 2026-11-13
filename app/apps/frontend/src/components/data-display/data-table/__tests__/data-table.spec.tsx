// src/components/data-display/data-table/__tests__/data-table.spec.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "../data-table";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      noResults: "No results found",
      noData: "No data available",
      noDataDescription: "No information available to display",
      pageLabel: "PAGE",
      ofLabel: "OF",
      rowsLabel: "Rows",
      selectedLabel: "SELECTED",
      columnsLabel: "Columns",
      searchPlaceholder: "Search...",
      nextPage: "Next page",
      prevPage: "Previous page",
      exportLabel: "Export",
    };
    return translations[key] ?? key;
  },
  useLocale: () => "en",
}));

jest.mock("@/hooks/usePermission", () => ({
  usePermission: () => ({
    canRead: true,
    canCreate: false,
    canUpdate: false,
    canDelete: false,
  }),
}));

interface Row {
  id: number;
  name: string;
}

const columns = [
  { accessorKey: "name" as const, header: "Name" },
];

const makeRows = (count: number): Row[] =>
  Array.from({ length: count }, (_, i) => ({ id: i + 1, name: `Row ${i + 1}` }));

describe("DataTable", () => {
  it("renders the shared EmptyState (not a bare no-results row) when data is empty, keeping the toolbar", () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={[]}
        title="Things"
        tableName="things"
      />,
    );

    // #75: one shared empty treatment — the EmptyState component
    expect(screen.getByText("No data available")).toBeInTheDocument();
    expect(screen.queryByText("No results found")).toBeNull();

    // #56: the toolbar (search) stays reachable around the empty state
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  it("resets to page 1 when the data shrinks below the current page", async () => {
    const user = userEvent.setup();
    const { rerender, container } = render(
      <DataTable
        columns={columns}
        data={makeRows(25)}
        title="Things"
        tableName="things"
      />,
    );

    expect(container.textContent).toContain("PAGE 1 OF 3");

    await user.click(screen.getByLabelText("Next page"));
    expect(container.textContent).toContain("PAGE 2 OF 3");

    // #76: data shrinks to a single page — the page index must not stay on 2
    rerender(
      <DataTable
        columns={columns}
        data={makeRows(3)}
        title="Things"
        tableName="things"
      />,
    );
    expect(container.textContent).toContain("PAGE 1 OF 1");
    expect(container.textContent).not.toContain("PAGE 2 OF 1");
  });
});
