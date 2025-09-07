import { SearchParams } from "../types/enums";

type CreateSearchParamsOptions = {
  previousSearchParamString: URLSearchParams;
  additions: { newKey: SearchParams; newValue: string }[];
};

export const createSearchParams = ({
  previousSearchParamString,
  additions,
}: CreateSearchParamsOptions) => {
  const params = new URLSearchParams(previousSearchParamString);

  additions.forEach(({ newKey, newValue }) => {
    if (newValue) {
      params.set(newKey, newValue);
    } else {
      params.delete(newKey);
    }
  });

  return params.toString();
};
