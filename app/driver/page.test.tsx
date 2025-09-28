import { render, screen } from "@testing-library/react";
import DriverPage, { metadata } from "./page";

jest.mock("@/components/main", () => ({
  __esModule: true,
  default: (props: any) => <main data-testid="main" {...props} />,
}));

jest.mock("@/components/empty-page-content", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="empty-page-content" {...props} />,
}));

describe("DriverPage component", () => {
  it("exports correct metadata", () => {
    expect(metadata).toEqual({
      title: "Bumper UK - Driver Landing Page",
    });
  });

  it("renders Main", () => {
    render(<DriverPage />);

    const main = screen.getByTestId("main");
    expect(main).toBeInTheDocument();
  });

  it("renders EmptyPageContent with correct title", () => {
    render(<DriverPage />);

    const emptyContent = screen.getByTestId("empty-page-content");
    expect(emptyContent).toBeInTheDocument();
    expect(emptyContent).toHaveAttribute("title", "For Drivers Page");
  });
});
