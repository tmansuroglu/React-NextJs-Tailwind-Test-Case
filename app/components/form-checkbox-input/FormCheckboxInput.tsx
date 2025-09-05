"use client";

import Image from "next/image";
import { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import { useController, useFormContext } from "react-hook-form";

type FormCheckboxInputProps = {
  LabelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  InputProps: InputHTMLAttributes<HTMLInputElement> & { name: string };
  hideErrorText?: boolean;
};

export function FormCheckboxInput({
  InputProps,
  LabelProps,
  hideErrorText,
}: FormCheckboxInputProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name: InputProps.name,
  });

  const {
    value: fieldValue,
    onBlur: onFieldBlur,
    onChange: onFieldChange,
    ref,
  } = field;

  const fieldErrorMessage = fieldState.error?.message;

  const isChecked = !!fieldValue;

  const { children: labelChildren, ...restOfLabelProps } = LabelProps || {};

  return (
    <div>
      <label
        htmlFor={InputProps.name}
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
        {...restOfLabelProps}
      >
        <span>{labelChildren}</span>
        <input
          type="checkbox"
          name={InputProps.name}
          id={InputProps.name}
          className="hidden"
          onChange={(e) => {
            const onChange = InputProps.onChange || onFieldChange;
            const onBlur = InputProps.onBlur || onFieldBlur;

            onChange(e);
            onBlur(e);
          }}
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
      {Boolean(!!fieldErrorMessage && !hideErrorText) && (
        <span className="text-error font-xxs">{fieldErrorMessage}</span>
      )}
    </div>
  );
}
