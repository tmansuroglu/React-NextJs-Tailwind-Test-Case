import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ErrorTextProps = HTMLAttributes<HTMLSpanElement>;

export function ErrorText({ className, ...props }: ErrorTextProps) {
  return (
    <span
      className={twMerge("error-text", className)}
      role="alert"
      {...props}
    />
  );
}
