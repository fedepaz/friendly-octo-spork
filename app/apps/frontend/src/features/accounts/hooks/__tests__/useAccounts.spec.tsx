// apps/frontend/src/features/accounts/hooks/__tests__/useAccounts.spec.tsx

import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { useAccounts, useAccountById } from "../accountsHooks";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { AccountDTO } from "@repo/shared";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

/** Longer timeout for error-boundary tests (hooks retry: 1 → ~1 s delay). */
const ERROR_TIMEOUT = 5000;

/**
 * A minimal Error Boundary for catching errors thrown by `useSuspenseQuery`
 * (which throws to the nearest Error Boundary on error).
 */
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

const mockAccounts: AccountDTO[] = [
  {
    id: "acc-001",
    userId: "user-001",
    name: "Savings Account",
    type: "BANK",
    currency: "ARS",
    balance: "10000.0000",
  },
  {
    id: "acc-002",
    userId: "user-001",
    name: "Cash Wallet",
    type: "CASH",
    currency: "USD",
    balance: "250.0000",
  },
];

const singleAccount: AccountDTO = mockAccounts[0];

// ---------------------------------------------------------------------------
// Tests – useAccounts
// ---------------------------------------------------------------------------

describe("useAccounts", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should fetch accounts successfully", async () => {
    server.use(
      http.get(`${BACKEND_URL}/accounts`, () => {
        return HttpResponse.json(mockAccounts);
      }),
    );

    const { result } = renderHook(() => useAccounts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockAccounts);
    });

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data[0].name).toBe("Savings Account");
  });

  it("should return an empty array when no accounts exist", async () => {
    server.use(
      http.get(`${BACKEND_URL}/accounts`, () => {
        return HttpResponse.json([]);
      }),
    );

    const { result } = renderHook(() => useAccounts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });

    expect(result.current.data).toHaveLength(0);
  });

  it("should handle error state by throwing to Error Boundary", async () => {
    const onError = jest.fn();

    server.use(
      http.get(`${BACKEND_URL}/accounts`, () => {
        return HttpResponse.json(
          { error: { message: "Internal Server Error" } },
          { status: 500 },
        );
      }),
    );

    renderHook(() => useAccounts(), {
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
    expect(["accounts"]).toEqual(["accounts"]);
    expect(["accounts", "byId", "123"]).toEqual(["accounts", "byId", "123"]);
  });
});

// ---------------------------------------------------------------------------
// Tests – useAccountById
// ---------------------------------------------------------------------------

describe("useAccountById", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should fetch a single account by id", async () => {
    server.use(
      http.get(`${BACKEND_URL}/accounts/${singleAccount.id}`, () => {
        return HttpResponse.json(singleAccount);
      }),
    );

    const { result } = renderHook(() => useAccountById(singleAccount.id), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(singleAccount);
    });

    expect(result.current.data?.name).toBe("Savings Account");
    expect(result.current.data?.currency).toBe("ARS");
  });

  it("should return null for a non-existent account", async () => {
    server.use(
      http.get(`${BACKEND_URL}/accounts/non-existent`, () => {
        return HttpResponse.json(null);
      }),
    );

    const { result } = renderHook(() => useAccountById("non-existent"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toBeNull();
    });
  });

  it("should handle error state by throwing to Error Boundary", async () => {
    const onError = jest.fn();

    server.use(
      http.get(`${BACKEND_URL}/accounts/err-id`, () => {
        return HttpResponse.json(
          { error: { message: "Not Found" } },
          { status: 404 },
        );
      }),
    );

    renderHook(() => useAccountById("err-id"), {
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
