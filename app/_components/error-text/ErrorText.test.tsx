import { render, screen } from "@testing-library/react";
import { ErrorText } from "./ErrorText";

describe("ErrorText component", () => {
  it("renders children correctly", () => {
    render(<ErrorText>Test error message</ErrorText>);

    const spanElement = screen.getByRole("alert");
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveTextContent("Test error message");
    expect(spanElement).toHaveClass("error-text");
  });

  it("merges additional className with default class", () => {
    render(<ErrorText className="text-red-500">Test</ErrorText>);

    const spanElement = screen.getByRole("alert");
    expect(spanElement).toHaveClass("error-text");
    expect(spanElement).toHaveClass("text-red-500");
  });

  it("passes additional props to the span element", () => {
    render(
      <ErrorText id="error-id" aria-live="assertive">
        Test
      </ErrorText>
    );

    const spanElement = screen.getByRole("alert");
    expect(spanElement).toHaveAttribute("id", "error-id");
    expect(spanElement).toHaveAttribute("aria-live", "assertive");
  });
});
