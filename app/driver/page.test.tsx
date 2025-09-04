import { render, screen } from "@testing-library/react";
import DriverPage, { metadata } from "./page";

describe("DriverPage", () => {
  it("renders the main element with correct content", () => {
    render(<DriverPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveTextContent("For Drivers Page");
  });

  it("has correct metadata title", () => {
    expect(metadata).toHaveProperty("title", "Bumper UK - Driver Landing Page");
  });

  it("is accessible with main landmark", () => {
    render(<DriverPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement.tagName.toLowerCase()).toBe("main");
  });
});
