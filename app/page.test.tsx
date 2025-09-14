import { render } from "@testing-library/react";
import { redirect } from "next/navigation";
import Home from "./page";
import { Routes } from "./_types/enums";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  RedirectType: {
    replace: "replace",
  },
}));

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to Routes.Business with replace type", () => {
    render(<Home />);

    expect(redirect).toHaveBeenCalledWith(Routes.Business, "replace");
  });

  it("does not render any content", () => {
    const { container } = render(<Home />);

    expect(container).toBeEmptyDOMElement();
  });
});
