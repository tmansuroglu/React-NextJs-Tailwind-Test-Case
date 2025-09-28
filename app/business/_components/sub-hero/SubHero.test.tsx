import { render, screen } from "@testing-library/react";
import { SubHero } from "./SubHero";
import { Routes } from "@/types/enums";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("@/public/arrow.svg", () => ({
  __esModule: true,
  default: (props: any) => <svg {...props} />,
}));

jest.mock("@/public/logo.svg", () => ({
  __esModule: true,
  default: (props: any) => <svg {...props} />,
}));

describe("SubHero component", () => {
  it("renders the section with correct classes and attributes", () => {
    render(<SubHero />);

    const section = screen.getByRole("region", { name: /Pay Later Benefits/ });
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("relative container mx-auto px-4 pt-10 pb-6");
    expect(section).toHaveAttribute("aria-labelledby", "subhero-heading");
  });

  it("renders the hidden h2", () => {
    render(<SubHero />);

    const h2 = screen.getByRole("heading", {
      name: "Pay Later Benefits",
      level: 2,
    });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveAttribute("id", "subhero-heading");
    expect(h2).toHaveClass("sr-only");
  });

  it("renders the logo and PAYLATER heading", () => {
    render(<SubHero />);

    const logo = screen.getByTestId("bumper-logo");
    expect(logo).toBeInTheDocument();

    const h3 = screen.getByRole("heading", { name: "PAYLATER", level: 3 });
    expect(h3).toBeInTheDocument();
    expect(h3).toHaveClass(
      "font-2xl lg:font-2xl-wide text-brand-secondary-black"
    );
  });

  it("renders the phone image with correct attributes", () => {
    render(<SubHero />);

    const image = screen.getByTestId("cell-phone");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/phone.webp");
    expect(image).toHaveAttribute(
      "alt",
      "Mobile app illustrating PayLater payment options"
    );
    expect(image).toHaveClass(
      "xl:order-2 object-contain max-h-[552px] xl:max-h-[684px] 2xl:max-h-[552px]"
    );
  });

  it("renders the content paragraphs", () => {
    render(<SubHero />);

    expect(
      screen.getByText(/Give customers more flexibility/)
    ).toBeInTheDocument();
    expect(screen.getByText("No risk to your business.")).toBeInTheDocument();
    expect(
      screen.getByText("No worries for your customers.")
    ).toBeInTheDocument();
    expect(screen.getByText("It's as simple as:")).toBeInTheDocument();
  });

  it("renders the steps list", () => {
    render(<SubHero />);

    const list = screen.getByRole("list", { name: "PayLater process steps" });
    expect(list).toBeInTheDocument();

    expect(screen.getByTestId("step-1")).toBeInTheDocument();
    expect(screen.getByTestId("step-2")).toBeInTheDocument();
    expect(screen.getByTestId("step-3")).toBeInTheDocument();
  });

  it("renders the register interest button", () => {
    render(<SubHero />);

    const button = screen.getByRole("link", {
      name: "Register your interest with Bumper",
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", Routes.BusinessRegister);
    expect(button).toHaveClass(
      "btn-primary-over-rounded font-sm lg:font-sm-medium flex gap-2.5 w-fit mt-6"
    );
    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
  });
});
