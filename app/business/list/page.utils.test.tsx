import {
  useRouter,
  usePathname,
  useSearchParams,
  ReadonlyURLSearchParams,
} from "next/navigation";
import { debounce } from "throttle-debounce";
import { createSearchParams } from "../../utils/createSearchParams";
import { SearchParams } from "../../types/enums";
import { act, renderHook } from "@testing-library/react";
import { useHandlers } from "./page.utils";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("throttle-debounce", () => ({
  debounce: jest.fn((ms, fn) => fn),
}));

jest.mock("../../utils/createSearchParams", () => ({
  createSearchParams: jest.fn(),
}));

describe("useHandlers", () => {
  const mockSetInputValue = jest.fn();
  const mockRouterPush = jest.fn();
  const mockPathname = "/test";
  const mockSearchParams = new URLSearchParams("pageSize=10");
  const mockCreateSearchParams = createSearchParams as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    mockCreateSearchParams.mockReturnValue("pageSize=10&companyName=test");
  });

  test("should handle input value change and trigger debounced search param update", () => {
    const { result } = renderHook(() =>
      useHandlers({
        setInputValue: mockSetInputValue,
        searchParams: mockSearchParams as ReadonlyURLSearchParams,
      })
    );

    const mockEvent = {
      target: { value: "test" },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleInputValueChange(mockEvent);
    });

    expect(mockSetInputValue).toHaveBeenCalledWith("test");
    expect(debounce).toHaveBeenCalledWith(250, expect.any(Function));
    expect(mockRouterPush).toHaveBeenCalledWith(
      `${mockPathname}?pageSize=10&companyName=test`,
      { scroll: false }
    );
    expect(mockCreateSearchParams).toHaveBeenCalledWith({
      previousSearchParamString: mockSearchParams,
      additions: [{ newKey: SearchParams.CompanyName, newValue: "test" }],
    });
  });

  test("should handle load more and increment page size", () => {
    const { result } = renderHook(() =>
      useHandlers({
        setInputValue: mockSetInputValue,
        searchParams: mockSearchParams as ReadonlyURLSearchParams,
      })
    );

    act(() => {
      result.current.handleLoadMore({} as React.MouseEvent<HTMLButtonElement>);
    });

    expect(mockRouterPush).toHaveBeenCalledWith(
      `${mockPathname}?pageSize=10&companyName=test`,
      { scroll: false }
    );
    expect(mockCreateSearchParams).toHaveBeenCalledWith({
      previousSearchParamString: mockSearchParams,
      additions: [{ newKey: SearchParams.PageSize, newValue: "20" }],
    });
  });

  test("should use default page size of 10 if not present in search params", () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    mockCreateSearchParams.mockReturnValue("pageSize=20");

    const { result } = renderHook(() =>
      useHandlers({
        setInputValue: mockSetInputValue,
        searchParams: new URLSearchParams() as ReadonlyURLSearchParams,
      })
    );

    act(() => {
      result.current.handleLoadMore({} as React.MouseEvent<HTMLButtonElement>);
    });

    expect(mockRouterPush).toHaveBeenCalledWith(`${mockPathname}?pageSize=20`, {
      scroll: false,
    });
    expect(mockCreateSearchParams).toHaveBeenCalledWith({
      previousSearchParamString: new URLSearchParams(),
      additions: [{ newKey: SearchParams.PageSize, newValue: "20" }],
    });
  });
});
