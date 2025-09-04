import { render, screen } from "@testing-library/react";
import BusinessRegisterPage, { metadata } from "./page";

describe("BusinessRegisterPage", () => {
  it("renders the main element with correct content", () => {
    render(<BusinessRegisterPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveTextContent("BusinessRegisterPage");
  });

  it("has correct metadata title", () => {
    expect(metadata).toHaveProperty(
      "title",
      "Bumper UK - Business Register Page"
    );
  });

  it("is accessible with main landmark", () => {
    render(<BusinessRegisterPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement.tagName.toLowerCase()).toBe("main");
  });
});
