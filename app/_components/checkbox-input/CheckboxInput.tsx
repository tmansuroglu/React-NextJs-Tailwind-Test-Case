import {
  ChangeEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  LabelHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { RefCallBack } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export type CheckboxInputProps = {
  LabelProps?: LabelHTMLAttributes<HTMLLabelElement> & {
    ref?: RefCallBack;
  };
  inputSuffix?: ReactNode;
  caption?: ReactNode;
  name?: string;
  disabled?: boolean;
  label: ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
  defaultIsChecked?: boolean;
  ariaDescribedBy?: string;
  id?: string;
  TextWrapperProps?: HTMLAttributes<HTMLSpanElement>;
};

export function CheckboxInput({
  inputSuffix,
  caption,
  name,
  disabled,
  label,
  onChange,
  LabelProps,
  ariaDescribedBy,
  id,
  TextWrapperProps,
}: CheckboxInputProps) {
  // TODO: get rid of this. causing problems
  const [isChecked, setIsChecked] = useState();

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
          isChecked &&
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
          name={name}
          id={id}
          aria-describedby={ariaDescribedBy}
          aria-checked={isChecked}
          className="hidden"
          onChange={(e) => {
            if (disabled) {
              return;
            }
            setIsChecked(e.target.checked);
            onChange(e);
          }}
        />
        {inputSuffix && (
          <span
            {...TextWrapperProps}
            className={twMerge(
              "absolute right-3 bottom-0.5 -translate-y-full pointer-events-none",
              TextWrapperProps?.className
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
