// apps/frontend/src/features/auditLogs/__tests__/auditLog-data-table.spec.tsx

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuditLogDataTable } from "../components/auditLog-data-table";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { AuditLogDto } from "@repo/shared";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockAuditLogs: AuditLogDto[] = [
  {
    id: "log-001",
    userId: "user-001",
    user: {
      id: "user-001",
      username: "jdoe",
      firstName: "John",
      lastName: "Doe",
    },
    action: "CREATE",
    entityType: "ACCOUNT",
    entityId: "acc-001",
    changes: { name: { before: null, after: "Savings Account" } },
    endpoint: "/accounts",
    method: "POST",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    durationMs: 45,
    createdAt: "2026-01-15T10:00:00.000Z" as unknown as Date,
  },
  {
    id: "log-002",
    userId: "user-001",
    user: {
      id: "user-001",
      username: "jdoe",
      firstName: "John",
      lastName: "Doe",
    },
    action: "UPDATE",
    entityType: "TRANSACTION",
    entityId: "txn-042",
    changes: {
      amount: { before: "100.0000", after: "250.0000" },
    },
    endpoint: "/transactions/txn-042",
    method: "POST",
    ipAddress: "10.0.0.5",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)",
    durationMs: 32,
    createdAt: "2026-01-14T08:30:00.000Z" as unknown as Date,
  },
  {
    id: "log-003",
    userId: "user-002",
    user: {
      id: "user-002",
      username: "admin",
      firstName: "Admin",
      lastName: "User",
    },
    action: "DELETE",
    entityType: "CARD",
    entityId: "card-099",
    changes: null,
    endpoint: "/cards/card-099",
    method: "DELETE",
    ipAddress: "172.16.0.1",
    userAgent: "Mozilla/5.0 (Linux; Android 14)",
    durationMs: 18,
    createdAt: "2026-01-13T14:20:00.000Z" as unknown as Date,
  },
];

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "Audit Logs",
      description: "System activity records",
      slideOverTitle: "Audit Log Detail",
      logPrefix: "Log",
      action: "action",
      user: "user",
      changes: "changes",
      date: "date",
      ip: "ip",
      device: "device",
      viewDetailsLabel: "viewDetails",
      selectAllLabel: "selectAll",
      selectRowLabel: "selectRow",
      actionsHeader: "actions",
      columnsLabel: "columns",
      searchPlaceholder: "search",
      noResults: "noResults",
      selectedLabel: "selected",
      rowsLabel: "rows",
      pageLabel: "Page",
      ofLabel: "of",
      sortAscLabel: "sortAsc",
      sortDescLabel: "sortDesc",
      clearSortLabel: "clearSort",
      sortAscTooltip: "sortAsc",
      sortDescTooltip: "sortDesc",
      clearSortTooltip: "clearSort",
      closeAction: "Close",
      createAction: "Create",
      createBadge: "NEW",
      viewBadge: "DETAIL",
      cancelAction: "Cancel",
      responsible: "Responsible",
      fullName: "Full name",
      username: "Username",
      internalId: "Internal ID",
      affectedEntity: "Affected Entity",
      resourceType: "Resource type",
      identifier: "Identifier (UUID)",
      changeLog: "Change Log",
      technicalInfo: "Technical Information",
      timestamp: "Timestamp",
      ipAddress: "IP Address",
      notRecorded: "Not recorded",
      platform: "Platform",
      mobile: "Mobile",
      desktop: "Desktop",
    };
    return translations[key] ?? key;
  },
  useLocale: () => "en",
}));

jest.mock("../hooks/auditLogHooks", () => ({
  useAuditLogs: jest.fn(),
}));

jest.mock("@/hooks/usePermission", () => ({
  usePermission: () => ({
    canRead: true,
    canCreate: false,
    canUpdate: false,
    canDelete: false,
  }),
}));

jest.mock("@/hooks/useMediaQuery", () => ({
  useBreakpoint: () => "lg",
}));

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

import { useAuditLogs } from "../hooks/auditLogHooks";

const mockedUseAuditLogs = useAuditLogs as jest.MockedFunction<
  typeof useAuditLogs
>;

function renderDataTable(data: AuditLogDto[] = mockAuditLogs) {
  mockedUseAuditLogs.mockReturnValue({
    data,
    isLoading: false,
    isSuccess: true,
    isError: false,
    isPending: false,
    isFetching: false,
    isRefetching: false,
    error: null,
    status: "success",
    fetchStatus: "idle",
    refetch: jest.fn(),
  } as ReturnType<typeof useAuditLogs>);

  return render(
    <TooltipProvider>
      <AuditLogDataTable />
    </TooltipProvider>,
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("AuditLogDataTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the data table with correct title", async () => {
    renderDataTable();

    expect(screen.getByText("Audit Logs")).toBeInTheDocument();
    expect(
      screen.getByText("System activity records"),
    ).toBeInTheDocument();
  });

  it("should render visible column headers", async () => {
    renderDataTable();

    expect(screen.getByText("action")).toBeInTheDocument();
    expect(screen.getByText("user")).toBeInTheDocument();
    expect(screen.getByText("changes")).toBeInTheDocument();
    expect(screen.getByText("date")).toBeInTheDocument();
  });

  it("should render audit log rows with correct action data", async () => {
    renderDataTable();

    expect(screen.getByText("CREATE")).toBeInTheDocument();
    expect(screen.getByText("UPDATE")).toBeInTheDocument();
    expect(screen.getByText("DELETE")).toBeInTheDocument();
  });

  it("should render user data in the table", async () => {
    renderDataTable();

    // jdoe appears in 2 rows (user-001 has two logs)
    const jdoeElements = screen.getAllByText("jdoe");
    expect(jdoeElements.length).toBeGreaterThanOrEqual(2);

    // admin appears once
    expect(screen.getByText("admin")).toBeInTheDocument();
  });

  it("should display record count", async () => {
    renderDataTable();

    expect(screen.getByText("3 REGISTROS")).toBeInTheDocument();
  });

  it("should render view buttons for each row", async () => {
    renderDataTable();

    const viewButtons = screen.getAllByLabelText("viewDetails");
    expect(viewButtons).toHaveLength(3);
  });

  it("should open the slide-over when view button is clicked", async () => {
    const user = userEvent.setup();
    renderDataTable();

    const viewButtons = screen.getAllByLabelText("viewDetails");
    await user.click(viewButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("Audit Log Detail")).toBeInTheDocument();
    });
  });

  it("should display user info in the detail view", async () => {
    const user = userEvent.setup();
    renderDataTable();

    const viewButtons = screen.getAllByLabelText("viewDetails");
    await user.click(viewButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("Responsible")).toBeInTheDocument();
    });
  });

  it("should display entity type badge in the detail view", async () => {
    const user = userEvent.setup();
    renderDataTable();

    const viewButtons = screen.getAllByLabelText("viewDetails");
    await user.click(viewButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("ACCOUNT")).toBeInTheDocument();
    });
  });

  it("should display technical info in the detail view", async () => {
    const user = userEvent.setup();
    renderDataTable();

    const viewButtons = screen.getAllByLabelText("viewDetails");
    await user.click(viewButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("192.168.1.100")).toBeInTheDocument();
    });
  });

  it("should render empty state when no audit logs exist", async () => {
    renderDataTable([]);

    expect(screen.getByText("noResults")).toBeInTheDocument();
  });
});
