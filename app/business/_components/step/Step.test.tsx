import { render, screen } from "@testing-library/react";
import { Step } from "./Step"; // Adjust the import path as needed

describe("Step component", () => {
  const props = {
    number: 1,
    title: "Test Title",
    description: "Test Description",
  };

  it("renders the step with number, title, and description", () => {
    render(<Step {...props} />);

    const step = screen.getByLabelText("1. Test Title");
    expect(step).toBeInTheDocument();
    expect(step).toHaveClass("flex gap-2");

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toHaveClass(
      "font-sm-bold text-brand-primary-black"
    );

    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toHaveClass(
      "font-sm text-brand-primary-black"
    );
  });

  it("renders the number circle with correct styles and aria-hidden", () => {
    render(<Step {...props} />);

    const circle = screen.getByText("1");
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute("aria-hidden", "true");
    expect(circle).toHaveClass(
      "flex items-center justify-center font-xs-bold min-w-6 w-6 h-6 rounded-[50%] border border-brand-secondary-black bg-brand-primary-orange text-brand-secondary-black"
    );
  });

  it("applies data-testid if provided", () => {
    render(<Step {...props} data-testid="custom-test-id" />);

    const step = screen.getByTestId("custom-test-id");
    expect(step).toBeInTheDocument();
  });

  it("renders with different number and content", () => {
    render(
      <Step number={2} title="Another Title" description="Another Desc" />
    );

    expect(screen.getByLabelText("2. Another Title")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Another Title")).toBeInTheDocument();
    expect(screen.getByText("Another Desc")).toBeInTheDocument();
  });
});
