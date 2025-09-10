import Image from "next/image";
import Link from "next/link";
import { Routes } from "../../types/enums";
import RegisterBusinessForm from "../../components/register-business-form";
import type { Metadata } from "next";
import PageContainer from "../../components/page-container";

export const metadata: Metadata = {
  title: "Bumper UK - Register Business",
};

export default function BusinessRegisterPage() {
  return (
    <PageContainer className="bg-brand-primary-blue pt-30 pb-8">
      <div className="container mx-auto px-4 relative pt-14 xl:pt-15">
        <Link
          href={Routes.Business}
          aria-label="Back to previous page"
          className="inline-block p-4 absolute top-0 left-0"
        >
          <Image
            src="/back-arrow.svg"
            alt="back navigation button"
            width={20}
            height={20}
            className="xl:w-8 xl:h-8"
          />
        </Link>
        <h1 className="font-lg xl:font-xl-plus text-brand-primary-white mb-2 xl:mb-5">
          Join our network
        </h1>
        <p className="text-brand-primary-white font-sm mb-8">
          Offer <strong>PayLater</strong> to split servicing and repair work
          into monthly instalments - interest-free. Use <strong>PayNow</strong>
          to take secure payments online.
        </p>
        <div className="bg-brand-primary-white rounded-4xl px-4 py-6 xl:p-11 border border-brand-secondary-black">
          <h2 className="font-sm-bold xl:font-md-plus-bold text-brand-primary-black mb-1">
            Join our network
          </h2>
          <p className="font-sm xl:font-md-plus text-brand-primary-black mb-5">
            Free to join, no monthly fees
          </p>
          <RegisterBusinessForm />
        </div>
      </div>
    </PageContainer>
  );
}
