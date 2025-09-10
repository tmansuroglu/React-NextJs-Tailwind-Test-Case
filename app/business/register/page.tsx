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
import LabeledIcon from "../../components/labeled-icon";

// TODO: missing meta data

export default function BusinessRegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const formProps = useFormProps();

  const { handleSubmit, formState, setValue, trigger } = formProps;
  const { errors } = formState;

  const payError = errors[RegisterBusinessFormFields.PayLater]?.message;

  const isSubmitDisabled = isLoading;

  const { handleOnSubmit, handlePayLaterChange, handlePayNowChange } =
    useEventHandlers({ setValue, trigger, setIsLoading });

  return (
    <main className="bg-brand-primary-blue -mt-24 pt-30 pb-8">
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
          <FormProvider {...formProps}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <div className="flex flex-col gap-8">
                <FormTextInput
                  name={RegisterBusinessFormFields.Name}
                  disabled={isLoading}
                  label={
                    <LabeledIcon
                      src="/person.svg"
                      alt="person icon"
                      label="Name"
                    />
                  }
                />
                <FormTextInput
                  name={RegisterBusinessFormFields.Company}
                  disabled={isLoading}
                  label={
                    <LabeledIcon
                      src="/building.svg"
                      alt="building icon"
                      label="Company"
                    />
                  }
                />
                <FormTextInput
                  disabled={isLoading}
                  name={RegisterBusinessFormFields.MobilePhone}
                  label={
                    <LabeledIcon
                      src="/phone.svg"
                      alt="phone icon"
                      label="Mobile Phone Number"
                    />
                  }
                />
                <FormTextInput
                  disabled={isLoading}
                  name={RegisterBusinessFormFields.Email}
                  type="email"
                  label={
                    <LabeledIcon
                      src="/mail.svg"
                      alt="mail icon"
                      label="Email Address"
                    />
                  }
                />
                <FormAutoCompleteComboBox
                  InputProps={{
                    disabled: isLoading,
                    placeholder: "Start typing to match your address",
                  }}
                  name={RegisterBusinessFormFields.PostCode}
                  items={POST_CODES}
                  LabelProps={{ className: "flex gap-1.5 items-center" }}
                  label={
                    <LabeledIcon
                      src="/house.svg"
                      alt="mail icon"
                      label="Postcode"
                    />
                  }
                />
                <fieldset>
                  <LabeledIcon
                    src="/wrench.svg"
                    alt="wrench icon"
                    label={
                      <legend className="font-sm-bold">
                        What services are you interested in?
                      </legend>
                    }
                  />
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
                      ariaDescribedBy="pay-error"
                      onChange={handlePayLaterChange}
                    />
                    <FormCheckboxInput
                      disabled={isLoading}
                      hideErrorText
                      label="PayNow"
                      ariaDescribedBy="pay-error"
                      name={RegisterBusinessFormFields.PayNow}
                      onChange={handlePayNowChange}
                    />
                  </div>
                  {!!payError && (
                    <div id="pay-error" className="error-text mt-2">
                      {payError}
                    </div>
                  )}
                </fieldset>
                <div>
                  <button
                    className="btn-primary-over-rounded font-sm xl:font-sm-medium flex gap-2.5 w-full justify-center mb-5"
                    type="submit"
                    aria-label="Register your interest with Bumper"
                    disabled={isSubmitDisabled}
                    aria-disabled={isSubmitDisabled}
                  >
                    {isLoading && <LoadingIndicator aria-live="polite" />}
                    <span>Register</span>
                    <Image
                      src="/arrow.svg"
                      width={16}
                      height={19}
                      alt="arrow icon decorating the register button"
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
