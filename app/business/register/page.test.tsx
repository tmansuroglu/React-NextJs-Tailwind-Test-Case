import { render, screen } from "@testing-library/react";
import { Routes } from "@/types/enums";
import BusinessRegisterPage, { metadata } from "./page";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

jest.mock("@/public/arrow.svg", () => ({
  __esModule: true,
  default: (props: any) => <svg data-testid="arrow-icon" {...props} />,
}));

jest.mock("@/components/main", () => ({
  __esModule: true,
  default: (props: any) => <main data-testid="main" {...props} />,
}));

jest.mock("./_components/register-business-form", () => ({
  __esModule: true,
  default: () => <form data-testid="register-business-form" />,
}));

describe("BusinessRegisterPage component", () => {
  it("exports correct metadata", () => {
    expect(metadata).toEqual({
      title: "Bumper UK - Register Business",
    });
  });

  it("renders Main with correct class", () => {
    render(<BusinessRegisterPage />);

    const main = screen.getByTestId("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("bg-brand-primary-blue pt-30 pb-8");
  });

  it("renders the container div", () => {
    render(<BusinessRegisterPage />);

    const container = screen.getByRole("heading", { level: 1 }).parentElement;
    expect(container).toHaveClass(
      "container mx-auto px-4 relative pt-14 xl:pt-15"
    );
  });

  it("renders the back link with Arrow icon", () => {
    render(<BusinessRegisterPage />);

    const link = screen.getByRole("link", { name: "Back to previous page" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", Routes.Business);
    expect(link).toHaveClass("inline-block p-4 absolute top-0 left-0");

    const arrow = screen.getByTestId("arrow-icon");
    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveAttribute("fill", "white");
    expect(arrow).toHaveClass("size-5 sm:size-8 transform -scale-x-100");
  });

  it("renders the main heading", () => {
    render(<BusinessRegisterPage />);

    const heading = screen.getByRole("heading", {
      name: "Join our network",
      level: 1,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass(
      "font-lg xl:font-xl-plus text-brand-primary-white mb-2 xl:mb-5"
    );
  });

  it("renders the introductory paragraph", () => {
    render(<BusinessRegisterPage />);

    const paragraph = screen.getByText(/Offer/i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass("text-brand-primary-white font-sm mb-8");
  });

  it("renders the form section with heading and description", () => {
    render(<BusinessRegisterPage />);

    const section = screen.getByTestId("register-business-form").parentElement;
    expect(section).toHaveClass(
      "bg-brand-primary-white rounded-4xl px-4 py-6 xl:p-11 border border-brand-secondary-black"
    );

    const h2 = screen.getByRole("heading", {
      name: "Join our network",
      level: 2,
    });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveClass(
      "font-sm-bold xl:font-md-plus-bold text-brand-primary-black mb-1"
    );

    const p = screen.getByText("Free to join, no monthly fees");
    expect(p).toBeInTheDocument();
    expect(p).toHaveClass(
      "font-sm xl:font-md-plus text-brand-primary-black mb-5"
    );
  });

  it("renders the RegisterBusinessForm", () => {
    render(<BusinessRegisterPage />);

    const form = screen.getByTestId("register-business-form");
    expect(form).toBeInTheDocument();
  });
});
