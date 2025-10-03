/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UseFormReturn } from "react-hook-form";
import { FormTextInput } from "./FormTextInput";
import z from "zod";
import TestFormWrapper from "../utils/TestFormWrapper";

jest.mock("@/public/error.svg", () => (props: any) => <svg {...props} />);

jest.mock("@/public/success.svg", () => (props: any) => <svg {...props} />);

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
});

type FormData = z.infer<typeof schema>;

describe("FormTextInput", () => {
  it("renders the text input correctly", () => {
    render(
      <TestFormWrapper>
        <FormTextInput name="username" />
      </TestFormWrapper>
    );

    const input = screen.getByTestId("text-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("name", "username");
    expect(input).toHaveAttribute("id");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("renders with a label when provided", () => {
    render(
      <TestFormWrapper>
        <FormTextInput name="username" label="Username" />
      </TestFormWrapper>
    );

    const label = screen.getByText("Username");
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe("LABEL");

    const input = screen.getByTestId("text-input");
    expect(label).toHaveAttribute("for", input.getAttribute("id"));
  });

  it("updates the form value on user input", async () => {
    const user = userEvent.setup();
    const methodsRef = { current: null as UseFormReturn<FormData> | null };

    render(
      <TestFormWrapper
        schema={schema}
        defaultValues={{ username: "" }}
        onMethods={(m) => (methodsRef.current = m)}
      >
        <FormTextInput name="username" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    await waitFor(() => expect(methodsRef.current).toBeDefined());

    const methods = methodsRef.current!;
    const input = screen.getByTestId("text-input");

    await user.type(input, "john");

    await waitFor(() => expect(methods.getValues("username")).toBe("john"));
  });

  it("displays success state after valid input and blur", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper schema={schema} defaultValues={{ username: "" }}>
        <FormTextInput name="username" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByTestId("text-input");

    await user.type(input, "john");
    await user.tab();

    await waitFor(() =>
      expect(screen.getByTestId("success-icon")).toBeInTheDocument()
    );

    expect(input).toHaveClass("border-brand-primary-green");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("displays error state and message when field is invalid", async () => {
    render(
      <TestFormWrapper schema={schema} defaultValues={{ username: "" }}>
        <FormTextInput name="username" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByTestId("text-input");

    fireEvent.blur(input);

    await waitFor(() =>
      expect(
        screen.getByText("Username must be at least 3 characters")
      ).toBeInTheDocument()
    );

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby");

    expect(input).toHaveClass("border-error");
    expect(screen.getByTestId("error-icon")).toBeInTheDocument();

    const errorMessage = screen.getByText(
      "Username must be at least 3 characters"
    );
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute(
      "id",
      input.getAttribute("aria-describedby")
    );
  });

  it("handles blur event and marks field as touched", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper schema={schema} defaultValues={{ username: "" }}>
        <FormTextInput name="username" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByTestId("text-input");

    await user.type(input, "john");
    await user.tab();

    await waitFor(() =>
      expect(input).toHaveClass("border-brand-primary-green")
    );

    expect(screen.getByTestId("success-icon")).toBeInTheDocument();
  });

  it("does not display icons or error when untouched and no value", () => {
    render(
      <TestFormWrapper>
        <FormTextInput name="username" />
      </TestFormWrapper>
    );

    const input = screen.getByTestId("text-input");
    expect(input).not.toHaveClass("border-error");
    expect(input).not.toHaveClass("border-brand-primary-green");

    expect(screen.queryByText(/must be at least/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId("success-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-icon")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <TestFormWrapper>
        <FormTextInput name="username" className="custom-class" />
      </TestFormWrapper>
    );

    const input = screen.getByTestId("text-input");
    expect(input).toHaveClass("custom-class");
  });

  it("maintains error state styling with custom classes", async () => {
    render(
      <TestFormWrapper schema={schema} defaultValues={{ username: "" }}>
        <FormTextInput name="username" className="custom-input" />
      </TestFormWrapper>
    );

    const input = screen.getByTestId("text-input");

    fireEvent.blur(input);

    await waitFor(() =>
      expect(
        screen.getByText("Username must be at least 3 characters")
      ).toBeInTheDocument()
    );

    expect(input).toHaveClass("custom-input");
    expect(screen.getByTestId("error-icon")).toBeInTheDocument();
  });

  it("clears error when valid input is provided", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper schema={schema} defaultValues={{ username: "" }}>
        <FormTextInput name="username" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByTestId("text-input");

    fireEvent.blur(input);

    await waitFor(() =>
      expect(
        screen.getByText("Username must be at least 3 characters")
      ).toBeInTheDocument()
    );

    await user.type(input, "john");
    await user.tab();

    await waitFor(() =>
      expect(
        screen.queryByText("Username must be at least 3 characters")
      ).not.toBeInTheDocument()
    );

    expect(input).toHaveClass("border-brand-primary-green");
    expect(input).not.toHaveClass("border-error");
  });

  it("handles disabled state", () => {
    render(
      <TestFormWrapper>
        <FormTextInput name="username" disabled />
      </TestFormWrapper>
    );

    const input = screen.getByTestId("text-input");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "true");
  });

  it("passes through additional props to TextInput", () => {
    render(
      <TestFormWrapper>
        <FormTextInput name="username" placeholder="Enter username" />
      </TestFormWrapper>
    );

    const input = screen.getByTestId("text-input");
    expect(input).toHaveAttribute("placeholder", "Enter username");
  });

  it("handles different input types", () => {
    render(
      <TestFormWrapper>
        <FormTextInput name="email" type="email" />
      </TestFormWrapper>
    );

    const input = screen.getByTestId("text-input");
    expect(input).toHaveAttribute("type", "email");
  });

  it("displays error for partially valid input", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper schema={schema} defaultValues={{ username: "" }}>
        <FormTextInput name="username" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByTestId("text-input");

    await user.type(input, "ab");
    await user.tab();

    await waitFor(() =>
      expect(
        screen.getByText("Username must be at least 3 characters")
      ).toBeInTheDocument()
    );

    expect(input).toHaveClass("border-error");
    expect(screen.getByTestId("error-icon")).toBeInTheDocument();
  });

  it("applies custom LabelProps", () => {
    render(
      <TestFormWrapper>
        <FormTextInput
          name="username"
          label="Username"
          LabelProps={{ className: "custom-label" }}
        />
      </TestFormWrapper>
    );

    const label = screen.getByText("Username");
    expect(label).toHaveClass("custom-label");
  });

  it("handles focus and blur without interaction", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper schema={schema} defaultValues={{ username: "" }}>
        <FormTextInput name="username" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByTestId("text-input");

    await user.click(input);
    await user.tab();

    await waitFor(() =>
      expect(
        screen.getByText("Username must be at least 3 characters")
      ).toBeInTheDocument()
    );

    expect(input).toHaveClass("border-error");
  });
});
