"use client";

import TextInput from "../text-input";
import LabeledIcon from "../labeled-icon";
import { useInputValueChange } from "./BusinessSearchInput.utils";
import Building from "@/public/building.svg";

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
