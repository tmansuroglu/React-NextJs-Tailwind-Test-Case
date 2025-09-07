import { NextResponse } from "next/server";
import {
  createFilteredData,
  getFilterInfoFromUrl,
  readBusinesses,
} from "./utils";
import { Business, BusinessListResponsePayload } from "../../types/payload";

export async function GET(request: Request) {
  try {
    const { page, pageSize, company } = getFilterInfoFromUrl(request.url);

    if (page < 1 || pageSize < 1) {
      return NextResponse.json(
        { success: false, message: "Invalid page or pageSize" },
        { status: 400 }
      );
    }

    const filteredData = createFilteredData<Business>({
      page,
      pageSize,
      items: await readBusinesses(),
      filterFn: !!company
        ? (item) =>
            item.company
              .toLocaleLowerCase()
              .includes(company.toLocaleLowerCase())
        : undefined,
    });

    return NextResponse.json<BusinessListResponsePayload>(
      {
        success: true,
        message: "Retrieved businesses successfully",
        ...filteredData,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to retrieve businesses" },
      { status: 500 }
    );
  }
}
