"use client";

import Image from "next/image";
import { useController, useFormContext } from "react-hook-form";
import AutoCompleteComboBox, {
  AutoCompleteComboBoxProps,
} from "../auto-complete-combo-box";

type FormAutoCompleteComboBoxProps = AutoCompleteComboBoxProps & {
  name: string;
};

// TODO: improve accesibility
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

  return (
    <AutoCompleteComboBox
      defaultValue={value}
      onChange={onChange}
      InputProps={{
        ...InputProps,
        name,
        ref,
        onBlur,
        className: !!fieldErrorMessage
          ? "!border-error"
          : isSuccess
          ? "!border-brand-primary-green"
          : "!border-brand-secondary-gray",
      }}
      inputSuffix={
        !!fieldErrorMessage ? (
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
        ) : null
      }
      caption={
        !!fieldErrorMessage && (
          <span className="error-text ">{fieldErrorMessage}</span>
        )
      }
      {...props}
    />
  );
}
