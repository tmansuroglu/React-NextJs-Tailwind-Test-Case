import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Routes } from "../../types/enums";
import TextInput from "../../components/text-input";

export const metadata: Metadata = {
  title: "Bumper UK - Business Register Page",
};

const LABEL_CLASS_NAME = "flex gap-1.5 items-center";

export default function BusinessRegisterPage() {
  return (
    <main className="bg-brand-primary-blue -mt-24 pt-30 pb-8">
      <Link href="-1" className="inline-block p-4 mb-2">
        <Image
          src="/back-arrow.svg"
          alt="back navigation button"
          width={20}
          height={20}
        />
      </Link>
      <div className="container mx-auto px-4">
        <h1 className="font-lg text-brand-primary-white mb-2">
          Join our network
        </h1>
        <p className="text-brand-primary-white font-sm mb-8">
          Offer <strong>PayLater</strong> to split servicing and repair work
          into monthly instalments - interest-free. Use PayNow to take secure
          payments online.
        </p>

        <div className="bg-brand-primary-white rounded-[30px] px-4 py-6 border-[1px] border-brand-secondary-black">
          <h2 className="font-sm-bold text-brand-primary-black mb-1">
            Join our network
          </h2>
          <p className="font-sm text-brand-primary-black mb-5">
            Free to join, no monthly fees
          </p>
          <div className="flex flex-col gap-8">
            <TextInput
              LabelProps={{
                className: LABEL_CLASS_NAME,
                children: (
                  <>
                    <Image
                      src="/person.svg"
                      height={19}
                      width={16}
                      alt="person icon"
                    />
                    <span>Name</span>
                  </>
                ),
              }}
            />
            <TextInput
              LabelProps={{
                className: LABEL_CLASS_NAME,
                children: (
                  <>
                    <Image
                      src="/building.svg"
                      height={19}
                      width={16}
                      alt="building icon"
                    />
                    <span>Company</span>
                  </>
                ),
              }}
            />
            <TextInput
              LabelProps={{
                className: LABEL_CLASS_NAME,
                children: (
                  <>
                    <Image
                      src="/phone.svg"
                      height={19}
                      width={16}
                      alt="phone icon"
                    />
                    <span>Mobile Phone Number</span>
                  </>
                ),
              }}
            />
            <TextInput
              InputProps={{ type: "email" }}
              LabelProps={{
                className: LABEL_CLASS_NAME,
                children: (
                  <>
                    <Image
                      src="/mail.svg"
                      height={19}
                      width={16}
                      alt="mail icon"
                    />
                    <span>Email Address</span>
                  </>
                ),
              }}
            />
            <div>
              <Link
                className="btn-primary-over-rounded font-sm xl:font-sm-medium flex gap-2.5 w-full justify-center mb-5"
                href={`${Routes.Business}${Routes.Register}`}
                aria-label="Register your interest with Bumper"
              >
                <span>Register</span>
                <Image
                  src="/arrow.svg"
                  width={16}
                  height={19}
                  alt=""
                  aria-hidden="true"
                />
              </Link>
              <p className="flex items-center gap-1 font-sm text-brand-primary-black justify-center">
                Already registered?
                <Link
                  className="text-brand-primary-green hover:underline"
                  href={`${Routes.Business}${Routes.Login}`}
                  aria-label="Log in to your Bumper account"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
