import { render, screen } from "@testing-library/react";
import { Routes } from "../../types/enums";
import { TabLink } from "./TabLink";

describe("TabLink", () => {
  const href = Routes.Business;
  const label = "For business";

  it("renders link with correct href and text", () => {
    render(
      <TabLink href={href} highlight={false}>
        {label}
      </TabLink>
    );
    const link = screen.getByRole("tab", { name: label });
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveTextContent(label);
  });

  it("applies btn-nav class and correct classes when not highlighted", () => {
    render(
      <TabLink href={href} highlight={false}>
        {label}
      </TabLink>
    );
    const link = screen.getByRole("tab", { name: label });
    expect(link).toHaveClass("btn-nav");
  });

  it("applies highlight styles when highlighted", () => {
    render(
      <TabLink
        href={href}
        highlight={true}
        HighlightProps={{ "data-testid": "highlight-indicator" }}
      >
        {label}
      </TabLink>
    );
    const link = screen.getByRole("tab", { name: label });
    const highlight = screen.getByTestId("highlight-indicator");
    expect(highlight).toHaveClass(
      "bg-brand-primary-orange",
      "h-1",
      "absolute",
      "left-4",
      "right-4",
      "-bottom-[1px]",
      "rounded-t-2xl"
    );
  });

  it("sets aria-current to page when highlighted", () => {
    render(
      <TabLink href={href} highlight={true}>
        {label}
      </TabLink>
    );
    const link = screen.getByRole("tab", { name: label });
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("does not set aria-current when not highlighted", () => {
    render(
      <TabLink href={href} highlight={false}>
        {label}
      </TabLink>
    );
    const link = screen.getByRole("tab", { name: label });
    expect(link).not.toHaveAttribute("aria-current");
  });

  it("sets aria-selected to true when highlighted", () => {
    render(
      <TabLink href={href} highlight={true}>
        {label}
      </TabLink>
    );
    const link = screen.getByRole("tab", { name: label });
    expect(link).toHaveAttribute("aria-selected", "true");
  });

  it("sets aria-selected to false when not highlighted", () => {
    render(
      <TabLink href={href} highlight={false}>
        {label}
      </TabLink>
    );
    const link = screen.getByRole("tab", { name: label });
    expect(link).toHaveAttribute("aria-selected", "false");
  });

  it("renders highlight span with aria-hidden when highlighted", () => {
    render(
      <TabLink
        href={href}
        highlight={true}
        data-testid="tab-link"
        HighlightProps={{ "data-testid": "highlight-indicator" }}
      >
        {label}
      </TabLink>
    );
    const highlight = screen.getByTestId("highlight-indicator");
    expect(highlight).toHaveAttribute("aria-hidden", "true");
  });

  it("does not render highlight span when not highlighted", () => {
    render(
      <TabLink
        href={href}
        highlight={false}
        HighlightProps={{ "data-testid": "highlight-indicator" }}
      >
        {label}
      </TabLink>
    );
    expect(screen.queryByTestId("highlight-indicator")).not.toBeInTheDocument();
  });
});
