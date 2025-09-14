"use client";

import { ChangeEventHandler, ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";
import Error from "@/public/error.svg";
import Plus from "@/public/plus.svg";
import Tick from "@/public/tick.svg";
import CheckboxInput from "@/components/checkbox-input";

type FormCheckboxInputProps = {
  hideErrorText?: boolean;
  name: string;
  label?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  ariaDescribedBy?: string;
  id?: string;
};

export function FormCheckboxInput({
  hideErrorText,
  name,
  label,
  onChange,
  disabled,
  ariaDescribedBy,
  id,
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

  const errorId = `${name}-error-id`;

  return (
    <CheckboxInput
      ariaDescribedBy={ariaDescribedBy || errorId}
      label={label}
      name={name}
      aria-invalid={!!fieldErrorMessage}
      onChange={handleChange}
      disabled={disabled}
      id={id}
      LabelProps={{
        ref,
        className: fieldErrorMessage ? "border-error" : undefined,
      }}
      inputSuffix={
        !!fieldErrorMessage ? (
          <Error width={16} height={16} aria-hidden />
        ) : isChecked ? (
          <Tick width={16} height={16} aria-hidden />
        ) : (
          <Plus width={16} height={16} aria-hidden />
        )
      }
      caption={
        Boolean(!!fieldErrorMessage && !hideErrorText) && (
          <span className="error-text" id={errorId} role="alert">
            {fieldErrorMessage}
          </span>
        )
      }
    />
  );
}
