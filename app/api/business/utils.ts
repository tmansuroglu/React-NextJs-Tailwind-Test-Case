import path from "path";
import { promises as fs } from "fs";
import { Business } from "../../types/payload";
import { SearchParams } from "../../types/enums";

const businessesFilePath = path.join(process.cwd(), "businesses.json");

export const writeBusinesses = async (businesses: Business[]) => {
  try {
    await fs.writeFile(
      businessesFilePath,
      JSON.stringify(businesses, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.log("business write error", error);
    throw new Error("Failed to write into the file");
  }
};

export const readBusinesses = async () => {
  try {
    const fileContent = await fs.readFile(businessesFilePath, "utf-8");

    return (JSON.parse(fileContent) as Business[]) || [];
  } catch (error) {
    console.log("business read error", error);
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      await writeBusinesses([]);

      return [];
    }

    throw new Error("Failed to read the file");
  }
};

export const getFilterInfoFromUrl = (url: string) => {
  const urlObj = new URL(url);

  return {
    [SearchParams.Page]: parseInt(
      urlObj.searchParams.get(SearchParams.Page) || "1"
    ),
    [SearchParams.PageSize]: parseInt(
      urlObj.searchParams.get(SearchParams.PageSize) || "10"
    ),
    [SearchParams.CompanyName]: urlObj.searchParams.get(
      SearchParams.CompanyName
    ),
  };
};

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
