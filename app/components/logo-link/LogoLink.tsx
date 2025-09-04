import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type LogoLinkProps = LinkProps & {
  children: ReactNode;
  context: "for business" | "for drivers";
};

export function LogoLink({ children, context, ...props }: LogoLinkProps) {
  return (
    <Link
      {...props}
      className="flex gap-2 items-center px-4 py-3"
      aria-label={`Bumper ${context} logo`}
    >
      <Image
        src="/logo.svg"
        alt="Bumper logo"
        priority
        width={111}
        height={28}
        className="xl:h-8 xl:w-[126px]"
      />
      <span className="font-xs-bold xl:font-sm-bold">{children}</span>
    </Link>
  );
}
