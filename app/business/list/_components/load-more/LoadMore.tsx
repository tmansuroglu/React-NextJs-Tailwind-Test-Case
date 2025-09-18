"use client";

import LoadingIndicator from "@/components/loading-indicator";
import {
  BUSINESS_LIST_DEFAULT_PAGE_SIZE,
  BUSINESS_LIST_DEFAULT_PAGE_SIZE_INCREASE,
} from "@/constants/constants";
import { SearchParamKeys } from "@/types/enums";
import createNewURLSearchParams from "@/utils/create-new-url-search-params";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function LoadMore() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const handleLoadMore = () => {
    startTransition(() => {
      const newSeachParams = createNewURLSearchParams({
        previousSearchParams: searchParams,
        add: [
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

  if (isPending) {
    return (
      <LoadingIndicator
        LoaderProps={{
          className: "size-10",
        }}
      />
    );
  }

  return (
    <button
      onClick={handleLoadMore}
      disabled={isPending}
      aria-busy={isPending}
      data-testid="load-more"
      aria-label="Load More"
      className="flex items-center gap-2 rounded font-sm cursor-pointer text-brand-primary-white p-4 w-fit mx-auto hover:bg-brand-light-gray hover:text-brand-primary-black"
    >
      <span>Load More...</span>
    </button>
  );
}
