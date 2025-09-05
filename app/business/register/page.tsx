"use client";

import Image from "next/image";
import Link from "next/link";
import { Routes } from "../../types/enums";
import {
  RegisterBusinessFormFields,
  useEventHandlers,
  useFormProps,
} from "./page.utils";
import { FormProvider } from "react-hook-form";
import FormTextInput from "../../components/form-text-input";
import FormCheckboxInput from "../../components/form-checkbox-input";

// TODO: missing meta data

const LABEL_CLASS_NAME = "flex gap-1.5 items-center";

export default function BusinessRegisterPage() {
  const formProps = useFormProps();

  const { handleSubmit, formState, setValue, trigger } = formProps;
  const { isDirty, isValid, errors } = formState;

  const payError = errors[RegisterBusinessFormFields.PayLater]?.message;

  const isSubmitDisabled = !isDirty || !isValid;

  const { handleOnSubmit, handlePayLaterChange, handlePayNowChange } =
    useEventHandlers({ setValue, trigger });

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
          <FormProvider {...formProps}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <div className="flex flex-col gap-8">
                <FormTextInput
                  name={RegisterBusinessFormFields.Name}
                  labelClassName={LABEL_CLASS_NAME}
                  label={
                    <>
                      <Image
                        src="/person.svg"
                        height={19}
                        width={16}
                        alt="person icon"
                        className="w-auto h-auto"
                      />
                      <span>Name</span>
                    </>
                  }
                />
                <FormTextInput
                  name={RegisterBusinessFormFields.Company}
                  labelClassName={LABEL_CLASS_NAME}
                  label={
                    <>
                      <Image
                        src="/building.svg"
                        height={19}
                        width={16}
                        alt="building icon"
                        className="w-auto h-auto"
                      />
                      <span>Company</span>
                    </>
                  }
                />
                <FormTextInput
                  name={RegisterBusinessFormFields.MobilePhone}
                  labelClassName={LABEL_CLASS_NAME}
                  label={
                    <>
                      <Image
                        src="/phone.svg"
                        height={19}
                        width={16}
                        className="w-auto h-auto"
                        alt="phone icon"
                      />
                      <span>Mobile Phone Number</span>
                    </>
                  }
                />
                <FormTextInput
                  name={RegisterBusinessFormFields.Email}
                  type="email"
                  labelClassName={LABEL_CLASS_NAME}
                  label={
                    <>
                      <Image
                        src="/mail.svg"
                        height={19}
                        width={16}
                        alt="mail icon"
                        className="w-auto h-auto"
                      />
                      <span>Email Address</span>
                    </>
                  }
                />
                <div>
                  <p className={LABEL_CLASS_NAME}>
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
                      label="PayLater"
                      name={RegisterBusinessFormFields.PayLater}
                      onChange={handlePayLaterChange}
                    />
                    <FormCheckboxInput
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
                      href={`${Routes.Business}${Routes.Login}`}
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
