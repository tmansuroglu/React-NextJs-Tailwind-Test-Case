import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CheckboxInput } from "./CheckboxInput";

describe("CheckboxInput component", () => {
  it("renders the label and hidden input correctly", () => {
    render(<CheckboxInput id="test-checkbox" label="Test Label" />);

    const span = screen.getByText("Test Label");
    expect(span).toBeInTheDocument();

    const label = span.parentElement as HTMLLabelElement;
    expect(label).toHaveClass(
      "relative",
      "block",
      "px-4",
      "py-3",
      "rounded-4xl",
      "border",
      "text-left",
      "min-w-32",
      "font-sm",
      "outline-0",
      "focus:outline",
      "cursor-pointer",
      "text-brand-secondary-black",
      "hover:bg-brand-light-gray",
      "hover:text-brand-secondary-black"
    );

    const input = screen.getByRole("checkbox", {
      name: "Test Label",
      hidden: true,
    }) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "checkbox");
    expect(input).toHaveClass("hidden");
    expect(input).not.toBeChecked();
  });

  it("applies checked state classes to label", () => {
    render(
      <CheckboxInput
        id="test-checkbox"
        label="Test Label"
        checked
        onChange={() => {}}
      />
    );

    const span = screen.getByText("Test Label");
    const label = span.parentElement as HTMLLabelElement;
    expect(label).toHaveClass(
      "bg-brand-secondary-black",
      "text-brand-primary-white",
      "hover:bg-brand-secondary-gray",
      "hover:text-brand-primary-white"
    );
  });

  it("applies disabled state classes to label and disables input", () => {
    render(<CheckboxInput id="test-checkbox" label="Test Label" disabled />);

    const span = screen.getByText("Test Label");
    const label = span.parentElement as HTMLLabelElement;
    expect(label).toHaveClass(
      "bg-brand-light-gray",
      "text-brand-secondary-black",
      "cursor-not-allowed"
    );
    expect(label).toHaveAttribute("aria-disabled", "true");

    const input = screen.getByRole("checkbox", {
      name: "Test Label",
      hidden: true,
    });
    expect(input).toBeDisabled();
  });

  it("renders inputSuffix when provided", () => {
    render(
      <CheckboxInput
        id="test-checkbox"
        label="Test Label"
        inputSuffix="Suffix"
      />
    );

    const suffix = screen.getByText("Suffix");
    expect(suffix).toBeInTheDocument();
    expect(suffix).toHaveClass(
      "absolute",
      "right-3",
      "bottom-0.5",
      "-translate-y-full",
      "pointer-events-none"
    );
  });

  it("renders caption when provided", () => {
    render(
      <CheckboxInput
        id="test-checkbox"
        label="Test Label"
        caption={<p>Test Caption</p>}
      />
    );

    const caption = screen.getByText("Test Caption");
    expect(caption).toBeInTheDocument();
  });

  it("toggles checkbox on label click and calls onChange", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(
      <CheckboxInput
        id="test-checkbox"
        label="Test Label"
        onChange={handleChange}
      />
    );

    const span = screen.getByText("Test Label");
    const label = span.parentElement as HTMLLabelElement;
    await user.click(label);

    const input = screen.getByRole("checkbox", {
      name: "Test Label",
      hidden: true,
    }) as HTMLInputElement;
    expect(input).toBeChecked();
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("does not toggle when disabled", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(
      <CheckboxInput
        id="test-checkbox"
        label="Test Label"
        disabled
        onChange={handleChange}
      />
    );

    const span = screen.getByText("Test Label");
    const label = span.parentElement as HTMLLabelElement;
    await user.click(label);

    const input = screen.getByRole("checkbox", {
      name: "Test Label",
      hidden: true,
    }) as HTMLInputElement;
    expect(input).not.toBeChecked();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("toggles on Enter or Space key press", async () => {
    const user = userEvent.setup();
    render(<CheckboxInput id="test-checkbox" label="Test Label" />);

    await user.tab();

    await user.keyboard("{Enter}");

    const input = screen.getByRole("checkbox", {
      name: "Test Label",
      hidden: true,
    }) as HTMLInputElement;
    expect(input).toBeChecked();

    await user.keyboard(" ");
    expect(input).not.toBeChecked();
  });

  it("does not toggle on key press when disabled", async () => {
    const user = userEvent.setup();
    render(<CheckboxInput id="test-checkbox" label="Test Label" disabled />);

    await user.tab();

    await user.keyboard("{Enter}");

    const input = screen.getByRole("checkbox", {
      name: "Test Label",
      hidden: true,
    }) as HTMLInputElement;
    expect(input).not.toBeChecked();
  });

  it("merges custom LabelProps className", () => {
    render(
      <CheckboxInput
        id="test-checkbox"
        label="Test Label"
        LabelProps={{ className: "bg-red-500" }}
      />
    );

    const span = screen.getByText("Test Label");
    const label = span.parentElement as HTMLLabelElement;
    expect(label).toHaveClass("bg-red-500");
  });

  it("merges custom InputSuffixWrapperProps className", () => {
    render(
      <CheckboxInput
        id="test-checkbox"
        label="Test Label"
        inputSuffix="Suffix"
        InputSuffixWrapperProps={{ className: "text-blue-500" }}
      />
    );

    const suffix = screen.getByText("Suffix");
    expect(suffix).toHaveClass(
      "absolute",
      "right-3",
      "bottom-0.5",
      "-translate-y-full",
      "pointer-events-none",
      "text-blue-500"
    );
  });

  it("passes additional props to the input element", () => {
    render(
      <CheckboxInput
        id="test-checkbox"
        label="Test Label"
        aria-label="Custom aria"
      />
    );

    const input = screen.getByRole("checkbox", {
      name: "Custom aria",
      hidden: true,
    });
    expect(input).toHaveAttribute("aria-label", "Custom aria");
  });
});
