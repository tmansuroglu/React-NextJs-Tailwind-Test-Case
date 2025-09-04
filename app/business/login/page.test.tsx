import { render, screen } from "@testing-library/react";
import BusinessLoginPage, { metadata } from "./page";

describe("BusinessLoginPage", () => {
  it("renders the main element with correct content", () => {
    render(<BusinessLoginPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveTextContent("BusinessLoginPage");
  });

  it("has correct metadata title", () => {
    expect(metadata).toHaveProperty("title", "Bumper UK - Business Login Page");
  });

  it("is accessible with main landmark", () => {
    render(<BusinessLoginPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement.tagName.toLowerCase()).toBe("main");
  });
});
