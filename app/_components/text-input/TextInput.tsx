import {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  RefCallback,
} from "react";
import { twMerge } from "tailwind-merge";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  LabelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputSuffix?: ReactNode;
  caption?: ReactNode;
  label?: ReactNode;
  ref?: RefCallback<HTMLInputElement>;
};

export function TextInput({
  inputSuffix,
  caption,
  label,
  className,
  LabelProps = {},
  ...props
}: TextInputProps) {
  const { className: labelClassName, ...labelProps } = LabelProps;
  return (
    <div>
      {label && (
        <label
          className={twMerge(
            "font-sm text-brand-secondary-black",
            labelClassName
          )}
          htmlFor={props.id}
          {...labelProps}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          data-testid="text-input"
          className={twMerge(
            "focus:outline w-full px-4 py-3 border rounded-4xl font-sm mt-2 disabled:bg-brand-light-gray disabled:cursor-not-allowed outline-0 border-brand-secondary-gray",
            className
          )}
          aria-disabled={props.disabled}
          {...props}
        />
        {inputSuffix && (
          <span
            className="absolute right-0 bottom-0 p-4 pointer-events-none"
            aria-hidden
          >
            {inputSuffix}
          </span>
        )}
      </div>
      {!!caption && caption}
    </div>
  );
}
