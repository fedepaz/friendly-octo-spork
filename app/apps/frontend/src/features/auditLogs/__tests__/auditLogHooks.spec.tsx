// apps/frontend/src/features/auditLogs/__tests__/auditLogHooks.spec.tsx

import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { useAuditLogs } from "../hooks/auditLogHooks";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { AuditLogDto } from "@repo/shared";
import { auditLogQueryKeys } from "@/lib/queryKeys";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

/** Longer timeout for error-boundary tests (hooks retry: 1 → ~1 s delay). */
const ERROR_TIMEOUT = 5000;

class TestErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    onError?: (error: Error) => void;
  },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: {
    children: React.ReactNode;
    onError?: (error: Error) => void;
  }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div data-testid="error-fallback">{this.state.error?.message}</div>
      );
    }
    return this.props.children;
  }
}

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div data-testid="loading">Loading...</div>}>
          {children}
        </Suspense>
      </QueryClientProvider>
    );
  };
}

function createErrorWrapper(onError?: (error: Error) => void) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <TestErrorBoundary onError={onError}>
          <Suspense fallback={<div data-testid="loading">Loading...</div>}>
            {children}
          </Suspense>
        </TestErrorBoundary>
      </QueryClientProvider>
    );
  };
}

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const mockAuditLogs: AuditLogDto[] = [
  {
    id: "log-001",
    userId: "user-001",
    user: {
      id: "user-001",
      name: "jdoe",
      email: "jdoe@example.com",
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
      name: "jdoe",
      email: "jdoe@example.com",
    },
    action: "UPDATE",
    entityType: "TRANSACTION",
    entityId: "txn-042",
    changes: {
      amount: { before: "100.0000", after: "250.0000" },
      description: { before: "Lunch", after: "Team lunch" },
    },
    endpoint: "/transactions/txn-042",
    method: "POST",
    ipAddress: "10.0.0.5",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)",
    durationMs: 32,
    createdAt: "2026-01-14T08:30:00.000Z" as unknown as Date,
  },
];

// ---------------------------------------------------------------------------
// Tests – useAuditLogs
// ---------------------------------------------------------------------------

describe("useAuditLogs", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should fetch audit logs successfully", async () => {
    server.use(
      http.get(`${BACKEND_URL}/audit-logs`, () => {
        return HttpResponse.json(mockAuditLogs);
      }),
    );

    const { result } = renderHook(() => useAuditLogs(11, 2026), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toHaveLength(2);
    });

    expect(result.current.data[0].action).toBe("CREATE");
    expect(result.current.data[0].entityType).toBe("ACCOUNT");
    expect(result.current.data[1].action).toBe("UPDATE");
    expect(result.current.data[1].entityType).toBe("TRANSACTION");
  });

  it("should return empty array when no logs exist", async () => {
    server.use(
      http.get(`${BACKEND_URL}/audit-logs`, () => {
        return HttpResponse.json([]);
      }),
    );

    const { result } = renderHook(() => useAuditLogs(11, 2026), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });

    expect(result.current.data).toHaveLength(0);
  });

  it("should include user information in audit logs", async () => {
    server.use(
      http.get(`${BACKEND_URL}/audit-logs`, () => {
        return HttpResponse.json(mockAuditLogs);
      }),
    );

    const { result } = renderHook(() => useAuditLogs(11, 2026), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toHaveLength(2);
    });

    expect(result.current.data[0].user?.name).toBe("jdoe");
    expect(result.current.data[0].user?.email).toBe("jdoe@example.com");
  });

  it("should handle error state by throwing to Error Boundary", async () => {
    const onError = jest.fn();

    server.use(
      http.get(`${BACKEND_URL}/audit-logs`, () => {
        return HttpResponse.json(
          { error: { message: "Internal Server Error" } },
          { status: 500 },
        );
      }),
    );

    renderHook(() => useAuditLogs(11, 2026), {
      wrapper: createErrorWrapper(onError),
    });

    await waitFor(
      () => {
        expect(onError).toHaveBeenCalled();
      },
      { timeout: ERROR_TIMEOUT },
    );

    const caughtError = onError.mock.calls[0][0] as Error;
    expect(caughtError).toBeDefined();
  });

  it("should build structured query keys per month and action", () => {
    expect(auditLogQueryKeys.byMonth(11, 2026)).toEqual([
      "auditLog",
      11,
      2026,
      "all",
    ]);
    expect(auditLogQueryKeys.byMonth(12, 2026, "DELETE")).toEqual([
      "auditLog",
      12,
      2026,
      "DELETE",
    ]);
  });

  it("requests the server with month, year and action params", async () => {
    const urls: string[] = [];
    server.use(
      http.get(`${BACKEND_URL}/audit-logs`, ({ request }) => {
        urls.push(request.url);
        return HttpResponse.json([]);
      }),
    );

    renderHook(() => useAuditLogs(11, 2026, "DELETE"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(urls.length).toBeGreaterThan(0);
    });
    expect(urls[0]).toContain("month=11");
    expect(urls[0]).toContain("year=2026");
    expect(urls[0]).toContain("action=DELETE");
  });
});
