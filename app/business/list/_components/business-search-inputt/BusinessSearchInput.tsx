"use client";

import TextInput from "@/components/text-input";
import { useInputValueChange } from "./BusinessSearchInput.utils";
import Building from "@/public/building.svg";
import LabeledIcon from "@/components/labeled-icon";

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
