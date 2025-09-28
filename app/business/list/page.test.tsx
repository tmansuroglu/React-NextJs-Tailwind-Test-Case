import { render, screen, waitFor } from "@testing-library/react";
import { Suspense } from "react";
import BusinessSearchInput from "./_components/business-search-input";
import BusinessList from "./_components/business-list";
import LoadingIndicator from "@/components/loading-indicator";
import Main from "@/components/main";
import ListPage, { metadata } from "./page";

// Mock components with data-testid
jest.mock("./_components/business-search-Input", () => ({
  __esModule: true,
  default: () => <div data-testid="business-search-input" />,
}));

jest.mock("./_components/business-list", () => ({
  __esModule: true,
  default: () => <div data-testid="business-list" />,
}));

jest.mock("@/components/loading-indicator", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-indicator" />,
}));

jest.mock("@/components/main", () => ({
  __esModule: true,
  default: (props: any) => <main data-testid="main" {...props} />,
}));

describe("ListPage component", () => {
  const mockSearchParams = Promise.resolve({});

  it("exports correct metadata", () => {
    expect(metadata).toEqual({
      title: "Bumper UK - Business List Page",
    });
  });

  it("renders Main with correct class", async () => {
    render(await ListPage({ searchParams: mockSearchParams }));

    const main = screen.getByTestId("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("bg-brand-primary-blue");
  });

  it("renders the container div with heading", async () => {
    render(await ListPage({ searchParams: mockSearchParams }));

    const heading = screen.getByRole("heading", {
      name: "Interested Dealerships",
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass(
      "text-brand-primary-white font-lg xl:font-xl-plus mb-2 xl:mb-5"
    );
  });

  it("renders BusinessSearchInput inside section", async () => {
    render(await ListPage({ searchParams: mockSearchParams }));

    const searchInput = screen.getByTestId("business-search-input");
    expect(searchInput).toBeInTheDocument();
    const section = searchInput.parentElement;
    expect(section).toHaveClass(
      "p-8 border rounded-4xl bg-brand-primary-white w-full mb-4"
    );
  });

  it("renders BusinessList after loading", async () => {
    render(await ListPage({ searchParams: mockSearchParams }));

    await waitFor(() => {
      expect(screen.getByTestId("business-list")).toBeInTheDocument();
    });
  });
});
