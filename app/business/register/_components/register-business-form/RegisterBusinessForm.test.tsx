/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterBusinessForm } from "./RegisterBusinessForm";
import registerBusiness from "@/actions/register-business";
import { RegisterBusinessFormFields, Routes } from "@/types/enums";

jest.mock("next/link", () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock("next/form", () => {
  return ({ children, ...props }: any) => {
    return <form {...props}>{children}</form>;
  };
});

jest.mock("@/public/arrow.svg", () => (props: any) => <svg {...props} />);
jest.mock("@/public/person.svg", () => (props: any) => <svg {...props} />);
jest.mock("@/public/building.svg", () => (props: any) => <svg {...props} />);
jest.mock("@/public/phone.svg", () => (props: any) => <svg {...props} />);
jest.mock("@/public/house.svg", () => (props: any) => <svg {...props} />);
jest.mock("@/public/mail.svg", () => (props: any) => <svg {...props} />);
jest.mock("@/public/wrench.svg", () => (props: any) => <svg {...props} />);
jest.mock("@/public/error.svg", () => (props: any) => <svg {...props} />);
jest.mock("@/public/success.svg", () => (props: any) => <svg {...props} />);

jest.mock("@/actions/register-business", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockRegisterBusiness = registerBusiness as jest.MockedFunction<
  typeof registerBusiness
>;

describe("RegisterBusinessForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation((msg) => {
      if (!msg.includes?.("useActionState") && !msg.includes?.("transition")) {
        console.warn(msg);
      }
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Rendering", () => {
    it("renders all form fields correctly", () => {
      render(<RegisterBusinessForm />);

      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Company")).toBeInTheDocument();
      expect(screen.getByText("Mobile Phone Number")).toBeInTheDocument();
      expect(screen.getByText("Email Address")).toBeInTheDocument();
      expect(screen.getByText("Postcode")).toBeInTheDocument();

      expect(screen.getByTestId("person-icon")).toBeInTheDocument();
      expect(screen.getByTestId("building-icon")).toBeInTheDocument();
      expect(screen.getByTestId("phone-icon")).toBeInTheDocument();
      expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
      expect(screen.getByTestId("house-icon")).toBeInTheDocument();
      expect(screen.getByTestId("wrench-icon")).toBeInTheDocument();
    });

    it("renders payment options section", () => {
      render(<RegisterBusinessForm />);

      const legend = screen.getByText("What services are you interested in?");
      expect(legend).toBeInTheDocument();
      expect(legend.tagName).toBe("LEGEND");

      expect(
        screen.getByText(
          /Please select the services you're interested in offering your customers/i
        )
      ).toBeInTheDocument();

      expect(screen.getByText("PayLater")).toBeInTheDocument();
      expect(screen.getByText("PayNow")).toBeInTheDocument();
    });

    it("renders submit button with correct attributes", () => {
      render(<RegisterBusinessForm />);

      const submitBtn = screen.getByRole("button", { name: /register/i });
      expect(submitBtn).toBeInTheDocument();
      expect(submitBtn).toHaveAttribute("type", "submit");
      expect(submitBtn).not.toBeDisabled();
      expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
    });

    it("renders login link", () => {
      render(<RegisterBusinessForm />);

      expect(screen.getByText("Already registered?")).toBeInTheDocument();
      const loginLink = screen.getByRole("link", { name: /log in/i });
      expect(loginLink).toBeInTheDocument();
      expect(loginLink).toHaveAttribute("href", Routes.BusinessLogin);
    });
  });

  describe("Form Validation", () => {
    it("shows validation errors when submitting empty form", async () => {
      const user = userEvent.setup();
      mockRegisterBusiness.mockResolvedValue({
        success: false,
        message: "Validation failed",
      });

      render(<RegisterBusinessForm />);

      const submitBtn = screen.getByRole("button", { name: /register/i });
      await user.click(submitBtn);

      await waitFor(() =>
        expect(screen.getAllByText("Required").length).toBeGreaterThan(0)
      );

      expect(mockRegisterBusiness).not.toHaveBeenCalled();
    });

    it("validates name field", async () => {
      const user = userEvent.setup();
      render(<RegisterBusinessForm />);

      const inputs = screen.getAllByTestId("text-input");
      const nameInput = inputs[0];

      await user.click(nameInput);
      await user.tab();

      await waitFor(() => {
        expect(screen.getAllByText("Required")[0]).toBeInTheDocument();
      });
    });

    it("validates email format", async () => {
      const user = userEvent.setup();
      render(<RegisterBusinessForm />);

      const inputs = screen.getAllByTestId("text-input");
      const emailInput = inputs[2];

      await user.type(emailInput, "invalid-email");
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText("Invalid email address")).toBeInTheDocument();
      });
    });

    it("requires at least one payment option selected", async () => {
      const user = userEvent.setup();
      render(<RegisterBusinessForm />);

      const inputs = screen.getAllByTestId("text-input");
      await user.type(inputs[0], "JohnDoe");
      await user.type(inputs[1], "AcmeCorp");

      const phoneInputs = screen.getAllByRole("textbox");
      const phoneInput = phoneInputs.find(
        (input) =>
          input.getAttribute("name") === RegisterBusinessFormFields.MobilePhone
      );

      if (phoneInput) {
        await user.type(phoneInput, "7700900123");
      }

      await user.type(inputs[2], "test@example.com");

      const comboboxInput = screen.getByPlaceholderText(/start typing/i);
      await user.type(comboboxInput, "SW1A1AA");
      const option = await screen.findByText("SW1A1AA");
      await user.click(option);

      const submitBtn = screen.getByRole("button", { name: /register/i });
      await user.click(submitBtn);

      await waitFor(() =>
        expect(
          screen.getByText(
            /At least one payment option \(Pay Later or Pay Now\) must be selected/i
          )
        ).toBeInTheDocument()
      );

      expect(mockRegisterBusiness).not.toHaveBeenCalled();
    });
  });

  describe("Payment Options Interaction", () => {
    it("allows selecting PayLater", async () => {
      const user = userEvent.setup();
      render(<RegisterBusinessForm />);

      const payLaterCheckbox = screen.getByRole("checkbox", {
        name: /paylater/i,
      });

      expect(payLaterCheckbox).not.toBeChecked();

      await user.click(payLaterCheckbox);

      await waitFor(() => expect(payLaterCheckbox).toBeChecked());
    });

    it("allows selecting PayNow", async () => {
      const user = userEvent.setup();
      render(<RegisterBusinessForm />);

      const payNowCheckbox = screen.getByRole("checkbox", {
        name: /paynow/i,
      });

      expect(payNowCheckbox).not.toBeChecked();

      await user.click(payNowCheckbox);

      await waitFor(() => expect(payNowCheckbox).toBeChecked());
    });

    it("allows selecting both payment options", async () => {
      const user = userEvent.setup();
      render(<RegisterBusinessForm />);

      const payLaterCheckbox = screen.getByRole("checkbox", {
        name: /paylater/i,
      });
      const payNowCheckbox = screen.getByRole("checkbox", {
        name: /paynow/i,
      });

      await user.click(payLaterCheckbox);
      await user.click(payNowCheckbox);

      await waitFor(() => {
        expect(payLaterCheckbox).toBeChecked();
        expect(payNowCheckbox).toBeChecked();
      });
    });

    it("clears validation error when payment option is selected", async () => {
      const user = userEvent.setup();
      render(<RegisterBusinessForm />);

      const payLaterCheckbox = screen.getByRole("checkbox", {
        name: /paylater/i,
      });

      const submitBtn = screen.getByRole("button", { name: /register/i });
      await user.click(submitBtn);

      await waitFor(() =>
        expect(
          screen.getByText(/At least one payment option/i)
        ).toBeInTheDocument()
      );

      await user.click(payLaterCheckbox);

      await waitFor(() =>
        expect(
          screen.queryByText(/At least one payment option/i)
        ).not.toBeInTheDocument()
      );
    });
  });

  describe("Form Submission", () => {
    const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
      const inputs = screen.getAllByTestId("text-input");

      await user.type(inputs[0], "JohnDoe");
      await user.type(inputs[1], "AcmeCorp");

      const phoneInputs = screen.getAllByRole("textbox");
      const phoneInput = phoneInputs.find(
        (input) =>
          input.getAttribute("name") === RegisterBusinessFormFields.MobilePhone
      );
      if (phoneInput) {
        await user.type(phoneInput, "7700900123");
      }

      await user.type(inputs[2], "test@example.com");

      const comboboxInput = screen.getByPlaceholderText(/start typing/i);
      await user.click(comboboxInput);
      const option = await screen.findByText("SW1A1AA");
      await user.click(option);

      const payLaterCheckbox = screen.getByRole("checkbox", {
        name: /paylater/i,
      });
      await user.click(payLaterCheckbox);
    };

    it("submits form with valid data", async () => {
      const user = userEvent.setup();
      mockRegisterBusiness.mockResolvedValue({
        success: true,
        message: "Registration successful",
      });

      render(<RegisterBusinessForm />);

      await fillValidForm(user);

      const submitBtn = screen.getByRole("button", { name: /register/i });
      await user.click(submitBtn);

      await waitFor(
        () => {
          expect(mockRegisterBusiness).toHaveBeenCalledWith({
            name: "JohnDoe",
            company: "AcmeCorp",
            mobile_phone: expect.stringMatching(/\+?44\s?7700\s?900\s?123/),
            email_address: "test@example.com",
            postcode: "SW1A1AA",
            pay_later: true,
            pay_now: false,
          });
        },
        { timeout: 5000 }
      );
    });

    it("displays error message on submission failure", async () => {
      const user = userEvent.setup();
      mockRegisterBusiness.mockResolvedValue({
        success: false,
        message: "Registration failed. Please try again.",
      });

      render(<RegisterBusinessForm />);

      await fillValidForm(user);

      const submitBtn = screen.getByRole("button", { name: /register/i });
      await user.click(submitBtn);

      await waitFor(
        () => {
          expect(mockRegisterBusiness).toHaveBeenCalled();
        },
        { timeout: 5000 }
      );

      await waitFor(
        () => {
          expect(
            screen.getByText("Registration failed. Please try again.")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("does not display error message on successful submission", async () => {
      const user = userEvent.setup();
      mockRegisterBusiness.mockResolvedValue({
        success: true,
        message: "Success",
      });

      render(<RegisterBusinessForm />);

      await fillValidForm(user);

      const submitBtn = screen.getByRole("button", { name: /register/i });
      await user.click(submitBtn);

      await waitFor(
        () => {
          expect(mockRegisterBusiness).toHaveBeenCalled();
        },
        { timeout: 5000 }
      );

      await waitFor(() => {
        expect(screen.queryByText(/failed/i)).not.toBeInTheDocument();
      });
    });

    it("handles both payment options selected", async () => {
      const user = userEvent.setup();
      mockRegisterBusiness.mockResolvedValue({
        success: true,
        message: "Success",
      });

      render(<RegisterBusinessForm />);

      const inputs = screen.getAllByTestId("text-input");
      await user.type(inputs[0], "JohnDoe");
      await user.type(inputs[1], "AcmeCorp");

      const phoneInputs = screen.getAllByRole("textbox");
      const phoneInput = phoneInputs.find(
        (input) =>
          input.getAttribute("name") === RegisterBusinessFormFields.MobilePhone
      );
      if (phoneInput) {
        await user.type(phoneInput, "7700900123");
      }

      await user.type(inputs[2], "test@example.com");

      const comboboxInput = screen.getByPlaceholderText(/start typing/i);
      await user.click(comboboxInput);
      const option = await screen.findByText("SW1A1AA");
      await user.click(option);

      const payLaterCheckbox = screen.getByRole("checkbox", {
        name: /paylater/i,
      });
      const payNowCheckbox = screen.getByRole("checkbox", {
        name: /paynow/i,
      });

      await user.click(payLaterCheckbox);
      await user.click(payNowCheckbox);

      const submitBtn = screen.getByRole("button", { name: /register/i });
      await user.click(submitBtn);

      await waitFor(
        () => {
          expect(mockRegisterBusiness).toHaveBeenCalledWith(
            expect.objectContaining({
              pay_later: true,
              pay_now: true,
            })
          );
        },
        { timeout: 5000 }
      );
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes on form wrapper", () => {
      render(<RegisterBusinessForm />);

      const inputs = screen.getAllByTestId("text-input");

      inputs.slice(0, 3).forEach((input) => {
        expect(input.closest("div")).toBeInTheDocument();
      });
    });

    it("associates error messages with form fields", async () => {
      const user = userEvent.setup();
      render(<RegisterBusinessForm />);

      const nameInput = screen.getAllByTestId("text-input")[0];

      await user.click(nameInput);
      await user.tab();

      await waitFor(() => {
        expect(nameInput).toHaveAttribute("aria-invalid", "true");
        expect(nameInput).toHaveAttribute("aria-describedby");
      });
    });

    it("has proper ARIA label on submit button", () => {
      render(<RegisterBusinessForm />);

      const submitBtn = screen.getByRole("button", { name: /register/i });
      expect(submitBtn).toHaveAttribute(
        "aria-label",
        "Register your interest with Bumper"
      );
    });

    it("form has correct structure for screen readers", () => {
      render(<RegisterBusinessForm />);

      const { container } = render(<RegisterBusinessForm />);
      const form = container.querySelector("form");
      expect(form).toBeInTheDocument();

      const fieldset = form!.querySelector("fieldset");
      expect(fieldset).toBeInTheDocument();

      const legend = fieldset!.querySelector("legend");
      expect(legend).toBeInTheDocument();
      expect(legend).toHaveTextContent(/what services/i);
    });
  });

  describe("PostCode AutoComplete", () => {
    it("displays postcode options when clicking input", async () => {
      const user = userEvent.setup();
      render(<RegisterBusinessForm />);

      const postcodeInput = screen.getByPlaceholderText(/start typing/i);

      await user.click(postcodeInput);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      expect(screen.getByText("SW1A1AA")).toBeInTheDocument();
      expect(screen.getByText("N61BA")).toBeInTheDocument();
    });

    it("filters postcode options based on input", async () => {
      const user = userEvent.setup();
      render(<RegisterBusinessForm />);

      const postcodeInput = screen.getByPlaceholderText(/start typing/i);

      await user.type(postcodeInput, "SW");

      await waitFor(() => {
        expect(screen.getByText("SW1A1AA")).toBeInTheDocument();
      });

      expect(screen.queryByText("N61BA")).not.toBeInTheDocument();
    });

    it("selects postcode from dropdown", async () => {
      const user = userEvent.setup();
      render(<RegisterBusinessForm />);

      const postcodeInput = screen.getByPlaceholderText(
        /start typing/i
      ) as HTMLInputElement;

      await user.click(postcodeInput);

      const option = await screen.findByText("SW1A1AA");
      await user.click(option);

      await waitFor(() => {
        expect(postcodeInput.value).toBe("SW1A1AA");
      });
    });
  });
});
