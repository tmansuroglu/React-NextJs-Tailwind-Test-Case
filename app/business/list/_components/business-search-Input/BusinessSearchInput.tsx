"use client";

import TextInput from "@/components/text-input";
import { useInputValueChange } from "./BusinessSearchInput.utils";
import Building from "@/public/building.svg";
import LabeledIcon from "@/components/labeled-icon";

// TODO: send new request while loading => cancel previous request
// TODO: doesn't work properly when navigated with chrome arrows
export function BusinessSearchInput() {
  const { handleInputValueChange, inputValue } = useInputValueChange();

  return (
    <TextInput
      value={inputValue}
      onChange={handleInputValueChange}
      label={<LabeledIcon label="Search Company" IconComponent={Building} />}
    />
  );
}
