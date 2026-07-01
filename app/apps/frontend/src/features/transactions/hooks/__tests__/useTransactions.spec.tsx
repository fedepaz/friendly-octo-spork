// apps/frontend/src/features/transactions/hooks/__tests__/useTransactions.spec.tsx

import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import {
  useTransactions,
  useTransactionById,
  useTransactionsByMonth,
} from "../transactionsHooks";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { TransactionDTO, PaginatedResponse } from "@repo/shared";

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
//
// NOTE: MSW's HttpResponse.json() serialises Date objects as ISO strings.
//       The hooks receive raw JSON (not hydrated Date objects) from clientFetch,
//       so fixture dates are plain strings to match what the tests actually see.
// ---------------------------------------------------------------------------

const mockTransactions: TransactionDTO[] = [
  {
    id: "txn-001",
    userId: "user-001",
    type: "EXPENSE",
    amount: "500.0000",
    date: "2026-01-15" as unknown as Date,
    description: "Grocery shopping",
    categoryId: "cat-01",
    sourceAccountId: "acc-001",
    targetAccountId: null,
    recurrenceId: null,
    recurrenceName: null,
    recurrencePartNumber: null,
    isBudgetedExpense: null,
    budgetCategory: null,
    isCardExpense: null,
    cardType: null,
    source: null,
    metadata: null,
    createdAt: "2026-01-15T10:00:00.000Z" as unknown as Date,
    updatedAt: "2026-01-15T10:00:00.000Z" as unknown as Date,
    category: null,
    sourceAccount: null,
    targetAccount: null,
    recurrence: null,
  },
  {
    id: "txn-002",
    userId: "user-001",
    type: "INCOME",
    amount: "3500.0000",
    date: "2026-01-01" as unknown as Date,
    description: "Salary",
    categoryId: "cat-02",
    sourceAccountId: null,
    targetAccountId: "acc-001",
    recurrenceId: null,
    recurrenceName: null,
    recurrencePartNumber: null,
    isBudgetedExpense: null,
    budgetCategory: null,
    isCardExpense: null,
    cardType: null,
    source: null,
    metadata: null,
    createdAt: "2026-01-01T08:00:00.000Z" as unknown as Date,
    updatedAt: "2026-01-01T08:00:00.000Z" as unknown as Date,
    category: null,
    sourceAccount: null,
    targetAccount: null,
    recurrence: null,
  },
];

function paginatedResponse(
  data: TransactionDTO[],
): PaginatedResponse<TransactionDTO> {
  return {
    data,
    total: data.length,
    page: 1,
    limit: 50,
    totalPages: 1,
  };
}

const singleTransaction: TransactionDTO = mockTransactions[0];

// ---------------------------------------------------------------------------
// Tests – useTransactions
// ---------------------------------------------------------------------------

describe("useTransactions", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should fetch transactions successfully", async () => {
    server.use(
      http.get(`${BACKEND_URL}/transactions`, ({ request }) => {
        const url = new URL(request.url);
        expect(url.pathname).toBe("/transactions");

        return HttpResponse.json(paginatedResponse(mockTransactions));
      }),
    );

    const { result } = renderHook(() => useTransactions(), {
      wrapper: createWrapper(),
    });

    // The select option extracts response.data
    await waitFor(() => {
      expect(result.current.data).toHaveLength(2);
    });

    expect(result.current.data[0].type).toBe("EXPENSE");
    expect(result.current.data[1].type).toBe("INCOME");
  });

  it("should pass pagination params correctly", async () => {
    const page2Data: TransactionDTO[] = [mockTransactions[1]];

    server.use(
      http.get(`${BACKEND_URL}/transactions`, ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get("page")).toBe("2");
        expect(url.searchParams.get("limit")).toBe("25");

        return HttpResponse.json(paginatedResponse(page2Data));
      }),
    );

    const { result } = renderHook(() => useTransactions(2, 25), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toHaveLength(1);
    });

    expect(result.current.data[0].id).toBe("txn-002");
  });

  it("should return empty data when no transactions exist", async () => {
    server.use(
      http.get(`${BACKEND_URL}/transactions`, () => {
        return HttpResponse.json(paginatedResponse([]));
      }),
    );

    const { result } = renderHook(() => useTransactions(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });
  });

  it("should handle error state by throwing to Error Boundary", async () => {
    const onError = jest.fn();

    server.use(
      http.get(`${BACKEND_URL}/transactions`, () => {
        return HttpResponse.json(
          { error: { message: "Service Unavailable" } },
          { status: 503 },
        );
      }),
    );

    renderHook(() => useTransactions(), {
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

  it("should return valid query keys", () => {
    // Test query key structure
    expect(["transactions"]).toEqual(["transactions"]);
    expect(["transactions", "byId", "42"]).toEqual(["transactions", "byId", "42"]);
    expect(["transactions", "byMonth", 3, 2026]).toEqual(["transactions", "byMonth", 3, 2026]);
  });
});

// ---------------------------------------------------------------------------
// Tests – useTransactionById
// ---------------------------------------------------------------------------

describe("useTransactionById", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should fetch a single transaction by id", async () => {
    server.use(
      http.get(`${BACKEND_URL}/transactions/${singleTransaction.id}`, () => {
        return HttpResponse.json(singleTransaction);
      }),
    );

    const { result } = renderHook(
      () => useTransactionById(singleTransaction.id),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.data?.type).toBe("EXPENSE");
    });

    expect(result.current.data?.amount).toBe("500.0000");
    expect(result.current.data?.id).toBe("txn-001");
  });

  it("should return null for a non-existent transaction", async () => {
    server.use(
      http.get(`${BACKEND_URL}/transactions/non-existent`, () => {
        return HttpResponse.json(null);
      }),
    );

    const { result } = renderHook(() => useTransactionById("non-existent"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toBeNull();
    });
  });

  it("should handle error state by throwing to Error Boundary", async () => {
    const onError = jest.fn();

    server.use(
      http.get(`${BACKEND_URL}/transactions/err-id`, () => {
        return HttpResponse.json(
          { error: { message: "Not Found" } },
          { status: 404 },
        );
      }),
    );

    renderHook(() => useTransactionById("err-id"), {
      wrapper: createErrorWrapper(onError),
    });

    await waitFor(
      () => {
        expect(onError).toHaveBeenCalled();
      },
      { timeout: ERROR_TIMEOUT },
    );
  });
});

// ---------------------------------------------------------------------------
// Tests – useTransactionsByMonth
// ---------------------------------------------------------------------------

describe("useTransactionsByMonth", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should fetch transactions for a specific month", async () => {
    server.use(
      http.get(`${BACKEND_URL}/transactions/month/1/2026`, () => {
        return HttpResponse.json(mockTransactions);
      }),
    );

    const { result } = renderHook(() => useTransactionsByMonth(1, 2026), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toHaveLength(2);
    });

    expect(result.current.data[0].type).toBe("EXPENSE");
    expect(result.current.data[1].type).toBe("INCOME");
  });

  it("should return empty array for a month with no transactions", async () => {
    server.use(
      http.get(`${BACKEND_URL}/transactions/month/12/2025`, () => {
        return HttpResponse.json([]);
      }),
    );

    const { result } = renderHook(() => useTransactionsByMonth(12, 2025), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });
  });

  it("should handle error state by throwing to Error Boundary", async () => {
    const onError = jest.fn();

    server.use(
      http.get(`${BACKEND_URL}/transactions/month/6/2026`, () => {
        return HttpResponse.json(
          { error: { message: "Internal Server Error" } },
          { status: 500 },
        );
      }),
    );

    renderHook(() => useTransactionsByMonth(6, 2026), {
      wrapper: createErrorWrapper(onError),
    });

    await waitFor(
      () => {
        expect(onError).toHaveBeenCalled();
      },
      { timeout: ERROR_TIMEOUT },
    );
  });
});
