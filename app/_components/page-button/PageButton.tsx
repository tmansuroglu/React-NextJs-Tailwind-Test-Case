import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type PageButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function PageButton({ disabled, children, ...props }: PageButtonProps) {
  return (
    <button
      className="px-5 py-4 sm:px-4 sm:py-3 cursor-pointer border border-gray-300 text-brand-primary-white rounded-md aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
      type="button"
      aria-disabled={disabled}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {children}
    </button>
  );
}
