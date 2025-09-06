"use client";

import Downshift from "downshift";
import {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  RefCallback,
  useState,
} from "react";

type Selection = { value: string };

export type AutoCompleteComboBoxProps = {
  InputProps?: InputHTMLAttributes<HTMLInputElement> & {
    ref?: RefCallback<HTMLInputElement>;
  };
  LabelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputSuffix?: ReactNode;
  caption?: ReactNode;
  label?: ReactNode;
  items: Selection[];
  defaultValue?: string;
  onChange?: (value?: string) => void;
};

export function AutoCompleteComboBox({
  inputSuffix,
  items,
  defaultValue = "",
  onChange,
  label,
  LabelProps = {},
  caption,
  InputProps,
}: AutoCompleteComboBoxProps) {
  const [inputValue, setInputValue] = useState<string>(defaultValue);

  return (
    <div>
      <Downshift
        inputValue={inputValue}
        onChange={(selection: Selection | null) => onChange?.(selection?.value)}
        itemToString={(item) => (item ? item.value : "")}
        onInputValueChange={(newValue: string) => {
          setInputValue(newValue);
        }}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          getRootProps,
          openMenu,
        }) => {
          const filteredItems = items.filter(
            (item) =>
              !inputValue ||
              item.value.toLowerCase().includes(inputValue.toLowerCase())
          );
          return (
            <div className="flex flex-col relative">
              <label {...getLabelProps(LabelProps)}>{label}</label>
              <div
                {...getRootProps(
                  { className: "inline-block" },
                  { suppressRefError: true }
                )}
              >
                <input
                  {...getInputProps({
                    onFocus: () => openMenu(),
                    ...InputProps,
                    className: `w-full pl-4 pr-10 py-3 border rounded-[27px] font-sm mt-2 outline-0 placeholder:font-sm xl:placeholder:font-xs disabled:bg-brand-light-gray border-brand-secondary-gray ${
                      InputProps?.className || ""
                    }`,
                  })}
                />
                {inputSuffix && (
                  <span className="absolute right-0 bottom-0 p-4 pointer-events-none">
                    {inputSuffix}
                  </span>
                )}
              </div>
              {isOpen && (
                <ul
                  {...getMenuProps({
                    className:
                      "border absolute bottom-0 left-0 right-0 z-50 bg-brand-primary-white transform translate-y-full rounded-[20px] max-h-52 overflow-y-auto custom-scrollbar py-1",
                  })}
                >
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      // eslint-disable-next-line react/jsx-key
                      <li
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                          className: "font-sm-medium p-2.5",
                          style: {
                            backgroundColor:
                              highlightedIndex === index
                                ? "lightgray"
                                : "inherit",
                            fontWeight:
                              selectedItem === item ? "bold" : "normal",
                          },
                        })}
                      >
                        {item.value}
                      </li>
                    ))
                  ) : (
                    <li className="font-sm-medium p-2.5 text-brand-tertiary-gray">
                      No Result
                    </li>
                  )}
                </ul>
              )}
            </div>
          );
        }}
      </Downshift>
      {caption && caption}
    </div>
  );
}
