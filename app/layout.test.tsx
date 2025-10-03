/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";
import { Routes } from "./_types/enums";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/public/login.svg", () => (props: any) => <svg {...props} />);

jest.mock("@/public/logo.svg", () => (props: any) => <svg {...props} />);

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("RootLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    const originalError = console.error;
    jest.spyOn(console, "error").mockImplementation((...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("cannot be a child of")
      ) {
        return;
      }
      originalError.call(console, ...args);
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("renders the basic layout structure", () => {
    mockUsePathname.mockReturnValue(Routes.Driver);

    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("Skip to main content")).toBeInTheDocument();
  });

  it("renders driver context when on driver pages", () => {
    mockUsePathname.mockReturnValue(Routes.Driver);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    expect(screen.getByText("for drivers")).toBeInTheDocument();
    expect(screen.getByText("Driver Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Driver Login")).toBeInTheDocument();
  });

  it("renders business context when on business pages", () => {
    mockUsePathname.mockReturnValue(Routes.Business);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    expect(screen.getByText("for business")).toBeInTheDocument();
    expect(screen.getByText("Partner Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Partner Login")).toBeInTheDocument();
  });

  it("highlights the business tab when on business pages", () => {
    mockUsePathname.mockReturnValue(Routes.Business);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const businessTab = screen.getByRole("link", { name: "For business" });
    expect(businessTab).toBeInTheDocument();
  });

  it("highlights the driver tab when on driver pages", () => {
    mockUsePathname.mockReturnValue(Routes.Driver);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const driverTab = screen.getByRole("link", { name: "For drivers" });
    expect(driverTab).toBeInTheDocument();
  });

  it("renders login link with correct href for driver pages", () => {
    mockUsePathname.mockReturnValue(Routes.Driver);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const loginLink = screen.getByLabelText("Driver Login");
    expect(loginLink).toHaveAttribute("href", Routes.DriverLogin);
  });

  it("renders login link with correct href for business pages", () => {
    mockUsePathname.mockReturnValue(Routes.Business);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const loginLink = screen.getByLabelText("Partner Login");
    expect(loginLink).toHaveAttribute("href", Routes.BusinessLogin);
  });

  it("renders register link with correct href for driver pages", () => {
    mockUsePathname.mockReturnValue(Routes.Driver);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const registerLink = screen.getByLabelText("Register");
    expect(registerLink).toHaveAttribute("href", Routes.DriverRegister);
  });

  it("renders register link with correct href for business pages", () => {
    mockUsePathname.mockReturnValue(Routes.Business);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const registerLink = screen.getByLabelText("Register");
    expect(registerLink).toHaveAttribute("href", Routes.BusinessRegister);
  });

  it("sets aria-current on register link when on register page", () => {
    mockUsePathname.mockReturnValue(Routes.DriverRegister);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const registerLink = screen.getByLabelText("Register");
    expect(registerLink).toHaveAttribute("aria-current", "page");
  });

  it("sets aria-current on login link when on login page", () => {
    mockUsePathname.mockReturnValue(Routes.BusinessLogin);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const loginLink = screen.getByLabelText("Partner Login");
    expect(loginLink).toHaveAttribute("aria-current", "page");
  });

  it("renders navigation with proper aria labels", () => {
    mockUsePathname.mockReturnValue(Routes.Driver);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "Main navigation");

    const tablist = screen.getByRole("tablist");
    expect(tablist).toHaveAttribute("aria-label", "Navigation tabs");
  });

  it("renders tabs with proper aria attributes", () => {
    mockUsePathname.mockReturnValue(Routes.Driver);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(2);

    tabs.forEach((tab) => {
      expect(tab).toHaveAttribute("aria-selected");
    });
  });

  it("renders skip to main content link", () => {
    mockUsePathname.mockReturnValue(Routes.Driver);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const skipLink = screen.getByText("Skip to main content");
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("renders main content with correct id", () => {
    mockUsePathname.mockReturnValue(Routes.Driver);

    render(
      <RootLayout>
        <div data-testid="child-content">Child Content</div>
      </RootLayout>
    );

    const mainContent = screen.getByTestId("child-content").parentElement;
    expect(mainContent).toHaveAttribute("id", "main-content");
  });

  it("renders login icon", () => {
    mockUsePathname.mockReturnValue(Routes.Driver);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId("login-icon")).toBeInTheDocument();
  });

  it("renders both tab links", () => {
    mockUsePathname.mockReturnValue(Routes.Driver);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    expect(
      screen.getByRole("link", { name: "For business" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "For drivers" })
    ).toBeInTheDocument();
  });

  it("handles nested business routes correctly", () => {
    mockUsePathname.mockReturnValue(`${Routes.Business}/some-page`);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    expect(screen.getByText("for business")).toBeInTheDocument();
    expect(screen.getByText("Partner Login")).toBeInTheDocument();
  });

  it("logo link points to business route when on business pages", () => {
    mockUsePathname.mockReturnValue(Routes.Business);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const logoLink = screen.getByLabelText("Bumper for business logo");
    expect(logoLink).toHaveAttribute("href", Routes.Business);
  });

  it("logo link points to driver route when on driver pages", () => {
    mockUsePathname.mockReturnValue(Routes.Driver);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const logoLink = screen.getByLabelText("Bumper for drivers logo");
    expect(logoLink).toHaveAttribute("href", Routes.Driver);
  });

  it("sets aria-current on logo link when on home page", () => {
    mockUsePathname.mockReturnValue(Routes.Business);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const logoLink = screen.getByLabelText("Bumper for business logo");
    expect(logoLink).toHaveAttribute("aria-current", "page");
  });

  it("renders logo icon", () => {
    mockUsePathname.mockReturnValue(Routes.Driver);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId("logo-icon")).toBeInTheDocument();
  });

  it("renders highlight indicator on business tab when on business pages", () => {
    mockUsePathname.mockReturnValue(Routes.Business);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const highlights = screen.getAllByTestId("highlight-indicator");
    expect(highlights).toHaveLength(1);
  });

  it("renders highlight indicator on driver tab when on driver pages", () => {
    mockUsePathname.mockReturnValue(Routes.Driver);

    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const highlights = screen.getAllByTestId("highlight-indicator");
    expect(highlights).toHaveLength(1);
  });
});
