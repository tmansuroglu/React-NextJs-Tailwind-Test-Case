import Link, { LinkProps } from "next/link";
import { HTMLAttributes, ReactNode } from "react";

type TabLinkProps = LinkProps & {
  children: ReactNode;
  highlight: boolean;
  HighlightProps?: HTMLAttributes<HTMLSpanElement> & { "data-testid": string };
};

export function TabLink({
  children,
  highlight,
  HighlightProps,
  ...props
}: TabLinkProps) {
  return (
    <Link
      {...props}
      role="tab"
      className="btn-nav"
      aria-current={highlight ? "page" : undefined}
      aria-selected={highlight}
    >
      {children}
      {highlight && (
        <span
          aria-hidden
          className="bg-brand-primary-orange h-1 absolute left-4 right-4 bottom-0 rounded-t-2xl"
          {...HighlightProps}
        />
      )}
    </Link>
  );
}
