"use client";

import { ChangeEventHandler, ReactNode, useId } from "react";
import { useController, useFormContext } from "react-hook-form";
import Error from "@/public/error.svg";
import Plus from "@/public/plus.svg";
import Tick from "@/public/tick.svg";
import CheckboxInput from "@/components/checkbox-input";
import ErrorText from "@/components/error-text";

type FormCheckboxInputProps = {
  hideErrorText?: boolean;
  name: string;
  label?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  ariaDescribedBy?: string;
};

export function FormCheckboxInput({
  hideErrorText,
  name,
  label,
  onChange,
  disabled,
  ariaDescribedBy,
}: FormCheckboxInputProps) {
  const errorId = useId();
  const inputId = useId();
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
      ariaDescribedBy={ariaDescribedBy || errorId}
      label={label}
      name={name}
      aria-invalid={!!fieldErrorMessage}
      onChange={handleChange}
      disabled={disabled}
      id={inputId}
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
          <ErrorText id={ariaDescribedBy || errorId}>
            {fieldErrorMessage}
          </ErrorText>
        )
      }
    />
  );
}
