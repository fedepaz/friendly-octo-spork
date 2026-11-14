// src/lib/api/__tests__/client-fetch.spec.ts
import { clientFetch, ApiError } from "../client-fetch";

describe("clientFetch 401 handling", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  const unauthorized = (body: Record<string, unknown> = {}) => ({
    ok: false,
    status: 401,
    json: async () => body,
  });

  it("does not enter the refresh/redirect flow for a failed login without a session", async () => {
    // #49: a wrong-credentials 401 must NOT trigger logout + hard reload —
    // that navigation wiped the error toast and reset the form.
    // The old code ran logout() (token teardown) + location.href in the
    // refresh-failure block; neither may happen now.
    localStorage.setItem("accessToken", "stale-token");

    const fetchMock = jest.fn().mockResolvedValue(
      unauthorized({ message: "Invalid credentials", code: "AUTH_INVALID_CREDENTIALS" }),
    );
    global.fetch = fetchMock as never;

    await expect(
      clientFetch("auth/login", { method: "POST", body: "{}" }),
    ).rejects.toThrow(ApiError);

    // only the original login request — no /auth/refresh attempt
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toContain("auth/login");

    // no session teardown (old code called logout() here)
    expect(localStorage.getItem("accessToken")).toBe("stale-token");
  });

  it("skips the refresh flow for login even when tokens exist (no retry loop)", async () => {
    // #49 edge: a signed-in user submitting a wrong password on /login —
    // refreshing and retrying the login would loop forever
    localStorage.setItem("refreshToken", "existing-refresh");

    const fetchMock = jest
      .fn()
      .mockResolvedValue(unauthorized({ message: "Invalid credentials" }));
    global.fetch = fetchMock as never;

    await expect(
      clientFetch("auth/login", { method: "POST", body: "{}" }),
    ).rejects.toThrow(ApiError);

    // no refresh attempt (old code called /auth/refresh → 2 fetches)
    expect(fetchMock).toHaveBeenCalledTimes(1);
    // no teardown of the existing session
    expect(localStorage.getItem("refreshToken")).toBe("existing-refresh");
  });

  it("still refreshes and retries when a real session expires", async () => {
    // regression guard: the legit expired-session path must keep working
    localStorage.setItem("refreshToken", "valid-refresh");

    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(unauthorized())
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ accessToken: "new-access" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: "acc-1" }),
      });
    global.fetch = fetchMock as never;

    const result = await clientFetch<{ id: string }>("accounts", {
      method: "GET",
    });

    expect(result).toEqual({ id: "acc-1" });
    // original + refresh + retry
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(String(fetchMock.mock.calls[1][0])).toContain("auth/refresh");
    expect(localStorage.getItem("accessToken")).toBe("new-access");
  });
});
