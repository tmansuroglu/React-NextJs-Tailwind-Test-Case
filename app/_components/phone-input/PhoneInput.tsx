import { LabelHTMLAttributes, ReactNode } from "react";
import { RefCallBack } from "react-hook-form";
import {
  PhoneInput as PhoneInputComponent,
  PhoneInputProps as PhoneInputComponentProps,
} from "react-international-phone";
import { twMerge } from "tailwind-merge";

export type PhoneInputProps = PhoneInputComponentProps & {
  LabelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputSuffix?: ReactNode;
  caption?: ReactNode;
  label?: ReactNode;
  id?: string;
  ref?: RefCallBack;
};

export function PhoneInput({
  LabelProps = {},
  inputSuffix,
  label,
  caption,
  id,
  inputClassName,
  countrySelectorStyleProps = {},
  ref,
  ...props
}: PhoneInputProps) {
  const { className: labelClassName, ...labelProps } = LabelProps;

  const { buttonClassName, ...restOfCountrySelectorStyleProps } =
    countrySelectorStyleProps;

  return (
    <div>
      {label && (
        <label
          className={twMerge(
            "font-sm text-brand-secondary-black",
            labelClassName
          )}
          htmlFor={id}
          {...labelProps}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <PhoneInputComponent
          // TODO: ref doesn't work properly
          ref={ref}
          inputProps={{ id }}
          className="mt-2 relative inline-flex w-full"
          inputClassName={twMerge(
            "px-4 py-3 flex-1 border rounded-r-4xl  font-sm disabled:bg-brand-light-gray disabled:cursor-not-allowed border-brand-secondary-gray",
            inputClassName
          )}
          countrySelectorStyleProps={{
            flagClassName: "size-6",
            buttonClassName: twMerge(
              "h-full px-4 py-3 cursor-pointer border-l border-t border-b rounded-l-4xl disabled:bg-brand-light-gray disabled:cursor-not-allowed border-brand-secondary-gray",
              buttonClassName
            ),
            dropdownStyleProps: {
              listItemSelectedClassName: "bg-brand-light-gray",
              listItemClassName:
                "flex items-center gap-4 p-2.5 cursor-pointer hover:bg-brand-light-gray",
              listItemFlagClassName: "size-6",
              listItemCountryNameClassName: "font-sm",
              listItemDialCodeClassName: "font-sm",
              className:
                "border absolute bottom-0 left-0 right-0 z-50 bg-brand-primary-white transform translate-y-full rounded-4xl max-h-52 overflow-y-auto custom-scrollbar py-1",
            },
            ...restOfCountrySelectorStyleProps,
          }}
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
