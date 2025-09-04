import { render, screen } from "@testing-library/react";
import DriverRegisterPage, { metadata as registerMetadata } from "./page";

describe("DriverRegisterPage", () => {
  it("renders the main element with correct content", () => {
    render(<DriverRegisterPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveTextContent("DriverRegisterPage");
  });

  it("has correct metadata title", () => {
    expect(registerMetadata).toHaveProperty(
      "title",
      "Bumper UK - Driver Register Page"
    );
  });

  it("is accessible with main landmark", () => {
    render(<DriverRegisterPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement.tagName.toLowerCase()).toBe("main");
  });
});
