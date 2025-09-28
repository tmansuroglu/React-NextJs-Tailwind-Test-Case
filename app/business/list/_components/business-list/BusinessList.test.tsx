import { render, screen } from "@testing-library/react";
import { BusinessList } from "./BusinessList";
import getBusinessList from "@/actions/get-business-list";
import BusinessCard from "../business-card";
import Pagination from "@/components/pagination";
import { Routes } from "@/types/enums";

jest.mock("@/actions/get-business-list", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../business-card", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="business-card">{JSON.stringify(props)}</div>
  ),
}));

jest.mock("@/components/pagination", () => ({
  __esModule: true,
  default: (props: any) => (
    <nav
      data-testid="pagination"
      aria-label="Pagination for business results"
      {...props}
    />
  ),
}));

describe("BusinessList component", () => {
  const mockSearchParams = {};

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders failed message if payload is null", async () => {
    (getBusinessList as jest.Mock).mockResolvedValue(null);

    render(await BusinessList({ searchParams: mockSearchParams }));

    expect(screen.getByText("Failed to load the data")).toBeInTheDocument();
  });

  it("renders no data message if totalItems <= 0", async () => {
    (getBusinessList as jest.Mock).mockResolvedValue({
      pagination: { totalItems: 0 },
    });

    render(await BusinessList({ searchParams: mockSearchParams }));

    expect(screen.getByText("No Data")).toBeInTheDocument();
  });

  it("renders BusinessCards for each item", async () => {
    const mockPayload = {
      data: [
        {
          id: "1",
          name: "Name1",
          mobile_phone: "123",
          postcode: "12345",
          company: "Comp1",
          email_address: "email1",
        },
        {
          id: "2",
          name: "Name2",
          mobile_phone: "456",
          postcode: "67890",
          company: "Comp2",
          email_address: "email2",
        },
      ],
      pagination: { numberOfPages: 1, totalItems: 2 },
    };
    (getBusinessList as jest.Mock).mockResolvedValue(mockPayload);

    render(await BusinessList({ searchParams: mockSearchParams }));

    const cards = screen.getAllByTestId("business-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent(
      JSON.stringify({
        name: "Name1",
        phone: "123",
        postCode: "12345",
        company: "Comp1",
        mail: "email1",
      })
    );
    expect(cards[1]).toHaveTextContent(
      JSON.stringify({
        name: "Name2",
        phone: "456",
        postCode: "67890",
        company: "Comp2",
        mail: "email2",
      })
    );
  });

  it("renders Pagination if numberOfPages > 1", async () => {
    const mockPayload = {
      data: [],
      pagination: { currentPage: 1, numberOfPages: 2, totalItems: 3 },
    };
    (getBusinessList as jest.Mock).mockResolvedValue(mockPayload);

    render(await BusinessList({ searchParams: mockSearchParams }));

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("does not render Pagination if numberOfPages <= 1", async () => {
    const mockPayload = {
      data: [],
      pagination: { currentPage: 1, numberOfPages: 1, totalItems: 0 },
    };
    (getBusinessList as jest.Mock).mockResolvedValue(mockPayload);

    render(await BusinessList({ searchParams: mockSearchParams }));

    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });
});
