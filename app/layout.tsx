"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Routes } from "@/types/enums";
import TabLink from "./components/tab-link";
import { LogoLink } from "./components/logo-link/LogoLink";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isBusiness = pathname.startsWith(Routes.Business);
  const isRegister = pathname.includes(Routes.Register);
  const isLogin = pathname.includes(Routes.Login);
  const pathBase = isBusiness ? Routes.Business : Routes.Driver;
  const loginText = isBusiness ? "Partner Login" : "Driver Login";
  const logoText = isBusiness ? "for business" : "for drivers";

  // TODO: write tests
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:bg-brand-primary-white focus:text-brand-primary-black focus:p-2"
        >
          Skip to main content
        </a>
        <header>
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="bg-brand-primary-orange"
          >
            <div className="bg-brand-secondary-black rounded-b-2xl">
              <div className="flex justify-between container mx-auto">
                <ul
                  className="flex"
                  role="tablist"
                  aria-label="Navigation tabs"
                >
                  <li className="relative flex">
                    <TabLink href={Routes.Business} highlight={isBusiness}>
                      For business
                    </TabLink>
                  </li>
                  <li
                    className="border-r-[1px] border-brand-secondary-gray"
                    aria-hidden
                  />
                  <li className="relative flex">
                    <TabLink href={Routes.Driver} highlight={!isBusiness}>
                      For drivers
                    </TabLink>
                  </li>
                </ul>
                <Link
                  href={`${pathBase}/${Routes.Login}`}
                  className="btn-ghost font-xs-medium my-2 hidden xl:inline-block h-7"
                  aria-label={loginText}
                  aria-current={isLogin ? "page" : undefined}
                >
                  {loginText}
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-between container mx-auto">
              <LogoLink
                href={pathBase}
                aria-current={pathname === pathBase ? "page" : undefined}
                context={logoText}
              >
                {logoText}
              </LogoLink>
              <Link
                href={`${pathBase}/${Routes.Register}`}
                aria-label="Register"
                className="btn-primary font-xs xl:font-sm-plus-medium mr-4 xl:mr-0"
                aria-current={isRegister ? "page" : undefined}
              >
                Register
              </Link>
            </div>
          </nav>
        </header>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
