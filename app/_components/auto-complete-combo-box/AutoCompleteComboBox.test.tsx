import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AutoCompleteComboBox } from "./AutoCompleteComboBox";

const mockItems = [
  { value: "Apple" },
  { value: "Banana" },
  { value: "Cherry" },
  { value: "Date" },
];

describe("AutoCompleteComboBox component", () => {
  it("renders the input and label correctly", () => {
    render(
      <AutoCompleteComboBox
        items={mockItems}
        label="Fruit"
        InputProps={{ id: "fruit-input" }}
      />
    );

    const labelElement = screen.getByText("Fruit");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName).toBe("LABEL");
    expect(labelElement).toHaveAttribute("for", "fruit-input");

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "w-full pl-4 pr-10 py-3 border rounded-4xl font-sm mt-2 outline-0 placeholder:font-sm xl:placeholder:font-xs disabled:bg-brand-light-gray border-brand-secondary-gray"
    );
  });

  it("renders inputSuffix when provided", () => {
    render(<AutoCompleteComboBox items={mockItems} inputSuffix="Suffix" />);

    const suffix = screen.getByText("Suffix");
    expect(suffix).toBeInTheDocument();
    expect(suffix).toHaveClass(
      "absolute right-0 bottom-0 p-4 pointer-events-none"
    );
  });

  it("renders caption when provided", () => {
    render(
      <AutoCompleteComboBox items={mockItems} caption={<p>Test Caption</p>} />
    );

    const caption = screen.getByText("Test Caption");
    expect(caption).toBeInTheDocument();
  });

  it("opens menu on focus and shows all items", async () => {
    const user = userEvent.setup();
    render(<AutoCompleteComboBox items={mockItems} />);

    const input = screen.getByRole("textbox");
    await user.click(input);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(4);
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Cherry")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
  });

  it("filters items based on input value", async () => {
    const user = userEvent.setup();
    render(<AutoCompleteComboBox items={mockItems} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "a");

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
  });

  it('shows "No Result" when no items match', async () => {
    const user = userEvent.setup();
    render(<AutoCompleteComboBox items={mockItems} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "xyz");

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("No Result");
  });

  it("selects an item on click and calls onChange", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<AutoCompleteComboBox items={mockItems} onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.click(screen.getByText("Banana"));

    expect(input).toHaveValue("Banana");
    expect(handleChange).toHaveBeenCalledWith("Banana");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("handles keyboard navigation and selection", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<AutoCompleteComboBox items={mockItems} onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.click(input);
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    expect(input).toHaveValue("Banana");
    expect(handleChange).toHaveBeenCalledWith("Banana");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("sets defaultValue correctly", () => {
    render(<AutoCompleteComboBox items={mockItems} defaultValue="Cherry" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Cherry");
  });

  it("applies custom InputProps including className", () => {
    render(
      <AutoCompleteComboBox
        items={mockItems}
        InputProps={{ className: "bg-blue-100", placeholder: "Select fruit" }}
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass(
      "w-full pl-4 pr-10 py-3 border rounded-4xl font-sm mt-2 outline-0 placeholder:font-sm xl:placeholder:font-xs disabled:bg-brand-light-gray border-brand-secondary-gray bg-blue-100"
    );
    expect(input).toHaveAttribute("placeholder", "Select fruit");
  });

  it("applies custom LabelProps", () => {
    render(
      <AutoCompleteComboBox
        items={mockItems}
        label="Fruit"
        LabelProps={{ className: "text-red-500", id: "label-id" }}
      />
    );

    const labelElement = screen.getByText("Fruit");
    expect(labelElement).toHaveClass("text-red-500");
    expect(labelElement).toHaveAttribute("id", "label-id");
  });

  it("handles disabled state correctly", () => {
    render(
      <AutoCompleteComboBox items={mockItems} InputProps={{ disabled: true }} />
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });
});
