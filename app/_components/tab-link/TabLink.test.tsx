import { render, screen } from "@testing-library/react";
import { TabLink } from "./TabLink";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

describe("TabLink component", () => {
  it("renders children correctly as a link", () => {
    render(
      <TabLink href="/test" highlight={false}>
        Test Link
      </TabLink>
    );

    const link = screen.getByRole("link", { name: "Test Link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("applies default class to the link", () => {
    render(
      <TabLink href="/test" highlight={false}>
        Test
      </TabLink>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveClass("btn-nav");
  });

  it("renders highlight indicator when highlight is true", () => {
    render(
      <TabLink href="/test" highlight={true}>
        Test
      </TabLink>
    );

    const highlight = screen.getByTestId("highlight-indicator");
    expect(highlight).toBeInTheDocument();
    expect(highlight).toHaveAttribute("aria-hidden");
    expect(highlight).toHaveClass(
      "bg-brand-primary-orange h-1 absolute left-4 right-4 -bottom-[1px] rounded-t-2xl"
    );
  });

  it("does not render highlight indicator when highlight is false", () => {
    render(
      <TabLink href="/test" highlight={false}>
        Test
      </TabLink>
    );

    expect(screen.queryByTestId("highlight-indicator")).not.toBeInTheDocument();
  });

  it("passes additional props to the link element", () => {
    render(
      <TabLink
        href="/test"
        highlight={false}
        id="link-id"
        aria-label="Custom link"
      >
        Test
      </TabLink>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("id", "link-id");
    expect(link).toHaveAttribute("aria-label", "Custom link");
  });
});
