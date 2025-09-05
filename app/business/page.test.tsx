import { render, screen } from "@testing-library/react";
import BusinessPage, { metadata } from "./page";

describe("BusinessPage", () => {
  it("renders the main element with correct content", () => {
    render(<BusinessPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(screen.getByTestId("hero-section")).toBeVisible();
  });

  it("has correct metadata title", () => {
    expect(metadata).toHaveProperty(
      "title",
      "Bumper UK - Business Landing Page"
    );
  });

  it("is accessible with main landmark", () => {
    render(<BusinessPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement.tagName.toLowerCase()).toBe("main");
  });
});
