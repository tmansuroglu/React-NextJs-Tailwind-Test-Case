import { createFilteredData } from "./get-business-list.utils";

describe("createFilteredData", () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it("returns all items paginated without filter", () => {
    const result = createFilteredData({ items, pageSize: 3, page: 1 });

    expect(result.data).toEqual([1, 2, 3]);
    expect(result.pagination).toEqual({
      currentPage: 1,
      pageSize: 3,
      totalItems: 10,
      numberOfPages: 4,
    });
  });

  it("returns correct pagination for second page without filter", () => {
    const result = createFilteredData({ items, pageSize: 5, page: 2 });

    expect(result.data).toEqual([6, 7, 8, 9, 10]);
    expect(result.pagination).toEqual({
      currentPage: 2,
      pageSize: 5,
      totalItems: 10,
      numberOfPages: 2,
    });
  });

  it("returns filtered items paginated", () => {
    const filterFn = (n: number) => n % 2 === 0;
    const result = createFilteredData({
      items,
      pageSize: 2,
      page: 2,
      filterFn,
    });

    expect(result.data).toEqual([6, 8]);
    expect(result.pagination).toEqual({
      currentPage: 2,
      pageSize: 2,
      totalItems: 5,
      numberOfPages: 3,
    });
  });

  it("handles empty array", () => {
    const result = createFilteredData({ items: [], pageSize: 5, page: 1 });

    expect(result.data).toEqual([]);
    expect(result.pagination).toEqual({
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      numberOfPages: 0,
    });
  });

  it("handles page beyond range by returning empty data", () => {
    const result = createFilteredData({ items, pageSize: 5, page: 3 });

    expect(result.data).toEqual([]);
    expect(result.pagination).toEqual({
      currentPage: 3,
      pageSize: 5,
      totalItems: 10,
      numberOfPages: 2,
    });
  });

  it("handles page 1 with filter that matches no items", () => {
    const filterFn = (n: number) => n > 10;
    const result = createFilteredData({
      items,
      pageSize: 3,
      page: 1,
      filterFn,
    });

    expect(result.data).toEqual([]);
    expect(result.pagination).toEqual({
      currentPage: 1,
      pageSize: 3,
      totalItems: 0,
      numberOfPages: 0,
    });
  });

  it("works with custom type objects", () => {
    const customItems = [
      { name: "A", value: 1 },
      { name: "B", value: 2 },
      { name: "C", value: 3 },
    ];
    const filterFn = (item: { name: string; value: number }) =>
      item.value % 2 !== 0;
    const result = createFilteredData({
      items: customItems,
      pageSize: 2,
      page: 1,
      filterFn,
    });

    expect(result.data).toEqual([
      { name: "A", value: 1 },
      { name: "C", value: 3 },
    ]);
    expect(result.pagination.totalItems).toBe(2);
    expect(result.pagination.numberOfPages).toBe(1);
  });
});
