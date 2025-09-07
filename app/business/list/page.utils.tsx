"use client";

import {
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useMemo,
} from "react";
import { SearchParams } from "../../types/enums";
import { debounce } from "throttle-debounce";
import { createSearchParams } from "../../utils/createSearchParams";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";

type UseHandlersOptions = {
  setInputValue: Dispatch<SetStateAction<string>>;
  searchParams: ReadonlyURLSearchParams;
};
export const useHandlers = ({
  setInputValue,
  searchParams,
}: UseHandlersOptions) => {
  const router = useRouter();
  const pathname = usePathname();

  const debouncedSearchParamChange = useMemo(
    () =>
      debounce(250, (searchParamKey: SearchParams, value: string) => {
        router.push(
          pathname +
            "?" +
            createSearchParams({
              previousSearchParamString: searchParams,
              additions: [{ newKey: searchParamKey, newValue: value }],
            }),
          { scroll: false }
        );
      }),
    [pathname, router, searchParams]
  );

  const handleInputValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    debouncedSearchParamChange(SearchParams.CompanyName, e.target.value);
  };

  const handleLoadMore: MouseEventHandler<HTMLButtonElement> = () => {
    const currentPageSize = searchParams.get(SearchParams.PageSize) || 10;

    router.push(
      pathname +
        "?" +
        createSearchParams({
          previousSearchParamString: searchParams,
          additions: [
            {
              newKey: SearchParams.PageSize,
              newValue: String(Number(currentPageSize) + 10),
            },
          ],
        }),
      { scroll: false }
    );
  };

  return { handleInputValueChange, handleLoadMore };
};
