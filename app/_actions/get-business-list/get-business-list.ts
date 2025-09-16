"use server";

import { createFilteredData } from "./get-business-list.utils";

import { SearchParamsType } from "@/types/search-param-type";
import { Business, BusinessListResponsePayload } from "@/types/payload";
import { SearchParamKeys } from "@/types/enums";
import { readBusinesses } from "../utils";
import {
  BUSINESS_LIST_DEFAULT_PAGE_NUMBER,
  BUSINESS_LIST_DEFAULT_PAGE_SIZE,
} from "@/constants/constants";

export async function getBusinessList(
  params: SearchParamsType
): Promise<BusinessListResponsePayload | null> {
  try {
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
    return null;
  }
}
