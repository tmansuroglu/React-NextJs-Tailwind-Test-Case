import Link from "next/link";
import Arrow from "@/public/arrow.svg";
import TrustPilot from "@/public/trust-pilot.svg";
import FiveStars from "@/public/five-stars.svg";
import { Routes } from "@/types/enums";

export function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative bg-[url(/hero.webp)] min-h-[543px] h-auto w-full pt-24 bg-[34%_100%] bg-no-repeat bg-cover
 z-0  flex items-center xl:min-h-[743px]"
      aria-labelledby="hero-title"
      role="banner"
    >
      <div className="absolute inset-0 bg-brand-opacity-gray opacity-70" />
      <div className="container mx-auto px-4 pt-7 pb-9 xl:pt-11 xl:pb-13 flex items-center min-h-full relative">
        <div className="flex flex-col">
          <div className="flex gap-3 mb-6 items-center">
            <span className="font-sm-bold xl:font-md-plus-bold text-brand-primary-white">
              Excellent
            </span>
            <FiveStars height={16} width={85} className="xl:h-6 xl:w-32" />
            <TrustPilot height={16} width={64} className="xl:h-6 xl:w-24" />
          </div>
          <h1
            className="font-xl xl:font-3xl text-brand-primary-white break-keep"
            id="hero-title"
          >
            BECOME A BUMPER APPROVED DEPENDABLE DEALERSHIP
          </h1>
          <p className="font-sm xl:font-md-plus text-brand-primary-white mt-2">
            Join our network of 3,000+{" "}
            <Link
              href={Routes.BusinessList}
              className="underline text-brand-primary-green xl:font-md-plus-bold"
            >
              garages and dealerships who already offer Bumper to their
              customers.
            </Link>
          </p>
          <Link
            className="btn-primary-over-rounded font-sm xl:font-sm-medium flex gap-2.5 w-fit mt-6"
            href={Routes.BusinessRegister}
            aria-label="Register your interest with Bumper"
          >
            <span>Register your interest</span>
            <Arrow aria-hidden="true" width={20} height={20} />
          </Link>
          <p className="mt-3 flex items-center gap-1 font-sm text-brand-primary-white">
            Already registered?
            <Link
              className="text-brand-primary-green hover:underline"
              href={Routes.BusinessLogin}
              aria-label="Log in to your Bumper account"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
