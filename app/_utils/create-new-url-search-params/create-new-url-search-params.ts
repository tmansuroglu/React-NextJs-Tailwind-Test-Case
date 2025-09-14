import { SearchParamKeys } from "@/types/enums";
import { ReadonlyURLSearchParams } from "next/navigation";

type CreateSearchParamsOptions = {
  previousSearchParams: ReadonlyURLSearchParams;
  add?: { newKey: SearchParamKeys; newValue: string; append?: boolean }[];
  remove?: SearchParamKeys[];
};

export const createNewURLSearchParams = ({
  previousSearchParams,
  add,
  remove,
}: CreateSearchParamsOptions) => {
  const newParams = new URLSearchParams();

  previousSearchParams.forEach((value, key) => {
    if (remove?.includes(key as SearchParamKeys)) {
      return;
    } else if (Array.isArray(value)) {
      value.forEach((v) => newParams.append(key, v));
    } else if (value !== undefined) {
      newParams.set(key, value);
    }
  });

  add?.forEach(({ newKey, newValue, append }) => {
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
