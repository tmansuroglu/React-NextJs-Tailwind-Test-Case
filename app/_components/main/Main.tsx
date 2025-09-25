import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type MainProps = PropsWithChildren &
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export function Main({ className, children, ...props }: MainProps) {
  return (
    <main
      className={twMerge("-mt-24 pt-24 pb-13 flex flex-col flex-1", className)}
      {...props}
    >
      {children}
    </main>
  );
}
