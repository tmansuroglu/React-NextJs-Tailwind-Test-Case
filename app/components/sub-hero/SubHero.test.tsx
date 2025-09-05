import { render, screen } from "@testing-library/react";
import { SubHero } from "./SubHero";

describe("SubHero Component", () => {
  beforeEach(() => {
    render(<SubHero />);
  });

  test("renders without crashing", () => {
    const section = screen.getByRole("region", { name: /pay later benefits/i });
    expect(section).toBeInTheDocument();
  });

  test("renders the hidden heading correctly", () => {
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /pay later benefits/i,
    });
    expect(heading).toHaveClass("sr-only");
  });

  test("renders the PAYLATER heading", () => {
    const heading = screen.getByRole("heading", {
      level: 3,
      name: /paylater/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test("renders the logo image with correct alt text", () => {
    const logo = screen.getByAltText("Bumper logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.svg");
    expect(logo).toHaveAttribute("width", "75");
    expect(logo).toHaveAttribute("height", "19");
  });

  test("renders the phone image with correct alt text", () => {
    const phone = screen.getByAltText("cell phone");
    expect(phone).toBeInTheDocument();
    expect(phone).toHaveAttribute("width", "976");
    expect(phone).toHaveAttribute("height", "1238");
  });

  test("renders the descriptive paragraphs", () => {
    expect(
      screen.getByText(/give customers more flexibility at checkout/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/no risk to your business/i)).toBeInTheDocument();
    expect(
      screen.getByText(/no worries for your customers/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/it's as simple as/i)).toBeInTheDocument();
  });

  test("renders the ordered list of steps", () => {
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);

    expect(screen.getByTestId("step-1")).toHaveTextContent("FIX IT");
    expect(screen.getByTestId("step-2")).toHaveTextContent("SPLIT IT");
    expect(screen.getByTestId("step-3")).toHaveTextContent("SORTED");
  });

  test("renders the register link with correct href and aria-label", () => {
    const link = screen.getByRole("link", {
      name: /register your interest with bumper/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/business/register");
    expect(link).toHaveTextContent("Register your interest");
  });

  test("renders the arrow image as decorative", () => {
    const arrow = screen.getByTestId("subhero-arrow", { hidden: true });
    expect(arrow).toHaveAttribute("aria-hidden", "true");
    expect(arrow).toHaveAttribute("alt", "");
  });
});
