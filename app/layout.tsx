"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TabLink from "./components/tab-link";
import { Routes } from "./types/enums";
import LogoLink from "./components/logo-link";
import LoginSvg from "../public/login.svg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isBusiness = pathname.startsWith(Routes.Business);

  const isRegisterPage =
    pathname === Routes.DriverRegister || pathname === Routes.BusinessRegister;
  const isLoginPage =
    pathname === Routes.DriverLogin || pathname === Routes.BusinessLogin;
  const isBusinessOrDriverPage =
    pathname === Routes.Business || pathname === Routes.Driver;
  const loginText = isBusiness ? "Partner Login" : "Driver Login";
  const logoText = isBusiness ? "for business" : "for drivers";

  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:bg-brand-primary-white focus:text-brand-primary-black focus:p-2"
        >
          Skip to main content
        </a>
        <header className="relative z-50">
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="bg-brand-primary-orange rounded-b-2xl"
          >
            <div className="bg-brand-secondary-black rounded-b-2xl">
              <div className="flex justify-between container mx-auto">
                <ul
                  className="flex"
                  role="tablist"
                  aria-label="Navigation tabs"
                >
                  <li
                    className="relative flex"
                    role="tab"
                    aria-current={!isBusiness ? "page" : undefined}
                    aria-selected={!isBusiness}
                  >
                    <TabLink href={Routes.Business} highlight={isBusiness}>
                      For business
                    </TabLink>
                  </li>
                  <li
                    className="border-r border-brand-secondary-gray"
                    aria-hidden
                  />
                  <li
                    className="relative flex"
                    role="tab"
                    aria-current={!isBusiness ? "page" : undefined}
                    aria-selected={!isBusiness}
                  >
                    <TabLink href={Routes.Driver} highlight={!isBusiness}>
                      For drivers
                    </TabLink>
                  </li>
                </ul>
                <Link
                  href={isBusiness ? Routes.BusinessLogin : Routes.DriverLogin}
                  className="btn-ghost font-xs-medium my-2 h-7 hidden xl:flex xl:items-center xl:gap-2"
                  aria-label={loginText}
                  aria-current={isLoginPage ? "page" : undefined}
                >
                  <span>{loginText}</span>
                  <LoginSvg />
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-between container mx-auto">
              <LogoLink
                href={isBusiness ? Routes.Business : Routes.Driver}
                aria-current={isBusinessOrDriverPage ? "page" : undefined}
                context={logoText}
              >
                {logoText}
              </LogoLink>
              <Link
                href={
                  isBusiness ? Routes.BusinessRegister : Routes.DriverRegister
                }
                aria-label="Register"
                className="btn-primary font-xs xl:font-sm-plus-medium mr-4 xl:mr-0"
                aria-current={isRegisterPage ? "page" : undefined}
              >
                Register
              </Link>
            </div>
          </nav>
        </header>
        <div id="main-content" className="z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
