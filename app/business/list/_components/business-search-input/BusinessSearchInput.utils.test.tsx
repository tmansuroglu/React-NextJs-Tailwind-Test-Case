/* eslint-disable @typescript-eslint/no-require-imports */

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchParamKeys } from "@/types/enums";
import createNewURLSearchParams from "@/utils/create-new-url-search-params";
import { act, renderHook } from "@testing-library/react";
import { useInputValueChange } from "./BusinessSearchInput.utils";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("throttle-debounce", () => ({
  debounce: jest.fn((delay, fn) => fn),
}));

jest.mock("@/utils/create-new-url-search-params", () => ({
  __esModule: true,
  default: jest.fn(() => new URLSearchParams()),
}));

describe("useInputValueChange hook", () => {
  const mockRouter = { push: jest.fn() };
  const mockPathname = "/test";
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    jest.clearAllMocks();
  });

  it("initializes inputValue from searchParams", () => {
    mockSearchParams.set(SearchParamKeys.CompanyName, "initial");

    const { result } = renderHook(() => useInputValueChange());

    expect(result.current.inputValue).toBe("initial");
  });

  it("updates inputValue on change and calls debounced function", async () => {
    const mockDebounce = jest.fn();
    (require("throttle-debounce").debounce as jest.Mock).mockImplementation(
      (delay, fn) => mockDebounce.mockImplementation(fn)
    );

    const { result } = renderHook(() => useInputValueChange());

    await act(async () => {
      await result.current.handleInputValueChange({
        target: { value: "new" },
      } as any);
    });

    expect(result.current.inputValue).toBe("new");
    expect(mockDebounce).toHaveBeenCalledWith(
      SearchParamKeys.CompanyName,
      "new"
    );
  });

  it("updates URL after debounce", async () => {
    const mockNewParams = new URLSearchParams("company=new");
    (createNewURLSearchParams as jest.Mock).mockReturnValue(mockNewParams);

    const { result } = renderHook(() => useInputValueChange());

    await act(async () => {
      await result.current.handleInputValueChange({
        target: { value: "new" },
      } as any);
    });

    expect(mockRouter.push).toHaveBeenCalledWith(
      `${mockPathname}?${mockNewParams.toString()}`,
      { scroll: false }
    );
  });

  it("handles popstate event to update inputValue", () => {
    const { result } = renderHook(() => useInputValueChange());

    const originalLocation = window.location;

    act(() => {
      delete (window as any).location;
      (window as any).location = new URL("http://localhost?company=back");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(result.current.inputValue).toBe("back");

    (window as any).location = originalLocation;
  });

  it("removes popstate listener on unmount", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useInputValueChange());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "popstate",
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "popstate",
      expect.any(Function)
    );
  });
});
