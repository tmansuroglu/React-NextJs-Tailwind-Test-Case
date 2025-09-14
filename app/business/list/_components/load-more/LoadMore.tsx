"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { SearchParamKeys } from "../../../../_types/enums";
import {
  BUSINESS_LIST_DEFAULT_PAGE_SIZE,
  BUSINESS_LIST_DEFAULT_PAGE_SIZE_INCREASE,
} from "../../../../_constants/constants";
import createNewURLSearchParams from "../../../../_utils/create-new-url-search-params";
import LoadingIndicator from "../../../../_components/loading-indicator";

export function LoadMore() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const handleLoadMore = () => {
    startTransition(() => {
      const newSeachParams = createNewURLSearchParams({
        previousSearchParams: searchParams,
        additions: [
          {
            newKey: SearchParamKeys.PageSize,
            newValue: String(
              Number(
                searchParams.get(SearchParamKeys.PageSize) ||
                  BUSINESS_LIST_DEFAULT_PAGE_SIZE
              ) + BUSINESS_LIST_DEFAULT_PAGE_SIZE_INCREASE
            ),
          },
        ],
      });

      router.push(`?${newSeachParams.toString()}`, { scroll: false });
    });
  };

  return (
    <button
      onClick={handleLoadMore}
      disabled={isPending}
      aria-busy={isPending}
      data-testid="load-more"
      aria-label="Load More"
      className="flex items-center gap-2 rounded font-sm cursor-pointer text-brand-primary-white p-4 w-fit mx-auto hover:bg-brand-light-gray hover:text-brand-primary-black"
    >
      <span>{isPending ? "Loading" : "Load More"}...</span>
      {isPending && <LoadingIndicator />}
    </button>
  );
}
