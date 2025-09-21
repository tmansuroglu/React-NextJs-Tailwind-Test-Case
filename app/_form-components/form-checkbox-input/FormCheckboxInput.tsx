"use client";

import { useId } from "react";
import { useController, useFormContext } from "react-hook-form";
import Error from "@/public/error.svg";
import Plus from "@/public/plus.svg";
import Tick from "@/public/tick.svg";
import CheckboxInput, { CheckboxInputProps } from "@/components/checkbox-input";
import ErrorText from "@/components/error-text";

type FormCheckboxInputProps = CheckboxInputProps & {
  hideErrorText?: boolean;
  name: string;
};

export function FormCheckboxInput({
  hideErrorText,
  name,
  label,
  onChange,
  LabelProps,
  ...props
}: FormCheckboxInputProps) {
  const errorId = useId();
  const inputId = useId();
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  const { value: fieldValue, onBlur, onChange: onFieldChange, ref } = field;

  const fieldErrorMessage = fieldState.error?.message;

  const isChecked = !!fieldValue;

  return (
    <CheckboxInput
      aria-describedby={props["aria-describedby"] || errorId}
      label={label}
      checked={isChecked}
      name={name}
      aria-invalid={!!fieldErrorMessage}
      onChange={onChange || onFieldChange}
      onBlur={onBlur}
      id={inputId}
      LabelProps={{
        ref,
        className: fieldErrorMessage ? "border-error" : undefined,
        ...LabelProps,
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
          <ErrorText id={props["aria-describedby"] || errorId}>
            {fieldErrorMessage}
          </ErrorText>
        )
      }
      {...props}
    />
  );
}
