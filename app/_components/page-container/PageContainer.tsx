import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type PageContainerProps = PropsWithChildren &
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export function PageContainer({
  className,
  children,
  ...props
}: PageContainerProps) {
  return (
    <main
      className={twMerge("-mt-24 pt-24 pb-13 min-h-dvh", className)}
      {...props}
    >
      {children}
    </main>
  );
}
