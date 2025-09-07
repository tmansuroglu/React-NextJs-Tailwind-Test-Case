import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import ListPage from "./page";
import { useSearchParams } from "next/navigation";
import { useHandlers } from "./page.utils";
import { BusinessListResponsePayload } from "../../types/payload";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("./page.utils", () => ({
  useHandlers: jest.fn(),
}));

describe("ListPage", () => {
  const mockSearchParams = {
    get: jest.fn(),
    toString: jest.fn(() => ""),
  };
  const mockHandleInputValueChange = jest.fn();
  const mockHandleLoadMore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (useHandlers as jest.Mock).mockReturnValue({
      handleInputValueChange: mockHandleInputValueChange,
      handleLoadMore: mockHandleLoadMore,
    });
    global.fetch = jest.fn();
  });

  it("renders initial UI with loading state", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          pagination: { totalItems: 0, pageSize: 0 },
          data: [],
        }),
    });

    render(<ListPage />);

    expect(screen.getByText("Interested Dealerships")).toBeInTheDocument();
    expect(screen.getByTestId("labeled-icon")).toHaveTextContent(
      "Search Company"
    );
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("No Data")).toBeInTheDocument();
    });
  });

  it("displays business cards when data is available", async () => {
    const mockPayload: BusinessListResponsePayload = {
      success: true,
      message: "",
      pagination: {
        totalItems: 2,
        pageSize: 2,
        currentPage: 1,
        numberOfPages: 1,
      },
      data: [
        {
          id: "1",
          name: "John Doe",
          company: "Acme Inc",
          mobile_phone: "1234567890",
          postcode: "12345",
          email_address: "john@acme.com",
          pay_later: true,
          pay_now: false,
        },
        {
          id: "2",
          name: "Jane Smith",
          company: "Beta Corp",
          mobile_phone: "0987654321",
          postcode: "54321",
          email_address: "jane@beta.com",
          pay_later: true,
          pay_now: false,
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockPayload),
    });

    render(<ListPage />);

    await waitFor(() => {
      const cards = screen.getAllByTestId("business-card");
      expect(cards).toHaveLength(2);

      const firstCard = cards[0];

      expect(firstCard).toHaveTextContent("John Doe");
      expect(firstCard).toHaveTextContent("Acme Inc");
      expect(firstCard).toHaveTextContent("1234567890");
      expect(firstCard).toHaveTextContent("12345");
      expect(firstCard).toHaveTextContent("john@acme.com");

      const secondCard = cards[1];

      expect(secondCard).toHaveTextContent("Jane Smith");
      expect(secondCard).toHaveTextContent("Beta Corp");
      expect(secondCard).toHaveTextContent("0987654321");
      expect(secondCard).toHaveTextContent("54321");
      expect(secondCard).toHaveTextContent("jane@beta.com");
    });
  });

  it("displays error message when fetch fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

    render(<ListPage />);

    await waitFor(() => {
      expect(screen.getByText("Failed to load the data")).toBeInTheDocument();
    });
  });

  it("handles search input changes", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          pagination: { totalItems: 0, pageSize: 0 },
          data: [],
        }),
    });

    render(<ListPage />);

    const input = screen.getByTestId("text-input");
    act(() => fireEvent.change(input, { target: { value: "Test Company" } }));

    expect(mockHandleInputValueChange).toHaveBeenCalled();
  });

  it("displays and handles load more button when more items exist", async () => {
    const mockPayload: BusinessListResponsePayload = {
      success: true,
      message: "",
      pagination: {
        totalItems: 10,
        pageSize: 5,
        currentPage: 1,
        numberOfPages: 2,
      },
      data: [
        {
          id: "1",
          name: "John Doe",
          company: "Acme Inc",
          mobile_phone: "1234567890",
          postcode: "12345",
          email_address: "john@acme.com",
          pay_later: true,
          pay_now: false,
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockPayload),
    });

    render(<ListPage />);

    await waitFor(() => {
      const loadMoreButton = screen.getByRole("button", { name: /load more/i });
      expect(loadMoreButton).toBeInTheDocument();
      expect(loadMoreButton).not.toBeDisabled();

      act(() => fireEvent.click(loadMoreButton));
      expect(mockHandleLoadMore).toHaveBeenCalled();
    });
  });

  it("initializes input with companyName search param", () => {
    (useSearchParams as jest.Mock).mockReturnValueOnce({
      ...mockSearchParams,
      get: jest.fn().mockReturnValue("Test Company"),
    });
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          pagination: { totalItems: 0, pageSize: 0 },
          data: [],
        }),
    });

    render(<ListPage />);

    expect(screen.getByTestId("text-input")).toHaveValue("Test Company");
  });

  it("re-fetches data when searchParams change", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () =>
        Promise.resolve({
          pagination: { totalItems: 0, pageSize: 0 },
          data: [],
        }),
    });

    const { rerender } = render(<ListPage />);

    (useSearchParams as jest.Mock).mockReturnValueOnce({
      ...mockSearchParams,
      toString: jest.fn(() => "companyName=NewCompany"),
    });

    rerender(<ListPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenLastCalledWith(
        "/api/business?companyName=NewCompany"
      );
    });
  });
});
