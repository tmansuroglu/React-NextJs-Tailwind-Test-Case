import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UseFormReturn } from "react-hook-form";
import { FormAutoCompleteComboBox } from "./FormAutoCompleteComboBox";
import z from "zod";
import TestFormWrapper from "../utils/TestFormWrapper";

jest.mock("@/public/error.svg", () => (props: any) => <svg {...props} />);

jest.mock("@/public/success.svg", () => (props: any) => <svg {...props} />);

const sampleOptions = [
  { value: "apple", label: "apple" },
  { value: "banana", label: "banana" },
  { value: "cherry", label: "cherry" },
];

const schema = z.object({
  fruit: z.string().min(1, { message: "Fruit is required" }),
});

type FormData = z.infer<typeof schema>;

describe("FormAutoCompleteComboBox", () => {
  it("renders the combo box input correctly", () => {
    render(
      <TestFormWrapper>
        <FormAutoCompleteComboBox name="fruit" items={sampleOptions} />
      </TestFormWrapper>
    );

    const combobox = screen.getByRole("combobox");
    expect(combobox).toBeInTheDocument();
    expect(combobox).toHaveAttribute("aria-expanded", "false");

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "fruit");
    expect(input).toHaveAttribute("autocomplete", "fruit");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("updates the form value on user selection", async () => {
    const user = userEvent.setup();
    const methodsRef = { current: null as UseFormReturn<FormData> | null };

    render(
      <TestFormWrapper
        schema={schema}
        onMethods={(m) => (methodsRef.current = m)}
      >
        <FormAutoCompleteComboBox name="fruit" items={sampleOptions} />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    await waitFor(() => expect(methodsRef.current).toBeDefined());

    const methods = methodsRef.current!;

    const input = screen.getByRole("textbox");

    await user.type(input, "ban");

    await waitFor(() =>
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-expanded",
        "true"
      )
    );

    expect(screen.getByRole("listbox")).toBeInTheDocument();

    const option = screen.getByRole("option", { name: "banana" });
    await user.click(option);

    expect(methods.getValues("fruit")).toBe("banana");
  });

  it("displays success state after valid input and blur", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper schema={schema}>
        <FormAutoCompleteComboBox name="fruit" items={sampleOptions} />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");

    await user.type(input, "app");

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });
    await user.click(screen.getByRole("option", { name: "apple" }));

    await user.tab();

    await waitFor(() =>
      expect(input).toHaveClass("border-brand-primary-green")
    );

    expect(screen.getByTestId("success-icon")).toBeInTheDocument();
  });

  it("displays error state and message when field is invalid", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper schema={schema} defaultValues={{ fruit: "" }}>
        <FormAutoCompleteComboBox name="fruit" items={sampleOptions} />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");

    await user.click(input);
    await user.tab();

    await waitFor(() =>
      expect(screen.getByText("Fruit is required")).toBeInTheDocument()
    );

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby");

    expect(input).toHaveClass("border-error");

    expect(screen.getByTestId("error-icon")).toBeInTheDocument();

    const errorMessage = screen.getByText("Fruit is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute(
      "id",
      input.getAttribute("aria-describedby")
    );
  });

  it("handles blur event and marks field as touched", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        <FormAutoCompleteComboBox name="fruit" items={sampleOptions} />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");

    await user.click(input);
    await user.tab();

    await waitFor(() => {
      expect(input).toHaveClass("border-brand-primary-green");
    });

    expect(screen.getByTestId("success-icon")).toBeInTheDocument();
  });

  it("does not display icons or error when untouched and no value", () => {
    render(
      <TestFormWrapper>
        <FormAutoCompleteComboBox name="fruit" items={sampleOptions} />
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).not.toHaveClass("border-error");
    expect(input).not.toHaveClass("border-brand-primary-green");

    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();

    expect(screen.queryByTestId("success-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-icon")).not.toBeInTheDocument();
  });
});
