import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero"; // Adjust the import path as needed
import { Routes } from "@/types/enums";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

jest.mock("@/public/arrow.svg", () => ({
  __esModule: true,
  default: (props: any) => <svg {...props} />,
}));

jest.mock("@/public/trust-pilot.svg", () => ({
  __esModule: true,
  default: (props: any) => <svg {...props} />,
}));

jest.mock("@/public/five-stars.svg", () => ({
  __esModule: true,
  default: (props: any) => <svg {...props} />,
}));

describe("Hero component", () => {
  it("renders the section with correct attributes and classes", () => {
    render(<Hero />);

    const section = screen.getByTestId("hero-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("aria-labelledby", "hero-title");
    expect(section).toHaveAttribute("role", "banner");
    expect(section).toHaveClass(
      "relative bg-[url(/hero.webp)] min-h-[543px] h-auto w-full pt-24 bg-[34%_100%] bg-no-repeat bg-cover z-0 flex items-center xl:min-h-[743px]"
    );
  });

  it("renders the overlay div", () => {
    render(<Hero />);

    const section = screen.getByTestId("hero-section");
    const overlay = section.children[0] as HTMLElement;
    expect(overlay).toHaveClass(
      "absolute inset-0 bg-brand-opacity-gray opacity-70"
    );
  });

  it("renders the trust pilot rating section", () => {
    render(<Hero />);

    expect(screen.getByText("Excellent")).toBeInTheDocument();
    expect(screen.getByTestId("five-stars-icon")).toBeInTheDocument();
    expect(screen.getByTestId("trust-pilot-icon")).toBeInTheDocument();
  });

  it("renders the hero title", () => {
    render(<Hero />);

    const title = screen.getByRole("heading", {
      name: "BECOME A BUMPER APPROVED DEPENDABLE DEALERSHIP",
    });
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("id", "hero-title");
    expect(title).toHaveClass(
      "font-xl xl:font-3xl text-brand-primary-white break-keep"
    );
  });

  it("renders the description paragraph with link", () => {
    render(<Hero />);

    const paragraph = screen.getByText(/Join our network/);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass(
      "font-sm xl:font-md-plus text-brand-primary-white mt-2"
    );

    const link = screen.getByRole("link", {
      name: /garages and dealerships who already offer Bumper to their customers./,
    });
    expect(link).toHaveAttribute("href", Routes.BusinessList);
    expect(link).toHaveClass(
      "underline text-brand-primary-green xl:font-md-plus-bold"
    );
  });

  it("renders the register interest button", () => {
    render(<Hero />);

    const button = screen.getByRole("link", {
      name: "Register your interest with Bumper",
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", Routes.BusinessRegister);
    expect(button).toHaveClass(
      "btn-primary-over-rounded font-sm xl:font-sm-medium flex gap-2.5 w-fit mt-6"
    );
    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
  });

  it("renders the already registered login link", () => {
    render(<Hero />);

    const text = screen.getByText("Already registered?");
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass(
      "mt-3 flex items-center gap-1 font-sm text-brand-primary-white"
    );

    const link = screen.getByRole("link", {
      name: "Log in to your Bumper account",
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", Routes.BusinessLogin);
    expect(link).toHaveClass("text-brand-primary-green hover:underline");
  });
});
