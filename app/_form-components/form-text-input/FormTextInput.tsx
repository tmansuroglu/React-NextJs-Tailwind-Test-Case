"use client";

import { useController, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import Error from "@/public/error.svg";
import Success from "@/public/success.svg";
import TextInput, { TextInputProps } from "@/components/text-input";
import ErrorText from "@/components/error-text";
import { useId } from "react";

type FormTextInputProps = TextInputProps & { name: string };

export function FormTextInput({ name, ...props }: FormTextInputProps) {
  const inputId = useId();
  const errorId = useId();
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
      name={name}
      ref={ref}
      aria-describedby={errorId}
      aria-invalid={!!fieldError}
      className={twMerge(
        isSuccess && "border-brand-primary-green",
        fieldError && "border-error",
        props.className
      )}
      inputSuffix={
        isSuccess ? (
          <Success width={16} height={16} aria-hidden />
        ) : !!fieldError ? (
          <Error width={16} height={16} aria-hidden />
        ) : null
      }
      caption={!!fieldError && <ErrorText id={errorId}>{fieldError}</ErrorText>}
      id={inputId}
      {...props}
    />
  );
}
