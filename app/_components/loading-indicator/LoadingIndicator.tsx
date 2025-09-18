import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type LoadingIndicatorProps = HTMLAttributes<HTMLDivElement> & {
  LoaderProps?: HTMLAttributes<HTMLDivElement>;
};

export function LoadingIndicator({
  LoaderProps = {},
  className,
  ...props
}: LoadingIndicatorProps) {
  return (
    <div
      className={twMerge("flex justify-center items-center", className)}
      role="status"
      aria-label={props["aria-label"] || "Loading..."}
      aria-live="polite"
      aria-hidden
      data-testid="loading-indicator"
      {...props}
    >
      <div
        {...LoaderProps}
        className={twMerge(
          "size-2.5 border-2  border-gray-200 border-t-blue-500 rounded-full animate-spin",
          LoaderProps.className
        )}
      />
    </div>
  );
}
