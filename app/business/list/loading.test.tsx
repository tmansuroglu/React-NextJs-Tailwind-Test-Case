import { render, screen } from "@testing-library/react";
import Loading from "./loading";

jest.mock("@/components/loading-indicator", () => ({
  __esModule: true,
  default: ({ LoaderProps, ...props }: any) => (
    <div
      data-testid="loading-indicator"
      {...props}
      loaderClass={LoaderProps?.className}
    />
  ),
}));

jest.mock("@/components/main", () => ({
  __esModule: true,
  default: (props: any) => <main {...props} />,
}));

describe("Loading component", () => {
  it("renders Main with correct classes", () => {
    render(<Loading />);

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("bg-brand-primary-blue flex");
  });

  it("renders LoadingIndicator with correct props", () => {
    render(<Loading />);

    const indicator = screen.getByTestId("loading-indicator");
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveClass("flex-1");
    expect(indicator).toHaveAttribute("loaderClass", "size-20");
  });
});
