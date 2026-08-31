import { render, screen } from "@testing-library/react";
import { InvestmentsDashboard } from "../components/InvestmentsDashboard";

jest.mock("../components/investments-data-table", () => ({
  InvestmentsDataTable: () => <div data-testid="data-table">DataTable</div>,
}));

const mockLoadingBoundary = jest.fn(({ name, children }) => (
  <div data-testid="loading-boundary" data-name={name}>
    {children}
  </div>
));

jest.mock("@/components/common/loading-boundary", () => ({
  LoadingBoundary: (props: { skeleton: React.ReactNode; name?: string; children: React.ReactNode }) =>
    mockLoadingBoundary(props),
}));

describe("InvestmentsDashboard LoadingBoundary migration", () => {
  beforeEach(() => {
    mockLoadingBoundary.mockClear();
  });

  it("renders with LoadingBoundary wrapper instead of raw Suspense", () => {
    render(<InvestmentsDashboard />);
    expect(screen.getByTestId("data-table")).toBeInTheDocument();
    expect(screen.getByTestId("loading-boundary")).toBeInTheDocument();
    expect(mockLoadingBoundary).toHaveBeenCalledTimes(1);
    expect(mockLoadingBoundary).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "investments",
        skeleton: expect.anything(),
      }),
    );
  });
});
