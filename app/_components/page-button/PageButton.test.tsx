import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PageButton } from "./PageButton";

describe("PageButton component", () => {
  it("renders children correctly", () => {
    render(<PageButton>Click Me</PageButton>);

    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
  });

  it("applies default classes and attributes", () => {
    render(<PageButton>Test</PageButton>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "px-5 py-4 sm:px-4 sm:py-3 cursor-pointer border border-gray-300 text-brand-primary-white rounded-md"
    );
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
    expect(button).not.toHaveAttribute("aria-disabled");
    expect(button).toHaveAttribute("tabIndex", "0");
  });

  it("handles disabled state correctly", () => {
    render(<PageButton disabled>Disabled</PageButton>);

    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveAttribute("tabIndex", "-1");
    expect(button).toHaveClass(
      "aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
    );
  });

  it("calls onClick handler when clicked and not disabled", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(<PageButton onClick={handleClick}>Click Me</PageButton>);

    const button = screen.getByRole("button", { name: "Click Me" });
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick handler when disabled", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(
      <PageButton disabled onClick={handleClick}>
        Disabled
      </PageButton>
    );

    const button = screen.getByRole("button", { name: "Disabled" });
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("passes additional props to the button element", () => {
    render(
      <PageButton id="button-id" aria-label="Custom label">
        Test
      </PageButton>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("id", "button-id");
    expect(button).toHaveAttribute("aria-label", "Custom label");
  });
});
