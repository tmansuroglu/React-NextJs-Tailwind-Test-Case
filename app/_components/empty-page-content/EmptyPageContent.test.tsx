import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmptyPageContent } from "./EmptyPageContent";
import { redirect, RedirectType } from "next/navigation";

jest.mock("next/navigation", () => {
  const actualNavigation = jest.requireActual("next/navigation");
  return {
    ...actualNavigation,
    redirect: jest.fn(),
  };
});

jest.mock("@/types/enums", () => ({
  Routes: {
    Business: "/business",
    BusinessRegister: "/business/register",
    BusinessList: "/business/list",
  },
}));

describe("EmptyPageContent component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title and descriptive text correctly", () => {
    render(<EmptyPageContent title="Test Title" />);

    expect(
      screen.getByRole("heading", { name: "Test Title" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("This page is out of the scope of the project.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Use the buttons below to visit the developed pages.")
    ).toBeInTheDocument();
  });

  it("renders the navigation buttons correctly", () => {
    render(<EmptyPageContent title="Test Title" />);

    expect(
      screen.getByRole("button", { name: "Business Landing Page" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Business Register Page" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Business List Page" })
    ).toBeInTheDocument();
  });

  it("calls redirect with correct route on button clicks", async () => {
    const user = userEvent.setup();
    render(<EmptyPageContent title="Test Title" />);

    const businessButton = screen.getByRole("button", {
      name: "Business Landing Page",
    });
    await user.click(businessButton);
    expect(redirect).toHaveBeenCalledWith("/business", RedirectType.push);

    const registerButton = screen.getByRole("button", {
      name: "Business Register Page",
    });
    await user.click(registerButton);
    expect(redirect).toHaveBeenCalledWith(
      "/business/register",
      RedirectType.push
    );

    const listButton = screen.getByRole("button", {
      name: "Business List Page",
    });
    await user.click(listButton);
    expect(redirect).toHaveBeenCalledWith("/business/list", RedirectType.push);
  });
});
