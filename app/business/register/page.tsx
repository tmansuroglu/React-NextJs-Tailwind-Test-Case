"use client";

import Image from "next/image";
import Link from "next/link";
import { Routes } from "../../types/enums";
import {
  POST_CODES,
  RegisterBusinessFormFields,
  useEventHandlers,
  useFormProps,
} from "./page.utils";
import { FormProvider } from "react-hook-form";
import FormTextInput from "../../components/form-text-input";
import FormCheckboxInput from "../../components/form-checkbox-input";
import FormAutoCompleteComboBox from "../../components/form-auto-complete-combo-box";
import { useState } from "react";
import LoadingIndicator from "../../components/loading-indicator";

// TODO: missing meta data

export default function BusinessRegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const formProps = useFormProps();

  const { handleSubmit, formState, setValue, trigger } = formProps;
  const { isDirty, isValid, errors } = formState;

  const payError = errors[RegisterBusinessFormFields.PayLater]?.message;

  const isSubmitDisabled = !isDirty || !isValid || isLoading;

  const { handleOnSubmit, handlePayLaterChange, handlePayNowChange } =
    useEventHandlers({ setValue, trigger, setIsLoading });

  return (
    <main className="bg-brand-primary-blue -mt-24 pt-30 pb-8">
      <div className="container mx-auto px-4 relative pt-14 xl:pt-15">
        <Link
          href={Routes.Business}
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
        <div className="bg-brand-primary-white rounded-[30px] px-4 py-6 xl:p-[45px] border-[1px] border-brand-secondary-black">
          <h2 className="font-sm-bold xl:font-md-plus-bold text-brand-primary-black mb-1">
            Join our network
          </h2>
          <p className="font-sm xl:font-md-plus text-brand-primary-black mb-5">
            Free to join, no monthly fees
          </p>
          <FormProvider {...formProps}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <div className="flex flex-col gap-8">
                <FormTextInput
                  name={RegisterBusinessFormFields.Name}
                  disabled={isLoading}
                  label={
                    // TODO: this repeats too many times
                    <div className="flex gap-1.5 items-center">
                      <Image
                        src="/person.svg"
                        height={19}
                        width={16}
                        alt="person icon"
                        className="w-auto h-auto"
                      />
                      <span className="font-sm-bold">Name</span>
                    </div>
                  }
                />
                <FormTextInput
                  name={RegisterBusinessFormFields.Company}
                  disabled={isLoading}
                  label={
                    <div className="flex gap-1.5 items-center">
                      <Image
                        src="/building.svg"
                        height={19}
                        width={16}
                        alt="building icon"
                        className="w-auto h-auto"
                      />
                      <span className="font-sm-bold">Company</span>
                    </div>
                  }
                />
                <FormTextInput
                  disabled={isLoading}
                  name={RegisterBusinessFormFields.MobilePhone}
                  label={
                    <div className="flex gap-1.5 items-center">
                      <Image
                        src="/phone.svg"
                        height={19}
                        width={16}
                        className="w-auto h-auto"
                        alt="phone icon"
                      />
                      <span className="font-sm-bold">Mobile Phone Number</span>
                    </div>
                  }
                />
                <FormTextInput
                  disabled={isLoading}
                  name={RegisterBusinessFormFields.Email}
                  type="email"
                  label={
                    <div className="flex gap-1.5 items-center">
                      <Image
                        src="/mail.svg"
                        height={19}
                        width={16}
                        alt="mail icon"
                        className="w-auto h-auto"
                      />
                      <span className="font-sm-bold">Email Address</span>
                    </div>
                  }
                />
                <FormAutoCompleteComboBox
                  disabled={isLoading}
                  name={RegisterBusinessFormFields.PostCode}
                  items={POST_CODES}
                  labelClassName="flex gap-1.5 items-center"
                  placeholder="Start typing to match your address"
                  label={
                    <>
                      <Image
                        src="/house.svg"
                        height={19}
                        width={16}
                        alt="mail icon"
                        className="w-auto h-auto"
                      />
                      <span className="font-sm-bold">Postcode</span>
                    </>
                  }
                />
                <div>
                  <p className="flex gap-1.5 items-center">
                    <Image
                      src="/wrench.svg"
                      height={19}
                      width={16}
                      alt="wrench icon"
                      className="w-auto h-auto"
                    />
                    <span>What services are you interested in?</span>
                  </p>
                  <p className="font-xs text-brand-tertiary-gray">
                    Please select the services you&apos;re interested in
                    offering your customers
                  </p>
                  <div className="flex flex-row gap-3 w-full relative mt-2">
                    <FormCheckboxInput
                      hideErrorText
                      disabled={isLoading}
                      label="PayLater"
                      name={RegisterBusinessFormFields.PayLater}
                      onChange={handlePayLaterChange}
                    />
                    <FormCheckboxInput
                      disabled={isLoading}
                      hideErrorText
                      label="PayNow"
                      name={RegisterBusinessFormFields.PayNow}
                      onChange={handlePayNowChange}
                    />
                  </div>
                  {!!payError && (
                    <div className="error-text mt-2">{payError}</div>
                  )}
                </div>
                <div>
                  <button
                    className="btn-primary-over-rounded font-sm xl:font-sm-medium flex gap-2.5 w-full justify-center mb-5"
                    type="submit"
                    aria-label="Register your interest with Bumper"
                    disabled={isSubmitDisabled}
                  >
                    {isLoading && <LoadingIndicator />}
                    <span>Register</span>
                    <Image
                      src="/arrow.svg"
                      width={16}
                      height={19}
                      alt=""
                      aria-hidden="true"
                      className="w-auto h-auto"
                    />
                  </button>
                  <p className="flex items-center gap-1 font-sm text-brand-primary-black justify-center">
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
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
}
