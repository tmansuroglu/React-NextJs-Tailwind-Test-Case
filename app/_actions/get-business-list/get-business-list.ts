"use server";

import { Business, BusinessListResponsePayload } from "../../_types/payload";
import { SearchParamsType } from "../../_types/search-param-type";
import { readBusinesses } from "../utils";
import { SearchParamKeys } from "../../_types/enums";
import { createFilteredData } from "./get-business-list.utils";
import {
  BUSINESS_LIST_DEFAULT_PAGE_NUMBER,
  BUSINESS_LIST_DEFAULT_PAGE_SIZE,
} from "../../_constants/constants";

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
    // TODO: error.js
    console.error("get business list error", error);
    return null; // Graceful failure – component will render error UI
  }
}
