"use server";

import { Business, BusinessListResponsePayload } from "@/types/payload";
import { SearchParamsType } from "@/types/search-param-type";
import { readBusinesses } from "../utils";
import { SearchParamKeys } from "@/types/enums";
import { createFilteredData } from "./get-business-list.utils";
import {
  BUSINESS_LIST_DEFAULT_PAGE_NUMBER,
  BUSINESS_LIST_DEFAULT_PAGE_SIZE,
} from "@/constants/constants";

export async function getBusinessList(
  searchParams: SearchParamsType
): Promise<BusinessListResponsePayload | null> {
  try {
    const params = await searchParams;
    // TODO: there should be standardized way of doing this
    const page =
      Number(params[SearchParamKeys.Page]) || BUSINESS_LIST_DEFAULT_PAGE_NUMBER;
    const pageSize =
      Number(params[SearchParamKeys.PageSize]) ||
      BUSINESS_LIST_DEFAULT_PAGE_SIZE;
    const company = (params[SearchParamKeys.CompanyName] as string) || "";

    const filteredData = createFilteredData<Business>({
      page,
      pageSize,
      items: await readBusinesses(),
      filterFn: company
        ? (item) =>
            item.company
              .toLocaleLowerCase()
              .includes(company.toLocaleLowerCase())
        : undefined,
    });

    return {
      success: true,
      message: "Retrieved businesses successfully",
      ...filteredData,
    };
  } catch (error) {
    console.error("get business list error", error);
    return null; // Graceful failure – component will render error UI
  }
}
