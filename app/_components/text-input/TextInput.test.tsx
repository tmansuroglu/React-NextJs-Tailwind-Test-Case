import { render, screen } from "@testing-library/react";
import { TextInput, TextInputProps } from "./TextInput";

describe("TextInput", () => {
  const defaultProps: TextInputProps = {
    label: "Test Label",
    id: "test-input",
    name: "test",
    placeholder: "Enter text",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input with label and correct styling", () => {
    render(<TextInput {...defaultProps} />);

    const input = screen.getByTestId("text-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "w-full px-4 py-3 border rounded-4xl font-sm mt-2"
    );
    expect(input).toHaveClass("border-brand-secondary-gray");
    expect(input).toHaveAttribute("placeholder", "Enter text");

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("font-sm text-brand-secondary-black");
    expect(label).toHaveAttribute("for", "test-input");
  });

  it("renders input without label when label prop is not provided", () => {
    render(<TextInput {...defaultProps} label={undefined} />);

    const input = screen.getByTestId("text-input");
    expect(input).toBeInTheDocument();
    expect(screen.queryByText("Test Label")).not.toBeInTheDocument();
  });

  it("renders input suffix when provided", () => {
    render(<TextInput {...defaultProps} inputSuffix={<span>Suffix</span>} />);

    const suffix = screen.getByText("Suffix");
    expect(suffix).toBeInTheDocument();
    expect(suffix.parentElement).toHaveClass(
      "absolute right-0 bottom-0 p-4 pointer-events-none"
    );
    expect(suffix.parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("renders caption when provided", () => {
    render(<TextInput {...defaultProps} caption={<span>Caption</span>} />);

    const caption = screen.getByText("Caption");
    expect(caption).toBeInTheDocument();
  });

  it("applies custom className to input", () => {
    render(<TextInput {...defaultProps} className="custom-class" />);

    const input = screen.getByTestId("text-input");
    expect(input).toHaveClass("custom-class");
    expect(input).toHaveClass("w-full px-4 py-3 border rounded-7");
  });

  it("applies custom LabelProps className and attributes", () => {
    const labelProps = { className: "custom-label", "data-test": "label-test" };
    render(<TextInput {...defaultProps} LabelProps={labelProps} />);

    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("custom-label");
    expect(label).toHaveClass("font-sm text-brand-secondary-black");
    expect(label).toHaveAttribute("data-test", "label-test");
  });

  it("handles disabled state correctly", () => {
    render(<TextInput {...defaultProps} disabled />);

    const input = screen.getByTestId("text-input");
    expect(input).toBeDisabled();
    expect(input).toHaveClass(
      "disabled:bg-brand-light-gray disabled:cursor-not-allowed"
    );
    expect(input).toHaveAttribute("aria-disabled", "true");
  });

  it("forwards input props correctly", () => {
    render(<TextInput {...defaultProps} type="email" required />);

    const input = screen.getByTestId("text-input");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeRequired();
  });

  it("has accessible structure", () => {
    render(<TextInput {...defaultProps} />);

    const input = screen.getByRole("textbox", { name: "Test Label" });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "test-input");
    expect(input).toHaveAttribute("name", "test");

    const label = screen.getByText("Test Label");
    expect(label).toHaveAttribute("for", "test-input");
  });

  it("renders with complex ReactNode label and caption", () => {
    const complexLabel = (
      <div>
        <span>Big</span> Label
      </div>
    );
    const complexCaption = (
      <div>
        <span>Complex</span> Caption
      </div>
    );
    render(
      <TextInput
        {...defaultProps}
        label={complexLabel}
        caption={complexCaption}
      />
    );

    expect(screen.getByText("Big")).toBeInTheDocument();
    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByText("Caption")).toBeInTheDocument();
  });
});
