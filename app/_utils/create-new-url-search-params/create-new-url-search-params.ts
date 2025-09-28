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
    if (!remove?.includes(key as SearchParamKeys)) {
      newParams.append(key, value);
    }
  });

  add?.forEach(({ newKey, newValue, append }) => {
    if (newValue) {
      if (append) {
        newParams.append(newKey, newValue);
      } else {
        newParams.set(newKey, newValue);
      }
    } else {
      newParams.delete(newKey);
    }
  });

  return newParams;
};
