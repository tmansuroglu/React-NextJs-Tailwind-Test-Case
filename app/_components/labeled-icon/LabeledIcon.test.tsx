import { render, screen } from "@testing-library/react";
import { LabeledIcon } from "./LabeledIcon";

jest.mock("next/image", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockImage = ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  );
  MockImage.displayName = "MockImage";
  return MockImage;
});

describe("LabeledIcon", () => {
  const defaultProps = {
    src: "/icon.svg",
    alt: "Test Icon",
    label: "Test Label",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders container with correct test-id and styling", () => {
    render(<LabeledIcon {...defaultProps} />);

    const container = screen.getByTestId("labeled-icon");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("flex gap-1.5 items-center");
  });

  it("renders image with correct src, alt, and dimensions", () => {
    render(<LabeledIcon {...defaultProps} />);

    const image = screen.getByAltText("Test Icon");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/icon.svg");
    expect(image).toHaveAttribute("height", "19");
    expect(image).toHaveAttribute("width", "16");
    expect(image).toHaveClass("w-auto h-auto");
  });

  it("renders label with correct text and styling", () => {
    render(<LabeledIcon {...defaultProps} />);

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe("SPAN");
    expect(label).toHaveClass("font-sm-bold");
  });

  it("supports ReactNode label with complex content", () => {
    const complexLabel = (
      <div>
        <span>Complex</span> Label
      </div>
    );
    render(<LabeledIcon {...defaultProps} label={complexLabel} />);

    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByTestId("labeled-icon")).toContainElement(
      screen.getByText("Complex").closest("div")!
    );
  });

  it("renders correctly with empty string label", () => {
    render(<LabeledIcon {...defaultProps} label="" />);

    const container = screen.getByTestId("labeled-icon");
    expect(container).toBeInTheDocument();

    const label = container.querySelector("span");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("font-sm-bold");
    expect(label).toHaveTextContent("");
  });

  it("has accessible structure", () => {
    render(<LabeledIcon {...defaultProps} />);

    const image = screen.getByAltText("Test Icon");
    expect(image).toHaveAttribute("alt", "Test Icon");

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();

    const container = screen.getByTestId("labeled-icon");
    expect(container).toContainElement(image);
    expect(container).toContainElement(label);
  });
});
