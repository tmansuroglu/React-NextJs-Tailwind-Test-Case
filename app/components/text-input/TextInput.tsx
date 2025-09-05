"use client";

import Image from "next/image";
import {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import { useController, useFormContext } from "react-hook-form";

type TextInputProps = {
  LabelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  InputProps: InputHTMLAttributes<HTMLInputElement> & { name: string };
};

export function TextInput({ LabelProps, InputProps }: TextInputProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name: InputProps.name,
  });

  const { value, onBlur, onChange, ref } = field;
  const { error, isTouched, invalid } = fieldState;

  const fieldError = error?.message;
  const success = !invalid && isTouched;

  return (
    <div className="relative">
      <label
        className="text-sm font-medium text-brand-secondary-black"
        htmlFor={LabelProps?.htmlFor || InputProps.id || InputProps.name}
        {...LabelProps}
      />
      <input
        ref={ref}
        type="text"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className={`w-full px-4 py-3 border rounded-[27px] text-sm mt-2 outline-0 ${
          !!fieldError
            ? "border-error"
            : success
            ? "border-brand-primary-green"
            : "border-brand-secondary-gray"
        }`}
        {...InputProps}
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
      {!!fieldError && (
        <span className="absolute text-error text-sm left-0 font-xxs -bottom-6 w-full">
          {fieldError}
        </span>
      )}
    </div>
  );
}
