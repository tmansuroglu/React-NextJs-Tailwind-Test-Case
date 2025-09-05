import { render, screen, fireEvent } from "@testing-library/react";
import { useController, useFormContext } from "react-hook-form";
import { FormTextInput } from "./FormTextInput";

// Mock react-hook-form hooks
jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn(),
  useController: jest.fn(),
}));

describe("TextInput", () => {
  const defaultProps = {
    name: "testInput",
    placeholder: "Enter text",
    id: "testInput",
    label: "Test Label",
  };

  // Default mock setup for hooks
  const mockField = {
    value: "",
    onBlur: jest.fn(),
    onChange: jest.fn(),
    ref: jest.fn(),
  };
  const mockFieldState = {
    error: null,
    isTouched: false,
    invalid: false,
  };

  beforeEach(() => {
    // Reset mocks before each test
    (useFormContext as jest.Mock).mockReturnValue({
      control: {},
    });
    (useController as jest.Mock).mockReturnValue({
      field: mockField,
      fieldState: mockFieldState,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders input and label correctly", () => {
    render(<FormTextInput {...defaultProps} />);

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass(
      "border-brand-secondary-gray"
    );
  });

  test("displays default error state on render", () => {
    const errorMessage = "This field is required";
    (useController as jest.Mock).mockReturnValue({
      field: mockField,
      fieldState: {
        error: { message: errorMessage },
        isTouched: false,
        invalid: true,
      },
    });

    render(<FormTextInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-error");
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByAltText("error icon")).toBeInTheDocument();
  });

  test("displays error state when validation fails", () => {
    const errorMessage = "This field is required";
    (useController as jest.Mock).mockReturnValue({
      field: mockField,
      fieldState: {
        error: { message: errorMessage },
        isTouched: true,
        invalid: true,
      },
    });

    render(<FormTextInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-error");
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByAltText("error icon")).toBeInTheDocument();
  });

  test("displays success state when input is valid and touched", () => {
    (useController as jest.Mock).mockReturnValue({
      field: { ...mockField, value: "valid input" },
      fieldState: {
        error: null,
        isTouched: true,
        invalid: false,
      },
    });

    render(<FormTextInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-brand-primary-green");
    expect(screen.getByAltText("success icon")).toBeInTheDocument();
  });

  test("updates value on change", () => {
    const mockOnChange = jest.fn();
    (useController as jest.Mock).mockReturnValue({
      field: { ...mockField, value: "", onChange: mockOnChange },
      fieldState: mockFieldState,
    });

    render(<FormTextInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new value" } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  test("does not show icons when neither success nor error", () => {
    render(<FormTextInput {...defaultProps} />);

    expect(screen.queryByAltText("success icon")).not.toBeInTheDocument();
    expect(screen.queryByAltText("error icon")).not.toBeInTheDocument();
  });
});
