"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MouseEventHandler } from "react";
import { SearchParams } from "../../types/enums";
import { createSearchParams } from "../../utils/createSearchParams";

export const useHandleLoadMore = () => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

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

  return handleLoadMore;
};
