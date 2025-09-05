import { render, screen } from "@testing-library/react";
import BusinessRegisterPage from "./page";

describe("BusinessRegisterPage", () => {
  it("renders the main element with correct content", () => {
    render(<BusinessRegisterPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveTextContent("BusinessRegisterPage");
  });

  it("is accessible with main landmark", () => {
    render(<BusinessRegisterPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement.tagName.toLowerCase()).toBe("main");
  });
});
