"use client";

import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { debounce } from "throttle-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchParamKeys } from "@/types/enums";
import createNewURLSearchParams from "@/utils/create-new-url-search-params";

export const useInputValueChange = () => {
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(
    searchParams.get(SearchParamKeys.CompanyName) || ""
  );

  useEffect(() => {
    const handlePopStateEvent = (_e: PopStateEvent) => {
      const params = new URLSearchParams(window.location.search);

      setInputValue(params.get(SearchParamKeys.CompanyName) || "");
    };

    window.addEventListener("popstate", handlePopStateEvent);

    return () => {
      window.removeEventListener("popstate", handlePopStateEvent);
    };
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  const debouncedSearchParamChange = useMemo(
    () =>
      debounce(250, (searchParamKey: SearchParamKeys, value: string) => {
        router.push(
          pathname +
            "?" +
            createNewURLSearchParams({
              previousSearchParams: searchParams,
              add: [{ newKey: searchParamKey, newValue: value }],
              remove: [SearchParamKeys.Page],
            }).toString(),
          { scroll: false }
        );
      }),
    [pathname, router, searchParams]
  );

  const handleInputValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    debouncedSearchParamChange(SearchParamKeys.CompanyName, e.target.value);
  };

  return { handleInputValueChange, inputValue };
};
