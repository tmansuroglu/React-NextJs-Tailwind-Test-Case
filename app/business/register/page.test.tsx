import { render, screen } from "@testing-library/react";
import BusinessRegisterPage from "./page";

// TODO: add test
describe("BusinessRegisterPage", () => {
  it("is accessible with main landmark", () => {
    render(<BusinessRegisterPage />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement.tagName.toLowerCase()).toBe("main");
  });
});
