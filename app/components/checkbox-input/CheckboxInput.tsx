import {
  ChangeEventHandler,
  KeyboardEventHandler,
  LabelHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { RefCallBack } from "react-hook-form";

export type CheckboxInputProps = {
  LabelProps?: LabelHTMLAttributes<HTMLLabelElement> & {
    ref: RefCallBack;
  };
  inputSuffix?: ReactNode;
  caption?: ReactNode;
  name?: string;
  disabled?: boolean;
  label: ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
  defaultIsChecked?: boolean;
  ariaDescribedBy?: string;
};

export function CheckboxInput({
  inputSuffix,
  caption,
  name,
  disabled,
  label,
  onChange,
  LabelProps,
  defaultIsChecked = false,
  ariaDescribedBy,
}: CheckboxInputProps) {
  const [isChecked, setIsChecked] = useState(defaultIsChecked);

  const handleOnKeyDown: KeyboardEventHandler<HTMLLabelElement> = (e) => {
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
        className={`
    relative block px-4 py-3 rounded-[27px] border text-left min-w-32 font-sm outline-0
    focus:outline
    ${disabled ? "bg-brand-light-gray cursor-not-allowed" : "cursor-pointer"}
    ${
      isChecked
        ? "bg-brand-secondary-black text-brand-primary-white hover:bg-brand-secondary-gray hover:text-brand-primary-white"
        : "text-brand-secondary-black hover:bg-brand-light-gray hover:text-brand-secondary-black"
    }
    ${LabelProps?.className}
  `}
        aria-live="polite"
        tabIndex={0}
        htmlFor={name}
        aria-disabled={disabled}
        onKeyDown={handleOnKeyDown}
      >
        <span>{label}</span>
        {/* // TODO: cant select it with keyboard */}
        <input
          type="checkbox"
          name={name}
          id={name}
          aria-describedby={ariaDescribedBy}
          aria-checked={isChecked}
          className="hidden"
          onChange={(e) => {
            setIsChecked(e.target.checked);
            onChange(e);
          }}
        />
        {inputSuffix && (
          <span className=" absolute right-3 bottom-0.5 -translate-y-full pointer-events-none">
            {inputSuffix}
          </span>
        )}
      </label>
      {caption && caption}
    </div>
  );
}
