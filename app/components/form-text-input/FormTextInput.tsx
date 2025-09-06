"use client";

import { useController, useFormContext } from "react-hook-form";
import TextInput, { TextInputProps } from "../text-input";
import Image from "next/image";

type FormTextInputProps = TextInputProps & { name: string };

export function FormTextInput({ name, ...props }: FormTextInputProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  const { value, onBlur, onChange, ref } = field;
  const { error, isTouched, invalid } = fieldState;

  const fieldError = error?.message;
  const isSuccess = !invalid && isTouched;

  return (
    <TextInput
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      ref={ref}
      {...props}
      className={`${
        !!fieldError
          ? "border-error"
          : isSuccess
          ? "border-brand-primary-green"
          : "border-brand-secondary-gray"
      }`}
      inputSuffix={
        isSuccess ? (
          <Image
            src="/success.svg"
            width={16}
            height={16}
            className="w-4 h-4"
            alt="success icon"
          />
        ) : !!fieldError ? (
          <Image
            src="/error.svg"
            width={16}
            height={16}
            className="w-4 h-4"
            alt="error icon"
          />
        ) : null
      }
      caption={
        !!fieldError && <span className="error-text w-full">{fieldError}</span>
      }
    />
  );
}
