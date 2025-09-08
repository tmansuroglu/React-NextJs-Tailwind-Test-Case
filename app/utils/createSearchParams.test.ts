import { createSearchParams } from "./createSearchParams";
import { SearchParams } from "../types/enums";

describe("createSearchParams", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("adds new parameters to empty search params", () => {
    const previousSearchParamString = new URLSearchParams();
    const additions = [
      { newKey: SearchParams.CompanyName, newValue: "test" },
      { newKey: SearchParams.Page, newValue: "2" },
    ];

    const result = createSearchParams({ previousSearchParamString, additions });

    expect(result).toBe("company=test&page=2");
  });

  it("updates existing parameters with new values", () => {
    const previousSearchParamString = new URLSearchParams("company=old&page=1");
    const additions = [
      { newKey: SearchParams.CompanyName, newValue: "new" },
      { newKey: SearchParams.Page, newValue: "3" },
    ];

    const result = createSearchParams({ previousSearchParamString, additions });

    expect(result).toBe("company=new&page=3");
  });

  it("deletes parameters when newValue is empty", () => {
    const previousSearchParamString = new URLSearchParams(
      "company=test&page=1"
    );
    const additions = [
      { newKey: SearchParams.CompanyName, newValue: "" },
      { newKey: SearchParams.Page, newValue: "2" },
    ];

    const result = createSearchParams({ previousSearchParamString, additions });

    expect(result).toBe("page=2");
  });

  it("handles mixed additions (set and delete)", () => {
    const previousSearchParamString = new URLSearchParams("company=old");
    const additions = [
      { newKey: SearchParams.CompanyName, newValue: "new" },
      { newKey: SearchParams.Page, newValue: "1" },
    ];

    const result = createSearchParams({ previousSearchParamString, additions });

    expect(result).toBe("company=new&page=1");
  });

  it("returns empty string when no parameters remain after deletions", () => {
    const previousSearchParamString = new URLSearchParams("company=test");
    const additions = [{ newKey: SearchParams.CompanyName, newValue: "" }];

    const result = createSearchParams({ previousSearchParamString, additions });

    expect(result).toBe("");
  });

  it("preserves existing parameters not in additions", () => {
    const previousSearchParamString = new URLSearchParams("company=test");
    const additions = [{ newKey: SearchParams.Page, newValue: "1" }];

    const result = createSearchParams({ previousSearchParamString, additions });

    expect(result).toBe("company=test&page=1");
  });
});
