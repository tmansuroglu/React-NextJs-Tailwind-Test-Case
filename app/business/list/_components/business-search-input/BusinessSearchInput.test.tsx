import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BusinessSearchInput } from "./BusinessSearchInput"; // Adjust the import path as needed
import { useInputValueChange } from "./BusinessSearchInput.utils";

jest.mock("./BusinessSearchInput.utils", () => ({
  useInputValueChange: jest.fn(),
}));

jest.mock("@/components/text-input", () => ({
  __esModule: true,
  default: ({ label, ...props }: any) => (
    <div>
      {label}
      <input data-testid="text-input" {...props} />
    </div>
  ),
}));

jest.mock("@/components/labeled-icon", () => ({
  __esModule: true,
  default: ({ label, IconComponent }: any) => (
    <div data-testid="labeled-icon">
      {label}
      {IconComponent ? <IconComponent /> : null}
    </div>
  ),
}));

jest.mock("@/public/building.svg", () => ({
  __esModule: true,
  default: (props: any) => <svg data-testid="building-icon" {...props} />,
}));

describe("BusinessSearchInput component", () => {
  const mockHandleChange = jest.fn();
  const mockInputValue = "test value";

  beforeEach(() => {
    (useInputValueChange as jest.Mock).mockReturnValue({
      handleInputValueChange: mockHandleChange,
      inputValue: mockInputValue,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders TextInput with correct props from hook", () => {
    render(<BusinessSearchInput />);

    const input = screen.getByTestId("text-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(mockInputValue);
  });

  it("renders label as LabeledIcon with correct label and icon", () => {
    render(<BusinessSearchInput />);

    const labeledIcon = screen.getByTestId("labeled-icon");
    expect(labeledIcon).toBeInTheDocument();
    expect(labeledIcon).toHaveTextContent("Search Company");
    expect(screen.getByTestId("building-icon")).toBeInTheDocument();
  });

  it("calls handleInputValueChange on input change", async () => {
    const user = userEvent.setup();
    render(<BusinessSearchInput />);

    const input = screen.getByTestId("text-input");
    await user.type(input, "new");

    expect(mockHandleChange).toHaveBeenCalledTimes(3);
  });
});
