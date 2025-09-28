import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

const mockPush = jest.fn();
const mockRouter = { push: mockPush };
const mockPathname = "/test-path";
const mockSearchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams,
}));

jest.mock("@/utils/create-new-url-search-params", () => ({
  __esModule: true,
  default: ({
    previousSearchParams,
    add,
  }: {
    previousSearchParams: URLSearchParams;
    add: { newKey: string; newValue: string }[];
  }) => {
    const params = new URLSearchParams(previousSearchParams);
    add.forEach(({ newKey, newValue }) => params.set(newKey, newValue));
    return params;
  },
}));

jest.mock("@/types/enums", () => ({
  SearchParamKeys: { Page: "page" },
}));

describe("Pagination component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct number of page buttons", () => {
    render(<Pagination currentPage={1} numberOfPages={3} />);

    expect(
      screen.getByRole("button", { name: "Go to page 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Go to page 2" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Go to page 3" })
    ).toBeInTheDocument();
  });

  it("disables the current page button", () => {
    render(<Pagination currentPage={2} numberOfPages={3} />);

    const currentButton = screen.getByRole("button", { name: "Go to page 2" });
    expect(currentButton).toBeDisabled();

    const otherButton = screen.getByRole("button", { name: "Go to page 1" });
    expect(otherButton).not.toBeDisabled();
  });

  it("renders the aria-live status text correctly", () => {
    render(<Pagination currentPage={1} numberOfPages={5} />);

    const status = screen.getByText("Showing page 1 of 5");
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveClass("sr-only");
  });

  it("calls router.push with the correct URL on page button click", async () => {
    const user = userEvent.setup();
    render(<Pagination currentPage={1} numberOfPages={3} />);

    const button2 = screen.getByRole("button", { name: "Go to page 2" });
    await user.click(button2);

    expect(mockPush).toHaveBeenCalledWith("/test-path?page=2");
  });

  it("does not call router.push when clicking the disabled current page", async () => {
    const user = userEvent.setup();
    render(<Pagination currentPage={1} numberOfPages={3} />);

    const button1 = screen.getByRole("button", { name: "Go to page 1" });
    await user.click(button1);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("passes additional props to the nav element", () => {
    render(
      <Pagination
        currentPage={1}
        numberOfPages={1}
        className="test-class"
        id="pagination-nav"
      />
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("test-class");
    expect(nav).toHaveAttribute("id", "pagination-nav");
  });
});
