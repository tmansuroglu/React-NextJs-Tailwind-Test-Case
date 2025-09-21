import {
  HTMLAttributes,
  InputHTMLAttributes,
  KeyboardEventHandler,
  LabelHTMLAttributes,
  ReactNode,
} from "react";
import { RefCallBack } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export type CheckboxInputProps = InputHTMLAttributes<HTMLInputElement> & {
  LabelProps?: LabelHTMLAttributes<HTMLLabelElement> & {
    ref?: RefCallBack;
  };
  InputSuffixWrapperProps?: HTMLAttributes<HTMLSpanElement>;
  inputSuffix?: ReactNode;
  caption?: ReactNode;
  label: ReactNode;
};

export function CheckboxInput({
  inputSuffix,
  caption,
  label,
  LabelProps,
  InputSuffixWrapperProps,
  disabled,
  checked,
  id,
  ...props
}: CheckboxInputProps) {
  const handleOnKeyDown: KeyboardEventHandler<HTMLLabelElement> = (e) => {
    if (disabled) {
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const input = e.currentTarget.querySelector(
        'input[type="checkbox"]'
      ) as HTMLInputElement;
      if (input && !disabled) {
        input.click();
      }
    }
  };

  return (
    <div>
      <label
        {...LabelProps}
        className={twMerge(
          "relative block px-4 py-3 rounded-4xl border text-left min-w-32 font-sm outline-0 focus:outline cursor-pointer text-brand-secondary-black hover:bg-brand-light-gray hover:text-brand-secondary-black",
          checked &&
            "bg-brand-secondary-black text-brand-primary-white hover:bg-brand-secondary-gray hover:text-brand-primary-white",
          disabled &&
            "bg-brand-light-gray text-brand-secondary-black cursor-not-allowed",
          LabelProps?.className
        )}
        aria-live="polite"
        tabIndex={0}
        htmlFor={id}
        aria-disabled={disabled}
        onKeyDown={handleOnKeyDown}
      >
        <span>{label}</span>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          className="hidden"
          {...props}
        />
        {inputSuffix && (
          <span
            {...InputSuffixWrapperProps}
            className={twMerge(
              "absolute right-3 bottom-0.5 -translate-y-full pointer-events-none",
              InputSuffixWrapperProps?.className
            )}
          >
            {inputSuffix}
          </span>
        )}
      </label>
      {caption && caption}
    </div>
  );
}
