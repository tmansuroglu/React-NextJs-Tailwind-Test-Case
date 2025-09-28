import { render, screen } from "@testing-library/react";
import { LoadingIndicator } from "./LoadingIndicator";

describe("LoadingIndicator component", () => {
  it("renders the loading indicator with default props", () => {
    render(<LoadingIndicator />);

    const container = screen.getByTestId("loading-indicator");
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute("role", "status");
    expect(container).toHaveAttribute("aria-label", "Loading...");
    expect(container).toHaveAttribute("aria-live", "polite");
    expect(container).toHaveAttribute("aria-hidden");
    expect(container).toHaveClass("flex justify-center items-center");

    const spinner = container.querySelector("div");
    expect(spinner).toHaveClass("size-2.5");
    expect(spinner).toHaveClass("border-2");
    expect(spinner).toHaveClass("border-gray-200");
    expect(spinner).toHaveClass("border-t-blue-500");
    expect(spinner).toHaveClass("rounded-full");
    expect(spinner).toHaveClass("animate-spin");
  });

  it("applies custom className to the container", () => {
    render(<LoadingIndicator className="mt-4" />);

    const container = screen.getByTestId("loading-indicator");
    expect(container).toHaveClass("flex justify-center items-center");
    expect(container).toHaveClass("mt-4");
  });

  it("applies custom aria-label to the container", () => {
    render(<LoadingIndicator aria-label="Processing..." />);

    const container = screen.getByTestId("loading-indicator");
    expect(container).toHaveAttribute("aria-label", "Processing...");
  });

  it("applies LoaderProps including custom className to the spinner", () => {
    render(
      <LoadingIndicator LoaderProps={{ className: "size-4", id: "spinner" }} />
    );

    const container = screen.getByTestId("loading-indicator");
    const spinner = container.querySelector("div");
    expect(spinner).toHaveClass("size-4");
    expect(spinner).toHaveClass("border-2");
    expect(spinner).toHaveClass("border-gray-200");
    expect(spinner).toHaveClass("border-t-blue-500");
    expect(spinner).toHaveClass("rounded-full");
    expect(spinner).toHaveClass("animate-spin");
    expect(spinner).toHaveAttribute("id", "spinner");
  });
});
