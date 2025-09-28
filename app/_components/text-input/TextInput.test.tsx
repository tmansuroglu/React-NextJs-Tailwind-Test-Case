import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextInput } from "./TextInput";

describe("TextInput component", () => {
  it("renders the input element correctly", () => {
    render(<TextInput id="test-input" />);

    const input = screen.getByTestId("text-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveClass(
      "focus:outline w-full px-4 py-3 border rounded-4xl font-sm mt-2 disabled:bg-brand-light-gray disabled:cursor-not-allowed outline-0 border-brand-secondary-gray"
    );
  });

  it("renders label when provided and associates it with input", () => {
    render(<TextInput id="test-input" label="Test Label" />);

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("font-sm text-brand-secondary-black");
    expect(label).toHaveAttribute("for", "test-input");

    const input = screen.getByLabelText("Test Label");
    expect(input).toBeInTheDocument();
  });

  it("applies custom LabelProps including className", () => {
    render(
      <TextInput
        id="test-input"
        label="Test Label"
        LabelProps={{ className: "text-red-500", id: "label-id" }}
      />
    );

    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("font-sm text-red-500");
    expect(label).toHaveAttribute("id", "label-id");
  });

  it("renders inputSuffix when provided", () => {
    render(<TextInput id="test-input" inputSuffix="Suffix" />);

    const suffix = screen.getByText("Suffix");
    expect(suffix).toBeInTheDocument();
    expect(suffix).toHaveAttribute("aria-hidden", "true");
    expect(suffix).toHaveClass(
      "absolute right-0 bottom-0 p-4 pointer-events-none"
    );
  });

  it("renders caption when provided", () => {
    render(<TextInput id="test-input" caption={<p>Test Caption</p>} />);

    const caption = screen.getByText("Test Caption");
    expect(caption).toBeInTheDocument();
  });

  it("handles disabled state correctly", () => {
    render(<TextInput id="test-input" disabled />);

    const input = screen.getByTestId("text-input");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "true");
  });

  it("merges additional className with default input classes", () => {
    render(<TextInput id="test-input" className="bg-blue-100" />);

    const input = screen.getByTestId("text-input");
    expect(input).toHaveClass(
      "focus:outline w-full px-4 py-3 border rounded-4xl font-sm mt-2 disabled:bg-brand-light-gray disabled:cursor-not-allowed outline-0 border-brand-secondary-gray bg-blue-100"
    );
  });

  it("passes additional props to the input element", () => {
    render(
      <TextInput
        id="test-input"
        placeholder="Enter text"
        aria-label="Input label"
      />
    );

    const input = screen.getByTestId("text-input");
    expect(input).toHaveAttribute("placeholder", "Enter text");
    expect(input).toHaveAttribute("aria-label", "Input label");
  });

  it("allows user to type into the input", async () => {
    const user = userEvent.setup();
    render(<TextInput id="test-input" />);

    const input = screen.getByTestId("text-input") as HTMLInputElement;
    await user.type(input, "Hello");
    expect(input.value).toBe("Hello");
  });

  it("calls onChange handler when value changes", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<TextInput id="test-input" onChange={handleChange} />);

    const input = screen.getByTestId("text-input");
    await user.type(input, "A");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
