"use client";

import Image from "next/image";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";

type FormTextInputProps = {
  label?: ReactNode;
  labelClassName?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
};

export function FormTextInput({
  label,
  name,
  labelClassName,
  disabled,
  type = "text",
}: FormTextInputProps) {
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
    <div>
      <label
        className={`font-sm text-brand-secondary-black ${labelClassName}`}
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <input
          aria-disabled={disabled}
          disabled={disabled}
          ref={ref}
          type={type}
          value={value}
          name={name}
          id={name}
          onBlur={onBlur}
          onChange={onChange}
          className={`w-full px-4 py-3 border rounded-[27px] font-sm mt-2 disabled:bg-brand-light-gray disabled:cursor-not-allowed outline-0 ${
            !!fieldError
              ? "border-error"
              : isSuccess
              ? "border-brand-primary-green"
              : "border-brand-secondary-gray"
          }`}
        />
        <span className="absolute right-0 bottom-0 p-4 pointer-events-none">
          {isSuccess ? (
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
          ) : null}
        </span>
      </div>
      {!!fieldError && <span className="error-text w-full">{fieldError}</span>}
    </div>
  );
}
