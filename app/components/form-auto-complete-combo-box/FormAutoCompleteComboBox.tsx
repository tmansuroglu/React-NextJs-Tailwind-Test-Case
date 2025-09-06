"use client";

import Downshift from "downshift";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

type Selection = { value: string };

type FormAutoCompleteComboBoxProps = {
  label?: ReactNode;
  labelClassName?: string;
  placeholder?: string;
  items: Selection[];
  name: string;
  disabled?: boolean;
};

// TODO: create a seperate component for UI element only
// TODO: improve accesibility
export function FormAutoCompleteComboBox({
  label,
  labelClassName,
  placeholder,
  items,
  name,
  disabled,
}: FormAutoCompleteComboBoxProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  const { value, onBlur, onChange, ref } = field;
  const [inputValue, setInputValue] = useState<string>(value);

  const { error, isTouched, invalid } = fieldState;

  const fieldErrorMessage = error?.message;
  const isSuccess = !invalid && isTouched;

  return (
    <div>
      <Downshift
        inputValue={inputValue}
        onChange={(selection: Selection | null) => onChange(selection?.value)}
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
              <label {...getLabelProps({ className: labelClassName })}>
                {label}
              </label>
              <div
                {...getRootProps(
                  { className: "inline-block" },
                  { suppressRefError: true }
                )}
              >
                <input
                  {...getInputProps({
                    ref,
                    onBlur: () => {
                      onBlur();
                    },
                    onFocus: () => openMenu(),
                    disabled,
                    placeholder,
                    "aria-disabled": disabled,
                    className: `w-full pl-4 pr-10 py-3 border rounded-[27px] font-sm mt-2 outline-0 placeholder:font-sm xl:placeholder:font-xs disabled:bg-brand-light-gray ${
                      !!fieldErrorMessage
                        ? "border-error"
                        : isSuccess
                        ? "border-brand-primary-green"
                        : "border-brand-secondary-gray"
                    }`,
                  })}
                />
                <span className="absolute right-0 bottom-0 p-4 pointer-events-none">
                  {!!fieldErrorMessage ? (
                    <Image
                      src="/error.svg"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                      alt="error icon"
                    />
                  ) : isSuccess ? (
                    <Image
                      src="/success.svg"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                      alt="success icon"
                    />
                  ) : null}
                </span>
              </div>
              <ul
                {...getMenuProps({
                  className: `${
                    isOpen ? "border" : ""
                  } absolute bottom-0 left-0 right-0 z-50 bg-brand-primary-white transform translate-y-full rounded-[20px] max-h-52 overflow-y-auto custom-scrollbar py-1`,
                })}
              >
                {!isOpen ? null : filteredItems.length > 0 ? (
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
                          fontWeight: selectedItem === item ? "bold" : "normal",
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
            </div>
          );
        }}
      </Downshift>
      {Boolean(!!fieldErrorMessage) && (
        <span className="error-text ">{fieldErrorMessage}</span>
      )}
    </div>
  );
}
