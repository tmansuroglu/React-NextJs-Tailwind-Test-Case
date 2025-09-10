import Image from "next/image";
import Link from "next/link";
import { Routes } from "../../types/enums";

export function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative bg-[url(/hero.png)] min-h-[543px] h-auto w-full -mt-24 pt-24 bg-[34%_100%] bg-no-repeat bg-cover
 z-0  flex items-center"
      aria-labelledby="hero-title"
      role="banner"
    >
      <div className="absolute inset-0 bg-brand-opacity-gray opacity-70" />
      <div className="container mx-auto px-4 pt-7 pb-9 xl:pt-11 xl:pb-13 flex items-center min-h-full relative">
        <div className="flex flex-col max-w-2xl">
          <div className="flex gap-3 mb-6 items-center">
            <span className="font-sm-bold xl:font-md-plus-bold text-brand-primary-white">
              Excellent
            </span>
            <Image
              src="/five-stars.svg"
              height={16}
              width={85}
              alt="5 star rating"
              className="xl:h-6 xl:w-32"
              priority
            />
            <Image
              src="/trust-pilot.svg"
              height={16}
              width={64}
              alt="trust pilot logo"
              className="xl:h-6 xl:w-24"
              priority
            />
          </div>
          <h1
            className="font-xl xl:font-3xl text-brand-primary-white"
            id="hero-title"
          >
            BECOME A BUMPER APPROVED DEPENDABLE DEALERSHIP
          </h1>
          <p className="font-sm xl:font-md-plus text-brand-primary-white mt-2">
            Join our network of 3,000+ garages and dealerships who already offer
            Bumper to their customers.
          </p>
          <Link
            className="btn-primary-over-rounded font-sm xl:font-sm-medium flex gap-2.5 w-fit mt-6"
            href={Routes.BusinessRegister}
            aria-label="Register your interest with Bumper"
          >
            <span>Register your interest</span>
            <Image
              src="/arrow.svg"
              width={16}
              height={19}
              alt=""
              aria-hidden="true"
            />
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
