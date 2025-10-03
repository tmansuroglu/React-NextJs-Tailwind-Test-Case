import PhoneInput, { PhoneInputProps } from "@/components/phone-input";
import { useId } from "react";
import { useController, useFormContext } from "react-hook-form";
import Error from "@/public/error.svg";
import Success from "@/public/success.svg";
import ErrorText from "@/components/error-text";
import { twMerge } from "tailwind-merge";

type FormPhoneInputProps = PhoneInputProps & { name: string };

export function FormPhoneInput({
  name,
  inputClassName,
  countrySelectorStyleProps = {},
  ...props
}: FormPhoneInputProps) {
  const inputId = useId();
  const errorId = useId();
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  const { value, onBlur, onChange, ref } = field;
  const { error, isTouched, invalid } = fieldState;

  const fieldError = error?.message;
  const isSuccess = !invalid && isTouched;

  const { buttonClassName, ...restOfCountrySelectorStyleProps } =
    countrySelectorStyleProps;

  return (
    <PhoneInput
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      name={name}
      aria-describedby={errorId}
      aria-invalid={!!fieldError}
      inputClassName={twMerge(
        isSuccess && "border-brand-primary-green",
        fieldError && "border-error",
        inputClassName
      )}
      countrySelectorStyleProps={{
        buttonClassName: twMerge(
          isSuccess && "border-brand-primary-green",
          fieldError && "border-error",
          buttonClassName
        ),
        ...restOfCountrySelectorStyleProps,
      }}
      ref={ref}
      inputSuffix={
        isSuccess ? (
          <Success
            width={16}
            height={16}
            aria-hidden
            data-testid="success-icon"
          />
        ) : !!fieldError ? (
          <Error width={16} height={16} aria-hidden data-testid="error-icon" />
        ) : null
      }
      caption={!!fieldError && <ErrorText id={errorId}>{fieldError}</ErrorText>}
      id={inputId}
      {...props}
    />
  );
}
