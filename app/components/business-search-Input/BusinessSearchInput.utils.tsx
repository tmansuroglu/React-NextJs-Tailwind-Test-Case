"use client";

import { ChangeEventHandler, useMemo, useState } from "react";
import { debounce } from "throttle-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchParams } from "@/types/enums";
import { createSearchParams } from "@/utils/createSearchParams";

export const useInputValueChange = () => {
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(
    searchParams.get(SearchParams.CompanyName) || ""
  );

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

  return { handleInputValueChange, inputValue };
};
