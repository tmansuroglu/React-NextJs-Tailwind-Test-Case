"use client";

import Image from "next/image";
import { ChangeEventHandler, ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";

type FormCheckboxInputProps = {
  hideErrorText?: boolean;
  name: string;
  label?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export function FormCheckboxInput({
  hideErrorText,
  name,
  label,
  onChange,
}: FormCheckboxInputProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  const {
    value: fieldValue,
    onBlur: onFieldBlur,
    onChange: onFieldChange,
    ref,
  } = field;

  const fieldErrorMessage = fieldState.error?.message;

  const isChecked = !!fieldValue;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    (onChange || onFieldChange)(e);
    onFieldBlur();
  };

  return (
    <div>
      <label
        htmlFor={name}
        className={`
  relative block text-sm font-medium 
  px-4 py-3 rounded-[27px] border no-underline cursor-pointer text-left min-w-32 font-sm outline-0
  ${
    isChecked
      ? "bg-brand-secondary-black text-brand-primary-white hover:bg-brand-secondary-gray hover:text-brand-primary-white"
      : "text-brand-secondary-black hover:bg-brand-light-gray hover:text-brand-secondary-black"
  }
  ${fieldErrorMessage ? "border-error" : "border-brand-secondary-black"}
`.trim()}
        ref={ref}
        tabIndex={0}
      >
        <span>{label}</span>
        <input
          type="checkbox"
          name={name}
          id={name}
          className="hidden"
          onChange={handleChange}
        />
        <span className=" absolute right-3 bottom-0.5 -translate-y-full pointer-events-none">
          {!!fieldErrorMessage ? (
            <Image
              src="/error.svg"
              width={16}
              height={16}
              alt="error icon"
              className="w-4 h-4"
            />
          ) : isChecked ? (
            <Image
              src="/white-tick.svg"
              width={16}
              height={16}
              className="w-4 h-4"
              alt="checked icon"
            />
          ) : (
            <Image
              src="/plus.svg"
              width={16}
              height={16}
              alt="plus icon"
              className="w-4 h-4"
            />
          )}
        </span>
      </label>
      {/* TODO: this repeats too many times */}
      {Boolean(!!fieldErrorMessage && !hideErrorText) && (
        <span className="error-text">{fieldErrorMessage}</span>
      )}
    </div>
  );
}
