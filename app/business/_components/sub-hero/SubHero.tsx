import Image from "next/image";
import Link from "next/link";
import Arrow from "@/public/arrow.svg";
import Logo from "@/public/logo.svg";
import Step from "../step";
import { Routes } from "@/types/enums";

export function SubHero() {
  return (
    <section
      className="container mx-auto px-4 pt-10 pb-6"
      role="region"
      aria-labelledby="subhero-heading"
    >
      <h2 id="subhero-heading" className="sr-only">
        Pay Later Benefits
      </h2>
      <div role="group" className="grid lg:grid-cols-2">
        <div>
          <Logo width={120} height={30} data-testid="bumper-logo" />
          <h3 className="font-2xl lg:font-2xl-wide text-brand-secondary-black">
            PAYLATER
          </h3>
        </div>
        <Image
          src="/phone.webp"
          alt="Mobile app illustrating PayLater payment options"
          data-testid="cell-phone"
          width={976}
          height={1238}
          className="mb-7 lg:mb-0 mt-4 lg:mt-0 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-7"
          loading="lazy"
        />
        <p className="font-md lg:font-md-plus text-brand-secondary-black mb-6 lg:row-start-2">
          Give customers more flexibility at checkout, online and in store. Let
          them spread the cost with interest-free monthly payments.
        </p>
        <p className="text-brand-primary-orange font-lg lg:font-xl-plus lg:row-start-3">
          No risk to your business.
        </p>
        <p className="text-brand-primary-orange font-lg mb-6 lg:font-xl-plus lg:row-start-4">
          No worries for your customers.
        </p>
        <p className="font-sm-bold text-brand-secondary-black mb-6 lg:row-start-5">
          It&apos;s as simple as:
        </p>
        <ol className="lg:row-start-6" aria-label="PayLater process steps">
          <li role="listitem">
            <Step
              data-testid="step-1"
              number={1}
              title="FIX IT"
              description="Your customers bring their vehicle to you. You repair and service the car. Everything just like it works right now."
            />
          </li>
          <li role="listitem">
            <Step
              data-testid="step-2"
              number={2}
              title="SPLIT IT"
              description="When the customer gets their bill or quote, your customer chooses the option to 'PayLater' and in just a few clicks they've been approved and have paid."
            />
          </li>
          <li role="listitem">
            <Step
              data-testid="step-3"
              number={3}
              title="SORTED"
              description="You and your customer part ways happy. You're paid upfront, directly from Bumper, the customer repays Bumper over their chosen payment plan."
            />
          </li>
        </ol>
      </div>
      <Link
        className="btn-primary-over-rounded font-sm lg:font-sm-medium flex gap-2.5 w-fit mt-6"
        href={Routes.BusinessRegister}
        aria-label="Register your interest with Bumper"
      >
        <span>Register your interest</span>
        <Arrow aria-hidden="true" width={20} height={20} />
      </Link>
    </section>
  );
}
