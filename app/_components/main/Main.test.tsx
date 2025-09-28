import { render, screen } from "@testing-library/react";
import { Main } from "./Main";

describe("Main component", () => {
  it("renders children correctly", () => {
    render(
      <Main>
        <div data-testid="child">Test Content</div>
      </Main>
    );

    const childElement = screen.getByTestId("child");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Test Content");
  });

  it("applies default classes to the main element", () => {
    render(<Main>Test</Main>);

    const mainElement = screen.getByRole("main");
    expect(mainElement).toHaveClass("-mt-24");
    expect(mainElement).toHaveClass("pt-24");
    expect(mainElement).toHaveClass("pb-13");
    expect(mainElement).toHaveClass("flex");
    expect(mainElement).toHaveClass("flex-col");
    expect(mainElement).toHaveClass("flex-1");
  });

  it("merges additional className with default classes", () => {
    render(<Main className="bg-red-500">Test</Main>);

    const mainElement = screen.getByRole("main");
    expect(mainElement).toHaveClass("-mt-24");
    expect(mainElement).toHaveClass("pt-24");
    expect(mainElement).toHaveClass("pb-13");
    expect(mainElement).toHaveClass("flex");
    expect(mainElement).toHaveClass("flex-col");
    expect(mainElement).toHaveClass("flex-1");
    expect(mainElement).toHaveClass("bg-red-500");
  });

  it("passes additional props to the main element", () => {
    render(
      <Main id="main-id" aria-label="Main content">
        Test
      </Main>
    );

    const mainElement = screen.getByRole("main");
    expect(mainElement).toHaveAttribute("id", "main-id");
    expect(mainElement).toHaveAttribute("aria-label", "Main content");
  });
});
