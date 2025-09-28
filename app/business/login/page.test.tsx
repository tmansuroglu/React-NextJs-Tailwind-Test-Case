import { render, screen } from "@testing-library/react";
import BusinessLoginPage, { metadata } from "./page";

jest.mock("@/components/main", () => ({
  __esModule: true,
  default: (props: any) => <main data-testid="main" {...props} />,
}));

jest.mock("@/components/empty-page-content", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="empty-page-content" {...props} />,
}));

describe("BusinessLoginPage component", () => {
  it("exports correct metadata", () => {
    expect(metadata).toEqual({
      title: "Bumper UK - Business Login Page",
    });
  });

  it("renders Main with correct class", () => {
    render(<BusinessLoginPage />);

    const main = screen.getByTestId("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("container mx-auto px-5");
  });

  it("renders EmptyPageContent with correct title", () => {
    render(<BusinessLoginPage />);

    const emptyContent = screen.getByTestId("empty-page-content");
    expect(emptyContent).toBeInTheDocument();
    expect(emptyContent).toHaveAttribute("title", "Business Login Page");
  });
});
