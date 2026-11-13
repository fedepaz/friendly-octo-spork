// src/components/common/__tests__/dashboard-protected-layout.spec.tsx
import { render, screen, act } from "@testing-library/react";
import { DashboardProtectedLayout } from "../dashboard-protected-layout";
import { hardRedirect } from "@/lib/navigation";

const replaceMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.raw = () => ({ msg: "Loading..." });
    return t;
  },
}));

jest.mock("@/lib/navigation", () => ({
  hardRedirect: jest.fn(),
}));

const authState = {
  isSignedIn: false,
  loading: false,
  userProfile: { id: "u1", name: "Test" },
  isLoading: false,
  isDatabaseUnavailable: false,
  isPendingPermissions: false,
};

jest.mock("@/features/auth/providers/AuthProvider", () => ({
  useAuthContext: () => authState,
}));

describe("DashboardProtectedLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("redirects signed-out visitors to login via the router", () => {
    render(
      <DashboardProtectedLayout>
        <div>secret</div>
      </DashboardProtectedLayout>,
    );

    expect(replaceMock).toHaveBeenCalledWith("/login");
    expect(screen.queryByText("secret")).toBeNull();
  });

  it("forces a hard navigation when the soft redirect never completes", () => {
    // #50: after a back/forward document load, router.replace silently
    // issues no request — the page hangs on the spinner forever
    render(
      <DashboardProtectedLayout>
        <div>secret</div>
      </DashboardProtectedLayout>,
    );

    expect(hardRedirect).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(800);
    });

    expect(hardRedirect).toHaveBeenCalledWith("/login");
  });

  it("does not redirect signed-in users", () => {
    authState.isSignedIn = true;

    render(
      <DashboardProtectedLayout>
        <div>secret</div>
      </DashboardProtectedLayout>,
    );

    expect(replaceMock).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(hardRedirect).not.toHaveBeenCalled();
    expect(screen.getByText("secret")).toBeInTheDocument();

    authState.isSignedIn = false;
  });
});
