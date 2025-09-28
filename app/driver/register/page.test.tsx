import { render, screen } from "@testing-library/react";
import DriverRegisterPage, { metadata } from "./page";

jest.mock("@/components/main", () => ({
  __esModule: true,
  default: (props: any) => <main data-testid="main" {...props} />,
}));

jest.mock("@/components/empty-page-content", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="empty-page-content" {...props} />,
}));

describe("DriverRegisterPage component", () => {
  it("exports correct metadata", () => {
    expect(metadata).toEqual({
      title: "Bumper UK - Driver Register Page",
    });
  });

  it("renders Main", () => {
    render(<DriverRegisterPage />);

    const main = screen.getByTestId("main");
    expect(main).toBeInTheDocument();
  });

  it("renders EmptyPageContent with correct title", () => {
    render(<DriverRegisterPage />);

    const emptyContent = screen.getByTestId("empty-page-content");
    expect(emptyContent).toBeInTheDocument();
    expect(emptyContent).toHaveAttribute("title", "Driver Register Page");
  });
});
