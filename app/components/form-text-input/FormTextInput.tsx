"use client";

import Image from "next/image";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";

type FormTextInputProps = {
  label?: ReactNode;
  labelClassName?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
};

export function FormTextInput({
  label,
  name,
  labelClassName,
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
  const success = !invalid && isTouched;

  return (
    <div>
      <label
        className={`text-sm font-medium text-brand-secondary-black ${labelClassName}`}
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <input
          ref={ref}
          type={type}
          value={value}
          name={name}
          id={name}
          onBlur={onBlur}
          onChange={onChange}
          className={`w-full px-4 py-3 border rounded-[27px] text-sm mt-2 outline-0 ${
            !!fieldError
              ? "border-error"
              : success
              ? "border-brand-primary-green"
              : "border-brand-secondary-gray"
          }`}
        />
        <span className="absolute right-0 bottom-0 p-4 pointer-events-none">
          {success ? (
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
      {!!fieldError && (
        <span className="text-error font-xxs w-full">{fieldError}</span>
      )}
    </div>
  );
}
