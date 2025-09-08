import { render, screen } from "@testing-library/react";
import { LoadingIndicator } from "./LoadingIndicator";

describe("LoadingIndicator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading indicator with default props", () => {
    render(<LoadingIndicator />);

    const loadingIndicator = screen.getByTestId("loading-indicator");
    expect(loadingIndicator).toBeInTheDocument();
    expect(loadingIndicator).toHaveClass("flex justify-center items-center");
    expect(loadingIndicator).toHaveAttribute("role", "status");
    expect(loadingIndicator).toHaveAttribute("aria-label", "Loading...");
    expect(loadingIndicator).toHaveAttribute("aria-live", "polite");
    expect(loadingIndicator).toHaveAttribute("aria-hidden", "true");
  });

  it("renders with custom aria-label when provided", () => {
    const customAriaLabel = "Custom Loading";
    render(<LoadingIndicator ariaLabel={customAriaLabel} />);

    const loadingIndicator = screen.getByTestId("loading-indicator");
    expect(loadingIndicator).toHaveAttribute("aria-label", customAriaLabel);
  });

  it("renders spinner with correct styling", () => {
    render(<LoadingIndicator />);

    const spinner = screen.getByTestId("loading-indicator").firstChild;
    expect(spinner).toHaveClass(
      "w-4 h-4 border-2 border-t-blue-500 border-gray-200 rounded-full animate-spin"
    );
  });

  it("has accessible structure", () => {
    render(<LoadingIndicator />);

    const loadingIndicator = screen.getByTestId("loading-indicator");
    expect(loadingIndicator).toBeInTheDocument();
    expect(loadingIndicator).toHaveAttribute("aria-label", "Loading...");
    expect(loadingIndicator).toHaveAttribute("aria-live", "polite");
    expect(loadingIndicator).toHaveAttribute("aria-hidden", "true");
  });
});
