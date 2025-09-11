"use client";

import { useController, useFormContext } from "react-hook-form";
import TextInput, { TextInputProps } from "../text-input";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

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

  const errorId = `${name}-error-id`;

  return (
    <TextInput
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      name={name}
      ref={ref}
      aria-describedby={errorId}
      aria-invalid={!!fieldError}
      {...props}
      className={twMerge(
        isSuccess && "border-brand-primary-green",
        fieldError && "border-error",
        props.className
      )}
      inputSuffix={
        isSuccess ? (
          <Image
            src="/success.svg"
            width={16}
            height={16}
            className="w-4 h-4"
            alt="success icon"
            aria-hidden
            unoptimized
          />
        ) : !!fieldError ? (
          <Image
            src="/error.svg"
            width={16}
            height={16}
            className="w-4 h-4"
            alt="error icon"
            aria-hidden
            unoptimized
          />
        ) : null
      }
      caption={
        !!fieldError && (
          <span className="error-text w-full" role="alert" id={errorId}>
            {fieldError}
          </span>
        )
      }
    />
  );
}
