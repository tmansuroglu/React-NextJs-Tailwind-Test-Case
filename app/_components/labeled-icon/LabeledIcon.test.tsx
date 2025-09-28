import { render, screen } from "@testing-library/react";
import { LabeledIcon } from "./LabeledIcon";
import { FC, SVGProps } from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ unoptimized, ...props }: any) => <img {...props} />,
}));

const MockIcon: FC<SVGProps<SVGElement>> = (props) => (
  <svg data-testid="mock-icon" {...props} />
);

describe("LabeledIcon component", () => {
  it("renders image with label correctly", () => {
    render(<LabeledIcon src="/test.png" alt="Test Alt" label="Test Label" />);

    const container = screen.getByTestId("labeled-icon");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("flex gap-1.5 items-center");

    const image = screen.getByAltText("Test Alt");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test.png");
    expect(image).toHaveAttribute("height", "19");
    expect(image).toHaveAttribute("width", "16");
    expect(image).toHaveClass("w-auto h-auto");

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("font-sm-bold");
  });

  it("renders IconComponent with label correctly", () => {
    render(<LabeledIcon IconComponent={MockIcon} label="Test Label" />);

    const container = screen.getByTestId("labeled-icon");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("flex gap-1.5 items-center");

    const icon = screen.getByTestId("mock-icon");
    expect(icon).toBeInTheDocument();

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("font-sm-bold");
  });
});
