import { render, screen } from "@testing-library/react";
import { LogoLink } from "./LogoLink";

jest.mock("@/public/logo.svg", () => {
  const MockLogo = (props: any) => <svg data-testid="logo" {...props} />;
  return MockLogo;
});

describe("LogoLink component", () => {
  it("renders the logo and children correctly", () => {
    render(
      <LogoLink href="/" context="for business">
        Business
      </LogoLink>
    );

    const linkElement = screen.getByRole("link", {
      name: "Bumper for business logo",
    });
    expect(linkElement).toBeInTheDocument();

    const logoElement = screen.getByTestId("logo");
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute("width", "111");
    expect(logoElement).toHaveAttribute("height", "28");
    expect(logoElement).toHaveClass("xl:h-8 xl:w-32");

    const textElement = screen.getByText("Business");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass(
      "text-[11px] font-bold sm:font-xs-bold xl:font-sm-bold"
    );
  });

  it("sets the correct aria-label based on context", () => {
    render(
      <LogoLink href="/" context="for drivers">
        Drivers
      </LogoLink>
    );

    const linkElement = screen.getByRole("link", {
      name: "Bumper for drivers logo",
    });
    expect(linkElement).toBeInTheDocument();
  });

  it("applies default classes to the Link element", () => {
    render(
      <LogoLink href="/" context="for business">
        Test
      </LogoLink>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveClass("flex");
    expect(linkElement).toHaveClass("gap-0.5");
    expect(linkElement).toHaveClass("sm:gap-2");
    expect(linkElement).toHaveClass("items-center");
    expect(linkElement).toHaveClass("px-4");
    expect(linkElement).toHaveClass("py-3");
  });

  it("passes additional props to the Link element", () => {
    render(
      <LogoLink href="/test" context="for business" id="logo-link">
        Test
      </LogoLink>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/test");
    expect(linkElement).toHaveAttribute("id", "logo-link");
  });
});
