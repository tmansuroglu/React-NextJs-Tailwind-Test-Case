import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";
import { Routes } from "../../types/enums";

describe("Hero", () => {
  it("renders hero section with correct content", () => {
    render(<Hero />);
    const section = screen.getByTestId("hero-section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass(
      "relative",
      "min-h-[543px]",
      "w-full",
      "-mt-24",
      "pt-24",
      "bg-[34%_100%]",
      "bg-no-repeat",
      "bg-cover",
      "flex",
      "items-center"
    );
    expect(section).toHaveAttribute("aria-labelledby", "hero-title");
  });

  it("renders gray filter overlay", () => {
    render(<Hero />);
    const overlay = screen.getByTestId("hero-section").firstChild;
    expect(overlay).toHaveClass(
      "absolute",
      "inset-0",
      "bg-brand-opacity-gray",
      "opacity-70"
    );
  });

  it("renders container with correct padding and content alignment", () => {
    render(<Hero />);
    const container = screen.getByTestId("hero-section").children[1];
    expect(container).toHaveClass(
      "container",
      "mx-auto",
      "px-4",
      "pt-[29px]",
      "pb-[34px]",
      "xl:pt-11",
      "xl:pb-[51px]",
      "flex",
      "items-center",
      "min-h-full",
      "relative"
    );
  });

  it("renders rating section with text and images", () => {
    render(<Hero />);
    const ratingText = screen.getByText("Excellent");
    expect(ratingText).toHaveClass(
      "font-sm-bold",
      "xl:font-md-plus-bold",
      "text-brand-primary-white"
    );
    const starsImage = screen.getByAltText("5 star rating");
    expect(starsImage).toHaveAttribute(
      "src",
      expect.stringContaining("five-stars.svg")
    );
    expect(starsImage).toHaveClass("xl:h-6", "xl:w-32");
    const trustpilotImage = screen.getByAltText("trust pilot logo");
    expect(trustpilotImage).toHaveAttribute(
      "src",
      expect.stringContaining("trust-pilot.svg")
    );
    expect(trustpilotImage).toHaveClass("xl:h-6", "xl:w-24");
  });

  it("renders heading with correct text and styles", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /become a bumper approved dependable dealership/i,
    });
    expect(heading).toHaveClass(
      "font-xl",
      "xl:font-3xl",
      "text-brand-primary-white"
    );
    expect(heading).toHaveAttribute("id", "hero-title");
  });

  it("renders subheading with correct text and styles", () => {
    render(<Hero />);
    const subheading = screen.getByText(
      /join our network of 3,000\+ garages and dealerships/i
    );
    expect(subheading).toHaveClass(
      "font-sm",
      "xl:font-md-plus",
      "text-brand-primary-white",
      "mt-2"
    );
  });

  it("renders register link with correct href and styles", () => {
    render(<Hero />);
    const registerLink = screen.getByRole("link", {
      name: /register your interest with bumper/i,
    });
    expect(registerLink).toHaveAttribute("href", Routes.BusinessRegister);
    expect(registerLink).toHaveClass(
      "btn-primary-over-rounded",
      "font-sm",
      "xl:font-sm-medium",
      "flex",
      "gap-2.5",
      "w-fit",
      "mt-6"
    );
    const arrowImage = screen.getByAltText("");
    expect(arrowImage).toHaveAttribute(
      "src",
      expect.stringContaining("arrow.svg")
    );
    expect(arrowImage).toHaveAttribute("aria-hidden", "true");
  });

  it("renders login link with correct href and styles", () => {
    render(<Hero />);
    const loginLink = screen.getByRole("link", {
      name: /log in to your bumper account/i,
    });
    expect(loginLink).toHaveAttribute("href", Routes.BusinessLogin);
    expect(loginLink).toHaveClass(
      "text-brand-primary-green",
      "hover:underline"
    );
  });

  it("renders already registered text", () => {
    render(<Hero />);
    const text = screen.getByText("Already registered?");
    expect(text).toHaveClass("font-sm", "text-brand-primary-white");
  });
});
