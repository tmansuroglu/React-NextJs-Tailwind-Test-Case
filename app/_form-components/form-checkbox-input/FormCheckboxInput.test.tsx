/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UseFormReturn } from "react-hook-form";
import { FormCheckboxInput } from "./FormCheckboxInput";
import z from "zod";
import TestFormWrapper from "../utils/TestFormWrapper";

jest.mock("@/public/error.svg", () => (props: any) => <svg {...props} />);

jest.mock("@/public/plus.svg", () => (props: any) => <svg {...props} />);

jest.mock("@/public/tick.svg", () => (props: any) => <svg {...props} />);

const schema = z.object({
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

type FormData = z.infer<typeof schema>;

describe("FormCheckboxInput", () => {
  it("renders the checkbox input correctly", () => {
    render(
      <TestFormWrapper>
        <FormCheckboxInput name="terms" label="Accept Terms" />
      </TestFormWrapper>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("name", "terms");
    expect(checkbox).toHaveAttribute("type", "checkbox");
    expect(checkbox).not.toBeChecked();

    const label = screen.getByText("Accept Terms");
    expect(label).toBeInTheDocument();
  });

  it("updates the form value on user selection", async () => {
    const user = userEvent.setup();
    const methodsRef = { current: null as UseFormReturn<FormData> | null };

    render(
      <TestFormWrapper
        schema={schema}
        onMethods={(m) => (methodsRef.current = m)}
      >
        <FormCheckboxInput name="terms" label="Accept Terms" />
      </TestFormWrapper>
    );

    await waitFor(() => expect(methodsRef.current).toBeDefined());

    const methods = methodsRef.current!;

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    await waitFor(() => {
      expect(methods.getValues("terms")).toBe(true);
    });

    expect(checkbox).toBeChecked();
  });

  it("displays tick icon when checked", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        <FormCheckboxInput name="terms" label="Accept Terms" />
      </TestFormWrapper>
    );

    const checkbox = screen.getByRole("checkbox");

    expect(screen.getByTestId("plus-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("tick-icon")).not.toBeInTheDocument();

    await user.click(checkbox);

    await waitFor(() => {
      expect(screen.getByTestId("tick-icon")).toBeInTheDocument();
    });

    expect(screen.queryByTestId("plus-icon")).not.toBeInTheDocument();
  });

  it("displays error state and message when field is invalid", async () => {
    render(
      <TestFormWrapper schema={schema} defaultValues={{ terms: false }}>
        <FormCheckboxInput name="terms" label="Accept Terms" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Accept Terms").closest("label");

    fireEvent.blur(checkbox);

    await waitFor(() =>
      expect(screen.getByText("You must accept the terms")).toBeInTheDocument()
    );

    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAttribute("aria-describedby");

    expect(label).toHaveClass("border-error");

    expect(screen.getByTestId("error-icon")).toBeInTheDocument();

    const errorMessage = screen.getByText("You must accept the terms");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute(
      "id",
      checkbox.getAttribute("aria-describedby")
    );
  });

  it("handles blur event correctly", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper schema={schema}>
        <FormCheckboxInput name="terms" label="Accept Terms" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    await user.tab();

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });

    expect(screen.getByTestId("tick-icon")).toBeInTheDocument();
  });

  it("does not display error icon when untouched and unchecked", () => {
    render(
      <TestFormWrapper schema={schema}>
        <FormCheckboxInput name="terms" label="Accept Terms" />
      </TestFormWrapper>
    );

    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Accept Terms").closest("label");

    expect(checkbox).not.toBeChecked();
    expect(label).not.toHaveClass("border-error");

    expect(screen.queryByText(/must accept/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("tick-icon")).not.toBeInTheDocument();
    expect(screen.getByTestId("plus-icon")).toBeInTheDocument();
  });

  it("toggles checkbox state on repeated clicks", async () => {
    const user = userEvent.setup();
    const methodsRef = { current: null as UseFormReturn<FormData> | null };

    render(
      <TestFormWrapper
        schema={schema}
        onMethods={(m) => (methodsRef.current = m)}
      >
        <FormCheckboxInput name="terms" label="Accept Terms" />
      </TestFormWrapper>
    );

    await waitFor(() => expect(methodsRef.current).toBeDefined());

    const methods = methodsRef.current!;
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    await waitFor(() => expect(methods.getValues("terms")).toBe(true));
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    await waitFor(() => expect(methods.getValues("terms")).toBe(false));
    expect(checkbox).not.toBeChecked();
  });

  it("supports keyboard navigation with Space key", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        <FormCheckboxInput name="terms" label="Accept Terms" />
      </TestFormWrapper>
    );

    const label = screen.getByText("Accept Terms").closest("label")!;
    const checkbox = screen.getByRole("checkbox");

    label.focus();
    await user.keyboard(" ");

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });

  it("supports keyboard navigation with Enter key", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        <FormCheckboxInput name="terms" label="Accept Terms" />
      </TestFormWrapper>
    );

    const label = screen.getByText("Accept Terms").closest("label")!;
    const checkbox = screen.getByRole("checkbox");

    label.focus();
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });

  it("hides error text when hideErrorText prop is true", async () => {
    render(
      <TestFormWrapper schema={schema} defaultValues={{ terms: false }}>
        <FormCheckboxInput
          name="terms"
          label="Accept Terms"
          hideErrorText={true}
        />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const checkbox = screen.getByRole("checkbox");

    fireEvent.blur(checkbox);

    await waitFor(() => {
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
    });

    expect(
      screen.queryByText("You must accept the terms")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("error-icon")).toBeInTheDocument();
  });

  it("handles disabled state correctly", () => {
    render(
      <TestFormWrapper>
        <FormCheckboxInput name="terms" label="Accept Terms" disabled />
      </TestFormWrapper>
    );

    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Accept Terms").closest("label");

    expect(checkbox).toBeDisabled();
    expect(label).toHaveAttribute("aria-disabled", "true");
  });

  it("does not respond to keyboard events when disabled", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        <FormCheckboxInput name="terms" label="Accept Terms" disabled />
      </TestFormWrapper>
    );

    const label = screen.getByText("Accept Terms").closest("label")!;
    const checkbox = screen.getByRole("checkbox");

    label.focus();
    await user.keyboard(" ");

    expect(checkbox).not.toBeChecked();
  });
});
