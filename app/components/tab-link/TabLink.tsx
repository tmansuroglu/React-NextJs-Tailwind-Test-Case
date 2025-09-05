import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type TabLinkProps = LinkProps & {
  children: ReactNode;
  highlight: boolean;
};

export function TabLink({ children, highlight, ...props }: TabLinkProps) {
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
          data-testid="highlight-indicator"
          aria-hidden
          className="bg-brand-primary-orange h-1 absolute left-4 right-4 -bottom-[1px] rounded-t-2xl"
        />
      )}
    </Link>
  );
}
