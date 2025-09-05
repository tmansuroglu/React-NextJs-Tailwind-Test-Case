import Image from "next/image";
import { HTMLAttributes, InputHTMLAttributes } from "react";

type TextInputProps = {
  LabelProps?: HTMLAttributes<HTMLLabelElement>;
  InputProps?: InputHTMLAttributes<HTMLInputElement>;
};

export function TextInput({ LabelProps, InputProps }: TextInputProps) {
  // TODO: change these
  const error = false;
  const success = true;
  return (
    <div className="relative">
      <label
        className="text-sm font-medium text-brand-secondary-black"
        {...LabelProps}
      />
      <input
        type="text"
        className={`w-full px-4 py-3 border rounded-[27px] text-sm mt-2 ${
          error
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
        ) : error ? (
          <Image
            src="/error.svg"
            width={16}
            height={16}
            className="w-4 h-4"
            alt="error icon"
          />
        ) : null}
      </span>
      {error && (
        <span className="absolute text-error text-sm left-0 font-xxs -bottom-6 w-full">
          Test error
        </span>
      )}
    </div>
  );
}
