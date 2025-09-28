import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhoneInput } from "./PhoneInput";

jest.mock("react-international-phone", () => ({
  PhoneInput: jest.fn(
    ({
      inputClassName,
      countrySelectorStyleProps,
      className,
      inputProps,
      ...props
    }) => (
      <div className={className} data-testid="phone-input-wrapper">
        <button
          className={countrySelectorStyleProps.buttonClassName}
          data-testid="country-selector"
        >
          Country
        </button>
        <input
          data-testid="phone-input"
          className={inputClassName}
          {...inputProps}
          {...props}
        />
      </div>
    )
  ),
}));

describe("PhoneInput component", () => {
  it("renders the phone input wrapper correctly", () => {
    render(<PhoneInput id="test-phone" />);

    const wrapper = screen.getByTestId("phone-input-wrapper");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("mt-2 relative inline-flex w-full");

    const input = screen.getByTestId("phone-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "px-4 py-3 flex-1 border rounded-r-4xl font-sm disabled:bg-brand-light-gray disabled:cursor-not-allowed border-brand-secondary-gray"
    );

    const selector = screen.getByTestId("country-selector");
    expect(selector).toBeInTheDocument();
    expect(selector).toHaveClass(
      "h-full px-4 py-3 cursor-pointer border-l border-t border-b rounded-l-4xl disabled:bg-brand-light-gray disabled:cursor-not-allowed border-brand-secondary-gray"
    );
  });

  it("renders label when provided and associates it with input", () => {
    render(<PhoneInput id="test-phone" label="Phone Label" />);

    const label = screen.getByText("Phone Label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("font-sm text-brand-secondary-black");
    expect(label).toHaveAttribute("for", "test-phone");
  });

  it("applies custom LabelProps including className", () => {
    render(
      <PhoneInput
        id="test-phone"
        label="Phone Label"
        LabelProps={{ className: "text-red-500", id: "label-id" }}
      />
    );

    const label = screen.getByText("Phone Label");
    expect(label).toHaveClass("font-sm text-red-500");
    expect(label).toHaveAttribute("id", "label-id");
  });

  it("renders inputSuffix when provided", () => {
    render(<PhoneInput id="test-phone" inputSuffix="Suffix" />);

    const suffix = screen.getByText("Suffix");
    expect(suffix).toBeInTheDocument();
    expect(suffix).toHaveAttribute("aria-hidden", "true");
    expect(suffix).toHaveClass(
      "absolute right-0 bottom-0 p-4 pointer-events-none"
    );
  });

  it("renders caption when provided", () => {
    render(<PhoneInput id="test-phone" caption={<p>Test Caption</p>} />);

    const caption = screen.getByText("Test Caption");
    expect(caption).toBeInTheDocument();
  });

  it("handles disabled state correctly", () => {
    render(<PhoneInput id="test-phone" disabled />);

    const input = screen.getByTestId("phone-input");
    expect(input).toBeDisabled();
  });

  it("merges additional inputClassName with default classes", () => {
    render(<PhoneInput id="test-phone" inputClassName="bg-blue-100" />);

    const input = screen.getByTestId("phone-input");
    expect(input).toHaveClass(
      "px-4 py-3 flex-1 border rounded-r-4xl font-sm disabled:bg-brand-light-gray disabled:cursor-not-allowed border-brand-secondary-gray bg-blue-100"
    );
  });

  it("applies countrySelectorStyleProps including buttonClassName", () => {
    render(
      <PhoneInput
        id="test-phone"
        countrySelectorStyleProps={{ buttonClassName: "bg-green-100" }}
      />
    );

    const selector = screen.getByTestId("country-selector");
    expect(selector).toHaveClass(
      "h-full px-4 py-3 cursor-pointer border-l border-t border-b rounded-l-4xl disabled:bg-brand-light-gray disabled:cursor-not-allowed border-brand-secondary-gray bg-green-100"
    );
  });

  it("passes additional props to the PhoneInputComponent", () => {
    render(
      <PhoneInput
        id="test-phone"
        placeholder="Enter phone"
        aria-label="Phone label"
      />
    );

    const input = screen.getByTestId("phone-input");
    expect(input).toHaveAttribute("placeholder", "Enter phone");
    expect(input).toHaveAttribute("aria-label", "Phone label");
  });

  it("allows user to type into the input", async () => {
    const user = userEvent.setup();
    render(<PhoneInput id="test-phone" />);

    const input = screen.getByTestId("phone-input") as HTMLInputElement;
    await user.type(input, "1234567890");
    expect(input.value).toBe("1234567890");
  });

  it("calls onChange handler when value changes", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<PhoneInput id="test-phone" onChange={handleChange} />);

    const input = screen.getByTestId("phone-input");
    await user.type(input, "1");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
