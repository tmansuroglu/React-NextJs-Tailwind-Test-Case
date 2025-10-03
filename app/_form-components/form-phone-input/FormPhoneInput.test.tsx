/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UseFormReturn } from "react-hook-form";
import { FormPhoneInput } from "./FormPhoneInput";
import z from "zod";
import TestFormWrapper from "../utils/TestFormWrapper";

jest.mock("@/public/error.svg", () => (props: any) => <svg {...props} />);

jest.mock("@/public/success.svg", () => (props: any) => <svg {...props} />);

const schema = z.object({
  phone: z.string().min(10, { message: "Phone number is required" }),
});

type FormData = z.infer<typeof schema>;

describe("FormPhoneInput", () => {
  it("renders the phone input correctly", () => {
    render(
      <TestFormWrapper>
        <FormPhoneInput name="phone" />
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id");
    expect(input).toHaveAttribute("name", "phone");

    const countryButton = screen.getByRole("combobox", {
      name: "Country selector",
    });
    expect(countryButton).toBeInTheDocument();
  });

  it("renders with a label when provided", () => {
    render(
      <TestFormWrapper>
        <FormPhoneInput name="phone" label="Phone Number" />
      </TestFormWrapper>
    );

    const label = screen.getByText("Phone Number");
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe("LABEL");
  });

  it("updates the form value on user input", async () => {
    const user = userEvent.setup();
    const methodsRef = { current: null as UseFormReturn<FormData> | null };

    render(
      <TestFormWrapper
        schema={schema}
        onMethods={(m) => (methodsRef.current = m)}
      >
        <FormPhoneInput name="phone" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    await waitFor(() => expect(methodsRef.current).toBeDefined());

    const methods = methodsRef.current!;
    const input = screen.getByRole("textbox");

    await user.type(input, "5551234567");

    await waitFor(() => {
      const phoneValue = methods.getValues("phone");
      return expect(phoneValue).toContain("5551234567");
    });
  });

  it("displays success state after valid input and blur", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper schema={schema}>
        <FormPhoneInput name="phone" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");

    await user.type(input, "5551234567");
    await user.tab();

    await waitFor(() =>
      expect(screen.getByTestId("success-icon")).toBeInTheDocument()
    );

    expect(input).toHaveClass("border-brand-primary-green");
  });

  it("displays error state and message when field is invalid", async () => {
    render(
      <TestFormWrapper schema={schema} defaultValues={{ phone: "" }}>
        <FormPhoneInput name="phone" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");

    fireEvent.blur(input);

    await waitFor(() =>
      expect(screen.getByText("Phone number is required")).toBeInTheDocument()
    );

    expect(screen.getByTestId("error-icon")).toBeInTheDocument();
    expect(input).toHaveClass("border-error");
  });

  it("displays error styling on both input and country selector", async () => {
    render(
      <TestFormWrapper schema={schema} defaultValues={{ phone: "" }}>
        <FormPhoneInput name="phone" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");
    const countryButton = screen.getByRole("combobox", {
      name: "Country selector",
    });

    fireEvent.blur(input);

    await waitFor(() =>
      expect(screen.getByText("Phone number is required")).toBeInTheDocument()
    );

    expect(input).toHaveClass("border-error");
    expect(countryButton).toHaveClass("border-error");
  });

  it("displays success styling on both input and country selector", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper schema={schema}>
        <FormPhoneInput name="phone" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");
    const countryButton = screen.getByRole("combobox", {
      name: "Country selector",
    });

    await user.type(input, "5551234567");
    await user.tab();

    await waitFor(() =>
      expect(input).toHaveClass("border-brand-primary-green")
    );

    expect(countryButton).toHaveClass("border-brand-primary-green");
  });

  it("handles blur event and marks field as touched", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper schema={schema}>
        <FormPhoneInput name="phone" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");

    await user.type(input, "5551234567");
    await user.tab();

    await waitFor(() =>
      expect(input).toHaveClass("border-brand-primary-green")
    );

    expect(screen.getByTestId("success-icon")).toBeInTheDocument();
  });

  it("does not display icons or error when untouched and no value", () => {
    render(
      <TestFormWrapper>
        <FormPhoneInput name="phone" />
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).not.toHaveClass("border-error");
    expect(input).not.toHaveClass("border-brand-primary-green");

    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId("success-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-icon")).not.toBeInTheDocument();
  });

  it("applies custom inputClassName", () => {
    render(
      <TestFormWrapper>
        <FormPhoneInput name="phone" inputClassName="custom-class" />
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("applies custom countrySelectorStyleProps buttonClassName", () => {
    render(
      <TestFormWrapper>
        <FormPhoneInput
          name="phone"
          countrySelectorStyleProps={{
            buttonClassName: "custom-button-class",
          }}
        />
      </TestFormWrapper>
    );

    const countryButton = screen.getByRole("combobox", {
      name: "Country selector",
    });
    expect(countryButton).toHaveClass("custom-button-class");
  });

  it("maintains error state styling with custom classes", async () => {
    render(
      <TestFormWrapper schema={schema} defaultValues={{ phone: "" }}>
        <FormPhoneInput
          name="phone"
          inputClassName="custom-input"
          countrySelectorStyleProps={{
            buttonClassName: "custom-button",
          }}
        />
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");
    const countryButton = screen.getByRole("combobox", {
      name: "Country selector",
    });

    fireEvent.blur(input);

    await waitFor(() => expect(input).toHaveClass("border-error"));

    await waitFor(() => expect(input).toHaveClass("custom-input"));

    expect(countryButton).toHaveClass("border-error");
    expect(countryButton).toHaveClass("custom-button");
  });

  it("clears error when valid input is provided", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper schema={schema} defaultValues={{ phone: "" }}>
        <FormPhoneInput name="phone" />
        <button data-testid="dummy">Dummy</button>
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");

    fireEvent.blur(input);

    await waitFor(() =>
      expect(screen.getByText("Phone number is required")).toBeInTheDocument()
    );

    await user.clear(input);
    await user.type(input, "5551234567");
    await user.tab();

    await waitFor(() =>
      expect(
        screen.queryByText("Phone number is required")
      ).not.toBeInTheDocument()
    );

    expect(input).toHaveClass("border-brand-primary-green");
    expect(input).not.toHaveClass("border-error");
  });

  it("handles disabled state", () => {
    render(
      <TestFormWrapper>
        <FormPhoneInput name="phone" disabled />
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");
    const countryButton = screen.getByRole("combobox", {
      name: "Country selector",
    });

    expect(input).toBeDisabled();
    expect(countryButton).toBeDisabled();
  });

  it("passes through additional props to PhoneInput", () => {
    render(
      <TestFormWrapper>
        <FormPhoneInput name="phone" placeholder="Enter phone number" />
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("placeholder", "Enter phone number");
  });
});
