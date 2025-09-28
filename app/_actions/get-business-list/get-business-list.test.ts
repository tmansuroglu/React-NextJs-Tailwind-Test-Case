import { readBusinesses } from "../utils";
import { Business } from "@/types/payload";
import { SearchParamKeys } from "@/types/enums";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/constants/constants";
import { getBusinessList } from "./get-business-list";

jest.mock("../utils", () => ({
  readBusinesses: jest.fn(),
}));

describe("getBusinessList", () => {
  const mockBusinesses: Business[] = [
    {
      name: "a",
      company: "b",
      mobile_phone: "+447342342342",
      email_address: "aasd@wasdas.com",
      postcode: "N61BA",
      pay_later: true,
      pay_now: false,
      id: "ea14a3ec-dd7a-4f03-a9f8-51bec408f286",
    },
    {
      name: "a",
      company: "b",
      mobile_phone: "+447342342342",
      email_address: "aasd@wasdas.com",
      postcode: "E17AA",
      pay_later: true,
      pay_now: false,
      id: "9a78889d-9ca1-4dd2-a845-86bb378d2c1a",
    },
  ];

  beforeEach(() => {
    (readBusinesses as jest.Mock).mockResolvedValue(mockBusinesses);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns paginated businesses without filters", async () => {
    const params = {};
    const result = await getBusinessList(params);

    expect(result).toEqual({
      success: true,
      message: "Retrieved businesses successfully",
      data: mockBusinesses,
      pagination: {
        currentPage: DEFAULT_PAGE_NUMBER,
        pageSize: DEFAULT_PAGE_SIZE,
        totalItems: 2,
        numberOfPages: 1,
      },
    });
    expect(readBusinesses).toHaveBeenCalledTimes(1);
  });

  it("returns paginated businesses with custom page and pageSize", async () => {
    const params = {
      [SearchParamKeys.Page]: "1",
      [SearchParamKeys.PageSize]: "1",
    };
    const result = await getBusinessList(params);

    expect(result?.data).toEqual([mockBusinesses[0]]);
    expect(result?.pagination).toEqual({
      currentPage: 1,
      pageSize: 1,
      totalItems: 2,
      numberOfPages: 2,
    });
  });

  it("returns empty data for page beyond available data", async () => {
    const params = {
      [SearchParamKeys.Page]: "3",
      [SearchParamKeys.PageSize]: "1",
    };
    const result = await getBusinessList(params);

    expect(result?.data).toEqual([]);
    expect(result?.pagination).toEqual({
      currentPage: 3,
      pageSize: 1,
      totalItems: 2,
      numberOfPages: 2,
    });
  });

  it("filters businesses by company name", async () => {
    const params = {
      [SearchParamKeys.CompanyName]: "b",
    };
    const result = await getBusinessList(params);

    expect(result?.data).toEqual(mockBusinesses);
    expect(result?.pagination.totalItems).toBe(2);
  });

  it("handles case-insensitive filtering", async () => {
    const params = {
      [SearchParamKeys.CompanyName]: "B",
    };
    const result = await getBusinessList(params);

    expect(result?.data).toEqual(mockBusinesses);
  });

  it("returns empty data when no matches", async () => {
    const params = {
      [SearchParamKeys.CompanyName]: "Nonexistent",
    };
    const result = await getBusinessList(params);

    expect(result?.data).toEqual([]);
    expect(result?.pagination.totalItems).toBe(0);
    expect(result?.pagination.numberOfPages).toBe(0);
  });

  it("returns null on error", async () => {
    (readBusinesses as jest.Mock).mockRejectedValue(
      new Error("Failed to read")
    );

    const params = {};
    const result = await getBusinessList(params);

    expect(result).toBeNull();
  });

  it("uses default values for invalid params", async () => {
    const params = {
      [SearchParamKeys.Page]: "invalid",
      [SearchParamKeys.PageSize]: "invalid",
    };
    const result = await getBusinessList(params);

    expect(result?.pagination.currentPage).toBe(DEFAULT_PAGE_NUMBER);
    expect(result?.pagination.pageSize).toBe(DEFAULT_PAGE_SIZE);
  });
});
