import { SearchParamsType } from "@/types/search-param-type";

type CreateFilteredDataOptions<T> = {
  items: T[];
  pageSize: number;
  page: number;
  filterFn?: (item: T) => boolean;
};

export const createFilteredData = <T>({
  items,
  pageSize,
  page,
  filterFn,
}: CreateFilteredDataOptions<T>) => {
  const filteredData = filterFn ? items.filter(filterFn) : items;
  const itemsLength = filteredData.length;
  const numberOfPages = Math.ceil(itemsLength / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      pageSize,
      totalItems: itemsLength,
      numberOfPages,
    },
  };
};
