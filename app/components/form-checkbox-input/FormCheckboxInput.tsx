"use client";

import Image from "next/image";
import { ChangeEventHandler, ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";
import CheckboxInput from "../checkbox-input";

type FormCheckboxInputProps = {
  hideErrorText?: boolean;
  name: string;
  label?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  ariaDescribedBy?: string;
};

// TODO: create a seperate component for UI element only
// TODO: improve accesibility
export function FormCheckboxInput({
  hideErrorText,
  name,
  label,
  onChange,
  disabled,
  ariaDescribedBy,
}: FormCheckboxInputProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  const {
    value: fieldValue,
    onBlur: onFieldBlur,
    onChange: onFieldChange,
    ref,
  } = field;

  const fieldErrorMessage = fieldState.error?.message;

  const isChecked = !!fieldValue;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (disabled) {
      return;
    }

    (onChange || onFieldChange)(e);
    onFieldBlur();
  };

  return (
    <CheckboxInput
      ariaDescribedBy={ariaDescribedBy}
      label={label}
      name={name}
      onChange={handleChange}
      LabelProps={{
        ref,
        className: fieldErrorMessage
          ? "border-error"
          : "border-brand-secondary-black",
      }}
      inputSuffix={
        !!fieldErrorMessage ? (
          <Image
            src="/error.svg"
            width={16}
            height={16}
            alt="error icon"
            className="w-4 h-4"
          />
        ) : isChecked ? (
          <Image
            src="/white-tick.svg"
            width={16}
            height={16}
            className="w-4 h-4"
            alt="checked icon"
          />
        ) : (
          <Image
            src="/plus.svg"
            width={16}
            height={16}
            alt="plus icon"
            className="w-4 h-4"
          />
        )
      }
      caption={
        Boolean(!!fieldErrorMessage && !hideErrorText) && (
          <span className="error-text">{fieldErrorMessage}</span>
        )
      }
    />
  );
}
