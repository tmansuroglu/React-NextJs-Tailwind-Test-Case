"use client";

import type { Pagination } from "@/types/payload";
import PageButton from "../page-button";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import createNewURLSearchParams from "@/utils/create-new-url-search-params";
import { SearchParamKeys } from "@/types/enums";

type PaginationProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> &
  Omit<Pagination, "pageSize" | "totalItems">;

export function Pagination({
  currentPage,
  numberOfPages,
  ...props
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageNumberClick = (pageNumber: number) => {
    router.push(
      pathname +
        "?" +
        createNewURLSearchParams({
          previousSearchParams: searchParams,
          add: [
            {
              newKey: SearchParamKeys.Page,
              newValue: pageNumber.toLocaleString(),
            },
          ],
        }).toString()
    );
  };

  // TODO: Doesn't look nice when there are a lot of pages
  return (
    <nav {...props}>
      <ul className="flex justify-center gap-2 list-none flex-wrap">
        {new Array(numberOfPages).fill(undefined).map((_item, index) => {
          const pageNum = index + 1;

          return (
            <li key={`page-number-element-${pageNum}`}>
              <PageButton
                aria-label={`Go to page ${pageNum}`}
                disabled={pageNum === currentPage}
                onClick={() => handlePageNumberClick(pageNum)}
              >
                {pageNum}
              </PageButton>
            </li>
          );
        })}
      </ul>
      <p aria-live="polite" className="text-center mt-2 text-gray-700 sr-only">
        Showing page {currentPage} of {numberOfPages}
      </p>
    </nav>
  );
}
