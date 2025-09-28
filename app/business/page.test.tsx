import { render, screen } from "@testing-library/react";
import BusinessPage, { metadata } from "./page";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("@/public/arrow.svg", () => ({
  __esModule: true,
  default: (props: any) => <svg {...props} />,
}));

jest.mock("@/public/trust-pilot.svg", () => ({
  __esModule: true,
  default: (props: any) => <svg {...props} />,
}));

jest.mock("@/public/five-stars.svg", () => ({
  __esModule: true,
  default: (props: any) => <svg {...props} />,
}));

jest.mock("@/public/logo.svg", () => ({
  __esModule: true,
  default: (props: any) => <svg {...props} />,
}));

describe("BusinessPage", () => {
  it("renders Main with Hero and SubHero components", () => {
    render(<BusinessPage />);

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("pt-0");

    // Check Hero is rendered
    const hero = screen.getByTestId("hero-section");
    expect(hero).toBeInTheDocument();

    // Check SubHero is rendered
    const subHero = screen.getByRole("region", { name: /Pay Later Benefits/ });
    expect(subHero).toBeInTheDocument();
  });

  it("exports correct metadata", () => {
    expect(metadata).toEqual({
      title: "Bumper UK - Business Landing Page",
    });
  });
});
