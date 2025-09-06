import {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  RefCallback,
} from "react";

// TODO: improve accesibility
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
          className={`font-sm text-brand-secondary-black ${
            labelClassName || ""
          }`}
          htmlFor={props.id || props.name}
          {...labelProps}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 py-3 border rounded-[27px] font-sm mt-2 disabled:bg-brand-light-gray disabled:cursor-not-allowed outline-0 border-brand-secondary-gray ${
            className || ""
          }`}
          {...props}
        />
        {inputSuffix && (
          <span className="absolute right-0 bottom-0 p-4 pointer-events-none">
            {inputSuffix}
          </span>
        )}
      </div>
      {!!caption && caption}
    </div>
  );
}
