import { render, screen } from "@testing-library/react";
import { LogoLink } from "./LogoLink";
import { Routes } from "../../_types/enums";

describe("LogoLink", () => {
  const contexts: ("for business" | "for drivers")[] = [
    "for business",
    "for drivers",
  ];
  const routes = {
    "for business": Routes.Business,
    "for drivers": Routes.Driver,
  };

  it.each(contexts)(
    "renders logo with correct href and text for %s context",
    (context) => {
      render(
        <LogoLink href={routes[context]} context={context}>
          Bumper {context}
        </LogoLink>
      );
      const link = screen.getByRole("link", { name: `Bumper ${context} logo` });
      expect(link).toHaveAttribute("href", routes[context]);
      expect(screen.getByText(`Bumper ${context}`)).toBeInTheDocument();
    }
  );

  it.each(contexts)(
    "renders image with correct alt text and classes for %s context",
    (context) => {
      render(
        <LogoLink href={routes[context]} context={context}>
          Bumper {context}
        </LogoLink>
      );
      const image = screen.getByAltText("Bumper logo");
      expect(image).toHaveAttribute("src", expect.stringContaining("logo.svg"));
      expect(image).toHaveClass("xl:h-8", "xl:w-[126px]");
      expect(image).toHaveAttribute("width", "111");
      expect(image).toHaveAttribute("height", "28");
    }
  );

  it.each(contexts)("applies aria-label based on %s context", (context) => {
    render(
      <LogoLink href={routes[context]} context={context}>
        Bumper {context}
      </LogoLink>
    );
    const link = screen.getByRole("link", { name: `Bumper ${context} logo` });
    expect(link).toHaveAttribute("aria-label", `Bumper ${context} logo`);
  });

  it("applies aria-current when active", () => {
    render(
      <LogoLink href={Routes.Driver} context="for drivers" aria-current="page">
        Bumper for drivers
      </LogoLink>
    );
    const link = screen.getByRole("link", { name: /Bumper for drivers logo/i });
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("has correct link classes", () => {
    render(
      <LogoLink href={Routes.Business} context="for business">
        Bumper for business
      </LogoLink>
    );
    const link = screen.getByRole("link", {
      name: /Bumper for business logo/i,
    });
    expect(link).toHaveClass("flex", "gap-2", "items-center", "px-4", "py-3");
  });

  it("renders span with correct text classes", () => {
    render(
      <LogoLink href={Routes.Business} context="for business">
        Bumper for business
      </LogoLink>
    );
    const span = screen.getByText("Bumper for business");
    expect(span).toHaveClass("font-xs-bold", "xl:font-sm-bold");
  });
});
