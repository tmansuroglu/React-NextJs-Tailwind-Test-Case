"use client";

import Image from "next/image";
import { useController, useFormContext } from "react-hook-form";
import AutoCompleteComboBox, {
  AutoCompleteComboBoxProps,
} from "../auto-complete-combo-box";
import { twMerge } from "tailwind-merge";

type FormAutoCompleteComboBoxProps = AutoCompleteComboBoxProps & {
  name: string;
};

export function FormAutoCompleteComboBox({
  InputProps,
  name,
  ...props
}: FormAutoCompleteComboBoxProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  const { value, onBlur, onChange, ref } = field;

  const { error, isTouched, invalid } = fieldState;

  const fieldErrorMessage = error?.message;
  const isSuccess = !invalid && isTouched;

  const errorId = `${name}-error-id`;

  return (
    <AutoCompleteComboBox
      defaultValue={value}
      onChange={onChange}
      InputProps={{
        ...InputProps,
        "aria-describedby": errorId,
        "aria-invalid": !!fieldErrorMessage,
        autoComplete: name,
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
          <Image
            src="/error.svg"
            width={16}
            height={16}
            className="w-4 h-4"
            alt="error icon"
            aria-hidden
            unoptimized
          />
        ) : isSuccess ? (
          <Image
            src="/success.svg"
            width={16}
            height={16}
            className="w-4 h-4"
            alt="success icon"
            aria-hidden
            unoptimized
          />
        ) : null
      }
      caption={
        // TODO: make this a component
        !!fieldErrorMessage && (
          <span className="error-text" id={errorId} role="alert">
            {fieldErrorMessage}
          </span>
        )
      }
      {...props}
    />
  );
}
