import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";
import { usePathname } from "next/navigation";
import { Routes } from "./types/enums";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("RootLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders skip to content link", () => {
    (usePathname as jest.Mock).mockReturnValue(Routes.Business);
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
    const skipLink = screen.getByRole("link", {
      name: /skip to main content/i,
    });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveClass("sr-only");
  });

  it("renders navigation with correct tabs and links for business route", () => {
    (usePathname as jest.Mock).mockReturnValue(Routes.Business);
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
    expect(
      screen.getByRole("navigation", { name: /main navigation/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /for business/i })).toHaveAttribute(
      "href",
      Routes.Business
    );
    expect(screen.getByRole("tab", { name: /for drivers/i })).toHaveAttribute(
      "href",
      Routes.Driver
    );
    expect(
      screen.getByRole("link", { name: /partner login/i })
    ).toHaveAttribute("href", Routes.BusinessLogin);
    expect(screen.getByRole("link", { name: /register/i })).toHaveAttribute(
      "href",
      Routes.BusinessRegister
    );
    expect(
      screen.getByRole("link", { name: /Bumper for business/i })
    ).toHaveAttribute("href", Routes.Business);
  });

  it("renders navigation with correct tabs and links for driver route", () => {
    (usePathname as jest.Mock).mockReturnValue(Routes.Driver);
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
    expect(screen.getByRole("tab", { name: /for business/i })).toHaveAttribute(
      "href",
      Routes.Business
    );
    expect(screen.getByRole("tab", { name: /for drivers/i })).toHaveAttribute(
      "href",
      Routes.Driver
    );
    expect(screen.getByRole("link", { name: /driver login/i })).toHaveAttribute(
      "href",
      Routes.DriverLogin
    );
    expect(screen.getByRole("link", { name: /register/i })).toHaveAttribute(
      "href",
      Routes.DriverRegister
    );
    expect(
      screen.getByRole("link", { name: /Bumper for drivers/i })
    ).toHaveAttribute("href", Routes.Driver);
  });

  it("highlights business tab when on business route", () => {
    (usePathname as jest.Mock).mockReturnValue(Routes.Business);
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
    const businessTab = screen.getByRole("tab", { name: /for business/i });
    expect(businessTab).toHaveAttribute("aria-current", "page");
    expect(businessTab).toHaveAttribute("aria-selected", "true");
  });

  it("highlights driver tab when on driver route", () => {
    (usePathname as jest.Mock).mockReturnValue(Routes.Driver);
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
    const driverTab = screen.getByRole("tab", { name: /for drivers/i });
    expect(driverTab).toHaveAttribute("aria-current", "page");
    expect(driverTab).toHaveAttribute("aria-selected", "true");
  });

  it("applies aria-current to login link when active", () => {
    (usePathname as jest.Mock).mockReturnValue(Routes.BusinessLogin);
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
    const loginLink = screen.getByRole("link", { name: /partner login/i });
    expect(loginLink).toHaveAttribute("aria-current", "page");
  });

  it("applies aria-current to register link when active", () => {
    (usePathname as jest.Mock).mockReturnValue(Routes.BusinessRegister);
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
    const registerLink = screen.getByRole("link", { name: /register/i });
    expect(registerLink).toHaveAttribute("aria-current", "page");
  });

  it("renders children in main content area", () => {
    (usePathname as jest.Mock).mockReturnValue(Routes.Business);
    render(
      <RootLayout>
        <div data-testid="child-content">Test Content</div>
      </RootLayout>
    );
    const mainContent = screen.getByTestId("child-content");
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveTextContent("Test Content");
  });

  it("applies correct classes to navigation elements", () => {
    (usePathname as jest.Mock).mockReturnValue(Routes.Business);
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
    const nav = screen.getByRole("navigation", { name: /main navigation/i });
    expect(nav).toHaveClass("bg-brand-primary-orange");
    const loginLink = screen.getByRole("link", { name: /partner login/i });
    expect(loginLink).toHaveClass(
      "btn-ghost",
      "font-xs-medium",
      "my-2",
      "h-7",
      "hidden",
      " xl:flex",
      "xl:items-center",
      "xl:gap-2"
    );
    const registerLink = screen.getByRole("link", { name: /register/i });
    expect(registerLink).toHaveClass(
      "btn-primary",
      "font-xs",
      "xl:font-sm-plus-medium"
    );
  });
});
