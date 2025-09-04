import { render, screen } from "@testing-library/react";
import DriverLoginPage, { metadata as loginMetadata } from "./page";

describe("DriverLoginPage", () => {
  it("renders the main element with correct content", () => {
    render(<DriverLoginPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveTextContent("DriverLoginPage");
  });

  it("has correct metadata title", () => {
    expect(loginMetadata).toHaveProperty(
      "title",
      "Bumper UK - Driver Login Page"
    );
  });

  it("is accessible with main landmark", () => {
    render(<DriverLoginPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement.tagName.toLowerCase()).toBe("main");
  });
});
