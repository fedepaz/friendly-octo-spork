// apps/frontend/src/features/auth/hooks/__tests__/useAuth.spec.ts

import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "../useAuth";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TOKEN_KEY = "accessToken";
const USER_KEY = "userProfile";

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
        {children}
      </QueryClientProvider>
    );
  };
}

const mockUser = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Test User",
  email: "test@example.com",
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("useAuth", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("initial state", () => {
    it("should report signed-out state when localStorage is empty", () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isSignedIn).toBe(false);
      expect(result.current.accessToken).toBeNull();
      expect(result.current.user).toBeNull();
      expect(result.current.loading).toBe(false);
    });

    it("should restore signed-in state from localStorage", () => {
      localStorage.setItem(TOKEN_KEY, "stored-token");
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isSignedIn).toBe(true);
      expect(result.current.accessToken).toBe("stored-token");
      expect(result.current.user).toEqual(mockUser);
    });

    it("should handle corrupted JSON in localStorage gracefully", () => {
      localStorage.setItem(TOKEN_KEY, "token");
      localStorage.setItem(USER_KEY, "NOT-VALID-JSON");

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });

      // Should fall back to empty state on parse error
      expect(result.current.isSignedIn).toBe(false);
      expect(result.current.accessToken).toBeNull();
      expect(result.current.user).toBeNull();
    });

    it("should handle missing user key in localStorage", () => {
      localStorage.setItem(TOKEN_KEY, "token");

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });

      // Token is set so isSignedIn is true, but user is null
      expect(result.current.isSignedIn).toBe(true);
      expect(result.current.accessToken).toBe("token");
      expect(result.current.user).toBeNull();
    });
  });

  describe("signIn", () => {
    it("should update state and localStorage on sign-in", async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isSignedIn).toBe(false);

      act(() => {
        result.current.signIn("new-access-token", mockUser);
      });

      await waitFor(() => {
        expect(result.current.isSignedIn).toBe(true);
      });

      expect(result.current.accessToken).toBe("new-access-token");
      expect(result.current.user).toEqual(mockUser);
      expect(localStorage.getItem(TOKEN_KEY)).toBe("new-access-token");
      expect(localStorage.getItem(USER_KEY)).toBe(JSON.stringify(mockUser));
    });

    it("should overwrite previous auth state", async () => {
      localStorage.setItem(TOKEN_KEY, "old-token");
      localStorage.setItem(
        USER_KEY,
        JSON.stringify({ ...mockUser, name: "Old User" }),
      );

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isSignedIn).toBe(true);
      expect(result.current.accessToken).toBe("old-token");

      const newMockUser = { ...mockUser, id: "new-id", name: "New User" };
      act(() => {
        result.current.signIn("new-token", newMockUser);
      });

      await waitFor(() => {
        expect(result.current.accessToken).toBe("new-token");
      });

      expect(result.current.user).toEqual(newMockUser);
    });
  });

  describe("signOut", () => {
    it("should clear state and localStorage on sign-out", async () => {
      localStorage.setItem(TOKEN_KEY, "token-to-clear");
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isSignedIn).toBe(true);

      act(() => {
        result.current.signOut();
      });

      await waitFor(() => {
        expect(result.current.isSignedIn).toBe(false);
      });

      expect(result.current.accessToken).toBeNull();
      expect(result.current.user).toBeNull();
      expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
      expect(localStorage.getItem(USER_KEY)).toBeNull();
    });

    it("should be safe to call signOut when already signed out", () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isSignedIn).toBe(false);

      // Should not throw
      act(() => {
        result.current.signOut();
      });

      expect(result.current.isSignedIn).toBe(false);
      expect(result.current.accessToken).toBeNull();
    });
  });

  describe("signIn followed by signOut", () => {
    it("should complete a full sign-in/sign-out cycle", async () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });

      // Sign in
      act(() => {
        result.current.signIn("cycle-token", mockUser);
      });

      await waitFor(() => {
        expect(result.current.isSignedIn).toBe(true);
      });

      // Sign out
      act(() => {
        result.current.signOut();
      });

      await waitFor(() => {
        expect(result.current.isSignedIn).toBe(false);
      });

      expect(result.current.accessToken).toBeNull();
      expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    });
  });
});
