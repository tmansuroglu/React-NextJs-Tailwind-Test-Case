/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Error from "./error";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  startTransition: jest.fn((callback) => callback()),
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockStartTransition = startTransition as jest.MockedFunction<
  typeof startTransition
>;

describe("Error", () => {
  const mockReset = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      refresh: mockRefresh,
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    } as any);
  });

  it("renders error message", () => {
    render(<Error reset={mockReset} />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("renders refresh button", () => {
    render(<Error reset={mockReset} />);

    const button = screen.getByRole("button", {
      name: "Click here to refresh.",
    });
    expect(button).toBeInTheDocument();
  });

  it("calls reset when button is clicked", async () => {
    const user = userEvent.setup();

    render(<Error reset={mockReset} />);

    const button = screen.getByRole("button", {
      name: "Click here to refresh.",
    });

    await user.click(button);

    await waitFor(() => expect(mockReset).toHaveBeenCalledTimes(1));
  });

  it("calls router.refresh when button is clicked", async () => {
    const user = userEvent.setup();

    render(<Error reset={mockReset} />);

    const button = screen.getByRole("button", {
      name: "Click here to refresh.",
    });

    await user.click(button);

    await waitFor(() => expect(mockRefresh).toHaveBeenCalledTimes(1));
  });

  it("wraps reset and refresh calls in startTransition", async () => {
    const user = userEvent.setup();

    render(<Error reset={mockReset} />);

    const button = screen.getByRole("button", {
      name: "Click here to refresh.",
    });

    await user.click(button);

    await waitFor(() => expect(mockStartTransition).toHaveBeenCalledTimes(1));

    await waitFor(() =>
      expect(mockStartTransition).toHaveBeenCalledWith(expect.any(Function))
    );
  });

  it("calls refresh before reset", async () => {
    const user = userEvent.setup();
    const callOrder: string[] = [];

    mockRefresh.mockImplementation(() => {
      callOrder.push("refresh");
    });

    mockReset.mockImplementation(() => {
      callOrder.push("reset");
    });

    render(<Error reset={mockReset} />);

    const button = screen.getByRole("button", {
      name: "Click here to refresh.",
    });

    await user.click(button);

    await waitFor(() => expect(callOrder).toEqual(["refresh", "reset"]));
  });

  it("renders within Main component", () => {
    const { container } = render(<Error reset={mockReset} />);

    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("container", "mx-auto");
  });

  it("button has correct styling classes", () => {
    render(<Error reset={mockReset} />);

    const button = screen.getByRole("button", {
      name: "Click here to refresh.",
    });

    expect(button).toHaveClass("btn-primary", "w-2xs");
  });

  it("heading has correct styling classes", () => {
    render(<Error reset={mockReset} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("font-xl", "xl:font-2xl", "text-center");
  });
});
