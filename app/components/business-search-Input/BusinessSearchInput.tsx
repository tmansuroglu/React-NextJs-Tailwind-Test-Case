"use client";

import TextInput from "../text-input";
import LabeledIcon from "../labeled-icon";
import { useInputValueChange } from "./BusinessSearchInput.utils";

export function BusinessSearchInput() {
  const { handleInputValueChange, inputValue } = useInputValueChange();

  return (
    <TextInput
      value={inputValue}
      onChange={handleInputValueChange}
      label={
        <LabeledIcon
          src="/building.svg"
          alt="search input label icon"
          label="Search Company"
          unoptimized
        />
      }
    />
  );
}
