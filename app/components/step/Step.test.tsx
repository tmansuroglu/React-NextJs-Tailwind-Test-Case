import { render, screen } from "@testing-library/react";
import { Step } from "./Step"; // Adjust the import path as needed

describe("Step Component", () => {
  const defaultProps = {
    number: 1,
    title: "FIX IT",
    description: "Your customers bring their vehicle to you.",
  };

  it("renders the step number, title, and description correctly", () => {
    render(<Step {...defaultProps} />);

    // Check if the number is rendered in the circle
    const numberElement = screen.getByText(defaultProps.number.toString());
    expect(numberElement).toBeInTheDocument();
    expect(numberElement).toHaveClass(
      "min-w-6 w-6 h-6 rounded-[50%] border-[1px]"
    );
    expect(numberElement).toHaveClass("bg-brand-primary-orange");
    expect(numberElement).toHaveClass("text-brand-secondary-black");

    // Check if the title is rendered
    const titleElement = screen.getByText(defaultProps.title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("font-sm-bold text-brand-primary-black");

    // Check if the description is rendered
    const descriptionElement = screen.getByText(defaultProps.description);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveClass("font-sm text-brand-primary-black");
  });

  it("renders different props correctly", () => {
    const customProps = {
      number: 2,
      title: "SPLIT IT",
      description: "When the customer gets their bill or quote.",
    };

    render(<Step {...customProps} />);

    expect(screen.getByText(customProps.number.toString())).toBeInTheDocument();
    expect(screen.getByText(customProps.title)).toBeInTheDocument();
    expect(screen.getByText(customProps.description)).toBeInTheDocument();
  });
});
