import { render } from "@testing-library/react";
import Home from "./page";
import { redirect } from "next/navigation";
import { Routes } from "./types/enums";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to the Business route", () => {
    render(<Home />);
    expect(redirect).toHaveBeenCalledWith(Routes.Business);
  });

  it("does not render any content", () => {
    const { container } = render(<Home />);
    expect(container).toBeEmptyDOMElement();
  });
});
