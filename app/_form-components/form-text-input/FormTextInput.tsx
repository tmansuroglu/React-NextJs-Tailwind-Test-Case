"use client";

import { useController, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import Error from "@/public/error.svg";
import Success from "@/public/success.svg";
import TextInput, { TextInputProps } from "@/components/text-input";

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
          <Success width={16} height={16} aria-hidden />
        ) : !!fieldError ? (
          <Error width={16} height={16} aria-hidden />
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
