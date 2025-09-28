import { SearchParamKeys } from "@/types/enums";
import { ReadonlyURLSearchParams } from "next/navigation";
import { createNewURLSearchParams } from "./create-new-url-search-params";

describe("createNewURLSearchParams", () => {
  const createSearchParams = (params: Record<string, string | string[]>) => {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => urlParams.append(key, v));
      } else {
        urlParams.set(key, value);
      }
    });
    return new ReadonlyURLSearchParams(urlParams);
  };

  it("returns unchanged params when no add or remove", () => {
    const previous = createSearchParams({ a: "1", b: "2" });
    const result = createNewURLSearchParams({ previousSearchParams: previous });

    expect(result.toString()).toBe("a=1&b=2");
  });

  it("adds new params", () => {
    const previous = createSearchParams({ a: "1" });
    const add = [{ newKey: SearchParamKeys.Page, newValue: "2" }];
    const result = createNewURLSearchParams({
      previousSearchParams: previous,
      add,
    });

    expect(result.toString()).toBe("a=1&page=2");
  });

  it("updates existing params without append", () => {
    const previous = createSearchParams({ a: "1" });
    const add = [{ newKey: "a" as SearchParamKeys, newValue: "3" }];
    const result = createNewURLSearchParams({
      previousSearchParams: previous,
      add,
    });

    expect(result.toString()).toBe("a=3");
  });

  it("appends to existing params with append true", () => {
    const previous = createSearchParams({ a: "1" });
    const add = [
      { newKey: "a" as SearchParamKeys, newValue: "2", append: true },
    ];
    const result = createNewURLSearchParams({
      previousSearchParams: previous,
      add,
    });

    expect(result.toString()).toBe("a=1&a=2");
  });

  it("deletes param if newValue is falsy", () => {
    const previous = createSearchParams({ a: "1", b: "2" });
    const add = [{ newKey: "b" as SearchParamKeys, newValue: "" }];
    const result = createNewURLSearchParams({
      previousSearchParams: previous,
      add,
    });

    expect(result.toString()).toBe("a=1");
  });

  it("removes specified params", () => {
    const previous = createSearchParams({ a: "1", b: "2", c: "3" });
    const remove = ["b" as SearchParamKeys, "c" as SearchParamKeys];
    const result = createNewURLSearchParams({
      previousSearchParams: previous,
      remove,
    });

    expect(result.toString()).toBe("a=1");
  });

  it("handles array values in previous params", () => {
    const previous = createSearchParams({ a: ["1", "2"] });
    const result = createNewURLSearchParams({ previousSearchParams: previous });

    expect(result.toString()).toBe("a=1&a=2");
  });

  it("combines add and remove operations", () => {
    const previous = createSearchParams({ a: "1", b: "2" });
    const add = [{ newKey: SearchParamKeys.Page, newValue: "3" }];
    const remove = ["b" as SearchParamKeys];
    const result = createNewURLSearchParams({
      previousSearchParams: previous,
      add,
      remove,
    });

    expect(result.toString()).toBe("a=1&page=3");
  });

  it("handles no previous params", () => {
    const previous = createSearchParams({});
    const add = [{ newKey: SearchParamKeys.Page, newValue: "1" }];
    const result = createNewURLSearchParams({
      previousSearchParams: previous,
      add,
    });

    expect(result.toString()).toBe("page=1");
  });

  it("ignores undefined values in previous params", () => {
    const urlParams = new URLSearchParams();
    urlParams.set("a", "undefined");
    const previous = new ReadonlyURLSearchParams(urlParams);
    const result = createNewURLSearchParams({ previousSearchParams: previous });

    expect(result.toString()).toBe("a=undefined");
  });
});
