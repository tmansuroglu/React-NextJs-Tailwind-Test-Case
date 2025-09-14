import { SearchParamKeys } from "../../_types/enums";
import { ReadonlyURLSearchParams } from "next/navigation";

type CreateSearchParamsOptions = {
  previousSearchParams: ReadonlyURLSearchParams;
  additions: { newKey: SearchParamKeys; newValue: string; append?: boolean }[];
};

export const createNewURLSearchParams = ({
  previousSearchParams,
  additions,
}: CreateSearchParamsOptions) => {
  const newParams = new URLSearchParams();

  Object.entries(previousSearchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => newParams.append(key, v));
    } else if (value !== undefined) {
      newParams.set(key, value);
    }
  });

  additions.forEach(({ newKey, newValue, append }) => {
    if (newValue && append) {
      newParams.append(newKey, newValue);
    } else if (newValue && !append) {
      newParams.set(newKey, newValue);
    } else {
      newParams.delete(newKey);
    }
  });

  return newParams;
};
