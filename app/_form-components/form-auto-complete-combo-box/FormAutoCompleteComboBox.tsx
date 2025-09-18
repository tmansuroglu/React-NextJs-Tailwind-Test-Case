"use client";

import { useController, useFormContext } from "react-hook-form";

import { twMerge } from "tailwind-merge";
import Error from "@/public/error.svg";
import Success from "@/public/success.svg";
import AutoCompleteComboBox, {
  AutoCompleteComboBoxProps,
} from "@/components/auto-complete-combo-box";
import ErrorText from "@/components/error-text";
import { useId } from "react";

type FormAutoCompleteComboBoxProps = AutoCompleteComboBoxProps & {
  name: string;
};

export function FormAutoCompleteComboBox({
  InputProps,
  name,
  ...props
}: FormAutoCompleteComboBoxProps) {
  const errorId = useId();
  const inputId = useId();
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  const { value, onBlur, onChange, ref } = field;

  const { error, isTouched, invalid } = fieldState;

  const fieldErrorMessage = error?.message;
  const isSuccess = !invalid && isTouched;

  return (
    <AutoCompleteComboBox
      defaultValue={value}
      onChange={onChange}
      InputProps={{
        ...InputProps,
        "aria-describedby": errorId,
        "aria-invalid": !!fieldErrorMessage,
        autoComplete: name,
        id: inputId,
        name,
        ref,
        onBlur,
        className: twMerge(
          !!fieldErrorMessage && "border-error",
          isSuccess && "border-brand-primary-green",
          InputProps?.className
        ),
      }}
      inputSuffix={
        !!fieldErrorMessage ? (
          <Error width={16} height={16} aria-hidden />
        ) : isSuccess ? (
          <Success width={16} height={16} aria-hidden />
        ) : null
      }
      caption={
        !!fieldErrorMessage && (
          <ErrorText id={errorId}>{fieldErrorMessage}</ErrorText>
        )
      }
      {...props}
    />
  );
}
